import WAPI from "../../index";
import { Message } from "../structures/index";

export default class MessageFactory {
    static create(app: WAPI, data: WA.MessageModel) {
        return new Message(app, data);
    }
}
