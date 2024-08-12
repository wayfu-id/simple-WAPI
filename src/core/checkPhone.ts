import WAPI from "../../index";

const checkPhone: PropertyDescriptor & ThisType<WAPI> = {
    value: async function checkPhone(phone: string) {
        let result = await this.WapQuery.queryPhoneExists(phone);

        if (!result) {
            let _phone = phone.includes("@") ? phone : `${phone}@c.us`,
                validWid = this.WidUtils.validateWid(_phone, false),
                wid = validWid ? this.WidFactory.createWid(_phone) : null;

            result = wid ? await this.WapQuery.queryWidExists(wid) : null;
        }

        return result;
    },
};

export default checkPhone;
