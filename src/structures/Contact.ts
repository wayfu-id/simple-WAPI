import Base, { BaseSerialized } from "./Base";
import ProfilePicThumb, { ProfilePicThumbSerialized } from "./ProfilePictThumb";
import WAPI from "../../index";

type T = WA.ContactModel | WA.BusinessContact;

export type ContactSerialized = {
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
    shortName: string | undefined;
    statusMute: string | boolean | undefined;
    textStatusLastUpdateTime: number;
    type: string;
    username: string | undefined;
    verifiedLevel: number;
    verifiedName: string | undefined;
} & BaseSerialized<WA.ContactId>;

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
export default class Contact extends Base<T, ContactSerialized> {
    formatedName: string;
    id: WA.ContactId;
    isBlocked: boolean;
    isBusiness: boolean;
    isEnterprise: boolean;
    isGroup: boolean;
    isMe: boolean;
    isMyContact: boolean;
    isUser: boolean;
    name: string | undefined;
    profilePicThumb: ProfilePicThumb;
    phoneNumber: string;
    pushname: string | undefined;
    shortName?: string | undefined;
    statusMute?: string | boolean | undefined;
    verifiedName: string | undefined;
    raw: WA.ContactModel;

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
        this.isGroup = this.id.isGroup();

        /** Indicates if the contact is the current user's contact */
        this.isMe = this.id._serialized === this.app.MeUtils.getMaybeMePnUser()._serialized;

        /** Indicates if the number is saved in the current phone's contacts */
        this.isMyContact = !!data.isAddressBookContact;

        /** Indicates if the contact is a user contact */
        this.isUser = this.id.isUser();

        /** The contact's name, as saved by the current user */
        this.name = data.name;

        /** The contact's profile pic thumb */
        this.profilePicThumb = ProfilePicThumb.create(data);

        /** Contact's phone number */
        this.phoneNumber = data?.phoneNumber?.user ?? (this.id.isLid() ? this.app.lidUtils.getPhoneNumber(this.id) : this.id).user;

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
