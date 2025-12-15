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
        const { ChatState: State, sleep } = this;
        State.sendChatStateComposing(chat.id);
        let { media, attachment, forceHD, caption, ret, quality, delay } = options ?? {},
            _ret = ret && typeof ret === "boolean" ? ret : false,
            _media = media ?? (attachment instanceof File || attachment instanceof Blob ? attachment : null);
        delete options?.media;

        if (_media) {
            let attcOpt = {
                sendAsHD: forceHD ?? quality ? quality === "HD" : false,
                caption: caption ?? message,
                attachment: _media,
            };
            message = "";
            options = Object.assign({}, options, attcOpt);
        }
        State.markComposing(chat);
        if (delay) await sleep(delay);
        return await chat.sendMessage<typeof _ret>(message, options);
    },
};

export default sendAdvMessage;
