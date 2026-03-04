import WAPI from "../../index";
import { _authToken } from "../Loader";

export default class GroupFactory {
    static create(app: WAPI, data: WA.GroupModel) {
        const { Group } = app.ModelClass;
        return new Group(_authToken, app, data);
    }
}
