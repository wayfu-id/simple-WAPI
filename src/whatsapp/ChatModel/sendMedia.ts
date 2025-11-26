import WAPI from "../../../index";

const sendMedia: (app: WAPI) => PropertyDescriptor & ThisType<WA.ChatModel> = (app: WAPI) => {
    return {
        value: async function sendMedia(file: File | Blob, options?: WA.sendMediaOptions, ret?: boolean) {
            if (this.hasDraftMessage) this.clearDraft();
            if (!this.active) await this.open();
            ret = !!ret;

            return new Promise((done) => {
                (async (f, o, r) => {
                    o = o ?? {}; // set to empty object of no options found
                    let { caption, quality } = o,
                        { forceDocument, forceGif, forceHD, forceImage } = o;

                    let media = await app.preProcessors.processMediaMessage(f, {
                            forceHD: forceHD ?? (quality ? quality === "HD" : false),
                            forceImage,
                            forceDocument,
                            forceGif,
                        }),
                        res = await media.sendToChat(this, { caption: caption ?? "" });

                    // await this.historySync();
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
