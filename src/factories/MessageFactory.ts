import WAPI from "../../index";
import { _authToken } from "../Loader";

export default class MessageFactory {
    static create(app: WAPI, data: WA.MessageModel) {
        const { Message } = app.ModelClass;
        return new Message(_authToken, app, data);
    }
}
