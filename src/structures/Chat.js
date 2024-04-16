import Base from "./Base.js";

/**
 * @typedef {import("../../index").default} WAPI
 * @typedef {import("../../index").default.Chat} WAPI.Chat
 */

/**
 * Represents a Chat on WhatsApp
 * @type {WAPI.Chat}
 */
export default class Chat extends Base {
    constructor(app, data) {
        super(app);

        if (data) this._patch(data);
    }

    _patch(data) {
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

        return this;
    }

    /**
     * Clearing draft message
     * @returns {Chat}
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
     * @param {string} text
     */
    async inputAndSendTextMessage(text) {
        return await this.app.inputAndSendTextMsg(this, text);
    }

    /**
     * Send text message
     * @param {string} message
     * @param {boolean?} ret
     */
    async sendText(message, ret) {
        return await this.app.sendMessage(this, message, { ret: !!ret });
    }

    /**
     * Send Media with caption (optional)
     * @param {File} file
     * @param {string?} caption
     * @param {boolean?} ret
     */
    async sendMedia(file, caption = "", ret) {
        return await this.app.sendMessage(this, "", { media: file, caption, ret: !!ret });
    }
}
