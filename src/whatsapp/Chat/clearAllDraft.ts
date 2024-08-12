const clearAllDraft: PropertyDescriptor & ThisType<WA.Chat> = {
    value: function clearAllDraft() {
        return this.getModelsArray().every((c) => {
            let { hasDraftMessage } = c;
            if (hasDraftMessage) c.clearDraft();
            return !c.hasDraftMessage;
        });
    },
    enumerable: true,
};

export default clearAllDraft;
