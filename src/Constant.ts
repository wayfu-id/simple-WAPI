/**
 * WAPI modules that needed to get
 */
const storeObjects = [
    {
        id: "Store",
        conditions: (module: any) =>
            module.default && module.default.Chat && module.default.Msg ? module.default : null,
    },
    {
        id: "ComposeBox",
        conditions: (module: any) => (module.ComposeBoxActions ? module.ComposeBoxActions : null),
    },
    {
        id: "Cmd",
        conditions: (module: any) => (module.Cmd ? module.Cmd : null),
    },
    {
        id: "GroupUtils",
        conditions: (module: any) => (module.findCommonGroups ? module : null),
    },
    {
        id: "WidFactory",
        conditions: (module: any) => (module.createWid ? module : null),
    },
    {
        id: "MsgUtils",
        conditions: (module: any) => (module.sendTextMsgToChat ? module : null),
    },
    {
        id: "MediaCollection",
        conditions: (module: any) =>
            module.default && module.default.prototype && module.default.prototype.processAttachments
                ? module.default
                : null,
    },
    {
        id: "WapQuery",
        conditions: (module: any) =>
            module.queryExist ? module : module.default && module.default.queryExist ? module.default : null,
    },
    {
        id: "Debug",
        conditions: (module: any) => (module.Debug ? module.Debug : null),
    },
    // New Store Objects
    {
        id: "MeUtils",
        conditions: (module: any) => (module.getMaybeMeUser ? module : null),
    },
    {
        id: "MediaUtils",
        conditions: (module: any) =>
            module.getOrCreateMediaObject && module.disassociateMediaFromStickerPack ? module : null,
    },
    {
        id: "Profile",
        conditions: (module: any) => (module.sendSetPicture && module.requestDeletePicture ? module : null),
    },
    {
        id: "UploadUtils",
        conditions: (module: any) =>
            module.default && module.default.encryptAndUpload ? module.default : null,
    },
    {
        id: "UserPrefsGeneral",
        conditions: (module: any) => (module.getUserPrivacySettings && module.getPushname ? module : null),
    },
    {
        id: "WidUtils",
        conditions: (module: any) => (module.validateWid && module.validateAndGetParts ? module : null),
    },
];

// Property descriptor for Version Info
const Version: PropertyDescriptor = {
    value: __VERSION__,
    enumerable: true,
    configurable: false,
};

export { storeObjects, Version };
