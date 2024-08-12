import WAPI from "../../index";

type BaseSerialized<o extends WA.wid> = {
    id: o;
    name: string | undefined;

    /** Default properties */
    [k: string]: any | undefined;
};

/**
 * Represents a WhatsApp data structure
 */
export default class Base<T extends Object & { id: WA.wid }, K extends Object> {
    app: WAPI;
    raw: T;
    _serialized: BaseSerialized<T["id"]> & K;

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
