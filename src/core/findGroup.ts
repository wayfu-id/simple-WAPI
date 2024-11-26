import WAPI from "../../index";

const findGroup: PropertyDescriptor & ThisType<WAPI> = {
    value: async function findGroup(id: string | WA.wid) {
        let _id = ((e) => {
            if (typeof e === "string") {
                e = e.replace(/([0-9\-]{16,})[@a-z\.]*/g, `$1@g.us`);
                return this.WidFactory.createWid(e);
            } else if (typeof e.isGroup === "function" && e.isGroup()) {
                return e;
            }
            return null;
        })(id);
        if (!_id) return null;

        let group;
        try {
            group = await this.GroupMetadata.find(_id);
        } catch (e) {
            console.log(e);
        }
        return group ? this.factories("Group", group) : null;
    },
};

export default findGroup;
