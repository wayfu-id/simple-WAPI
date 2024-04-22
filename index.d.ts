declare namespace WAPI {
    type BizInfo = {
        verifiedName: {
            isApi: boolean;
            level: String;
            name: String;
            privacyMode: String | null;
            serial: String;
        };
    };
    type WebpackLoader = {
        type: "webpack";
        chunk: Array<any>;
    };
    type MetaLoader = {
        type: "meta";
        chunk: Object;
    };
    export type MessageSendResult = WA.MessageSendResult;

    export type LoaderType = WebpackLoader | MetaLoader | { type: undefined; chunk: undefined };

    export interface wid {
        /**
         * Whatsapp server domain
         * @example `c.us`
         */
        server: String;
        /**
         * User whatsapp number
         * @example `554199999999`
         */
        user: String;
        /**
         * Serialized id
         * @example `554199999999@c.us`
         */
        _serialized: String;
        /** Is it group wid */
        isGroup(): boolean;
        /** Is it User wid */
        isUser(): boolean;
    }
    export interface ContactId extends wid {}
    export interface ChatId extends wid {}
    export interface GroupId extends wid {}

    export interface MessageSendOptions {
        /** Image caption */
        caption?: String;
        /** Media to be sent */
        media?: File;
        /** Return chat model */
        ret?: boolean;
    }

    export type PhoneExist = {
        biz: boolean;
        bizInfo?: BizInfo;
        wid: wid;
    };

    interface Base<o> {
        /** Main WAPI app */
        app: WAPI;
        /** Class raw data */
        raw: o;
        /** Serialize Class Data */
        _serialized: any;
        /** Cloning class */
        _clone(): any;
        /** Patching data */
        _patch(data: o): o;

        /** Default properties */
        [k: string]: any | undefined;
    }

    interface Serialized<o extends wid> {
        id: o;
        name: string | undefined;

        /** Default properties */
        [k: string]: any | undefined;
    }

    interface ProfilePicThumbSerialized {
        eurl: string;
        id: wid;
        img: string;
        imgFull: string;
        raw: string;
        tag: string;
    }

    interface ContactSerialized extends Serialized<ContactId> {
        disappearingModeDuration: number | undefined;
        disappearingModeSettingTimestamp: number | undefined;
        isBlocked: boolean;
        isBusiness: boolean;
        isContactSyncCompleted: number;
        isEnterprise: boolean;
        isGroup: boolean;
        isMe: boolean;
        isMyContact: boolean;
        isUser: boolean;
        isSmb: boolean;
        labels: Array<string>;
        privacyMode: {
            actualActors: number;
            hostStorage: number;
            privacyModeTs: number;
        } | null;
        pushname: string;
        phoneNumber: string;
        profilePicThumb: ProfilePicThumbSerialized;
        requestedPnTimestamp: number | undefined;
        sectionHeader: string | undefined;
        shortName?: string;
        textStatusLastUpdateTime: number;
        type: string;
        username: string | undefined;
        verifiedLevel: number;
        verifiedName: string | undefined;
    }

    interface ChatSerialized extends Serialized<ChatId> {
        isGroup: boolean;
        active: boolean;
        hasDraftMessage: boolean;
        timestamp: number;
        contact: ContactSerialized;
    }

    interface GroupSerialized extends Serialized<GroupId> {
        announce: boolean;
        creation: number;
        desc: string;
        displayedDesc: string;
        groupType: string;
        owner: ContactId;
        parentGroupId?: GroupId;
        participants: GroupParticipant[];
        size: number;
        subGroupsId: GroupId[];
    }

    interface GroupParticipantSerialized extends Omit<Serialized<ContactId>, "name"> {
        contact: ContactSerialized;
        isAdmin: boolean;
        isSuperAdmin: boolean;
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
     *   number: '554199999999',
     *   isBusiness: false,
     *   isEnterprise: false,
     *   name: undefined,
     *   pushname: 'John',
     *   shortName: undefined,
     *   isMe: false,
     *   isUser: true,
     *   isGroup: false,
     *   isMyContact: false,
     *   isBlocked: false
     * }
     */
    export interface Contact extends Base<WA.ContactModel> {
        /** Get serialized object */
        _serialized: ContactSerialized;
        /** Forrmated Name */
        formatedName: string;
        /** Indicates if the contact is a business contact */
        isBusiness: boolean;
        /** ID that represents the contact */
        id: ContactId;
        /** Indicates if the contact is an enterprise contact */
        isEnterprise: boolean;
        /** Indicates if the contact is a group contact */
        isGroup: boolean;
        /** Indicates if the contact is a user contact */
        isUser: boolean;
        /** Indicates if the contact is the current user's contact */
        isMe: boolean;
        /** Indicates if the number is saved in the current phone's contacts */
        isMyContact: boolean;
        /** Indicates if you have blocked this contact */
        isBlocked: boolean;
        /** The contact's name, as saved by the current user */
        name?: string;
        /** Contact's phone number */
        phoneNumber: string;
        /** Profil pic thumb */
        profilePicThumb: ProfilePicThumb;
        /** The name that the contact has configured to be shown publically */
        pushname: string;
        /** A shortened version of name */
        shortName?: string;

        // Available functions
        /**
         * Returns the Chat that corresponds to this Contact.
         * Will return null when getting chat for currently logged in user.
         */
        getChat(): Promise<Chat>;

        /** Gets the Contact's common groups with you. Returns empty array if you don't have any common group. */
        getCommonGroups(): Promise<Chat[]>;
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
     *   active: active
     *   hasDraftMessage: false,
     *   isGroup: false,
     *   name: '+55 41 9999-9999',
     *   timestamp: 1591484087,
     * }
     */
    export interface Chat extends Base<WA.ChatModel> {
        /** Get serialized object */
        _serialized: ChatSerialized;
        /** Indicates current active status */
        active: boolean | undefined;
        /** Contact model */
        contact: Contact;
        /** Indicates current draft message status */
        hasDraftMessage: boolean;
        /** ID that represents the chat */
        id: ChatId;
        /** Indicates if the Chat is a Group Chat */
        isGroup: boolean;
        /** Title of the chat */
        name: string;
        /** Unix timestamp for when the last activity occurred */
        timestamp: number;

        // Available functions
        /** Clearing draft message */
        clearDraft(): Chat;
        /** Close this chat */
        close(): Promise<void>;
        /** Open this chat */
        open(): Promise<void>;
        /** Input text message and send it to chat */
        inputAndSendTextMessage(text: string): Promise<Chat | null>;
        /** Send text message to this chat */
        sendText(message: string): Promise<MessageSendResult>;
        sendText(message: string, model: true): Promise<Chat>;
        /** Send image message to this chat */
        sendMedia(file: File, caption: string): Promise<MessageSendResult>;
        sendMedia(file: File, caption: string, model: true): Promise<Chat>;
    }

    /**
     * Represents a Group from GroupMetadata on WhatsApp
     *
     * @example
     * {
     *   id: {
     *     server: 'g.us',
     *     user: '554199999999',
     *     _serialized: `554199999999@g.us`
     *   },
     *   announce: false,
     *   creation: 1657054203,
     *   desc: "John's Group",
     *   displayedDesc: 'Lorem Ipsum',
     *   name: "John's Group",
     *   groupType: 'DEFAULT',
     *   owner: {
     *     server: 'c.us',
     *     user: '554199999999',
     *     _serialized: `554199999999@c.us`
     *   },
     *   parentGroupId: undefined,
     *   size: 10,
     *   subGroupsId: [],
     * }
     */
    export interface Group extends Base<WA.GroupModel> {
        /** Get serialized object */
        _serialized: GroupSerialized;
        /** Is Announcement Group */
        announce: boolean;
        /** Group creation timestampt */
        creation: number;
        /** Group Description */
        desc: string;
        /** Group Displayed Description */
        displayedDesc: string;
        /** Group Type */
        groupType: string;
        /** Group Id */
        id: GroupId;
        /** Group subject name */
        name: string;
        /** Group Owner Contact */
        owner: ContactId;
        /** Parent Group */
        parentGroupId?: GroupId;
        /** Group Participant Size */
        size: number;
        /** All Sub Groups Id */
        subGroupsId: GroupId[];

        // Getter Function
        /** Group participants */
        get participants(): GroupParticipant[];
        /** Get Parent Group as object */
        get parentGroup(): Group | null;
        /** Get child groups as array of Group */
        get childGroups(): Group[];

        /** Returns the Chat that corresponds to this Group. */
        getChat(): Promise<Chat>;
        /** Returns the Contact that corresponds to this Group. */
        getContact(): Promise<Contact>;
        /** Open chat that corresponds to this group. */
        openChat(): Promise<Chat>;
    }

    export interface GroupParticipant {
        /** Get serialized object */
        _serialized: GroupParticipantSerialized;
        /** The contact model of this participant */
        contact: Contact;
        /** ID that represents the participant */
        id: ContactId;
        /** Is the participant Admin */
        isAdmin: boolean;
        /** Is the participant SuperAdmin */
        isSuperAdmin: boolean;

        create(data: WA.Contact): GroupParticipant;
    }

    export interface ProfilePicThumb {
        eurl: string;
        filehash: string;
        fullDirectPath: string;
        id: wid;
        img: string;
        imgFull: string;
        previewDirectPath: string;
        previewEurl: string;
        raw: string | undefined;
        stale: boolean;
        tag: string;
        timestamp: number;

        _serialized: ProfilePicThumbSerialized;

        create(data: WA.ProfilePicThumb): ProfilePicThumb;
    }

    export interface GroupChat extends Chat {
        groupMetadata: GroupMetadata;

        // Getter Functions
        /** Group owner */
        get owner(): Contact | null;
        /** Group participants */
        get participants(): GroupParticipant[];
    }

    export interface GroupMetadata {
        owner: wid | undefined;
        participants: {
            getModelsArray: () => Array<WA.ContactModel>;
        };
    }
}

