import WAPI from "../../index";
import { Contact } from "../structures/index";

export default class ContactFactory {
    static create(app: WAPI, data: WA.ContactModel) {
        return new Contact(app, data);
    }
}
