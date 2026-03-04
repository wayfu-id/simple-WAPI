import WAPI from "../../index";

const openChat: PropertyDescriptor & ThisType<WAPI> = {
    value: async function openChat(id: string | WAPI.Chat | WA.wid) {
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
            await chat.open();
            return chat;
        } catch (e) {
            console.log(e);
        }
        return null;
    },
};

export default openChat;
