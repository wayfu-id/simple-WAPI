import WAPI from "../../..";
import getModel from "./getModel";
import fetchProducts from "./fetchProducts";

const catalogModel: (app: WAPI) => PropertyDescriptorMap = (app: WAPI) => {
    return {
        getModel: getModel(app),
        fetchProducts: fetchProducts(app),
    };
};

export default catalogModel;
