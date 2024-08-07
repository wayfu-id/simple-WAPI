/**
 * WAPI modules that needed to get
 */
const storeObjects = [
    {
        id: "Store",
        conditions: (module) =>
            module.default && module.default.Chat && module.default.Msg ? module.default : null,
    },
    {
        id: "ComposeBox",
        conditions: (module) => (module.ComposeBoxActions ? module.ComposeBoxActions : null),
    },
    {
        id: "Cmd",
        conditions: (module) => (module.Cmd ? module.Cmd : null),
    },
    {
        id: "GroupUtils",
        conditions: (module) => (module.findCommonGroups ? module : null),
    },
    {
        id: "WidFactory",
        conditions: (module) => (module.createWid ? module : null),
    },
    {
        id: "MsgUtils",
        conditions: (module) => (module.sendTextMsgToChat ? module : null),
    },
    {
        id: "MediaCollection",
        conditions: (module) =>
            module.default && module.default.prototype && module.default.prototype.processAttachments
                ? module.default
                : null,
    },
    {
        id: "WapQuery",
        conditions: (module) =>
            module.queryExist ? module : module.default && module.default.queryExist ? module.default : null,
    },
    {
        id: "Debug",
        conditions: (module) => (module.Debug ? module.Debug : null),
    },
    // New Store Objects
    {
        id: "MeUtils",
        conditions: (module) => (module.getMaybeMeUser ? module : null),
    },
    {
        id: "MediaUtils",
        conditions: (module) =>
            module.getOrCreateMediaObject && module.disassociateMediaFromStickerPack ? module : null,
    },
    {
        id: "Profile",
        conditions: (module) => (module.sendSetPicture && module.requestDeletePicture ? module : null),
    },
    {
        id: "UploadUtils",
        conditions: (module) => (module.default && module.default.encryptAndUpload ? module.default : null),
    },
    {
        id: "UserPrefsGeneral",
        conditions: (module) => (module.getUserPrivacySettings && module.getPushname ? module : null),
    },
    {
        id: "WidUtils",
        conditions: (module) => (module.validateWid && module.validateAndGetParts ? module : null),
    },
];

export { storeObjects };
