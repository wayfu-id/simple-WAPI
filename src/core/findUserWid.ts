import WAPI from "../../index";

const findUserWid: PropertyDescriptor & ThisType<WAPI> = {
    value: async function findUserWid(id: string | WA.wid) {
        if (typeof id === "string") {
            let isExists = await this.checkPhone(id);
            return isExists ? isExists.wid : null;
        }
        return id;
    },
};

export default findUserWid;
