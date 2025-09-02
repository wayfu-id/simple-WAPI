import WAPI from "../../../index";

const fetchProducts: (app: WAPI) => PropertyDescriptor & ThisType<WA.CatalogModel> = (app: WAPI) => {
    return {
        value: async function fetchProducts() {
            const { BusinessUtils } = app;
            let res = await BusinessUtils.queryCatalog(this.id, this.afterCursor ?? "");
            if (!res || res?.data?.length === 0) return;
            let { data, paging } = res;

            data.forEach((p) => {
                this.productCollection.gadd(BusinessUtils.mapProductResponseToModel(p, this.id));
            });
            if (paging.cursors.after !== "") {
                this.afterCursor = paging.cursors.after;
                await this.fetchProducts();
            }
            return this.productCollection.getProductModels();
        },
        enumerable: true,
    };
};

export default fetchProducts;
