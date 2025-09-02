import WAPI from "../..";
import { Catalog } from "../structures/index";

export default class CatalogFactory {
    static create(app: WAPI, data: WA.CatalogModel) {
        return new Catalog(app, data);
    }
}
