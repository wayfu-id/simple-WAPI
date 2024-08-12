import WAPI from "../../index";
import { Chat } from "../structures/index";

type reportType<T extends WA.MessageSendOptions> = T["ret"] extends true ? Chat : WA.MessageSendResult;

const sendMessage: PropertyDescriptor & ThisType<WAPI> = {
    value: async function sendMessage<T extends WA.MessageSendOptions>(
        id: string | Chat | WA.wid,
        message: string,
        options?: T
    ): Promise<reportType<T> | undefined> {
        let chat = await (async (e) => {
            let ct: WA.ChatModel | null;
            try {
                ct = await this.Chat.find(e instanceof Chat ? e.id : e);
                if (ct) return ct;
            } catch (err: any) {
                throw new Error(`Can't find Chat. Reason: ${err.message || "Unknown"}`);
            }
            return null;
        })(id);

        if (!chat) return;

        let { media, caption, ret } = options ?? {},
            _ret = ret ? ret : false;

        if (media) {
            caption = caption ? caption : message;
            return (await chat.sendMedia(media, caption, _ret)) as reportType<T>;
        }
        return (await chat.sendText(message, _ret)) as reportType<T>;
    },
};

export default sendMessage;
