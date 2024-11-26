import WAPI from "../../index";
import { Contact, GroupChat } from "../structures/index";

const findCommonGroup: PropertyDescriptor & ThisType<WAPI> = {
    value: async function findCommonGroup(id: string | Contact) {
        const { GroupUtils: fn } = this;
        let contact = await (async (e) => {
            return await this.Contact.find(e instanceof Contact ? e.id : e);
        })(id);

        if (!contact) return [];

        let founded = await fn.findCommonGroups(contact),
            results: GroupChat[] = [];

        if (!founded) return null;
        for (let group of founded.getModelsArray()) {
            results.push(this.factories("Chat", group) as WAPI.GroupChat);
        }

        return results;
    },
};

export default findCommonGroup;
