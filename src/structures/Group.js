import Base from "./Base.js";
import GroupParticipant from "./GroupParticipant.js";

/**
 * @typedef {import("../../index").default.Chat} WAPI.Chat
 * @typedef {import("../../index").default.Contact} WAPI.Contact
 * @typedef {import("../../index").default.Group} WAPI.Group
 */

/** @type {WAPI.Group} */
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

        this._serialized = {
            announce: this.announce,
            creation: this.creation,
            desc: this.desc,
            displayedDesc: this.displayedDesc,
            groupType: this.groupType,
            id: this.id,
            name: this.name,
            owner: this.owner,
            parentGroupId: this.parentGroupId,
            participants: this.participants,
            size: this.size,
            subGroupsId: this.subGroupsId,
        };

        return super._patch(data);
    }

    /** Group participants contact */
    get participants() {
        let participants = this.raw.participants,
            results = [];

        for (let data of participants.getModelsArray()) {
            results.push(GroupParticipant.create(data));
        }
        return results;
    }

    /** Parent group metadata */
    get parentGroup() {
        let { parentGroupId: id } = this;
        if (!id) return null;
        let result = this.app.GroupMetadata.get(id);
        return result.getModel();
    }

    /** Child group metadata as array */
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
     */
    async getChat() {
        return await this.app.findChat(this.id);
    }

    /**
     * Returns the Chat that corresponds to this Contact.
     */
    async getContact() {
        return await this.app.findContact(this.id);
    }

    /**
     * Open chat that corresponds to this group
     */
    async openChat() {
        return await this.app.openChat(this.id._serialized);
    }
}
