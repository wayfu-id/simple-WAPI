import WAPI from "../../index";
import { ContactFactory } from "../factories/index";

const findContact: PropertyDescriptor & ThisType<WAPI> = {
    value: async function findContact(id: string | WA.wid) {
        let contact: WA.ContactModel | null;
        try {
            contact = await this.Contact.find(id);
            return contact ? ContactFactory.create(this, contact) : null;
        } catch (e) {
            console.log(e);
        }
        return null;
    },
};

export default findContact;
