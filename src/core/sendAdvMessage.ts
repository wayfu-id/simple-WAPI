import WAPI from "../../index";
import { Chat } from "../structures/index";

const sendAdvMessage: PropertyDescriptor & ThisType<WAPI> = {
    value: async function sendAdvMessage(
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
            _attc = attachment ?? media;
            delete options?.media

        if (_attc) {
            caption = caption ? caption : message;
            message = "";
            options = Object.assign({}, options, { caption, attachment: _attc });
        }
        return await chat.sendMessage<typeof _ret>(message, options);
    },
};

export default sendAdvMessage;
