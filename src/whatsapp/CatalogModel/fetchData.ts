import WAPI from "../../../index";

const fetchData: (app: WAPI) => PropertyDescriptor & ThisType<WA.CatalogModel> = (app: WAPI) => {
    return {
        value: async function fetchData() {
            return (await app.Catalog.find(this.id)) ?? null;
        },
        enumerable: true,
    };
};

export default fetchData;
