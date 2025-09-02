import WAPI from "../../..";
import getModel from "./getModel";

const productModel: (app: WAPI) => PropertyDescriptorMap = (app: WAPI) => {
    return {
        getModel: getModel(app),
    };
};

export default productModel;
