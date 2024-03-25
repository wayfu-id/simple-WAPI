import { getStore } from "./src/utils/Loader.js";
import { ChatFactory, ContactFactory } from "./src/factories/index.js";
import { Chat, Contact } from "./src/structures/index.js";

/**
 * @typedef {import("./index").PhoneExist} PhoneExist
 * @typedef {import("./index").MessageSendOptions} MessageSendOptions
 * @typedef {import("./index").MessageSendResult} SendResult
 * @typedef {import("./index").wid} wid
 */

/** @type {import("./index")} */
export default class WAPI {
    constructor(store) {
        return this._init(store);
    }

    /**
     * Delete key and its value from an object
     * @param {string[] | string} keys
     * @param {object?} obj
     * @returns
     */
    _del(keys, obj) {
        obj = obj || this;
        keys = Array.isArray(keys) ? keys : [keys];
        keys.forEach((key) => delete obj[key]);

        return obj;
    }

    /**
     * Initialize store object (Add or remove unused module)
     * @param {any} store
     * @returns
     */
    _init(store) {
        if (store instanceof Window) return WAPI.init(store);
        if (!store && WAPI.prototype.Chat) return this._patch();

        let { WebClasses, WebClasses2, WebClasses3 } = store;
        Object.defineProperty(store, "WebClasses", {
            value: {
                V1: { ...WebClasses },
                V2: { ...WebClasses2 },
                V3: { ...WebClasses3 },
            },
            enumerable: true,
        });

        store = this._del(["WebClasses2", "WebClasses3"], store);
        return this._clone(store);
    }

