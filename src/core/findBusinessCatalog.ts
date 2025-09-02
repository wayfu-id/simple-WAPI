import WAPI from "../../index";
import { BusinessContact } from "../structures";

const findBusinessCatalog: PropertyDescriptor & ThisType<WAPI> = {
    value: async function findBusinessCatalog(id: string | WA.wid) {
        let contact: WA.ContactModel | WAPI.Contact | WAPI.BusinessContact | null;
        try {
            contact = await this.Contact.find(id);
            if (!contact) return null;
            contact = this.factories("Contact", contact) as WAPI.Contact | WAPI.BusinessContact;
            if (!(contact instanceof BusinessContact)) return null;
            await contact.fetchAll();
            return contact.Catalog ?? contact.businessCatalog;
        } catch (e) {
            console.log(e);
        }
        return null;
    },
};

export default findBusinessCatalog;
