import { Group } from "../structures/index.js";

export default class GroupFactory {
    static create(app, data) {
        return new Group(app, data);
    }
}
