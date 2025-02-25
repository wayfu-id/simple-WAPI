import { webpackModules } from "./Loader";
/**
 * WAPI modules that needed to get
 */
const storeObjects: { [k: string]: (m: webpackModules) => any } = {
    ABProps: (m: webpackModules) => {
        return {
            ...m("WAWebABProps"),
            ...m("WAWebABPropsConfigs"),
        };
    },
    ChatState: (m: webpackModules) => {
        return m("WAWebChatStateBridge");
    },
    Cmd: (m: webpackModules) => {
        return m("WAWebCmd")?.Cmd;
    },
    ComposeBox: (m: webpackModules) => {
        return m("WAWebComposeBoxActions")?.ComposeBoxActions;
    },
    Conn: (m: webpackModules) => {
        return m("WAWebConnModel")?.Conn;
    },
    Downloader: (m: webpackModules) => {
        return m("WAWebDownloadManager")?.downloadManager;
    },
    EphemeralFields: (m: webpackModules) => {
        return m("WAWebGetEphemeralFieldsMsgActionsUtils");
    },
    GroupUtils: (m: webpackModules) => {
        return {
            ...m("WAWebFindCommonGroupsContactAction"),
            ...m("WAWebGroupCreateJob"),
            ...m("WAWebGroupModifyInfoJob"),
            ...m("WAWebExitGroupAction"),
        };
    },
    JidToWid: (m: webpackModules) => {
        return m("WAWebJidToWid");
    },
    LidUtils: (m: webpackModules) => {
        return m("WAWebApiContact");
    },
    LinkPreview: (m: webpackModules) => {
        return m("WAWebLinkPreviewChatAction");
    },
    MediaModel: (m: webpackModules) => {
        return m("WAWebAttachMediaModel");
    },
    MediaCollection: (m: webpackModules) => {
        return m("WAWebAttachMediaCollection")?.default;
    },
    MediaPrep: (m: webpackModules) => {
        return {
            ...m("WAWebMediaPrep"),
            ...m("WAWebPrepRawMedia"),
            ...m("WAWebProcessRawMedia"),
        };
    },
    MediaData: (m: webpackModules) => {
        return m("WAWebMediaData")?.default;
    },
    MediaDataUtils: (m: webpackModules) => {
        return m("WAWebMediaDataUtils");
    },
    MediaObject: (m: webpackModules) => {
        return m("WAWebMediaStorage");
    },
    MediaUpload: (m: webpackModules) => {
        return m("WAWebMediaMmsV4Upload");
    },
    MediaTypes: (m: webpackModules) => {
        return m("WAWebMmsMediaTypes");
    },
    MeUtils: (m: webpackModules) => {
        return m("WAWebUserPrefsMeUser");
    },
    MsgKey: (m: webpackModules) => {
        return m("WAWebMsgKey")?.default;
    },
    MsgUtils: (m: webpackModules) => {
        return {
            ...m("WAWebSendTextMsgChatAction"),
            ...m("WAWebSendMsgChatAction"),
            ...m("WAWebApiMessageInfoStore"),
        };
    },
    MsgTypes: (m: webpackModules) => {
        return m("WAWebMsgType");
    },
    OpaqueData: (m: webpackModules) => {
        return m("WAWebMediaOpaqueData")?.default;
    },
    Profile: (m: webpackModules) => {
        return m("WAWebContactProfilePicThumbBridge");
    },
    Settings: (m: webpackModules) => {
        return m("WAWebUserPrefsGeneral");
    },
    StickerTools: (m: webpackModules) => {
        return {
            ...m("WAWebImageUtils"),
            ...m("WAWebAddWebpMetadata"),
        };
    },
    UploadUtils: (m: webpackModules) => {
        return m("WAWebUploadManager")?.default;
    },
    UserConstructor: (m: webpackModules) => {
        return m("WAWebWid")?.default;
    },
    Validators: (m: webpackModules) => {
        return m("WALinkify");
    },
    WapQuery: (m: webpackModules) => {
        return m("WAWebQueryExistsJob");
    },
    WidFactory: (m: webpackModules) => {
        return m("WAWebWidFactory");
    },
    WidToJid: (m: webpackModules) => {
        return m("WAWebWidToJid");
    },
    WidUtils: (m: webpackModules) => {
        return m("WAWebWidValidator");
    },
};

const fileSignature = [
    { keys: ["FFD8FFDB", "FFD8FFE0", "FFD8FFEE"], result: "image/jpeg" },
    { keys: ["89504E47"], result: "image/png" },
    { keys: ["47494638"], result: "image/gif" },
    { keys: ["52494646"], result: "image/webp" },
    { keys: ["49492A00", "49492B00", "4D4D002A", "4D4D002B"], result: "image/tiff" },
    { keys: ["25504446"], result: "application/pdf" },
];

// Property descriptor for Version Info
const WAPI_VERSION: PropertyDescriptor = {
    value: __VERSION__,
    enumerable: true,
    configurable: false,
};

export { fileSignature, storeObjects, WAPI_VERSION };
