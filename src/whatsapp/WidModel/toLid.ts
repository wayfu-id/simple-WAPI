import WAPI from "../../../index";

const toLid: (app: WAPI) => PropertyDescriptor & ThisType<WA.wid> = (app: WAPI) => {
    return {
        value: function toLid() {
            return this.isLid() ? (this as WA.Lid) : app.LidUtils.getCurrentLid(this);
        },
        enumerable: true,
    };
};

export default toLid;
