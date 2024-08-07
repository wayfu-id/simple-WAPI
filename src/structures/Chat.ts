import Base from "./Base";
import WAPI from "../../types";

type T = WA.ChatModel;

/**
 * Represents a Chat on WhatsApp
 * @type {WAPI.Chat}
 */
export default class Chat extends Base<T> implements WAPI.Chat {
    active: boolean | undefined;
    contact: WAPI.Contact;
    hasDraftMessage: boolean;
    id: WAPI.ChatId;
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
        this.isGroup = data.isGroup;

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
    async sendMedia(file: File, caption?: string, model?: boolean) {
        return await this.app.sendMessage(this, "", { media: file, caption, ret: !!model });
    }
}