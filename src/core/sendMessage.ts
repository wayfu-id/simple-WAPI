import WAPI from "../../index";
import { Chat } from "../structures/index";

const sendMessage: PropertyDescriptor & ThisType<WAPI> = {
    value: async function sendMessage<T extends WA.MessageSendOptions>(
        id: string | Chat | WA.wid,
        message: string,
        options?: T
    ): Promise<WAPI.reportType<T> | undefined> {
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
            _ret = ret && typeof ret === "boolean" ? ret : false;

        if (media) {
            caption = caption ? caption : message;
            return (await chat.sendMedia(media, caption, _ret)) as WAPI.reportType<T>;
        }
        return (await chat.sendText(message, _ret)) as WAPI.reportType<T>;
    },
};

export default sendMessage;
