import WAPI from "../../../index";

const hasDraftMessage: (app: WAPI) => PropertyDescriptor & ThisType<WA.ChatModel> = (app: WAPI) => {
    return {
        get: function hasDraftMessage() {
            let draft = app.ChatGetters.getDraftMessage(this);
            return Boolean(draft ? draft.text !== "" : false);
        },
        enumerable: false,
    };
};

export default hasDraftMessage;
