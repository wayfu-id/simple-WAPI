import WAPI from "../../index";
import { Group } from "../structures/index";

export default class GroupFactory {
    static create(app: WAPI, data: WA.GroupModel) {
        return new Group(app, data);
    }
}
