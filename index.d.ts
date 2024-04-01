declare namespace WAPI {
    type webpackLoader = {
        type: "webpack",
        chunk: Array<any>
    }
    type metaLoader = {
        type: "meta",
        chunk: Object
    }
    export type LoaderType = webpackLoader | metaLoader;
    
    export interface wid {
        /**
         * Whatsapp server domain
         * @example `c.us`
         */
        server: string,
        /**
         * User whatsapp number
         * @example `554199999999`
         */
        user: string,
        /**
         * Serialized id
         * @example `554199999999@c.us`
         */
        _serialized: string,
    }
    export interface ContactId extends wid {}
    export interface ChatId extends wid {}
    
    export interface MessageSendOptions {
        /** Image caption */
        caption?: string
        /** Media to be sent */
        media?: File
        /** Return chat model */
        ret?: boolean
    }

    export type MessageSendResult = {
        messageSendResult: string
    }

    export interface PhoneExist {
        wid: wid,
        biz: boolean,
        bizInfo: Object,
    }

    interface Base {
        /** Main WAPI app */
        app: WAPI,
        /** Class raw data */
        raw: any
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
     *   isWAContact: true,
     *   isMyContact: false,
     *   isBlocked: false
     * }
     */
    export interface Contact {
        /** Contact's phone number */
        number: string,
        /** Indicates if the contact is a business contact */
        isBusiness: boolean,
        /** ID that represents the contact */
        id: ContactId,
        /** Indicates if the contact is an enterprise contact */
        isEnterprise: boolean,
        /** Indicates if the contact is a group contact */
        isGroup: boolean,
        /** Indicates if the contact is a user contact */
        isUser: boolean,
        /**
         * Indicates if the contact is the current user's contact
         * @deprecated
         */
        isMe: boolean, 
        /** 
         * Indicates if the number is saved in the current phone's contacts
         * @deprecated
         */
        isMyContact: boolean
        /**
         * Indicates if the number is registered on WhatsApp
         * @deprecated
         */
        isWAContact: boolean,
        /** Indicates if you have blocked this contact */
        isBlocked: boolean,
        /** The contact's name, as saved by the current user */
        name?: string,
        /** The name that the contact has configured to be shown publically */
        pushname: string,
        /** A shortened version of name */
        shortName?: string,

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
    export interface Chat {
        /** ID that represents the chat */
        id: ChatId,
        /** Indicates if the Chat is a Group Chat */
        isGroup: boolean,
        /** Indicates current active status */
        active: boolean,
        /** Indicates current draft message status */
        hasDraftMessage: boolean,
        /** Title of the chat */
        name: string,
        /** Unix timestamp for when the last activity occurred */
        timestamp: number,
        /** Contact model */
        contact: Contact,
        /** Clearing draft message */
        clearDraft(): Chat;
        /** Close this chat */
        close(): Promise<void>,
        /** Open this chat */
        open(): Promise<void>,
        /** Input text message and send it to chat */
        inputAndSendTextMessage(text: string): Promise<Chat | null>
        /** Send text message to this chat */
        sendText(message: string, ret?: boolean): Promise<any>,
        /** Send image message to this chat */
        sendImage(file: File, caption: string, ret?: boolean): Promise<any>,
    }

    export interface GroupParticipant {
        id: ContactId,
        contact: Contact, 
        isAdmin: boolean
        isSuperAdmin: boolean
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

}

declare class WAPI {
    /** Create new WAPI Object */
    private constructor();
    /** Create new WAPI with store Object */
    private constructor(store: any);

    BUILD_ID: string;
    DESKTOP_BETA: boolean;
    /** WhatsApp Web Version */
    VERSION: string;
    /** HTML classes that web are using */
    WebClasses:{
        [k:string]:{ [k:string]: string }
    };
    /** Current contact info */
    ME: WAPI.Contact;
    /** Check given phone number */
    checkPhone(phone:string): Promise<WAPI.PhoneExist | null>;
    /** Find chat by Id */
    findChat(id: string | WAPI.wid): Promise<WAPI.Chat | null>;
    /** Find contact by Id */
    findContact(id: string | WAPI.wid): Promise<WAPI.Contact | null>;
    /** Find contact by Id */
    findCommonGroups(id: string | WAPI.wid): Promise<WAPI.Chat[] | []>;
    /** Get current active chat data */
    getActiveChat(): WAPI.Chat | null;
    /** Input text message and send it to chat */
    inputAndSendTextMsg(chat: WAPI.Chat, text: string): Promise<WAPI.Chat | null>;
    inputAndSendTextMsg(chat: string, text: string): Promise<WAPI.Chat | null>;
    inputAndSendTextMsg(chat: WAPI.wid, text: string): Promise<WAPI.Chat | null>;
    /** Close chat by id */
    closeChat(id: string | WAPI.Chat): Promise<any>;
    /** Open chat by id */
    openChat(id: string | WAPI.Chat): Promise<any>;
    /** Send message to id */
    sendMessage(id: string | WAPI.Chat, message: string, option: WAPI.MessageSendOptions): Promise<any>;
    /** Delay some function */
    sleep(time: number): Promise<void>;
    /** Static methor for initiating WAPI class */
    static init(target?: Window): WAPI;
}

export = WAPI;