    /**
     * Clone Store object to `WAPI.prototype`.
     * Add and set some `prototype` properties.
     * @param {any} store
     */
    _clone(store) {
        Object.assign(WAPI.prototype, store);

        const thisApp = this;
        let { Chat, Cmd, Contact, Debug, MediaCollection, WapQuery } = thisApp;

        if (Chat.modelClass.prototype.getModel === undefined) {
            Object.defineProperties(Chat.constructor.prototype, {
                findImpl: {
                    /** @type {(e: string | wid)} */
                    value: async function findImpl(e, n) {
                        let wid = await (async (id) => {
                            if (typeof id === "string") {
                                /** @type {null | PhoneExist} */
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
                },
                clearAllDraft: {
                    value: function clearAllDraft() {
                        return this.getModelsArray().every((c) => {
                            let { hasDraftMessage } = c;
                            if (hasDraftMessage) c.clearDraft();
                            return !c.hasDraftMessage;
                        });
                    },
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
                        return ChatFactory.create(thisApp, this);
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
                    /** @type {(body: string, ret: boolean) => Promise<Chat | SendResult>} */
                    value: async function sendText(body, ret) {
                        if (this.hasDraftMessage) this.clearDraft();
                        if (!this.active) await this.open();
                        ret = !!ret;

                        return new Promise((done) => {
                            (async ({ MsgUtils: f }, e) => {
                                let msg = await f.createTextMsgData(this, e),
                                    res = await f.addAndSendTextMsg(this, msg);

                                done(ret ? this.getModel() : res);
                            })(thisApp, body);
                        });
                    },
                    enumerable: true,
                },
                sendImage: {
                    /** @type {(file: File, caption: string, ret: boolean) => Promise<Chat | SendResult>} */
                    value: async function sendImage(file, caption, ret) {
                        if (this.hasDraftMessage) this.clearDraft();
                        if (!this.active) await this.open();
                        caption = typeof caption === "undefined" ? "" : caption;
                        ret = !!ret;

                        return new Promise((done) => {
                            (async (f, c, r) => {
                                const latest = (({ VERSION }) => {
                                    return (
                                        parseInt(VERSION.replaceAll(".", "")) >= 223409
                                    );
                                })(Debug);

                                let mc = new MediaCollection(this);
                                if (latest) {
                                    await mc.processAttachments([{ file: f }], 1, this);
                                } else {
                                    await mc.processAttachments([{ file: f }], this, 1);
                                }

                                let [media] = mc.getModelsArray(),
                                    res = await media.sendToChat(this, { caption, c });

                                done(r ? this.getModel() : res);
                            })(file, caption, ret);
                        }).catch((err) => {
                            console.log(err), done(false);
                        });
                    },
                    enumerable: true,
                },
            });

            Object.defineProperties(Contact.modelClass.prototype, {
                getModel: {
                    value: function getModel() {
                        return ContactFactory.create(thisApp, this);
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
        }

        return this._patch();
    }

    /**
     * Add and set new WAPI Object Property
     * @returns
     */
    _patch() {
        const reConstruct = (obj) => {
            return Object.keys(obj).reduce((o, k) => {
                o[k] = { value: obj[k], enumerable: true };
                return o;
            }, {});
        };
        const myContact = (({ Contact }) => {
            return ContactFactory.create(this, Contact.getMeContact());
        })(this);

        Object.defineProperties(this, {
            ...reConstruct(this.Debug),
            ME: {
                /**  @type {Contact} */
                value: myContact,
                enumerable: true,
            },
            checkPhone: {
                /** @type {(id:string) => Promise<null | PhoneExist>} */
                value: async function checkPhone(phone) {
                    return await this.WapQuery.queryPhoneExists(phone);
                },
            },
            closeChat: {
                value: async function closeChat(id) {
                    let chat = await (async (e) => {
                        return await this.Chat.find(e instanceof Chat ? e.id : e);
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
                    let _id = await (async (e) => {
                        if (typeof e === "string") {
                            /** @type {null | PhoneExist} */
                            let check = await this.checkPhone(e);
                            if (!check) return null;
                            return check.wid;
                        }
                        return e;
                    })(id);
                    if (!_id) return null;

                    let chat;
                    try {
                        chat = await this.Chat.find(_id);
                    } catch (e) {
                        console.log(e);
                    }
                    return chat ? ChatFactory.create(this, chat) : null;
                },
            },
            findContact: {
                /** @type {(id:string | wid) => Promise<Contact | null>} */
                value: async function findContact(id) {
                    let _id = await (async (e) => {
                        if (typeof e === "string") {
                            /** @type {null | PhoneExist} */
                            let check = await this.checkPhone(e);
                            if (!check) return null;
                            return check.wid;
                        }
                        return e;
                    })(id);
                    if (!_id) return null;

                    let contact;
                    try {
                        contact = await this.Contact.find(_id);
                    } catch (e) {
                        console.log(e);
                    }
                    return contact ? ContactFactory.create(this, contact) : null;
                },
            },
            findCommonGroups: {
                /** @type {(id:string | Contact) => Promise<Chat[]>} */
                value: async function findCommonGroup(id) {
                    const { GroupUtils: fn } = this;
                    let contact = await (async (e) => {
                        return await this.Contact.find(e instanceof Contact ? e.id : e);
                    })(id);

                    if (!contact) return [];

                    let founded = await fn.findCommonGroups(contact),
                        results = [];

                    for (let group of founded.getModelsArray()) {
                        results.push(ChatFactory.create(this, group));
                    }
                    return results;
                },
            },
            getActiveChat: {
                value: function getActiveChat() {
                    let chat = this.Chat.getActive();
                    return chat ? ChatFactory.create(this, chat) : null;
                },
            },
            inputAndSendTextMsg: {
                /** @type {(chatId: Chat | string | wid, text: string) => Promise<Chat | null>} */
                value: async function inputAndSendTextMsg(chatId, text) {
                    /** @type {Chat} */
                    let chat = await (async (id) => {
                        return id instanceof Chat ? id : await this.findChat(id);
                    })(chatId);

                    if (!chat.active) {
                        if (chat.hasDraftMessage) chat.clearDraft();
                        await chat.open();
                        await this.sleep(250);
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
                    let _id = id instanceof Chat ? id.id : id,
                        chat;

                    try {
                        chat = await this.Chat.find(_id);
                    } catch (e) {
                        console.log(e);
                    }

                    if (!chat) return;
                    await chat.open();
                    return chat;
                },
            },
            sendMessage: {
                /** @type {(id: string | Chat, message: string, options?: MessageSendOptions) => Promise<any>} */
                value: async function sendMessage(id, message, options = {}) {
                    let chat = await (async (e) => {
                        let ct;
                        try {
                            ct = await this.Chat.find(e instanceof Chat ? e.id : e);
                        } catch (e) {
                            console.log(e);
                        }
                        return ct;
                    })(id);

                    if (!chat) return;

                    let { media, caption, ret } = options;
                    if (media) {
                        caption = caption ? caption : message;
                        return await chat.sendImage(media, caption, ret);
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
        return this;
    }

    /**
     * @param {Window} target
     * @returns
     */
    static init(target) {
        target = target && target instanceof Window ? target : window;
        const webpackKey = ((w) => {
            for (let key of Object.keys(w)) {
                if (/[^|]?webpack./g.test(key)) return key;
            }
            return null;
        })(target);

        if (!WAPI.prototype.Chat || !WAPI.prototype.Contact) {
            if (webpackKey && typeof target[webpackKey] === "object") {
                let mID = `parasite${Date.now()}`,
                    modStore = {};

                target[webpackKey].push([[mID], {}, (o) => getStore(o, modStore)]);
                return new WAPI(modStore);
            } else {
                console.error("Failed to load WAPI Module!");
            }
        } else {
            return new WAPI();
        }
    }
}
