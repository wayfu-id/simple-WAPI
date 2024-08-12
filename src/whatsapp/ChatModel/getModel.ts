import WAPI from "../../../index";
import { ChatFactory } from "../../factories/index";

const getModel: (app: WAPI) => PropertyDescriptor & ThisType<WA.ChatModel> = (app: WAPI) => {
    return {
        value: function getModel() {
            return ChatFactory.create(app, this);
        },
        enumerable: true,
    };
};

export default getModel;
