import Base from "./Base.js";

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

    get ParentGroup() {
        let { parentGroupId: id } = this;
        if (!id) return null;
        let result = this.app.GroupMetadata.get(id);
        return result.getModel();
    }

    get ChildGroups() {
        let { subGroupsId } = this,
            results = [];

        for (let id of subGroupsId) {
            let group = this.app.GroupMetadata.get(id);
            results.push(group.getModel());
        }

        return results;
    }

    async openChat() {
        return await this.raw.openChat();
    }
}
