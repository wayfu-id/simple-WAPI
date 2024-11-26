import WAPI from "../../../index";

const openChat: (app: WAPI) => PropertyDescriptor & ThisType<WA.MessageModel> = (app: WAPI) => {
    return {
        value: async function openChat() {
            let chat = await app.Chat.find(this.from);
            return chat ? (await chat.open(), chat) : undefined;
        },
        enumerable: true,
    };
};

export default openChat;
