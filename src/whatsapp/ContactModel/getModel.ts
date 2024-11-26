import WAPI from "../../../index";

const getModel: (app: WAPI) => PropertyDescriptor & ThisType<WA.ContactModel> = (app: WAPI) => {
    return {
        value: function getModel() {
            return app.factories("Contact", this);
        },
        enumerable: true,
    };
};

export default getModel;