/** From Original WhatsApp Web */
declare namespace WA {
    export type MessageSendResult = {
        count: number | null;
        messageSendResult: string;
        t: number;
    };

    type InsertData = {
        createLocally: boolean;
        id: WAPI.wid;
    };

    type InsertOpt = { merge: boolean };

    interface BaseClass<t> {
        constructor: BaseClass<t>;

        modelClass: t;
        /** Insert data to Collection */
        add(data: InsertData, opt: InsertOpt): [t];
        /** Find a single data from Collection */
        find(query: string | WAPI.wid): Promise<t | null>;
        /** Get a single data from Collection */
        get(query: string | WAPI.wid): t | null;
        /** Get all Collection Data */
        getModelsArray(): t[];

        prototype: this;
    }
    interface ModelClass {
        id: WAPI.wid;
        name?: string;

        prototype: this;
        /** Default properties */
        [k: string]: any | undefined;
    }

    export interface ChatModel extends ModelClass {
        active?: boolean;
        hasDraftMessage: boolean;
        isGroup: boolean;
        contact: ContactModel;
        groupMetadata?: WAPI.GroupMetadata;
        clearAllDraft(): void;
        close(): Promise<void>;
        getModel(): WAPI.Chat;
        open(): Promise<void>;
        sendText(body: string): Promise<MessageSendResult>;
        sendText(body: string, model: true): Promise<WAPI.Chat>;
        sendMedia(file: File, caption: string): Promise<MessageSendResult>;
        sendMedia(file: File, caption: string, model: true): Promise<WAPI.Chat>;
    }

