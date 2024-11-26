import WAPI from "../../../index";

const getContactModel: (app: WAPI) => PropertyDescriptor & ThisType<WA.GroupModel> = (app: WAPI) => {
    return {
        value: async function getContactModel() {
            let contact = await app.Contact.find(this.id);
            return contact ? app.factories("Contact", contact) : null;
        },
        enumerable: true,
    };
};

export default getContactModel;
