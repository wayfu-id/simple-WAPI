import WAPI from "../..";
import { _authToken } from "../Loader";

export default class BusinessProfileFactory {
    static create(app: WAPI, data: WA.BusinessProfileModel) {
        const { BusinessProfile } = app.ModelClass;
        return new BusinessProfile(_authToken, app, data);
    }
}
