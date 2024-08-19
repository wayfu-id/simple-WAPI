import { storeObjects } from "./Constant";
import { constructStore } from "./whatsapp/index";
import { constructWAPI } from "./core/index";

type webpackModules = {
    (id: string): any;
    readonly m?: any;
};

const _token = Symbol();

/**
 * Get webpack chunk key
 * @param target
 * @returns
 */
const webpackKey = (target: Window) => {
    for (let key of Object.keys(target)) {
        if (/[^|]?webpack./g.test(key)) return key;
    }
    return null;
};

/**
 * Add support to WhatsApp Web v2.3
 * @param target
 * @returns
 */
const webpackFactory = (target: any): webpackModules => {
    const webpackRequire: webpackModules = (id: string) => {
        try {
            target.ErrorGuard.skipGuardGlobal(true);
            return target.importNamespace(id);
        } catch (error) {}
        return null;
    };

    Object.defineProperty(webpackRequire, "m", {
        get: () => {
            const result: { [k: string]: any } = {},
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
 * @param modules
 * @param result
 * @returns
 */
const getStore = (modules: webpackModules, result: any = {}) => {
    const addOn: Record<"WebClasses" | "WebComponents", any> = {
        WebClasses: {},
        WebComponents: {},
    };

    const rgx = (type: keyof typeof addOn) => {
        return new RegExp(`WAWeb(\\w*)\\.(?:${type === "WebClasses" ? "scss" : "react"})`, "g");
    };

    for (let idx in modules.m) {
        if (typeof modules(idx) === "object" && modules(idx) !== null) {
            storeObjects.forEach(({ id, conditions }) => {
                if (!conditions || result[id]) return;

                result = ((id, module) => {
                    const mod = (m: any) => (id === "Store" ? m : { [id]: m }),
                        add = (m: any) => (m !== null ? mod(m) : {});

                    return Object.assign(result, add(module));
                })(id, conditions(modules(idx)));
            });

            let _idx: keyof typeof addOn;
            for (_idx in addOn) {
                if (rgx(_idx).test(idx)) {
                    let _id = idx.replace(rgx(_idx), `$1`);
                    addOn[_idx][_id] = modules(idx)?.default || modules(idx);
                }
            }
        }
    }

    result = Object.assign({}, result, addOn);
    return result;
};

/**
 * Get LoaderType of WAPI Module
 * @param target
 * @returns
 */
const waitLoaderType = (target: Window | any) => {
    target = target && target instanceof Window ? target : window;
    const chunkName = ((t) => webpackKey(t))(target),
        isArray = (e: any) => {
            return Array.isArray(e) && e.every((i) => Array.isArray(i) && i.length > 0);
        };

    const checkObjects = () => {
        if (target.require || target.__d) {
            let webpackRequire = target.require("__debug");
            if (webpackRequire.modulesMap?.WAWebUserPrefsMeUser) {
                return { type: "meta", chunk: webpackFactory(target) };
            }
        } else if (chunkName && target[chunkName] && isArray(target[chunkName])) {
            return { type: "webpack", chunk: target[chunkName] };
        }
        return { type: undefined, chunk: undefined };
    };

    return checkObjects();
};

export { constructStore, constructWAPI, getStore, _token, waitLoaderType };
