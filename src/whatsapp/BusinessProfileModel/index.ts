import WAPI from "../../..";
import getModel from "./getModel";
import fetchData from "./fetchData";

const businessProfieModel: (app: WAPI) => PropertyDescriptorMap = (app: WAPI) => {
    return {
        fetchData: fetchData(app),
        getModel: getModel(app),
    };
};

export default businessProfieModel;
