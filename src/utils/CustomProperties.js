import { ChatFactory, ContactFactory, GroupFactory } from "../factories/index.js";
import { Chat as WAPIChat, Contact as WAPIContact } from "../structures/index.js";

/**
 * @typedef {import("../../index").default} WAPI
 * @typedef {import("../../index").default.Chat} Chat
 * @typedef {import("../../index").default.Contact} Contact
 * @typedef {import("../../index").default.Group} Group
 * @typedef {import("../../index").default.MessageSendOptions} MessageSendOptions
 * @typedef {import("../../index").default.MessageSendResult} MessageSendResult
 * @typedef {import("../../index").default.wid} wid
 */

/**
 * Reconstruct Object properties
 * @type {(obj: any) => any}
 */
const reConstruct = (obj) => {
    return Object.keys(obj).reduce((o, k) => {
        o[k] = { value: obj[k], enumerable: true };
        return o;
    }, {});
};

/**
 * Construct Custom WAPI object
 * @param {WAPI} app
 * @returns
 */
const constructWAPI = (app) => {
    const { Chat, Contact, Debug, GroupMetadata, sleep, WapQuery, WidFactory, WidUtils } = app;

    try {
        Contact.getMeContact()
            .fetchProfilePic()
            .then(() => {
                Object.defineProperty(app, "ME", {
                    value: Contact.getMeContact().getModel(),
                    enumerable: true,
                });
            });

        Object.defineProperties(app, {
            ...reConstruct(Debug),
            checkPhone: {
                /** @type {(phone: String)} */
                value: async function checkPhone(phone) {
                    let result = await WapQuery.queryPhoneExists(phone);

                    if (!result) {
                        let _phone = phone.includes("@") ? phone : `${phone}@c.us`,
                            validWid = WidUtils.validateWid(_phone, false),
                            wid = validWid ? WidFactory.createWid(_phone) : null;

                        result = wid ? await WapQuery.queryWidExists(wid) : null;
                    }

                    return result;
                },
            },
            closeChat: {
                /** @type {(id: WAPIChat | wid | String)} */
                value: async function closeChat(id) {
                    let chat = await (async (e) => {
                        return await Chat.find(e instanceof WAPIChat ? e.id : e);
                    })(id);
                    if (!chat) return;
                    if (!chat.active) return;

                    await chat.close();
                    return chat;
                },
            },
            findChat: {
                /** @type {(id:string | wid) => Promise<Chat | null>} */
                value: async function findChat(id) {
                    let chat;
                    try {
                        chat = await Chat.find(id);
                    } catch (e) {
                        console.log(e);
                    }
                    return chat ? ChatFactory.create(app, chat) : null;
                },
            },
            findContact: {
                /** @type {(id:string | wid) => Promise<Contact | null>} */
                value: async function findContact(id) {
                    let contact;
                    try {
                        contact = await Contact.find(id);
                    } catch (e) {
                        console.log(e);
                    }
                    return contact ? ContactFactory.create(app, contact) : null;
                },
            },
            findCommonGroups: {
                /** @type {(id:string | Contact) => Promise<Chat[]>} */
                value: async function findCommonGroup(id) {
                    const { GroupUtils: fn } = app;
                    let contact = await (async (e) => {
                        return await Contact.find(e instanceof WAPIContact ? e.id : e);
                    })(id);

                    if (!contact) return [];

                    let founded = await fn.findCommonGroups(contact),
                        results = [];

                    for (let group of founded.getModelsArray()) {
                        results.push(ChatFactory.create(app, group));
                    }
                    return results;
                },
            },
            findGroup: {
                /** @type {(id:string | wid) => Promise<Group | null>} */
                value: async function findGroup(id) {
                    /** @type {wid | null} */
                    let _id = ((e) => {
                        if (typeof e === "string") {
                            e = e.replace(/([0-9\-]{16,})[@a-z\.]*/g, `$1@g.us`);
                            return WidFactory.createWid(e);
                        } else if (typeof e.isGroup === "function" && e.isGroup()) {
                            return e;
                        }
                        return null;
                    })(id);
                    if (!_id) return null;

                    let group;
                    try {
                        group = await GroupMetadata.find(_id);
                    } catch (e) {
                        console.log(e);
                    }
                    return group ? GroupFactory.create(app, group) : null;
                },
            },
            findUserWid: {
                /** @type {(id: string | wid)=> Promise<wid | null>} */
                value: async function findUserWid(id) {
                    if (typeof id === "string") {
                        let isExists = await app.checkPhone(id);
                        return isExists ? isExists.wid : null;
                    }
                    return id;
                },
            },
            getActiveChat: {
                value: function getActiveChat() {
                    let chat = Chat.getActive();
                    return chat ? ChatFactory.create(app, chat) : null;
                },
            },
            getAllGroups: {
                value: function getAllGroups() {
                    let groups = GroupMetadata.getModelsArray(),
                        results = [];

                    for (let group of groups) {
                        results.push(GroupFactory.create(app, group));
                    }
                    return results;
                },
            },
            inputAndSendTextMsg: {
                /** @type {(chatId: Chat | string | wid, text: string) => Promise<Chat | null>} */
                value: async function inputAndSendTextMsg(chatId, text) {
                    /** @type {Chat} */
                    let chat = await (async (id) => {
                        return id instanceof WAPIChat ? id : await this.findChat(id);
                    })(chatId);

                    if (!chat.active) {
                        if (chat.hasDraftMessage) chat.clearDraft();
                        await chat.open();
                        await sleep(250);
                    }

                    let { ComposeBox: Act } = this;
                    await Act.paste(chat, `${text}`);
                    await Act.send(chat);

                    return chat;
                },
            },
            openChat: {
                /** @type {(id:string | Chat) => Promise<Chat | null>} */
                value: async function openChat(id) {
                    let _id = id instanceof WAPIChat ? id.id : id,
                        chat;

                    try {
                        chat = await Chat.find(_id);
                    } catch (e) {
                        console.log(e);
                    }

                    if (!chat) return;
                    await chat.open();
                    return chat;
                },
            },
            sendMessage: {
                /** @type {(id: string | Chat, message: string, options?: MessageSendOptions) => Promise<MessageSendResult | WAPIChat>} */
                value: async function sendMessage(id, message, options = {}) {
                    let chat = await (async (e) => {
                        let ct;
                        try {
                            ct = await Chat.find(e instanceof WAPIChat ? e.id : e);
                        } catch (err) {
                            throw new Error(`Can't find Chat. Reason: ${err.message || "Unknown"}`);
                        }
                        return ct;
                    })(id);

                    if (!chat) return;

                    let { media, caption, ret } = options;
                    if (media) {
                        caption = caption ? caption : message;
                        return await chat.sendMedia(media, caption, ret);
                    }
                    return await chat.sendText(message, ret);
                },
            },
            sleep: {
                /** @type {(time: number)=> Promise<void>} */
                value: function sleep(time) {
                    try {
                        return new Promise((resolve) => setTimeout(resolve, time));
                    } catch (e) {}
                },
            },
        });
    } catch (err) {
        console.error("From: Construct WAPI", err);
        return false;
    }
};

export { constructWAPI };
