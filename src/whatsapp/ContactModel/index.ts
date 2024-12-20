import WAPI from "../../../index";
import fetchProfilePic from "./fetchProfilePic";
import getChatModel from "./getChatModel";
import getModel from "./getModel";
import openChat from "./openChat";

const contactModel: (app: WAPI) => PropertyDescriptorMap = (app: WAPI) => {
    return {
        fetchProfilePic: fetchProfilePic(app),
        getChatModel: getChatModel(app),
        getModel: getModel(app),
        openChat: openChat(app),
    };
};

export default contactModel;
