import WAPI from "../../../index";

const sendText: (app: WAPI) => PropertyDescriptor & ThisType<WA.ChatModel> = (app: WAPI) => {
    return {
        value: async function sendText(body: string, ret?: boolean) {
            if (this.hasDraftMessage) this.clearDraft();
            if (!this.active) await this.open();
            ret = !!ret;

            return new Promise((done) => {
                (async ({ MsgUtils: f }, e) => {
                    let msg = await f.createTextMsgData(this, e),
                        res = await f.addAndSendTextMsg(this, msg);

                    done(ret ? this.getModel() : res);
                })(app, body);
            }).catch((err) => {
                throw new Error(`Couldn't Send Text Message. Reason: ${err.message || "Unknown"}`);
            });
        },
        enumerable: true,
    };
};

export default sendText;
