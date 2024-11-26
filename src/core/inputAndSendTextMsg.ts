import WAPI from "../../index";
import { Chat } from "../structures/index";

const inputAndSendTextMsg: PropertyDescriptor & ThisType<WAPI> = {
    value: async function inputAndSendTextMsg(chatId: Chat | string, text: string) {
        let [_id, chat] = ((idx) => {
            if (idx instanceof Chat) {
                return [idx.id, idx];
            }
            return [idx, null];
        })(chatId);

        try {
            if (!chat) {
                chat = await this.findChat(_id);
                if (!chat) return null;
            }

            if (!chat.active) {
                if (chat.hasDraftMessage) chat.clearDraft();
                await chat.open();
                await this.sleep(250);
            }

            let { ComposeBox: Act } = this;
            await Act.paste(chat, `${text}`);
            await Act.send(chat);

            return chat;
        } catch (e) {
            console.log(e);
        }
        return null;
    },
};

export default inputAndSendTextMsg;
