import WAPI from "../../../index";
import { Product } from "../../structures";

const sendMessage: (app: WAPI) => PropertyDescriptor & ThisType<WA.ChatModel> = (app: WAPI) => {
    return {
        value: async function sendMessage(
            content: string | WA.kindOfAttachment | WAPI.Product | WA.ProductModel,
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
                    mediaMsgReady.isViewOnce = !!isViewOnce;
                }

                delete options.attachment;
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

            let productMedia: WA.MessageModel | undefined;
            if (options?.product) {
                productMedia = await app.preProcessors.processProductMessage(options.product, this);
                delete options.product;
            }
            console.log(productMedia);

            if (typeof content !== "string" && !mediaMsgReady && !productMedia) {
                throw new Error("No messege to be sent!");
            }

            const baseMessage = await app.preProcessors.generateBaseMessage(content, this);
            const message: WA.MessageModel = {
                ...baseMessage,
                ...mediaMsgReady,
                ...(mediaMsgReady?.toJSON ? mediaMsgReady?.toJSON() : {}),
                // ...productMedia,
            } as WA.MessageModel;

            if (this.hasDraftMessage) this.clearDraft();
            if (!this.active) await this.open();

            let results = await Promise.all(app.MsgUtils.addAndSendMsgToChat(this, productMedia ?? message));
            // await this.historySync();
            return Boolean(options?.ret) ? this.getModel() : results;
        },
        enumerable: true,
    };
};

export default sendMessage;
