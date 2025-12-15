import WAPI from "../../../index";
import { Product } from "../../structures";

const sendMessage: (app: WAPI) => PropertyDescriptor & ThisType<WA.ChatModel> = (app: WAPI) => {
    return {
        value: async function sendMessage(
            content: string | WA.kindOfAttachment,
            options?: WAPI.SendMessageOptions
        ) {
            if (typeof content !== "string") {
                let atc = content instanceof Product ? { product: content } : { attachment: content };
                options = {
                    ...options,
                    ...atc,
                } as WAPI.SendMessageOptions;
            }
            let mediaMsgReady: WA.attcOptions | undefined;

            /** If 'attachment' options is set */
            if (options?.attachment) {
                let {
                    attachment,
                    caption,
                    isViewOnce,
                    sendAsHD,
                    sendAudioAsVoice,
                    sendVideoAsGif,
                    sendMediaAsDocument,
                } = options;

                if (attachment instanceof File || attachment instanceof Blob) {
                    let mediaOpt: WAPI.MediaProcessOptions = {
                        forceVoice: Boolean(sendAudioAsVoice),
                        forceDocument: Boolean(sendMediaAsDocument),
                        forceGif: Boolean(sendVideoAsGif),
                        forceHD: Boolean(sendAsHD),
                    };

                    mediaMsgReady = (await app.preProcessors.processMediaData(
                        attachment,
                        mediaOpt
                    )) as WA.attcOptions;
                    mediaMsgReady.caption = caption;
                    mediaMsgReady.forceVoice = !!sendAudioAsVoice;
                    mediaMsgReady.forceGif = !!sendVideoAsGif;
                    mediaMsgReady.forceDocument = !!sendMediaAsDocument;
                    mediaMsgReady.isViewOnce = !!isViewOnce;
                }

                delete options.attachment;
                delete options.sendAsHD;
                delete options.sendAudioAsVoice;
                delete options.sendVideoAsGif;
                delete options.sendMediaAsDocument;
            }

            /** If 'linkPreview' is setted 'true' */
            if (options?.linkPreview) {
                content = typeof content === "string" ? content : "";
                options = {
                    ...options,
                    ...(await app.preProcessors.generateLinkPreview(content)),
                };
                delete options.linkPreview;
            }

            let productMsgOpt;
            if (options?.product) {
                productMsgOpt = app.preProcessors.processProductMessage(options.product);
                mediaMsgReady = (await app.preProcessors.processMediaData(
                    options?.product
                )) as WA.attcOptions;
                delete options.product;
            }

            if (typeof content !== "string" && !mediaMsgReady) {
                throw new Error("No messege to be sent!");
            }

            const baseMessage = await app.preProcessors.generateBaseMessage(content, this);
            const message: WA.MessageModel = {
                ...baseMessage,
                ...mediaMsgReady,
                ...(mediaMsgReady?.toJSON ? mediaMsgReady?.toJSON() : {}),
                ...productMsgOpt,
            } as WA.MessageModel;

            if (this.hasDraftMessage) this.clearDraft();
            if (!this.active) await this.open();

            message.type = message.type || "chat";
            let results = await Promise.all(app.MsgUtils.addAndSendMsgToChat(this, message));
            return Boolean(options?.ret) ? this.getModel() : results;
        },
        enumerable: true,
    };
};

export default sendMessage;
