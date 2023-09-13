export default class GroupParticipant {
    constructor(data) {
        return this._patch(data);
    }

    _patch(data) {
        /**
         * @type {import("../../index").wid}
         */
        this.id = data.id;

        /**
         * @type {boolean}
         */
        this.isAdmin = data.isAdmin;

        /**
         * @type {boolean}
         */
        this.isSuperAdmin = data.isSuperAdmin;

        /**
         * @type {import("../../index").Contact}
         */
        this.contact = data.contact.getModel();

        return this;
    }

    static create(data) {
        return new GroupParticipant(data);
    }
}
