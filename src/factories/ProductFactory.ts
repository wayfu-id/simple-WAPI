import WAPI from "../..";
import { _authToken } from "../Loader";

export default class ProductFactory {
    static create(app: WAPI, data: WA.ProductModel) {
        const { Product } = app.ModelClass;
        return new Product(_authToken, app, data);
    }
}
