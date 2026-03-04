import WAPI from "../..";
import { _authToken } from "../Loader";

export default class CatalogFactory {
    static create(app: WAPI, data: WA.CatalogModel) {
        const { Catalog } = app.ModelClass;
        return new Catalog(_authToken, app, data);
    }
}
