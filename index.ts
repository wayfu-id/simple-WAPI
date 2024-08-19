import { constructStore, constructWAPI, getStore, waitLoaderType, _token } from "./src/Loader";
import * as S from "./src/structures/index";
import { Store } from "./src/whatsapp/index";

declare global {
    export const __VERSION__: string;
    interface Window {
        Debug: { VERSION: string };
    }
}

declare namespace WAPI {
    export type Chat = S.Chat;
    export type Contact = S.Contact;
    export type Group = S.Group;
    export type GroupChat = S.GroupChat;
    export type ChatSerialized = S.ChatSerialized;
    export type ContactSerialized = S.ContactSerialized;
    export type GroupParticipantSerialized = S.GroupParticipantSerialized;
    export type GroupSerialized = S.GroupSerialized;
    export type ProfilePicThumbSerialized = S.ProfilePicThumbSerialized;
    export type reportType<T extends WA.MessageSendOptions> = T["ret"] extends true
        ? Chat
        : WA.MessageSendResult;
}

class WAPI implements WAPI {
    /** Create new WAPI Object */
    private constructor(token: symbol);
    /** Create new WAPI with store Object */
    private constructor(token: symbol, store?: any);
    private constructor(token: symbol, store?: any) {
        if (_token !== token) {
            throw new TypeError("WAPI is not constructable. Use WAPI.init() instead");
        }

        return this._init(store);
    }
    /**
     * Initialize store object (Add or remove unused module)
     */
    _init(store: any) {
        if (!WAPI.prototype.Chat && store) {
            Object.assign(WAPI.prototype, store);
            constructStore(this);
        }
        constructWAPI(this);
        return this;
    }
    /** Static methor for initiating WAPI class */
    static init(target?: Window | (Window & typeof globalThis)): WAPI | undefined {
        target = target && target instanceof Window ? target : window;
        const { type, chunk } = waitLoaderType(target);

        if (!WAPI.prototype.Chat || !WAPI.prototype.Contact) {
            if (!!type && (type === "meta" || type === "webpack")) {
                let modStore = {};

                if (type === "meta") {
                    modStore = getStore(chunk, modStore);
                } else {
                    let mID = `parasite${Date.now()}`;
                    chunk.push([[mID], {}, (o: any) => getStore(o, modStore)]);
                }

                modStore = Object.assign({}, modStore, { Debug: target["Debug"] });
                return new WAPI(_token, modStore);
            } else {
                console.error("Failed to load WAPI Module!");
                return;
            }
        } else {
            return new WAPI(_token);
        }
    }
}

interface WAPI extends Store {
    /** Current contact info */
    ME: WAPI.Contact;
    /** WhatsApp Web Version */
    WA_VERSION: string;
    /** Simple-WAPI Version */
    WAPI_VERSION: string;
    /** HTML classes that web are using */
    WebClasses: Record<WA.WebSCSSKey, { [k: string]: string }>;
    /** All WhatsApp Web React Components */
    WebComponents: { [k: string]: any };
    /** Check given phone number */
    checkPhone(phone: string): Promise<WA.WapQueryResult | null>;
    /** Find chat by Id */
    findChat(id: string | WA.wid): Promise<WAPI.Chat | null>;
    /** Find contact by Id */
    findContact(id: string | WA.wid): Promise<WAPI.Contact | null>;
    /** Find contact by Id */
    findCommonGroups(id: string | WA.wid): Promise<WAPI.GroupChat[] | []>;
    /** Find contact by Id */
    findGroup(id: string | WA.wid): Promise<WAPI.Group | null>;
    /** find user WID for given id as string or WAPI wid */
    findUserWid(id: string | WA.wid): Promise<WA.wid | null>;
    /** Find contact by Id */
    getAllGroups(): WAPI.Group[] | [];
    /** Get current active chat data */
    getActiveChat(): WAPI.Chat | null;
    /** Input text message and send it to chat */
    inputAndSendTextMsg(chat: string | WAPI.Chat | WA.wid, text: string): Promise<WAPI.Chat | null>;
    /** Close chat by id */
    closeChat(id: string | WAPI.Chat | WA.wid): Promise<WA.ChatModel | null>;
    /** Open chat by id */
    openChat(id: string | WAPI.Chat | WA.wid): Promise<WA.ChatModel | null>;
    /** Send message to id */
    sendMessage<T extends WA.MessageSendOptions>(
        id: string | WAPI.Chat | WA.wid,
        message: string,
        option?: WA.MessageSendOptions
    ): Promise<WAPI.reportType<T>>;
    /** Delay some function */
    sleep(time: number): Promise<void>;
    [k: string]: any;
}

export default WAPI;
