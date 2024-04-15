declare namespace WAPI {
    type BizInfo = {
        verifiedName: {
            isApi: Boolean;
            level: String;
            name: String;
            privacyMode: String | null;
            serial: String;
        }
    }
    type WebpackLoader = {
        type: "webpack",
        chunk: Array<any>
    }
    type MetaLoader = {
        type: "meta",
        chunk: Object
    }
    export type MessageSendResult = WA.MessageSendResult;

    export type LoaderType = WebpackLoader | MetaLoader | {type: undefined; chunk: undefined};
    
    export interface wid {
        /**
         * Whatsapp server domain
         * @example `c.us`
         */
        server: String,
        /**
         * User whatsapp Number
         * @example `554199999999`
         */
        user: String,
        /**
         * Serialized id
         * @example `554199999999@c.us`
         */
        _serialized: String,
        /** Is it group wid */
        isGroup(): Boolean,
        /** Is it User wid */
        isUser(): Boolean,
    }
    export interface ContactId extends wid {}
    export interface ChatId extends wid {}
    export interface GroupId extends wid {}
    
    export interface MessageSendOptions {
        /** Image caption */
        caption?: String
        /** Media to be sent */
        media?: File
        /** Return chat model */
        ret?: Boolean
    }

    export type PhoneExist = {
        biz: Boolean,
        bizInfo?: BizInfo,
        wid: wid,
    }

    interface Base<o> {
        /** Main WAPI app */
        app: WAPI,
        /** Class raw data */
        raw: o;
        /** Cloning class */
        _clone(): any;
        /** Patching data */
        _patch(data: o): o;
    }

    interface BaseFactory<o, k> {
        static create(app: WAPI, data: k): o;
    }

    /**
     * Represents a Contact on WhatsApp
     *
     * @example 
     * {
     *   id: {
     *     server: 'c.us',
     *     user: '554199999999',
     *     _serialized: `554199999999@c.us`
     *   },
     *   Number: '554199999999',
     *   isBusiness: false,
     *   isEnterprise: false,
     *   name: undefined,
     *   pushname: 'John',
     *   shortName: undefined,
     *   isMe: false,
     *   isUser: true,
     *   isGroup: false,
     *   isWAContact: true,
     *   isMyContact: false,
     *   isBlocked: false
     * }
     */
    export interface Contact extends Base<WA.ContactModel> {
        /** Contact's phone Number */
        Number: String,
        /** Indicates if the contact is a business contact */
        isBusiness: Boolean,
        /** ID that represents the contact */
        id: ContactId,
        /** Indicates if the contact is an enterprise contact */
        isEnterprise: Boolean,
        /** Indicates if the contact is a group contact */
        isGroup: Boolean,
        /** Indicates if the contact is a user contact */
        isUser: Boolean,
        /**
         * Indicates if the contact is the current user's contact
         * @deprecated
         */
        isMe: Boolean, 
        /** 
         * Indicates if the Number is saved in the current phone's contacts
         * @deprecated
         */
        isMyContact: Boolean
        /**
         * Indicates if the Number is registered on WhatsApp
         * @deprecated
         */
        isWAContact: Boolean,
        /** Indicates if you have blocked this contact */
        isBlocked: Boolean,
        /** The contact's name, as saved by the current user */
        name?: String,
        /** The name that the contact has configured to be shown publically */
        pushname: String,
        /** A shortened version of name */
        shortName?: String,

        /**
         * Returns the Chat that corresponds to this Contact.  
         * Will return null when getting chat for currently logged in user.
         */
        getChat(): Promise<Chat>,
        
        /** Gets the Contact's common groups with you. Returns empty array if you don't have any common group. */
        getCommonGroups(): Promise<Chat[]>

    }

    /**
     * Represents a Chat on WhatsApp
     *
     * @example
     * {
     *   id: {
     *     server: 'c.us',
     *     user: '554199999999',
     *     _serialized: `554199999999@c.us`
     *   },
     *   name: '+55 41 9999-9999',
     *   isGroup: false,
     *   timestamp: 1591484087,
     * }
     */
    export interface Chat extends Base<WA.ChatModel> {
        /** ID that represents the chat */
        id: ChatId,
        /** Indicates if the Chat is a Group Chat */
        isGroup: Boolean,
        /** Indicates current active status */
        active: Boolean,
        /** Indicates current draft message status */
        hasDraftMessage: Boolean,
        /** Title of the chat */
        name: String,
        /** Unix timestamp for when the last activity occurred */
        timestamp: Number,
        /** Contact model */
        contact: Contact,
        /** Clearing draft message */
        clearDraft(): Chat;
        /** Close this chat */
        close(): Promise<void>,
        /** Open this chat */
        open(): Promise<void>,
        /** Input text message and send it to chat */
        inputAndSendTextMessage(text: String): Promise<Chat | null>
        /** Send text message to this chat */
        sendText(message: String): Promise<MessageSendResult>,
        sendText(message: String, model: true): Promise<Chat>,
        /** Send image message to this chat */
        sendMedia(file: File, caption: String): Promise<MessageSendResult>,
        sendMedia(file: File, caption: String, model: true): Promise<Chat>,
    }

    export interface Group extends Base<WA.GroupModel> {
        /** Is Announcement Group */
        announce: Boolean;
        /** Group creation timestampt */
        creation: Number;
        /** Group Description */
        desc: String;
        /** Group Description Id */
        descId: String;
        /** Group Description Owner Contact Id */
        descOwner: ContactId;
        /** Group Description Updated Timestampt */
        descTime: Number;
        /** Group Displayed Description */
        displayedDesc: String;
        /** Group Type */
        groupType: String;
        /** Group Id */
        id: GroupId;
        /** Group subject name */
        name: String;
        /** Group Owner Contact */
        owner: ContactId;
        /** Parent Group */
        parentGroupId?: GroupId;
        /** Group Participant Size */
        size: Number;
        /** All Sub Groups Id */
        subGroupsId: GroupId[];
    }

    export interface GroupParticipant {
        id: ContactId;
        contact: Contact;
        isAdmin: Boolean;
        isSuperAdmin: Boolean;
    }

    export interface GroupChat extends Chat {
        /** Group owner */
        owner: Contact | null;
        groupMetadata: GroupMetadata
        /** Group participants */
        participants: GroupParticipant[];
    }

    export interface GroupMetadata {
        owner: wid | undefined,
        participants: {
            getModelsArray:() => Array<any>
        }
    }

    export interface ChatFactory extends BaseFactory<Chat | GroupChat, WA.ChatModel> {}
    export interface ContactFactory extends BaseFactory<Contact, WA.ContactModel> {}
    export interface GroupFactory extends BaseFactory<Group, WA.GroupModel> {}
}

