import WAPI from "../../index";
import { Chat } from "../structures/index";

const openChat: PropertyDescriptor & ThisType<WAPI> = {
    value: async function openChat(id: string | Chat | WA.wid) {
        let [_id, chat] = ((idx) => {
            if (idx instanceof Chat) {
                let { id, raw: chat } = idx;
                return [id, chat];
            }
            return [idx, null];
        })(id);

        try {
            if (!chat) {
                chat = await this.Chat.find(_id);
                if (!chat) return null;
            }
            await chat.open();
            return chat;
        } catch (e) {
            console.log(e);
        }
        return null;
    },
};

export default openChat;