    export interface ContactModel extends ModelClass {
        commonGroups?: ChatModel[];
        isBusiness: boolean;
        isContactBlocked: boolean;
        phonenumber?: string;
        pushname?: string;
        shortName?: string;
        username?: string;
        verifiedName?: string;
        getModel(): WAPI.Contact;
        openChat(): Promise<ChatModel>;
    }

    export interface ProfilePicThumb extends Omit<ModelClass, "name"> {
        eurl: string;
        filehash: string;
        fullDirectPath: string;
        id: WAPI.wid;
        img: string;
        imgFull: string;
        previewDirectPath: string;
        previewEurl: string;
        raw: string | undefined;
        stale: boolean;
        tag: string;
        timestamp: number;
    }

    export interface GroupModel extends Omit<ModelClass, "name"> {
        announce: boolean;
        creation: number;
        desc: string;
        descId: string;
        descOwner: WAPI.wid;
        descTime: number;
        displayedDesc: string;
        groupType: string;
        joinedSubgroups?: Array<WAPI.wid>;
        owner: WAPI.wid;
        parentGroup?: WAPI.wid;
        size: number;
        getModel(): WAPI.Group;
        getContactModel(): WAPI.Contact;
        getChatModel(): WAPI.Chat;
        openChat(): Promise<ChatModel>;
    }

