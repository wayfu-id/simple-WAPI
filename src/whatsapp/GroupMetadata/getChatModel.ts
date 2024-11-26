import WAPI from "../../../index";

const getChatModel: (app: WAPI) => PropertyDescriptor & ThisType<WA.GroupModel> = (app: WAPI) => {
    return {
        value: async function getChatModel() {
            let chat = await app.Chat.find(this.id);
            return chat ? app.factories("Chat", chat) : null;
        },
        enumerable: true,
    };
};

export default getChatModel;
