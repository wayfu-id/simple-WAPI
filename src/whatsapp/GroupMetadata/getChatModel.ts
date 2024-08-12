import WAPI from "../../../index";
import { ChatFactory } from "../../factories/index";

const getChatModel: (app: WAPI) => PropertyDescriptor & ThisType<WA.GroupModel> = (app: WAPI) => {
    return {
        value: async function getChatModel() {
            let chat = await app.Chat.find(this.id);
            return chat ? ChatFactory.create(app, chat) : null;
        },
        enumerable: true,
    };
};

export default getChatModel;
