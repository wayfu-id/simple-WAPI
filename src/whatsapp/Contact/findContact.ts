import WAPI from "../../../index";

const findContact: (app: WAPI) => PropertyDescriptor & ThisType<WA.Contact> = (app: WAPI) => {
    return {
        value: async function findContact(e: string) {
            let wid = await app.findUserWid(e);
            if (!wid) return null;
            let lid = wid.toLid();
            if (!lid) return this.gadd(wid);
            return this.gadd(lid);
        },
        enumerable: true,
    };
};

export default findContact;
