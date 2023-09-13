import { Chat, GroupChat } from "../structures/index.js";

export default class ChatFactory {
    static create(app, data) {
        if (data.isGroup) {
            return new GroupChat(app, data);
        }

        return new Chat(app, data);
    }
}
