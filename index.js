import { constructStore, constructWAPI, getStore, waitLoaderType } from "./src/utils/Loader.js";

const WAPI = (function () {
    const _token = Symbol();

    return class WAPI {
        constructor(token, store) {
            if (_token !== token) {
                throw new TypeError("WAPI is not constructable. Use WAPI.init() instead");
            }

            return this._init(store);
        }

        /**
         * Initialize store object (Add or remove unused module)
         * @param {any?} store
         * @returns
         */
        _init(store) {
            if (!WAPI.prototype.Chat && store) {
                Object.assign(WAPI.prototype, store);
                constructStore(this);
            }
            constructWAPI(this);
            return this;
        }

        /**
         * @param {Window} target
         * @returns
         */
        static init(target) {
            target = target && target instanceof Window ? target : window;
            const { type, chunk } = waitLoaderType(target);

            if (!WAPI.prototype.Chat || !WAPI.prototype.Contact) {
                if (!!type && (type === "meta" || type === "webpack")) {
                    let modStore = {};

                    if (type === "meta") {
                        getStore(chunk, modStore);
                    } else {
                        let mID = `parasite${Date.now()}`;
                        chunk.push([[mID], {}, (o) => getStore(o, modStore)]);
                    }

                    modStore = Object.assign({}, modStore, { Debug: target["Debug"] });
                    return new WAPI(_token, modStore);
                } else {
                    console.error("Failed to load WAPI Module!");
                }
            } else {
                return new WAPI(_token);
            }
        }
    };
})();

export default WAPI;
