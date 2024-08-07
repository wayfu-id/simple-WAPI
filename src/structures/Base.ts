import WAPI from "../../types";
/**
 * Represents a WhatsApp data structure
 */
export default class Base<T extends Object> implements WAPI.Base<T> {
    app: WAPI;
    raw: T;
    _serialized: any;

    constructor(app: WAPI) {
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

    _patch(data: T) {
        /**
         * Raw Data
         * @type {any}
         */
        this.raw = data;
        return data;
    }
}
