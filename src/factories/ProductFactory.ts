import WAPI from "../..";
import { Product } from "../structures/index";

export default class ProductFactory {
    static create(app: WAPI, data: WA.ProductModel) {
        return new Product(app, data);
    }
}
