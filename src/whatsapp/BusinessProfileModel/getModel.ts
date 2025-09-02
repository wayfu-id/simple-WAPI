import WAPI from "../../../index";

const getModel: (app: WAPI) => PropertyDescriptor & ThisType<WA.BusinessProfileModel> = (app: WAPI) => {
    return {
        value: function getModel() {
            return app.factories("BusinessProfile", this);
        },
        enumerable: true,
    };
};

export default getModel;
