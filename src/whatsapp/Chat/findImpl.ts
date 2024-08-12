import WAPI from "../../../index";

const findImpl: (app: WAPI) => PropertyDescriptor & ThisType<WA.Chat> = (app: WAPI) => {
    return {
        value: async function findImpl(e: string) {
            let wid = await app.findUserWid(e);
            if (!wid) return null;
            return this.gadd(wid);
        },
        enumerable: true,
    };
};

export default findImpl;
