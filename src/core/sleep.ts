import WAPI from "../../index";

const sleep: PropertyDescriptor & ThisType<WAPI> = {
    value: async function sleep(time: number, data: any, ...args: any[]) {
        try {
            return new Promise((done) => {
                if (typeof data === "function") {
                    return setTimeout(() => {
                        done(data(...args));
                    }, time);
                }
                return setTimeout(done, time, data, ...args);
            });
        } catch (e) {}
        return;
    },
};

export default sleep;
