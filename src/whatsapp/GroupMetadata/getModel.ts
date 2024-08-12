import WAPI from "../../../index";
import { GroupFactory } from "../../factories/index";

const getModel: (app: WAPI) => PropertyDescriptor & ThisType<WA.GroupModel> = (app: WAPI) => {
    return {
        value: function getModel() {
            return GroupFactory.create(app, this);
        },
        enumerable: true,
    };
};

export default getModel;
