import { storeObjects } from "./Constant.js";

const getStore = (modules, result = {}) => {
    for (let idx in modules.m) {
        if (typeof modules(idx) === "object" && modules(idx) !== null) {
            storeObjects.forEach(({ id, conditions }) => {
                if (!conditions || result[id]) return;

                result = ((id, module) => {
                    const mod = (m) => (id === "Store" ? m : { [id]: m }),
                        add = (m) => (m !== null ? mod(m) : {});

                    return Object.assign(result, add(module));
                })(id, conditions(modules(idx)));
            });
        }
    }

    return result;
};

export { getStore };
