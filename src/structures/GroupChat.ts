import Chat from "./Chat";
import GroupParticipant from "./GroupParticipant";

type T = WA.GroupModel & WA.ChatModel;

export default class GroupChat extends Chat implements WAPI.GroupChat {
    isGroup: boolean;
    groupMetadata: WAPI.GroupMetadata;

    _patch(data: T) {
        /** This group metadata */
        this.groupMetadata = data.groupMetadata;

        return super._patch(data);
    }

    get owner() {
        let { owner } = this.groupMetadata;
        if (!owner) return null;
        let { _serialized: id } = owner,
            contact = this.app.Contact.get(id);
        if (!contact) return null;
        return contact.getModel();
    }

    get participants() {
        let participants = this.groupMetadata.participants,
            results: GroupParticipant[] = [];

        for (let data of participants.getModelsArray()) {
            results.push(GroupParticipant.create(data));
        }
        return results;
    }
}
