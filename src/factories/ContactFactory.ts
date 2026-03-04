import WAPI from "../../index";
import { _authToken } from "../Loader";

type contactType<T extends WA.ContactModel> = T["isBusiness"] extends true
    ? WAPI.BusinessContact
    : WAPI.Contact;

export default class ContactFactory {
    static create(app: WAPI, data: WA.ContactModel): contactType<typeof data> {
        const { Contact, BusinessContact } = app.ModelClass;
        if (data.isBusiness) {
            let bizContact = new BusinessContact(_authToken, app, data);
            bizContact.fetchAll();
            return bizContact as contactType<typeof data>;
        }
        return new Contact(_authToken, app, data) as contactType<typeof data>;
    }
}
