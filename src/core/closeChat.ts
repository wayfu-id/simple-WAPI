import WAPI from "../../index";
import { Chat } from "../structures/index";

const closeChat: PropertyDescriptor & ThisType<WAPI> = {
    value: async function closeChat(id: WA.wid | string | Chat) {
        let chat = await (async (e) => {
            return await this.Chat.find(e instanceof Chat ? e.id : e);
        })(id);
        if (!chat) return;
        if (!chat.active) return;

        await chat.close();
        return chat;
    },
};

export default closeChat;
