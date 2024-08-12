import WAPI from "../../../index";
import getModel from "./getModel";
import getChatModel from "./getChatModel";
import getContactModel from "./getContactModel";
import openChat from "./openChat";

const groupMetadata: (app: WAPI) => PropertyDescriptorMap = (app: WAPI) => {
    return {
        getChatModel: getChatModel(app),
        getModel: getModel(app),
        getContactModel: getContactModel(app),
        openChat: openChat(app),
    };
};

export default groupMetadata;
