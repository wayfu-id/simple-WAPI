import WAPI from "../../index";
import { GroupFactory } from "../factories/index";
import { Group } from "../structures/index";

const getAllGroups: PropertyDescriptor & ThisType<WAPI> = {
    value: function getAllGroups() {
        let groups = this.GroupMetadata.getModelsArray(),
            results: Group[] = [];

        for (let group of groups) {
            results.push(GroupFactory.create(this, group));
        }
        return results;
    },
};

export default getAllGroups;
