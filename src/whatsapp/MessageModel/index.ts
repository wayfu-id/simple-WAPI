import WAPI from "../../../index";
import getChatModel from "./getChatModel";
import getModel from "./getModel";

const messageModel: (app: WAPI) => PropertyDescriptorMap = (app: WAPI) => {
    return {
        getChatModel: getChatModel(app),
        getModel: getModel(app),
    };
};

export default messageModel;
