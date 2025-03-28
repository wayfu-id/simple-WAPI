import WAPI from "../../../index";
import clearDraft from "./clearDraft";
import close from "./close";
import getContactModel from "./getContactModel";
import getModel from "./getModel";
import open from "./open";
import sendMedia from "./sendMedia";
import sendText from "./sendText";
import sendMessage from "./sendMessage";

const chatModel: (app: WAPI) => PropertyDescriptorMap = (app: WAPI) => {
    return {
        clearDraft,
        close: close(app),
        getContactModel: getContactModel(app),
        getModel: getModel(app),
        open: open(app),
        sendMedia: sendMedia(app),
        sendText: sendText(app),
        sendMessage: sendMessage(app),
    };
};

export default chatModel;
