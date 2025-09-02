import WAPI from "../../../index";

const getModel: (app: WAPI) => PropertyDescriptor & ThisType<WA.ProductModel> = (app: WAPI) => {
    return {
        value: function getModel() {
            return app.factories("Product", this);
        },
        enumerable: true,
    };
};

export default getModel;
