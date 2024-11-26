import WAPI from "../../../index";

const getModel: (app: WAPI) => PropertyDescriptor & ThisType<WA.MessageModel> = (app: WAPI) => {
    return {
        value: function getModel() {
            return app.factories("Message", this);
        },
        enumerable: true,
    };
};

export default getModel;
