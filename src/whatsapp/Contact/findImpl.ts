import WAPI from "../../../index";

const findImpl: (app: WAPI) => PropertyDescriptor & ThisType<WA.Contact> = (app: WAPI) => {
    return {
        value: async function findImpl(e: string) {
            return await this.findContact(e);
        },
    };
};

export default findImpl;
