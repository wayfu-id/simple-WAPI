const clearDraft: PropertyDescriptor & ThisType<WA.ChatModel> = {
    value: function clearDraft() {
        this.setComposeContents({ text: "", timestamp: Date.now() });
        this.unset("draftMessage");
        return this;
    },
    enumerable: true,
};

export default clearDraft;
