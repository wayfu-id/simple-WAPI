import WAPI from "../..";
import Base from "./Base";
import Product from "./Product";

type T = WA.CatalogModel;

export default class Catalog extends Base<T, {}> {
    afterCursor: string;
    hasCatalogCategories?: boolean;
    id: WA.CatalogId;
    index?: number;
    isState?: boolean;
    lastUsedCountryCode?: string;
    msgProductCollection: WA.Product;
    productCollection: WA.Product;

    raw: WA.CatalogModel;

    constructor(app: WAPI, data: WA.CatalogModel) {
        super(app);
        if (!data) throw new Error("No Data Objct");
        this._patch(data);

        return this;
    }

    _patch(data: T) {
        super._patch(data);
        this.afterCursor = data.afterCursor;
        this.hasCatalogCategories = data.hasCatalogCategories;
        this.id = data.id;
        this.index = data.index;
        this.isState = data.isState;
        this.lastUsedCountryCode = data.lastUsedCountryCode;
        this.msgProductCollection = data.msgProductCollection;
        this.productCollection = data.productCollection;

        this.raw = data;

        return data;
    }

    async fetchProducts() {
        return await this.raw.fetchProducts();
    }

    get Products() {
        if (!this.productCollection) return null;
        return this.productCollection.getProductModels().map((p) => {
            return p.getModel();
        });
    }
}
