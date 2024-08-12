import WAPI from "../../index";
import { ChatFactory } from "../factories/index";

const getActiveChat: PropertyDescriptor & ThisType<WAPI> = {
    value: function getActiveChat() {
        let chat = this.Chat.getActive();
        return chat ? ChatFactory.create(this, chat) : null;
    },
};

export default getActiveChat;
