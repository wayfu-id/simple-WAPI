import WAPI from "../../index";
import { Chat } from "../structures/index";

const openChat: PropertyDescriptor & ThisType<WAPI> = {
    value: async function openChat(id: string | Chat | WA.wid) {
        let _id = id instanceof Chat ? id.id : id,
            chat: WA.ChatModel | null;
        try {
            chat = await this.Chat.find(_id);
            if (!chat) return null;
            await chat.open();
            return chat;
        } catch (e) {
            console.log(e);
        }
        return null;
    },
};

export default openChat;
