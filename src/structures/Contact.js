import Base from "./Base.js";

/**
 * Represents a Contact on WhatsApp
 * @type {import("../../index").Contact}
 */
export default class Contact extends Base {
    constructor(app, data) {
        super(app);

        if (data) this._patch(data);
    }

    _patch(data) {
        /**
         * ID that represents the contact
         * @type {import("../../index").ContactId}
         */
        this.id = data.id;

        /**
         * Contact's phone number
         * @type {string}
         */
        this.number = this.id.user;

        /**
         * Indicates if the contact is a business contact
         * @type {boolean}
         */
        this.isBusiness = !!data.isBusiness;

        /**
         * Indicates if the contact is an enterprise contact
         * @type {boolean}
         */
        this.isEnterprise = !!data.isEnterprise;

        /**
         * The contact's name, as saved by the current user
         * @type {?string}
         */
        this.name = data.name;

        /**
         * The name that the contact has configured to be shown publically
         * @type {string}
         */
        this.pushname = data.pushname;

        /**
         * A shortened version of name
         * @type {?string}
         */
        this.shortName = data.shortName;

        /**
         * Indicates if the contact is a group contact
         * @type {boolean}
         */
        this.isGroup = this.id.server === "g.us";

        /**
         * Indicates if the contact is a user contact
         * @type {boolean}
         */
        this.isUser = this.id.server === "c.us";

        // /**
        //  * Indicates if the contact is the current user's contact
        //  * @type {boolean}
        //  * @deprecated
        //  */
        // this.isMe = !!data.isMe;

        // /**
        //  * Indicates if the number is registered on WhatsApp
        //  * @type {boolean}
        //  * @deprecated
        //  */
        // this.isWAContact = !!data.isWAContact;

        // /**
        //  * Indicates if the number is saved in the current phone's contacts
        //  * @type {boolean}
        //  * @deprecated
        //  */
        // this.isMyContact = !!data.isMyContact;

        /**
         * Indicates if you have blocked this contact
         * @type {boolean}
         */
        this.isBlocked = !!data.isContactBlocked;

        return super._patch(data);
    }

    /** @typedef {import("../../index").Chat} Chat */
    /**
     * Returns the Chat that corresponds to this Contact.
     * Will return null when getting chat for currently logged in user.
     * @returns {Promise<Chat>}
     */
    async getChat() {
        return await this.app.findChat(this.id);
    }

    /**
     * Gets the Contact's common groups with you. Returns empty array if you don't have any common group.
     * @returns {Promise<Chat>}
     */
    async getCommonGroups() {
        return await this.app.findCommonGroups(this.id);
    }
}
