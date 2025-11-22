import WAPI from "../../../index";

const historySync: (app: WAPI) => PropertyDescriptor & ThisType<WA.ChatModel> = (app: WAPI) => {
    return {
        value: async function historySync() {
            if (this.endOfHistoryTransferType === 0) {
                await app.HistorySync.sendPeerDataOperationRequest(3, {
                    chatId: this.id,
                });
                return true;
            }
            return false;
        },
        enumerable: true,
    };
};

export default historySync;
