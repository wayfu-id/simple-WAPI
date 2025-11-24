import WAPI from "../../../index";

const sendMessage: (app: WAPI) => PropertyDescriptor & ThisType<WA.ChatModel> = (app: WAPI) => {
    return {
        value: async function sendMessage(
            content: string | WA.kindOfAttachment,
            options?: WAPI.SendMessageOptions
        ) {
            if (typeof content !== "string") {
                options = {
                    ...options,
                    attachment: content,
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

            if (typeof content !== "string" && !mediaMsgReady) {
                throw new Error("No messege to be sent!");
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

            const baseMessage = await app.preProcessors.generateBaseMessage(content, this);
            const message: WA.MessageModel = {
                ...baseMessage,
                ...mediaMsgReady,
                ...(mediaMsgReady?.toJSON ? mediaMsgReady?.toJSON() : {}),
            };

            if (this.hasDraftMessage) this.clearDraft();
            if (!this.active) await this.open();

            let results = await Promise.all(app.MsgUtils.addAndSendMsgToChat(this, message));
            await this.historySync();
            return Boolean(options?.ret) ? this.getModel() : results;
        },
        enumerable: true,
    };
};

export default sendMessage;