declare module "../factories/index.js" {
    export interface ChatFactory extends WAPI.ChatFactory {}
    export interface ContactFactory extends WAPI.ContactFactory {}
    export interface GroupFactory extends WAPI.GroupFactory {}
}

/** From Original WhatsApp Web */
declare namespace WA {
    export type MessageSendResult = {
        count: Number | null;
        messageSendResult: String;
        t: Number;
    }

    type InsertData = {
        createLocally: Boolean,
        id: WAPI.wid,
    };
    type InsertOpt = { merge: Boolean };

    interface BaseClass<t> {        
        constructor: BaseClass<t>;
        
        modelClass: t;
        /** Insert data to Collection */
        add(data: InsertData, opt: InsertOpt): [t];
        /** Find a single data from Collection */
        find(query: String | WAPI.wid): Promise<t | null>;
        /** Get a single data from Collection */
        get(query: String | WAPI.wid): t | null;
        /** Get all Collection Data */
        getModelsArray(): t[];
        
        prototype: this;
    }
    interface ModelClass {
        id: WAPI.wid;
        name?: String;
        
        prototype: this;
    }

    export interface ChatModel extends ModelClass {
        active?: Boolean;
        hasDraftMessage: Boolean;
        isGroup: Boolean;
        contact: ContactModel;
        groupMetadata?: WAPI.GroupMetadata;
        clearAllDraft(): void;
        close(): Promise<void>;
        getModel(): WAPI.Chat;
        open(): Promise<void>;
        sendText(body: String): Promise<MessageSendResult>;
        sendText(body: String, model: true): Promise<WAPI.Chat>;
        sendMedia(file: File, caption: String): Promise<MessageSendResult>;
        sendMedia(file: File, caption: String, model: true): Promise<WAPI.Chat>;
    }

    export interface ContactModel extends ModelClass {
        commonGroups?: ChatModel[];
        isBusiness: Boolean;
        isContactBlocked: Boolean;
        phoneNumber?: String;
        pushname?: String;
        shortName?: String;
        username?: String;
        verifiedName?: String;
        getModel(): WAPI.Contact;
        openChat(): Promise<ChatModel>;
    }

    export interface GroupModel extends Omit<ModelClass, 'name'> {
        announce: Boolean;
        creation: Number;
        desc: String;
        descId: String;
        descOwner: WAPI.wid;
        descTime: Number;
        displayedDesc: String;
        groupType: String;
        joinedSubgroups?: Array<WAPI.wid>;
        owner: WAPI.wid;
        parentGroup?: WAPI.wid;
        size: Number;
        getModel(): WAPI.Group;
        getContactModel(): WAPI.Contact;
        getChatModel(): WAPI.Chat;
        openChat(): Promise<ChatModel>;
    }

    export interface MessageModel extends Omit<ModelClass, 'id'> {
        ack: Number;
        body: String;
        id: {
            fromMe: Boolean;
            id: String;
            remote: WAPI.wid;
            _serialized: String;
        };

    }

