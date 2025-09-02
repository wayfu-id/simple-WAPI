import Base, { BaseSerialized } from "./Base";
import { businessHours } from "../utils/index";
import WAPI from "../..";

type T = WA.BusinessProfileModel;
type BusinessProfileSerialized = {
    dataSource: string;
    isProfileLocked: boolean | undefined;
    automatedType: string;
    welcomeMsgProtocolMode: string;
    stale: boolean;
} & BaseSerialized<WA.BusinessProfileId>;

export default class BusinessProfile extends Base<T, BusinessProfileSerialized> {
    address?: string = undefined;
    automatedType: any;
    businessHours: { [k: string]: string | string[] } | undefined;
    dataSource: string;
    email?: string | undefined = undefined;
    fbPage?: WA.fbPage = undefined;
    id: WA.BusinessProfileId;
    igProfessional?: WA.igProfile = undefined;
    isProfileLocked: boolean;
    memberSince?: Date = undefined;
    memberSinceText?: string = undefined;
    stale: boolean;
    website?: string[] = undefined;
    welcomeMsgProtocolMode: any;

    constructor(app: WAPI, data: T) {
        super(app);
        if (data) this._patch(data);
        return this;
    }

    _patch(data: T) {
        this.address = data.address;
        this.automatedType = data.automatedType;
        this.businessHours = businessHours(data?.businessHours?.config);
        this.dataSource = data.dataSource;
        this.email = data.email;
        this.fbPage = data.fbPage;
        this.id = data.id;
        this.igProfessional = data.igProfessional;
        this.isProfileLocked = data.isProfileLocked;
        if (data.memberSinceText) {
            this.memberSinceText = data.memberSinceText;
            this.memberSince = new Date(data.memberSinceText);
        }
        this.raw = data;
        this.stale = data.stale;
        this.website = data.website ? data.website.map((w) => w.url) : undefined;
        this.welcomeMsgProtocolMode = data.welcomeMsgProtocolMode;

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
     * Returns the Contact that corresponds to this Profile.
     * Will return null when getting Contact for currently logged in user.
     */
    async getContact() {
        return await this.app.findContact(this.id);
    }
}
