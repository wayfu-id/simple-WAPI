import WAPI from "../../index";
import { Chat } from "../structures/index";

const inputAndSendTextMsg: PropertyDescriptor & ThisType<WAPI> = {
    value: async function inputAndSendTextMsg(chatId: string | Chat | WA.wid, text: string, delay?: number) {
        let chat = await (async (e) => {
            let ct: WA.ChatModel | null;
            try {
                ct = await this.Chat.find(e instanceof Chat ? e.id : e);
                if (ct) return ct;
            } catch (err: any) {
                throw new Error(`Can't find Chat. Reason: ${err.message || "Unknown"}`);
            }
            return null;
        })(chatId);

        if (!chat) return;

        const { ComposeBox: Act, ChatState: State, sleep } = this;
        State.sendChatStateComposing(chat.id);
        if (!chat.active) {
            if (chat.hasDraftMessage) chat.clearDraft();
            await chat.open();
        }
        await sleep(delay ?? 250);
        State.markComposing(chat);
        await Act.paste(chat, `${text}`);
        await Act.send(chat);

        return chat;
    },
};

export default inputAndSendTextMsg;
