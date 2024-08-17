import Base, { BaseSerialized } from "./Base";
import GroupParticipant from "./GroupParticipant";
import WAPI from "../../index";

type T = WA.GroupModel;

export type GroupSerialized = {
    announce: boolean;
    creation: number;
    desc: string;
    displayedDesc: string;
    groupType: string;
    owner: WA.ContactId;
    parentGroupId?: WA.GroupId;
    participants: GroupParticipant[];
    size: number;
    subGroupsId: WA.GroupId[] | undefined;
} & BaseSerialized<WA.GroupId>;

/**
 * Represents a Group from GroupMetadata on WhatsApp
 *
 * @example
 * {
 *   id: {
 *     server: 'g.us',
 *     user: '554199999999',
 *     _serialized: `554199999999@g.us`
 *   },
 *   announce: false,
 *   creation: 1657054203,
 *   desc: "John's Group" |
 *   displayedDesc: 'Lorem Ipsum',
 *   name: "John's Group" |
 *   groupType: 'DEFAULT',
 *   owner: {
 *     server: 'c.us',
 *     user: '554199999999',
 *     _serialized: `554199999999@c.us`
 *   },
 *   parentGroupId: undefined,
 *   size: 10,
 *   subGroupsId: [],
 * }
 */
export default class Group extends Base<T, GroupSerialized> {
    announce: boolean;
    creation: number;
    desc: string;
    displayedDesc: string;
    groupType: string;
    id: WA.GroupId;
    name: string;
    owner: WA.ContactId;
    parentGroupId?: WA.GroupId | undefined;
    size: number;
    subGroupsId: WA.GroupId[] | undefined;

    constructor(app: WAPI, data: T) {
        super(app);

        if (data) this._patch(data);
        return this;
    }

    _patch(data: T) {
        /** Call Base._patch first! */
        super._patch(data);

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

        return data;
    }

    /** Group participants contact */
    get participants() {
        let participants = this.raw.participants,
            results: GroupParticipant[] = [];

        for (let data of participants.getModelsArray()) {
            results.push(GroupParticipant.create(data));
        }
        return results;
    }

    /** Parent group metadata */
    get parentGroup(): Group | undefined {
        let { parentGroupId: id } = this;
        if (!id) return;
        let result = this.app.GroupMetadata.get(id);
        return result?.getModel();
    }

    /** Child group metadata as array */
    get childGroups() {
        let { subGroupsId } = this,
            results: Group[] = [];

        if (!subGroupsId) return undefined;
        for (let id of subGroupsId) {
            let group = this.app.GroupMetadata.get(id);
            if (group) {
                results.push(group.getModel());
            }
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
