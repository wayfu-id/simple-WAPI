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

    async open() {
        await this.app.openChat(this);
    }

    async close() {
        await this.app.closeChat(this);
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
     * Send Image with caption (optional)
     * @param {File} file
     * @param {string?} caption
     * @param {boolean?} ret
     */
    async sendImage(file, caption = "", ret) {
        return await this.app.sendMessage(this, "", { media: file, caption, ret: !!ret });
    }
}
