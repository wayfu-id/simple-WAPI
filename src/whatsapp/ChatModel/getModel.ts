import WAPI from "../../../index";

const getModel: (app: WAPI) => PropertyDescriptor & ThisType<WA.ChatModel> = (app: WAPI) => {
    return {
        value: function getModel() {
            return app.factories("Chat", this);
        },
        enumerable: true,
    };
};

export default getModel;
