import WAPI from "../../../index";

const getModel: (app: WAPI) => PropertyDescriptor & ThisType<WA.CatalogModel> = (app: WAPI) => {
    return {
        value: function getModel() {
            return app.factories("Catalog", this);
        },
        enumerable: true,
    };
};

export default getModel;
