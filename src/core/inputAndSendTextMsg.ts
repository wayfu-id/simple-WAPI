import WAPI from "../../index";
import { Chat } from "../structures/index";

const inputAndSendTextMsg: PropertyDescriptor & ThisType<WAPI> = {
    value: async function inputAndSendTextMsg(chatId: Chat | string, text: string) {
        /** @type {Chat} */
        let chat: Chat | null = await (async (id) => {
            return id instanceof Chat ? id : await this.findChat(id);
        })(chatId);

        if (!chat) return;

        if (!chat.active) {
            if (chat.hasDraftMessage) chat.clearDraft();
            await chat.open();
            await this.sleep(250);
        }

        let { ComposeBox: Act } = this;
        await Act.paste(chat, `${text}`);
        await Act.send(chat);

        return chat;
    },
};

export default inputAndSendTextMsg;
