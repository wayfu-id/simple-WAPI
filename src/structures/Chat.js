import Base from "./Base.js";
/**
 * @type {import("../../index").Chat}
 */
export default class Chat extends Base {
    constructor(app, data) {
        super(app);

        if (data) this._patch(data);
    }

    _patch(data) {
        /**
         * ID that represents the chat
         * @type {import("../../index").ChatId}
         */
        this.id = data.id;

        /**
         * Indicates current active status
         * @type {boolean}
         */
        this.active = !!data.active;

        /**
         * Indicates current draft message status
         * @type {boolean}
         */
        this.hasDraftMessage = data.hasDraftMessage;

        /**
         * Title of the chat
         * @type {string}
         */
        this.name = data.formattedTitle;

        /**
         * Indicates if the Chat is a Group Chat
         * @type {boolean}
         */
        this.isGroup = data.isGroup;

        /**
         * Unix timestamp for when the last activity occurred
         * @type {number}
         */
        this.timestamp = data.t;

        /**
         * @type {import("../../index").Contact}
         */
        this.contact = data.contact.getModel();

        return super._patch(data);
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