    export interface MediaModel extends ModelClass {
        sendToChat(chat: ChatModel, opt: { caption: String }): Promise<ChatModel>;
    }

    export interface Chat extends BaseClass<ChatModel> {
        clearAllDraft(): void;
    }
    export interface Contact extends BaseClass<ContactModel> {
        getMeContact(): ContactModel;
    }
    export interface GroupMetadata extends BaseClass<GroupModel> {}
    export interface Message extends BaseClass<MessageModel> {}
    
    export interface MessageMedia extends BaseClass<MediaModel> {
        processAttachments(files: [{file: File}], ack: Number, chat: ChatModel): Promise<void>;
    }

    export class MediaCollection implements MessageMedia {
        constructor(chat: ChatModel);
        add(data: InsertData, opt: InsertOpt): [MediaModel];
        find(query: String): Promise<MediaModel | null>;
        get(query: String | WAPI.wid): MediaModel | null;
        getModelsArray(): MediaModel[];
        processAttachments(files: [{ file: File; }], ack: Number, chat: ChatModel): Promise<void>;
    }

    export type WapQueryResult = WAPI.PhoneExist & {
        disappearingMode: {
            duration: Number;
            settingTimestamp: Number;
        };
    }
}

declare class Store {
    /** Original WhatsApp Chat Object Collection */
    Chat: WA.Chat;
    Cmd: {
        openChatAt(chat: WA.Chat): Promise<void>;
        closeChat(chat: WA.Chat): Promise<void>;
    };
    /** Original WhatsApp Contact Object Collection */
    Contact: WA.Contact;
    /** Original WhatsApp Contact Object Collection */
    Debug: {VERSION: String};
    /** Original WhatsApp GroupMetadata Object Collection */
    GroupMetadata: WA.GroupMetadata;
    GroupUtils: {
        findCommonGroups(contact: WA.ContactModel): Promise<WA.GroupModel[] | []>;
    };
    /** Original WhatsApp MediaCollection Class */
    MediaCollection: typeof WA.MediaCollection; 
    /** Original WhatsApp Msg Object */
    Msg: WA.Message;
    /** Original WhatsApp Message Composing Functions */
    MsgUtils: {
        addAndSendTextMsg(chat: WA.ChatModel, message: WA.MessageModel): Promise<WA.MessageSendResult>;
        createTextMsgData(chat: WA.ChatModel, body: String): Promise<WA.MessageModel>;
    };
    /** Original WhatsApp WapQuery Functions */
    WapQuery: {
        queryPhoneExists(query: String): Promise<WA.WapQueryResult | null>;
    };
    /** HTML classes that web are using */
    WebClasses: {[k:String]:String};
    WebClasses2: {[k:String]:String};
    WebClasses3: {[k:String]:String};
    /** Original WhatsApp WidFactory Functions */
    WidFactory: {
        createWid(id: String): WAPI.wid;
    }
}

declare class WAPI extends Store {
    /** Create new WAPI Object */
    private constructor();
    /** Create new WAPI with store Object */
    private constructor(store: any);

    BUILD_ID: String;
    DESKTOP_BETA: Boolean;
    /** WhatsApp Web Version */
    VERSION: String;
    /** Current contact info */
    ME: WAPI.Contact;
    /** HTML classes that web are using */
    WebClasses: {
        [k:String]:{ [k:String]: String }
    };
    /** Check given phone Number */
    checkPhone(phone:String): Promise<WA.WapQueryResult | null>;
    /** Find chat by Id */
    findChat(id: String | WAPI.wid): Promise<WAPI.Chat | null>;
    /** Find contact by Id */
    findContact(id: String | WAPI.wid): Promise<WAPI.Contact | null>;
    /** Find contact by Id */
    findCommonGroups(id: String | WAPI.wid): Promise<WAPI.Chat[] | []>;
    /** Find contact by Id */
    findGroup(id: String | WAPI.wid): Promise<WAPI.Group | null>;
    /** Find contact by Id */
    getAllGroups(): WAPI.Group[] | [];
    /** Get current active chat data */
    getActiveChat(): WAPI.Chat | null;
    /** Input text message and send it to chat */
    inputAndSendTextMsg(chat: WAPI.Chat, text: String): Promise<WAPI.Chat | null>;
    inputAndSendTextMsg(chat: String, text: String): Promise<WAPI.Chat | null>;
    inputAndSendTextMsg(chat: WAPI.wid, text: String): Promise<WAPI.Chat | null>;
    /** Close chat by id */
    closeChat(id: String | WAPI.Chat): Promise<any>;
    /** Open chat by id */
    openChat(id: String | WAPI.Chat): Promise<any>;
    /** Send message to id */
    sendMessage(id: String | WAPI.Chat, message: String, option: WAPI.MessageSendOptions): Promise<any>;
    /** Delay some function */
    sleep(time: Number): Promise<void>;
    /** Static methor for initiating WAPI class */
    static init(target?: Window): WAPI;
}

export = WAPI;