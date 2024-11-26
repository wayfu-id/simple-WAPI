import WAPI from "../../index";
import checkPhone from "./checkPhone";
import closeChat from "./closeChat";
import factories from "./factories";
import findChat from "./findChat";
import findCommonGroup from "./findCommonGroup";
import findContact from "./findContact";
import findGroup from "./findGroup";
import findUserWid from "./findUserWid";
import getActiveChat from "./getActiveChat";
import getAllGroups from "./getAllGroups";
import inputAndSendTextMsg from "./inputAndSendTextMsg";
import openChat from "./openChat";
import sendMessage from "./sendMessage";
import { WAPI_VERSION } from "../Constant";
import sleep from "./sleep";
import { delProp } from "../utils/index";
import { fileUtils, preProcessors } from "../utils/index";
// import { reConstruct } from "../utils/index";

/**
 * Construct Custom WAPI object
 * @param app
 * @returns
 */
export function constructWAPI(app: WAPI) {
    let { Contact } = app;

    try {
        Contact.getMeContact()
            .fetchProfilePic()
            .then(() => {
                Object.defineProperty(app, "ME", {
                    value: Contact.getMeContact().getModel(),
                    enumerable: true,
                });
            });

        Object.defineProperties(app, {
            // ...reConstruct(Debug),
            checkPhone,
            closeChat,
            factories,
            findChat,
            findCommonGroup,
            findContact,
            findGroup,
            findUserWid,
            getActiveChat,
            getAllGroups,
            inputAndSendTextMsg,
            openChat,
            sendMessage,
            sleep,
            WA_VERSION: {
                value: app.Debug.VERSION,
                configurable: false,
                enumerable: true,
            },
            WAPI_VERSION,
            fileUtils: {
                value: fileUtils,
            },
            preProcessors: {
                value: preProcessors(app),
            },
        });

        delProp("Debug", WAPI.prototype);

        return true;
    } catch (err) {
        console.error("From: Construct WAPI", err);
        return false;
    }
}
