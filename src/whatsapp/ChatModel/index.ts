import WAPI from "../../../index";
import clearDraft from "./clearDraft";
import close from "./close";
import getModel from "./getModel";
import open from "./open";
import sendMedia from "./sendMedia";
import sendText from "./sendText";

const chatModel: (app: WAPI) => PropertyDescriptorMap = (app: WAPI) => {
    return {
        clearDraft,
        close: close(app),
        getModel: getModel(app),
        open: open(app),
        sendMedia: sendMedia(app),
        sendText: sendText(app),
    };
};

export default chatModel;
