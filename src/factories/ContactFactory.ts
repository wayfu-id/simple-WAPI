import WAPI from "../../index";
import { BusinessContact, Contact } from "../structures/index";

type contactType<T extends WA.ContactModel> = T["isBusiness"] extends true ? BusinessContact : Contact;

export default class ContactFactory {
    static create(app: WAPI, data: WA.ContactModel): contactType<typeof data> {
        if (data.isBusiness) {
            return new BusinessContact(app, data) as contactType<typeof data>;
        }
        return new Contact(app, data) as contactType<typeof data>;
    }
}
