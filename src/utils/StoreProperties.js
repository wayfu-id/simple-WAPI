import WAPI from "../../index.js";
import { ChatFactory, ContactFactory, GroupFactory } from "../factories/index.js";

/**
 * @typedef {import("../../index").MessageSendOptions} MessageSendOptions
 * @typedef {import("../../index").MessageSendResult} SendResult
 * @typedef {import("../../index").wid} wid
 */

/**
 * Return deleted properties from an Object
 * @param {String | String[]} keys
 * @param {any} obj
 * @returns
 */
const delProp = (keys, obj) => {
    (Array.isArray(keys) ? keys : [keys]).forEach((key) => delete obj[key]);
    return obj;
};

/**
 * Construct Custom Store object
 * @param {WAPI} app
 */
const constructStore = (app) => {
    let { Chat } = app;
    if (Chat.modelClass.prototype.getModel === undefined) {
        return (
            constructChat(app) &&
            constructContact(app) &&
            constructGroupMetadata(app) &&
            constructWebClasses(app)
        );
    }
    return true;
};

/**
 * Construct Custom Store Chat object
 * @param {WAPI} app
 * @returns
 */
const constructChat = (app) => {
    let { Chat, Cmd, MediaCollection, WapQuery } = app;
    try {
        Object.defineProperties(Chat.constructor.prototype, {
            findImpl: {
                /** @type {(e: string | wid)} */
                value: async function findImpl(e) {
                    let wid = await (async (id) => {
                        if (typeof id === "string") {
                            let check = await WapQuery.queryPhoneExists(e);
                            if (!check) return null;
                            return check.wid;
                        }
                        return id;
                    })(e);

                    if (!wid) return null;

                    let result = this.get(wid);
                    if (!result) {
                        [result] = this.add(
                            { createLocally: true, id: wid },
                            { merge: true }
                        );
                    }

                    return result;
                },
                enumerable: true,
            },
            clearAllDraft: {
                value: function clearAllDraft() {
                    return this.getModelsArray().every((c) => {
                        let { hasDraftMessage } = c;
                        if (hasDraftMessage) c.clearDraft();
                        return !c.hasDraftMessage;
                    });
                },
                enumerable: true,
            },
        });

        Object.defineProperties(Chat.modelClass.prototype, {
            clearDraft: {
                value: function clearDraft() {
                    this.setComposeContents({ text: "", timestamp: Date.now() });
                    return this;
                },
                enumerable: true,
            },
            close: {
                value: async function close() {
                    if (this.active) await Cmd.closeChat(this);
                },
                enumerable: true,
            },
            getModel: {
                value: function getModel() {
                    return ChatFactory.create(app, this);
                },
                enumerable: true,
            },
            open: {
                value: async function open() {
                    await Cmd.openChatAt(this);
                },
                enumerable: true,
            },
            sendText: {
                /** @type {(body: string, ret: boolean) => Promise<WAPI.Chat | SendResult>} */
                value: async function sendText(body, ret) {
                    if (this.hasDraftMessage) this.clearDraft();
                    if (!this.active) await this.open();
                    ret = !!ret;

                    return new Promise((done) => {
                        (async ({ MsgUtils: f }, e) => {
                            let msg = await f.createTextMsgData(this, e),
                                res = await f.addAndSendTextMsg(this, msg);

                            done(ret ? this.getModel() : res);
                        })(app, body);
                    });
                },
                enumerable: true,
            },
            sendMedia: {
                /** @type {(file: File, caption: string, ret: boolean) => Promise<WAPI.Chat | SendResult>} */
                value: async function sendMedia(file, caption, ret) {
                    if (this.hasDraftMessage) this.clearDraft();
                    if (!this.active) await this.open();
                    caption = typeof caption === "undefined" ? "" : caption;
                    ret = !!ret;

                    return new Promise((done) => {
                        (async (f, c, r) => {
                            let mc = new MediaCollection(this);
                            await mc.processAttachments([{ file: f }], 1, this);

                            let [media] = mc.getModelsArray(),
                                res = await media.sendToChat(this, { caption: c });

                            done(r ? this.getModel() : res);
                        })(file, caption, ret);
                    }).catch((err) => {
                        console.log(err), done(false);
                    });
                },
                enumerable: true,
            },
        });
        return true;
    } catch (err) {
        console.error("From: Construct Chat", err);
        return false;
    }
};

/**
 * Construct Custom Store Contact object
 * @param {WAPI} app
 * @returns
 */
const constructContact = (app) => {
    let { Chat, Contact, WapQuery } = app;
    try {
        Object.defineProperties(Contact.constructor.prototype, {
            findContact: {
                /** @type {(e: string | wid)} */
                value: async function findContact(e) {
                    let wid = await (async (id) => {
                        if (typeof id === "string") {
                            let check = await WapQuery.queryPhoneExists(e);
                            if (!check) return null;
                            return check.wid;
                        }
                        return id;
                    })(e);

                    if (!wid) return null;

                    let result = this.get(wid);
                    if (!result) {
                        [result] = this.add(
                            { createLocally: true, id: wid },
                            { merge: true }
                        );
                    }

                    return result;
                },
                enumerable: true,
            },
        });

        Object.defineProperties(Contact, {
            findImpl: {
                value: async function findImpl(e) {
                    return await this.findContact(e);
                },
            },
        });

        Object.defineProperties(Contact.modelClass.prototype, {
            getModel: {
                value: function getModel() {
                    return ContactFactory.create(app, this);
                },
                enumerable: true,
            },
            openChat: {
                value: async function openChat() {
                    let chat = await Chat.find(this.id);
                    await chat.open();
                    return chat;
                },
                enumerable: true,
            },
        });
        return true;
    } catch (err) {
        console.error("From: Construct Contact", err);
        return false;
    }
};

/**
 * Construct Custom Store GroupMetadata object
 * @param {WAPI} app
 * @returns
 */
const constructGroupMetadata = (app) => {
    let { Chat, Contact, GroupMetadata } = app;
    try {
        Object.defineProperties(GroupMetadata.modelClass.prototype, {
            getModel: {
                value: function getModel() {
                    return GroupFactory.create(app, this);
                },
                enumerable: true,
            },
            getContactModel: {
                value: async function getContactModel() {
                    let contact = await Contact.find(this.id);
                    return ContactFactory.create(app, contact);
                },
                enumerable: true,
            },
            getChatModel: {
                value: async function getChatModel() {
                    let chat = await Chat.find(this.id);
                    return ChatFactory.create(app, chat);
                },
                enumerable: true,
            },
            openChat: {
                value: async function openChat() {
                    let chat = await Chat.find(this.id);
                    await chat.open();
                    return chat;
                },
                enumerable: true,
            },
        });
        return true;
    } catch (err) {
        console.error("From: Construct GroupMetadata", err);
        return false;
    }
};

/**
 * Construct Custom Store WebClasses object
 * @param {WAPI} app
 * @returns
 */
const constructWebClasses = (app) => {
    try {
        let { WebClasses, WebClasses2, WebClasses3 } = app;
        delProp(["WebClasses", "WebClasses2", "WebClasses3"], WAPI.prototype);
        Object.defineProperty(WAPI.prototype, "WebClasses", {
            value: {
                V1: { ...WebClasses },
                V2: { ...WebClasses2 },
                V3: { ...WebClasses3 },
            },
            enumerable: true,
        });
        return true;
    } catch (err) {
        console.error("From: Construct WebClasses", err);
        return false;
    }
};

export { constructStore };
