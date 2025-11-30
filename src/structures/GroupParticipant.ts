import Contact, { ContactSerialized } from "./Contact";

export type GroupParticipantSerialized = {
    id: WA.wid;
    contact: ContactSerialized;
    isAdmin: boolean;
    isSuperAdmin: boolean;
    phoneNumber: string;
};

export default class GroupParticipant {
    contact: Contact;
    id: WA.ContactId;
    isAdmin: boolean;
    isSuperAdmin: boolean;
    phoneNumber: string;
    _serialized: GroupParticipantSerialized;

    constructor(data: WA.GroupParticipantModel) {
        return this._patch(data);
    }

    _patch(data: WA.GroupParticipantModel) {
        /** The contact model of this participant */
        this.contact = data.contact.getModel();

        /** ID that represents the participant */
        this.id = data.id;

        /** Is the participant Admin */
        this.isAdmin = data.isAdmin;

        /** Is the participant Super Admin */
        this.isSuperAdmin = data.isSuperAdmin;

        /** Participant's phone number */
        this.phoneNumber = this.contact.phoneNumber;

        /** Get serialized GroupParticipant object */
        this._serialized = {
            contact: this.contact._serialized,
            id: this.id,
            isAdmin: this.isAdmin,
            isSuperAdmin: this.isSuperAdmin,
            phoneNumber: this.phoneNumber,
        };

        return this;
    }

    static create(data: WA.GroupParticipantModel) {
        return new GroupParticipant(data);
    }
}
