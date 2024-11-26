import WAPI from "../../index";

const findContact: PropertyDescriptor & ThisType<WAPI> = {
    value: async function findContact(id: string | WA.wid) {
        let contact: WA.ContactModel | null;
        try {
            contact = await this.Contact.find(id);
            return contact ? this.factories("Contact", contact) : null;
        } catch (e) {
            console.log(e);
        }
        return null;
    },
};

export default findContact;
