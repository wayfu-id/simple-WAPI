import WAPI from "../../../index";

const close: (app: WAPI) => PropertyDescriptor & ThisType<WA.ChatModel> = (app: WAPI) => {
    return {
        value: async function close() {
            if (this.active) await app.Cmd.closeChat(this);
        },
        enumerable: true,
    };
};

export default close;
