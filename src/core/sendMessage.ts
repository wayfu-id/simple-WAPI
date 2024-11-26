import WAPI from "../../index";
import { Chat } from "../structures/index";

const sendMessage: PropertyDescriptor & ThisType<WAPI> = {
    value: async function sendMessage(
        id: string | Chat | WA.wid,
        message: string,
        options?: WAPI.SendMessageOptions
    ) {
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

        let { media, attachment, caption, ret } = options ?? {},
            _ret = ret && typeof ret === "boolean" ? ret : false,
            _media = media ?? (attachment instanceof File ? attachment : undefined);

        if (_media) {
            caption = caption ? caption : message;
            return await chat.sendMedia<typeof _ret>(_media, caption, _ret);
        }
        return await chat.sendText<typeof _ret>(message, _ret);
    },
};

export default sendMessage;
