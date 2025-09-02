import WAPI from "../../../index";

const fetchData: (app: WAPI) => PropertyDescriptor & ThisType<WA.BusinessProfileModel> = (app: WAPI) => {
    return {
        value: async function fetchData() {
            return (await app.BusinessProfile.find(this.id)) ?? null;
        },
        enumerable: true,
    };
};

export default fetchData;
