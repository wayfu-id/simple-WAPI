import WAPI from "../../index";

const findChat: PropertyDescriptor & ThisType<WAPI> = {
    value: async function findChat(id: string | WA.wid) {
        let chat: WA.ChatModel | null;
        try {
            chat = await this.Chat.find(id);
            return chat ? this.factories("Chat", chat) : null;
        } catch (e) {
            console.log(e);
        }
        return null;
    },
};

export default findChat;
