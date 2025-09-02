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
    BlobCache: (m: webpackModules) => {
        return m("WAWebMediaInMemoryBlobCache");
    },
    ChatGetters: (m: webpackModules) => {
        return m("WAWebChatGetters");
    },
    BusinessUtils: (m: webpackModules) => {
        return {
            ...m("WAWebBizProductCatalogAction"),
            ...m("WAWebBizProductCatalogBridge"),
            ...m("WAWebBizCreateProductInquiry"),
            ProductModel: m("WAWebProductModel")?.Product,
        };
    },
    ChatActions: (m: webpackModules) => {
        return m("WAWebFindChatAction");
    },
    // ChatSettings: (m: webpackModules) => {
    //     return m("WAWebChatPreferenceCollection")?.default;
    // },
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
    FileUtilities: (m: webpackModules) => {
        return m("WAWebFileUtils");
    },
    GroupUtils: (m: webpackModules) => {
        return {
            ...m("WAWebFindCommonGroupsContactAction"),
            ...m("WAWebGroupCreateJob"),
            ...m("WAWebGroupModifyInfoJob"),
            ...m("WAWebExitGroupAction"),
        };
    },
    HistorySync: (m: webpackModules) => {
        return {
            ...m("WAWebSendNonMessageDataRequest"),
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
    StateUtils: (m: webpackModules) => {
        return m("WAWebStateUtils");
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

// Property descriptor for Version Info
const WAPI_VERSION: PropertyDescriptor = {
    value: __VERSION__,
    enumerable: true,
    configurable: false,
};

export { storeObjects, WAPI_VERSION };
