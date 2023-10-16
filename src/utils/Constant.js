/**
 * WAPI modules that needed to get
 */
const storeObjects = [
    {
        id: "Store",
        conditions: (module) =>
            module.default && module.default.Chat && module.default.Msg
                ? module.default
                : null,
    },
    {
        id: "ComposeBox",
        conditions: (module) =>
            module.ComposeBoxActions ? module.ComposeBoxActions : null,
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
        id: "WebClasses",
        conditions: (module) =>
            module.default &&
            typeof module.default === "object" &&
            module.default.chat &&
            module.default.active
                ? module.default
                : null,
    },
    {
        id: "WebClasses2",
        conditions: (module) =>
            module.default &&
            typeof module.default === "object" &&
            module.default.menu &&
            module.default.active
                ? module.default
                : null,
    },
    {
        id: "WebClasses3",
        conditions: (module) =>
            module.default &&
            typeof module.default === "object" &&
            module.default.chatHeader
                ? module.default
                : null,
    },
    {
        id: "MediaCollection",
        conditions: (module) =>
            module.default &&
            module.default.prototype &&
            module.default.prototype.processAttachments
                ? module.default
                : null,
    },
    {
        id: "WapQuery",
        conditions: (module) =>
            module.queryExist
                ? module
                : module.default && module.default.queryExist
                ? module.default
                : null,
    },
    {
        id: "Debug",
        conditions: (module) => (module.Debug ? module.Debug : null),
    },
];

export { storeObjects };
