import WAPI from "../../index";
import { Chat, GroupChat } from "../structures/index";

type chatType<T extends WA.ChatModel> = T["id"]["isGroup"] extends true ? GroupChat : Chat;

export default class ChatFactory {
    static create(app: WAPI, data: WA.ChatModel): chatType<typeof data> {
        if (data.groupMetadata ? true : data.id.isGroup()) {
            return new GroupChat(app, data) as chatType<typeof data>;
        }
        return new Chat(app, data) as chatType<typeof data>;
    }
}
