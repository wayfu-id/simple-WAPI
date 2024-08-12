import WAPI from "../../index";
import { ChatFactory } from "../factories/index";

const findChat: PropertyDescriptor & ThisType<WAPI> = {
    value: async function findChat(id: string | WA.wid) {
        let chat: WA.ChatModel | null;
        try {
            chat = await this.Chat.find(id);
            return chat ? ChatFactory.create(this, chat) : null;
        } catch (e) {
            console.log(e);
        }
        return null;
    },
};

export default findChat;
