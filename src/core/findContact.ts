import WAPI from "../../index";
import { BusinessContact } from "../structures";

const findContact: PropertyDescriptor & ThisType<WAPI> = {
    value: async function findContact(id: string | WA.wid) {
        let contact: WA.ContactModel | null;
        try {
            contact = await this.Contact.find(id);
            let result = contact ? this.factories("Contact", contact) : null;
            if (result && result instanceof BusinessContact) {
                await result.fetchAll();
            }
            return result;
        } catch (e) {
            console.log(e);
        }
        return null;
    },
};

export default findContact;
