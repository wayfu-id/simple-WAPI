import WAPI from "../../../index";

const getFilteredContacts: (app: WAPI) => PropertyDescriptor & ThisType<WA.Contact> = (app: WAPI) => {
    const { ContactGetters } = app;
    return {
        value: function getFilteredContacts(opt: WA.filterOpt) {
            const { groupOnly, showMe, showGroup } = opt;
            let contacts = app.Contact.getModelsArray();

            let filter = (c: WA.ContactModel) => {
                if (c.id.isLid() || c.id.isBot()) {
                    return false;
                }
                if (groupOnly) {
                    return ContactGetters.getIsGroup(c);
                }
                if (ContactGetters.getIsMe(c)) {
                    return showMe;
                }
                if (ContactGetters.getIsGroup(c)) {
                    return showGroup;
                }
                return true;
            };

            return contacts.filter((c) => filter(c));
        },
        enumerable: true,
    };
};

export default getFilteredContacts;
