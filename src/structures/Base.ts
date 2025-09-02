import WAPI from "../../index";

export type BaseSerialized<o extends WA.wid | string> = {
    id: o;
    name: string | undefined;

    /** Default properties */
    [k: string]: any | undefined;
};

/**
 * Represents a WhatsApp data structure
 */
export default class Base<T extends Object, K extends Object> {
    app: WAPI;
    raw: T;
    _serialized: K;

    constructor(app: WAPI) {
        /**
         * The main app that instantiated this
         * @type {WAPI} app
         * @readonly
         */
        this.app = app;
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
