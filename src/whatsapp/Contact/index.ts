import WAPI from "../../../index";
import findContact from "./findContact";
import findImpl from "./findImpl";
import getFilteredContacts from "./getFilteredContacts";
import getGroupContacts from "./getGroupContacts";

type key = "_proto_" | "_core_";

const contact: (app: WAPI) => Record<key, PropertyDescriptorMap> = (app: WAPI) => {
    return {
        _proto_: {
            findContact: findContact(app),
            getFilteredContacts: getFilteredContacts(app),
            getGroupContacts: getGroupContacts(app),
        },
        _core_: {
            findImpl: findImpl(app),
        },
    };
};

export default contact;
