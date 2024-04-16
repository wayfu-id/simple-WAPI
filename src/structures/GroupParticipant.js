/**
 * @type {import("../../index").default.GroupParticipant}
 */
export default class GroupParticipant {
    constructor(data) {
        return this._patch(data);
    }

    _patch(data) {
        /** The contact model of this participant */
        this.contact = data.contact.getModel();

        /** ID that represents the participant */
        this.id = data.id;

        /** Is the participant Admin */
        this.isAdmin = data.isAdmin;

        /** Is the participant Super Admin */
        this.isSuperAdmin = data.isSuperAdmin;

        /** Get serialized GroupParticipant object */
        this._serialized = {
            contact: this.contact._serialized,
            id: this.id,
            isAdmin: this.isAdmin,
            isSuperAdmin: this.isSuperAdmin,
        };

        return this;
    }

    static create(data) {
        return new GroupParticipant(data);
    }
}
