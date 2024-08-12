import WAPI from "../../../index";

const openChat: (app: WAPI) => PropertyDescriptor & ThisType<WA.GroupModel> = (app: WAPI) => {
    return {
        value: async function openChat() {
            let chat = await app.Chat.find(this.id);
            if (!chat) return;
            await chat.open();
            return chat;
        },
        enumerable: true,
    };
};

export default openChat;
