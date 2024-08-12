import WAPI from "../../../index";
import { ContactFactory } from "../../factories/index";

const getContactModel: (app: WAPI) => PropertyDescriptor & ThisType<WA.GroupModel> = (app: WAPI) => {
    return {
        value: async function getContactModel() {
            let contact = await app.Contact.find(this.id);
            return contact ? ContactFactory.create(app, contact) : null;
        },
        enumerable: true,
    };
};

export default getContactModel;
