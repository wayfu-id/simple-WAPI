import Base from "./Base";
import ProfilePicThumb from "./ProfilePictThumb";
import WAPI from "../../types";

type T = WA.ContactModel;

/**
 * Represents a Contact on WhatsApp
 * @type {WAPI.Contact}
 */
export default class Contact extends Base<T> implements WAPI.Contact {
    formatedName: string;
    id: WAPI.ContactId;
    isBlocked: boolean;
    isBusiness: boolean;
    isEnterprise: boolean;
    isGroup: boolean;
    isMe: boolean;
    isMyContact: boolean;
    isUser: boolean;
    name?: string | undefined;
    profilePicThumb: WAPI.ProfilePicThumb;
    phoneNumber: string;
    pushname: string | undefined;
    shortName?: string | undefined;
    statusMute?: string | boolean | undefined;

    constructor(app: WAPI, data: WA.ContactModel) {
        super(app);

        if (data) this._patch(data);
        return this;
    }

    _patch(data: T) {
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
        this.isMe = this.id._serialized === this.app.MeUtils.getMaybeMeUser()._serialized;

        /** Indicates if the number is saved in the current phone's contacts */
        this.isMyContact = !!data.isAddressBookContact;

        /** Indicates if the contact is a user contact */
        this.isUser = this.id.server === "c.us";

        /** The contact's name, as saved by the current user */
        this.name = data.name;

        /** The contact's profile pic thumb */
        this.profilePicThumb = ProfilePicThumb.create(data);

        /** Contact's phone number */
        this.phoneNumber = this.id.user;

        /** The name that the contact has configured to be shown publically */
        this.pushname = data.pushname;

        /** A shortened version of name */
        this.shortName = data.shortName;

        /** Status mute */
        this.statusMute = data.statusMute;

        /** Get serialized Contact object */
        this._serialized = Object.assign({}, this.raw.toJSON(), {
            id: this.id,
            isBlocked: this.isBlocked,
            isBusiness: this.isBusiness,
            isEnterprise: this.isEnterprise,
            isGroup: this.isGroup,
            isMe: this.isMe,
            isMyContact: this.isMyContact,
            isUser: this.isUser,
            msgs: null,
            name: this.name,
            phoneNumber: this.phoneNumber,
            pushname: this.pushname,
            profilePicThumbObj: this.profilePicThumb?._serialized || {},
            shortName: this.shortName,
            statusMute: this.statusMute,
        });

        return data;
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