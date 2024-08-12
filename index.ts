import { constructStore, constructWAPI, getStore, waitLoaderType, _token } from "./src/Loader";
import { Chat, Contact, Group, GroupChat } from "./src/structures/index";
import { Store } from "./index.d";

type reportType<T extends WA.MessageSendOptions> = T["ret"] extends true ? Chat : WA.MessageSendResult;

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

    BUILD_ID: string | undefined;
    DESKTOP_BETA: boolean | undefined;
    /** WhatsApp Web Version */
    VERSION: string;
    /** Current contact info */
    ME: Contact;
    /** HTML classes that web are using */
    WebClasses: Record<WA.WebSCSSKey, { [k: string]: string }>;
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
    static init(target?: Window & typeof globalThis & { Debug?: any }): WAPI | undefined {
        target = target && target instanceof Window ? target : window;
        const { type, chunk } = waitLoaderType(target);

        if (!WAPI.prototype.Chat || !WAPI.prototype.Contact) {
            if (!!type && (type === "meta" || type === "webpack")) {
                let modStore = {};

                if (type === "meta") {
                    getStore(chunk, modStore);
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
    WAPI_VERSION: string | undefined;
    /** WhatsApp Web Version */
    VERSION: string;
    /** Current contact info */
    ME: Contact;
    /** HTML classes that web are using */
    WebClasses: Record<WA.WebSCSSKey, { [k: string]: string }>;
    /** Check given phone number */
    checkPhone(phone: string): Promise<WA.WapQueryResult | null>;
    /** Find chat by Id */
    findChat(id: string | WA.wid): Promise<Chat | null>;
    /** Find contact by Id */
    findContact(id: string | WA.wid): Promise<Contact | null>;
    /** Find contact by Id */
    findCommonGroups(id: string | WA.wid): Promise<GroupChat[] | []>;
    /** Find contact by Id */
    findGroup(id: string | WA.wid): Promise<Group | null>;
    /** find user WID for given id as string or WAPI wid */
    findUserWid(id: string | WA.wid): Promise<WA.wid | null>;
    /** Find contact by Id */
    getAllGroups(): Group[] | [];
    /** Get current active chat data */
    getActiveChat(): Chat | null;
    /** Input text message and send it to chat */
    inputAndSendTextMsg(chat: string | Chat | WA.wid, text: string): Promise<Chat | null>;
    /** Close chat by id */
    closeChat(id: string | Chat | WA.wid): Promise<WA.ChatModel | null>;
    /** Open chat by id */
    openChat(id: string | Chat | WA.wid): Promise<WA.ChatModel | null>;
    /** Send message to id */
    sendMessage<T extends WA.MessageSendOptions>(
        id: string | Chat | WA.wid,
        message: string,
        option?: WA.MessageSendOptions
    ): Promise<reportType<T>>;
    /** Delay some function */
    sleep(time: number): Promise<void>;
    [k: string]: any;
}

export default WAPI;
