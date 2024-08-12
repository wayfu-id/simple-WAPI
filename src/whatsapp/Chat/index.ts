import WAPI from "../../../index";
import clearAllDraft from "./clearAllDraft";
import findImpl from "./findImpl";

const chat: (app: WAPI) => PropertyDescriptorMap = (app: WAPI) => {
    return {
        findImpl: findImpl(app),
        clearAllDraft,
    };
};

export default chat;
