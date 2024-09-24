import WAPI from "../../../index";

const open: (app: WAPI) => PropertyDescriptor & ThisType<WA.ChatModel> = (app: WAPI) => {
    return {
        value: async function open() {
            await app.Cmd.openChatAt({ chat: this, msgs: app.Msg.byChat(this) });
        },
        enumerable: true,
    };
};

export default open;
