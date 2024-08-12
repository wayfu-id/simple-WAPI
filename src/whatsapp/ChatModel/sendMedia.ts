import WAPI from "../../../index";

const sendMedia: (app: WAPI) => PropertyDescriptor & ThisType<WA.ChatModel> = (app: WAPI) => {
    return {
        value: async function sendMedia(file: File, caption: string, ret?: boolean) {
            if (this.hasDraftMessage) this.clearDraft();
            if (!this.active) await this.open();
            caption = typeof caption === "undefined" ? "" : caption;
            ret = !!ret;

            return new Promise((done) => {
                (async (f, c, r) => {
                    let mc = new app.MediaCollection(this);
                    await mc.processAttachments([{ file: f }], 1, this);

                    let [media] = mc.getModelsArray(),
                        res = await media.sendToChat(this, { caption: c });

                    done(r ? this.getModel() : res);
                })(file, caption, ret);
            }).catch((err) => {
                throw new Error(`Couldn't Send Media Message. Reason: ${err.message || "Unknown"}`);
            });
        },
        enumerable: true,
    };
};

export default sendMedia;
