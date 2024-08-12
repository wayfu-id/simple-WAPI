import WAPI from "../../index";
import { Chat, GroupChat } from "../structures/index";

type chatType<T extends WA.ChatModel> = T["isGroup"] extends true ? GroupChat : Chat;

export default class ChatFactory {
    static create<T extends WA.ChatModel>(app: WAPI, data: T): chatType<T> {
        if (data.isGroup) {
            return new GroupChat(app, data) as chatType<T>;
        }
        return new Chat(app, data) as chatType<T>;
    }
}
