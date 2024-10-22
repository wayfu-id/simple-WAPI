import WAPI from "../../index";

const sleep: PropertyDescriptor & ThisType<WAPI> = {
    value: async function sleep(time: number) {
        try {
            return new Promise((resolve) => setTimeout(resolve, time));
        } catch (e) {}
        return;
    },
};

export default sleep;
