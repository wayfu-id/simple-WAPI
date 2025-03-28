import WAPI from "../../../index";

const sendMedia: (app: WAPI) => PropertyDescriptor & ThisType<WA.ChatModel> = (app: WAPI) => {
    return {
        value: async function sendMedia(file: File | Blob, options?: WA.sendMediaOptions, ret?: boolean) {
            if (this.hasDraftMessage) this.clearDraft();
            if (!this.active) await this.open();
            ret = !!ret;

            return new Promise((done) => {
                (async (f, o, r) => {
                    let mc = new app.MediaCollection(this),
                        caption = o?.caption ?? "",
                        quality = o?.quality ?? "Standard";

                    try {
                        await mc.processAttachments([{ file: f, quality }], 1, this);
                    } catch (error: Error | any) {
                        throw new Error(error.message ?? (error || "Unknown"));
                    }

                    let [media] = mc.getModelsArray(),
                        res = await media.sendToChat(this, { caption: caption });

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
