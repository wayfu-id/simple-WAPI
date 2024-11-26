import WAPI from "../../../index";

const getModel: (app: WAPI) => PropertyDescriptor & ThisType<WA.GroupModel> = (app: WAPI) => {
    return {
        value: function getModel() {
            return app.factories("Group", this);
        },
        enumerable: true,
    };
};

export default getModel;
