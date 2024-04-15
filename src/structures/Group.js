import Base from "./Base.js";
import GroupParticipant from "./GroupParticipant.js";

/**
 * @typedef {import("../../index").Chat} Chat
 * @typedef {import("../../index").Contact} Contact
 */

/** @type {import("../../index").Group} */
export default class Group extends Base {
    constructor(app, data) {
        super(app);

        if (data) this._patch(data);
    }

    _patch(data) {
        /** Is Announcement Group */
        this.announce = data.announce;
        /** Group creation timestampt */
        this.creation = data.creation;
        /** Group Description */
        this.desc = data.desc;
        /** Group Description Id */
        this.descId = data.descId;
        /** Group Description Owner Contact Id */
        this.descOwner = data.descOwner;
        /** Group Description Updated Timestampt */
        this.descTime = data.descTime;
        /** Group Displayed Description */
        this.displayedDesc = data.displayedDesc;
        /** Group Type */
        this.groupType = data.groupType;
        /** Group Id */
        this.id = data.id;
        /** Group subject name */
        this.name = data.subject;
        /** Group Owner Contact */
        this.owner = data.owner;
        /** Parent Group */
        this.parentGroupId = data.parentGroup;
        /** Group Participant Size */
        this.size = data.size;
        /** All Sub Groups Id */
        this.subGroupsId = data.joinedSubgroups;

        return super._patch(data);
    }

    get participants() {
        let participants = this.raw.participants,
            results = [];

        for (let data of participants.getModelsArray()) {
            results.push(GroupParticipant.create(data));
        }
        return results;
    }

    get parentGroup() {
        let { parentGroupId: id } = this;
        if (!id) return null;
        let result = this.app.GroupMetadata.get(id);
        return result.getModel();
    }

    get childGroups() {
        let { subGroupsId } = this,
            results = [];

        for (let id of subGroupsId) {
            let group = this.app.GroupMetadata.get(id);
            results.push(group.getModel());
        }

        return results;
    }

    /**
     * Returns the Chat that corresponds to this Contact.
     * @returns {Promise<Chat>}
     */
    async getChat() {
        return await this.app.findChat(this.id);
    }

    /**
     * Returns the Chat that corresponds to this Contact.
     * @returns {Promise<Contact>}
     */
    async getContact() {
        return await this.app.findContact(this.id);
    }

    /**
     * Open chat that corresponds to this group
     * @returns {Promise<Chat>}
     */
    async openChat() {
        return await this.app.openChat(this.id._serialized);
    }
}
