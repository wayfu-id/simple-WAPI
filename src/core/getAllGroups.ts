import WAPI from "../../index";

const getAllGroups: PropertyDescriptor & ThisType<WAPI> = {
    value: function getAllGroups() {
        let groups = this.GroupMetadata.getModelsArray(),
            results: WAPI.Group[] = [];

        for (let group of groups) {
            if (!group.id.isGroup()) continue;
            results.push(this.factories("Group", group));
        }
        return results;
    },
};

export default getAllGroups;
