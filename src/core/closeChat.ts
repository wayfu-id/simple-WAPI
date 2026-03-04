import WAPI from "../../index";

const closeChat: PropertyDescriptor & ThisType<WAPI> = {
    value: async function closeChat(id: WA.wid | string | WAPI.Chat) {
        const { Chat } = this.ModelClass;
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

            if (!chat.active) return chat;
            await chat.close();
            return chat;
        } catch (e) {
            console.log(e);
        }
        return null;
    },
};

export default closeChat;
