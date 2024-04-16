/**
 * @typedef {import("../../index").default} WAPI
 * @typedef {import("../../index").default.Base} WAPI.Base
 */

/**
 * Represents a WhatsApp data structure
 * @type {WAPI.Base}
 */
export default class Base {
    constructor(app) {
        /**
         * The main app that instantiated this
         * @type {WAPI} app
         * @readonly
         */
        this.app = app;

        this._serialized = {};
        // Object.defineProperty(this, "app", { value: app });
    }

    _clone() {
        return Object.assign(Object.create(this), this);
    }

    _patch(data) {
        /**
         * Raw Data
         * @type {any}
         */
        this.raw = data;
        return data;
    }
}
