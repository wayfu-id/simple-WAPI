import Base from "./Base.js";

/**
 * @typedef {import("../../index").default} WAPI
 * @typedef {import("../../index").default.Contact} WAPI.Contact
 */

/**
 * Represents a Contact on WhatsApp
 * @type {WAPI.Contact}
 */
export default class Contact extends Base {
    constructor(app, data) {
        super(app);

        if (data) this._patch(data);
    }

    _patch(data) {
        /** Call Base._patch first! */
        super._patch(data);

        /** ID that represents the contact */
        this.id = data.id;

        /** Indicates if you have blocked this contact */
        this.isBlocked = !!data.isContactBlocked;

        /** Indicates if the contact is a business contact */
        this.isBusiness = !!data.isBusiness;

        /** Indicates if the contact is an enterprise contact */
        this.isEnterprise = !!data.isEnterprise;

        /** Indicates if the contact is a group contact */
        this.isGroup = this.id.server === "g.us";

        /** Indicates if the contact is the current user's contact */
        this.isMe = this.id._serialized === this.app.Contact.getMeContact().id._serialized;

        /** Indicates if the number is saved in the current phone's contacts */
        this.isMyContact = !!data.isAddressBookContact;

        /** Indicates if the contact is a user contact */
        this.isUser = this.id.server === "c.us";

        /** The contact's name, as saved by the current user */
        this.name = data.name;

        /** Contact's phone number */
        this.phoneNumber = this.id.user;

        /** The name that the contact has configured to be shown publically */
        this.pushname = data.pushname;

        /** A shortened version of name */
        this.shortName = data.shortName;

        /** Get serialized Contact object */
        this._serialized = {
            id: this.id,
            isBlocked: this.isBlocked,
            isBusiness: this.isBusiness,
            isEnterprise: this.isEnterprise,
            isGroup: this.isGroup,
            isMe: this.isMe,
            isMyContact: this.isMyContact,
            isUser: this.isUser,
            name: this.name,
            phoneNumber: this.phoneNumber,
            pushname: this.pushname,
            shortName: this.shortName,
        };

        return this;
    }

    /**
     * Returns the Chat that corresponds to this Contact.
     * Will return null when getting chat for currently logged in user.
     */
    async getChat() {
        return await this.app.findChat(this.id);
    }

    /**
     * Gets the Contact's common groups with you. Returns empty array if you don't have any common group.
     */
    async getCommonGroups() {
        return await this.app.findCommonGroups(this.id);
    }
}
