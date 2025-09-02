import WAPI from "../../index";
import checkPhone from "./checkPhone";
import closeChat from "./closeChat";
import factories from "./factories";
import findBusinessCatalog from "./findBusinessCatalog";
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
import sendAdvMessage from "./sendAdvMessage";
import { WAPI_VERSION } from "../Constant";
import sleep from "./sleep";
import { delProp } from "../utils/index";
import { fileUtils, preProcessors } from "../utils/index";
import { BusinessContact } from "../structures";
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
            .then((c) => {
                Object.defineProperty(app, "ME", {
                    value: ((contact) => {
                        if (contact instanceof BusinessContact) {
                            contact.fetchAll();
                        }
                        return contact;
                    })(c.getModel()),
                    enumerable: true,
                });
            });

        Object.defineProperties(app, {
            // ...reConstruct(Debug),
            checkPhone,
            closeChat,
            factories,
            findBusinessCatalog,
            findChat,
            findCommonGroup,
            findContact,
            findGroup,
            findUserWid,
            getActiveChat,
            getAllGroups,
            inputAndSendTextMsg,
            openChat,
            sendAdvMessage,
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

        if (typeof app.sendMessage !== "function") throw new Error("Failed to define WAPI properties");

        delProp("Debug", WAPI.prototype);

        return true;
    } catch (err: Error | any) {
        throw new Error(`From: Construct WAPI > ${err.message}`);
    }
}
