import Base, { BaseSerialized } from "./Base";
import WAPI from "../../index";
import Contact, { ContactSerialized } from "./Contact";

type T = WA.ChatModel | WA.GroupChat;

export type ChatSerialized = {
    isGroup: boolean;
    active: boolean;
    hasDraftMessage: boolean;
    timestamp: number;
    contact: ContactSerialized;
} & BaseSerialized<WA.ChatId>;

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
export default class Chat extends Base<T, ChatSerialized> {
    active: boolean | undefined;
    contact: Contact;
    hasDraftMessage: boolean;
    id: WA.ChatId;
    isGroup: boolean;
    name: string;
    timestamp: number;

    constructor(app: WAPI, data: T) {
        super(app);

        if (data) this._patch(data);
        return this;
    }

    _patch(data: T) {
        /** Call Base._patch first! */
        super._patch(data);

        /** Indicates current active status */
        this.active = !!data.active;

        /** The contact model of this chat */
        this.contact = data.contact.getModel();

        /** Indicates current draft message status */
        this.hasDraftMessage = data.hasDraftMessage;

        /** ID that represents the chat */
        this.id = data.id;

        /** Indicates if the Chat is a Group Chat */
        this.isGroup = data.groupMetadata ? true : data.id.isGroup();

        /** Title of the chat */
        this.name = data.formattedTitle;

        /** Unix timestamp for when the last activity occurred */
        this.timestamp = data.t;

        /** Get serialized Chat object */
        this._serialized = {
            active: this.active,
            contact: this.contact._serialized,
            id: this.id,
            isGroup: this.isGroup,
            hasDraftMessage: this.hasDraftMessage,
            name: this.name,
            timestamp: this.timestamp,
        };

        return data;
    }

    /**
     * Clearing draft message
     */
    clearDraft() {
        let res = this.raw.clearDraft();
        return res ? res.getModel() : this;
    }

    async open() {
        await this.app.openChat(this);
    }

    async close() {
        await this.app.closeChat(this);
    }

    /**
     * Input text message and send it to chat
     */
    async inputAndSendTextMessage(text: string) {
        return await this.app.inputAndSendTextMsg(this, text);
    }

    /**
     * Send text message
     */
    async sendText(message: string, model?: boolean) {
        return await this.app.sendMessage(this, message, { ret: !!model });
    }

    /**
     * Send Media with caption (optional)
     */
    async sendMedia(
        file: File,
        caption?: string | WA.MessageSendOptions,
        model?: boolean | WA.MessageSendOptions
    ) {
        if (caption === undefined) return;
        let option: WA.MessageSendOptions = {
            media: file,
            ...(caption ? (typeof caption === "string" ? { caption } : caption) : { caption: "" }),
            ...(typeof model === "boolean" || !model ? { ret: !!model } : model),
        };
        return await this.app.sendMessage(this, "", option);
    }

    /**
     * Send Advanched Message
     */
    async sendMessage(message: string, options?: WAPI.SendMessageOptions) {
        return await this.app.sendAdvMessage(this, message, options);
    }
}
