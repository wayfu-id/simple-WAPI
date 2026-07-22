import WAPI from "../../../index";

const getGroupContacts: (app: WAPI) => PropertyDescriptor & ThisType<WA.Contact> = (app: WAPI) => {
    return {
        value: function getGroupContacts() {
            return this.getFilteredContacts({ groupOnly: true });
        },
        enumerable: true,
    };
};

export default getGroupContacts;