    export interface MessageModel extends Omit<ModelClass, "id"> {
        ack: number;
        body: string;
        id: {
            fromMe: boolean;
            id: string;
            remote: WAPI.wid;
            _serialized: string;
        };
    }

    export interface MediaModel extends ModelClass {
        sendToChat(chat: ChatModel, opt: { caption: string }): Promise<ChatModel>;
    }

    export interface Chat extends BaseClass<ChatModel> {
        clearAllDraft(): void;
    }
    export interface Contact extends BaseClass<ContactModel> {
        getMeContact(): ContactModel;
        getFilteredContacts({ showMe: boolean }): ContactModel[];
        getGroupContacts(): ContactModel[];
    }
    export interface GroupMetadata extends BaseClass<GroupModel> {}
    export interface Message extends BaseClass<MessageModel> {}

    export interface MessageMedia extends BaseClass<MediaModel> {
        processAttachments(files: [{ file: File }], ack: number, chat: ChatModel): Promise<void>;
    }

    export class MediaCollection implements Omit<MessageMedia, "constructor"> {
        constructor(chat: ChatModel);
        modelClass: MediaModel;
        prototype: MessageMedia;
        add(data: InsertData, opt: InsertOpt): [MediaModel];
        find(query: string): Promise<MediaModel | null>;
        get(query: string | WAPI.wid): MediaModel | null;
        getModelsArray(): MediaModel[];
        processAttachments(files: [{ file: File }], ack: number, chat: ChatModel): Promise<void>;
    }

    export type WapQueryResult = WAPI.PhoneExist & {
        disappearingMode: {
            duration: number;
            settingTimestamp: number;
        };
    };
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
    Debug: { VERSION: string };
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
        createTextMsgData(chat: WA.ChatModel, body: string): Promise<WA.MessageModel>;
    };
    /** Original WhatsApp WapQuery Functions */
    WapQuery: {
        queryPhoneExists(query: string): Promise<WA.WapQueryResult | null>;
    };
    /** HTML classes that web are using */
    WebClasses1: { [k: string]: string };
    WebClasses2: { [k: string]: string };
    WebClasses3: { [k: string]: string };
    /** Original WhatsApp WidFactory Functions */
    WidFactory: {
        createWid(id: String): WAPI.wid;
    };
}

declare class WAPI extends Store {
    /** Create new WAPI Object */
    private constructor();
    /** Create new WAPI with store Object */
    private constructor(store: any);

    BUILD_ID: string | undefined;
    DESKTOP_BETA: boolean | undefined;
    /** WhatsApp Web Version */
    VERSION: String;
    /** Current contact info */
    ME: WAPI.Contact;
    /** HTML classes that web are using */
    WebClasses: {
        [k: string]: { [k: string]: String };
    };
    /** Check given phone number */
    checkPhone(phone: String): Promise<WA.WapQueryResult | null>;
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
    closeChat(id: String | WAPI.Chat): Promise<WA.ChatModel>;
    /** Open chat by id */
    openChat(id: String | WAPI.Chat): Promise<WA.ChatModel>;
    /** Send message to id */
    sendMessage(id: String | WAPI.Chat, message: String): Promise<WA.MessageSendResult>;
    sendMessage(
        id: String | WAPI.Chat,
        message: String,
        option: WAPI.MessageSendOptions
    ): Promise<WA.MessageSendResult>;
    sendMessage(id: String | WAPI.Chat, message: String, option: { ret: true }): Promise<WAPI.Chat>;
    /** Delay some function */
    sleep(time: number): Promise<void>;
    /** Static methor for initiating WAPI class */
    static init(target?: Window): WAPI;
}

export default WAPI;
