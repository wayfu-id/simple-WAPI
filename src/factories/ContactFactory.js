import { Contact } from "../structures/index.js";

export default class ContactFactory {
    static create(app, data) {
        return new Contact(app, data);
    }
}
