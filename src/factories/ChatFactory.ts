import WAPI from "../../index";
import { _authToken } from "../Loader";

type chatType<T extends WA.ChatModel> = T["id"]["isGroup"] extends true ? WAPI.GroupChat : WAPI.Chat;

export default class ChatFactory {
    static create(app: WAPI, data: WA.ChatModel): chatType<typeof data> {
        const { Chat, GroupChat } = app.ModelClass;
        if (data.groupMetadata ? true : data.id.isGroup()) {
            return new GroupChat(_authToken, app, data) as chatType<typeof data>;
        }
        return new Chat(_authToken, app, data) as chatType<typeof data>;
    }
}
