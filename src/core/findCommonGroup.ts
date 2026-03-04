import WAPI from "../../index";

const findCommonGroup: PropertyDescriptor & ThisType<WAPI> = {
    value: async function findCommonGroup(id: string | WAPI.Contact) {
        const { GroupUtils: fn, ModelClass } = this,
            { Contact } = ModelClass;
        let contact = await (async (e) => {
            return await this.Contact.find(e instanceof Contact ? e.id : e);
        })(id);

        if (!contact) return [];

        let founded = await fn.findCommonGroups(contact),
            results: WAPI.GroupChat[] = [];

        if (!founded) return null;
        for (let group of founded.getModelsArray()) {
            results.push(this.factories("Chat", group) as WAPI.GroupChat);
        }

        return results;
    },
};

export default findCommonGroup;
