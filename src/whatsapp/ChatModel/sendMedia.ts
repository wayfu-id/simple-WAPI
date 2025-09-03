import WAPI from "../../../index";

const sendMedia: (app: WAPI) => PropertyDescriptor & ThisType<WA.ChatModel> = (app: WAPI) => {
    return {
        value: async function sendMedia(file: File | Blob, options?: WA.sendMediaOptions, ret?: boolean) {
            if (this.hasDraftMessage) this.clearDraft();
            if (!this.active) await this.open();
            ret = !!ret;

            return new Promise((done) => {
                (async (f, o, r) => {
                    let caption = o?.caption ?? "",
                        quality = o?.quality ?? "Standard",
                        sendAsHD = quality === "HD";

                    let media = await app.preProcessors.processMediaMessage(f, { forceHD: sendAsHD }),
                        res = await media.sendToChat(this, { caption });

                    done(r ? this.getModel() : res);
                })(file, options, ret);
            }).catch((err: Error | any) => {
                throw new Error(`Couldn't Send Media Message. Reason: ${err.message || "Unknown"}`);
            });
        },
        enumerable: true,
    };
};

export default sendMedia;
