import WAPI from "../../../index";

const findImpl: (app: WAPI) => PropertyDescriptor & ThisType<WA.Chat> = (app: WAPI) => {
    return {
        value: async function findImpl(e: string) {
            let wid = await app.findUserWid(e);
            if (!wid) return null;
            let result = await app.FindAndCreateChat.findOrCreateLatestChat(wid);
            return result?.chat ?? null;
        },
        enumerable: true,
    };
};

export default findImpl;
