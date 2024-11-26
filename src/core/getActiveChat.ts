import WAPI from "../../index";

const getActiveChat: PropertyDescriptor & ThisType<WAPI> = {
    value: function getActiveChat() {
        let chat = this.Chat.getActive();
        return chat ? this.factories("Chat", chat) : null;
    },
};

export default getActiveChat;
