import { storeObjects } from "./Constant.js";

/**
 * @typedef { import("../../index").LoaderType } loaderType
 */

/**
 * Get webpack chunk key
 * @param {window} target
 * @returns {string | null}
 */
const webpackKey = (target) => {
    for (let key of Object.keys(target)) {
        if (/[^|]?webpack./g.test(key)) return key;
    }
    return null;
};

/**
 * Add support to WhatsApp Web v2.3
 * @param {window} target
 * @returns
 */
const webpackFactory = (target) => {
    const webpackRequire = (id) => {
        try {
            target.ErrorGuard.skipGuardGlobal(true);
            return target.importNamespace(id);
        } catch (error) {}
        return null;
    };

    Object.defineProperty(webpackRequire, "m", {
        get: () => {
            const result = {},
                { modulesMap } = target.require("__debug");

            Object.keys(modulesMap)
                .filter((e) => e.includes("WA"))
                .forEach((id) => {
                    result[id] = modulesMap[id]?.factory;
                });

            return result;
        },
    });

    return webpackRequire;
};

/**
 * Get Store from webpack modules
 * @param {any} modules
 * @param {any} result
 * @returns
 */
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

/**
 * Get LoaderType of WAPI Module
 * @param {window} target
 * @param {string} webpack
 * @returns {Promise<loaderType>}
 */
const waitLoaderType = async (target) => {
    target = target && target instanceof Window ? target : window;
    const chunkName = ((t) => webpackKey(t))(target),
        isArray = (e) => {
            return Array.isArray(e) && e.every((i) => Array.isArray(i) && i.length > 0);
        };
    return new Promise((done) => {
        const checkObjects = () => {
            if (target.require || target.__d) {
                let webpackRequire = target.require("__debug");
                if (webpackRequire.modulesMap?.WAWebUserPrefsMeUser) {
                    done({ type: "meta", chunk: webpackFactory(target) });
                } else {
                    setTimeout(checkObjects, 200);
                }
            } else {
                if (target[chunkName] && isArray(target[chunkName])) {
                    done({ type: "webpack", chunk: target[chunkName] });
                } else {
                    setTimeout(checkObjects, 200);
                }
            }
        };
        checkObjects();
    });
};

export { getStore, waitLoaderType };
