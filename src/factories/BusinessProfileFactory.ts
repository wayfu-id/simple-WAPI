import WAPI from "../..";
import { BusinessProfile } from "../structures/index";

export default class BusinessProfileFactory {
    static create(app: WAPI, data: WA.BusinessProfileModel) {
        return new BusinessProfile(app, data);
    }
}
