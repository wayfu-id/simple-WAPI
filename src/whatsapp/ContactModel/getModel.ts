import WAPI from "../../../index";
import { ContactFactory } from "../../factories/index";

const getModel: (app: WAPI) => PropertyDescriptor & ThisType<WA.ContactModel> = (app: WAPI) => {
    return {
        value: function getModel() {
            return ContactFactory.create(app, this);
        },
        enumerable: true,
    };
};

export default getModel;
