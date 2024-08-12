import WAPI from "../../index";
import { Chat as WAPIChat, Contact as WAPIContact, Group } from "../structures/index";
import chat from "./Chat/index";
import chatModel from "./ChatModel/index";
import contact from "./Contact/index";
import contactModel from "./ContactModel/index";
import groupMetadata from "./GroupMetadata/index";

/**
 * Return deleted properties from an Object
 * @param keys
 * @param obj
 * @returns
 */
function delProp(keys: string | string[], obj: any) {
    (Array.isArray(keys) ? keys : [keys]).forEach((key) => delete obj[key]);
    return obj;
}

/**
 * Construct Custom Store Chat object
 * @param app
 * @returns
 */
function constructChat(app: WAPI) {
    let { Chat } = app;
    try {
        let _proto_ = chat(app),
            _model_ = chatModel(app);

        Object.defineProperties(Chat.constructor.prototype, _proto_);
        Object.defineProperties(Chat.modelClass.prototype, _model_);
        return true;
    } catch (err) {
        console.error("From: Construct Chat", err);
        return false;
    }
}

/**
 * Construct Custom Store Contact object
 * @param app
 * @returns
 */
function constructContact(app: WAPI) {
    let { Contact } = app;

    try {
        let { _proto_, _core_ } = contact(app),
            _model_ = contactModel(app);

        Object.defineProperties(Contact.constructor.prototype, _proto_);
        Object.defineProperties(Contact, _core_);
        Object.defineProperties(Contact.modelClass.prototype, _model_);
        return true;
    } catch (err) {
        console.error("From: Construct Contact", err);
        return false;
    }
}

/**
 * Construct Custom Store GroupMetadata object
 * @param app
 * @returns
 */
function constructGroupMetadata(app: WAPI) {
    let { GroupMetadata } = app;

    try {
        let _model_ = groupMetadata(app);

        Object.defineProperties(GroupMetadata.modelClass.prototype, _model_);
        return true;
    } catch (err) {
        console.error("From: Construct GroupMetadata", err);
        return false;
    }
}

/**
 * Construct Custom Store WebClasses object
 * @returns
 */
function constructWebClasses() {
    try {
        Object.defineProperty(WAPI.prototype, "WebClasses", {
            value: ((proto: WAPI, obj: any) => {
                let rgx = /^WAWeb(\w*)\.(?:scss)$/g;
                Object.keys(proto).forEach((key) => {
                    if (rgx.test(key)) {
                        let k = key.replace(rgx, `$1`);
                        obj[k] = proto[key];
                        delProp(key, proto);
                    }
                });
                return obj;
            })(WAPI.prototype, {}),
            enumerable: true,
        });
        return true;
    } catch (err) {
        console.error("From: Construct WebClasses", err);
        return false;
    }
}

/**
 * Construct Custom Store object
 * @param app
 * @returns
 */
export function constructStore(app: WAPI) {
    let { Chat } = app;
    if (Chat.modelClass.prototype.getModel === undefined) {
        return (
            constructChat(app) &&
            constructContact(app) &&
            constructGroupMetadata(app) &&
            constructWebClasses()
        );
    }
    return true;
}
