import WAPI from "../../../index";

const findContact: (app: WAPI) => PropertyDescriptor & ThisType<WA.Contact> = (app: WAPI) => {
    return {
        value: async function findContact(e: string) {
            let wid = await app.findUserWid(e);
            if (!wid) return null;
            return this.gadd(wid);
        },
        enumerable: true,
    };
};

export default findContact;
