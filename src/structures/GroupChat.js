import Chat from "./Chat.js";
import GroupParticipant from "./GroupParticipant.js";

/**
 * @type {import("../../index").default.GroupChat}
 */
export default class GroupChat extends Chat {
    _patch(data) {
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
            results = [];

        for (let data of participants.getModelsArray()) {
            results.push(GroupParticipant.create(data));
        }
        return results;
    }
}
