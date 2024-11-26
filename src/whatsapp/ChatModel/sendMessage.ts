import WAPI from "../../../index";

const sendMessage: (app: WAPI) => PropertyDescriptor & ThisType<WA.ChatModel> = (app: WAPI) => {
    return {
        value: async function sendMessage(
            content: string | WA.kindOfAttachment,
            options?: WAPI.SendMessageOptions
        ) {
            if (typeof content !== "string") {
                options = {
                    ...options,
                    attachment: content,
                } as WAPI.SendMessageOptions;
            }
            let attOptions: WA.attcOptions | undefined;
            /** If 'attachment' options is set */
            if (options?.attachment) {
                let {
                    attachment,
                    caption,
                    isViewOnce,
                    sendAsHD,
                    sendAudioAsVoice,
                    sendMediaAsSticker,
                    sendVideoAsGif,
                    sendMediaAsDocument,
                } = options;

                if (attachment instanceof File) {
                    let mediaOpt: WAPI.MediaProcessOptions = {
                        forceVoice: Boolean(sendAudioAsVoice),
                        forceDocument: Boolean(sendMediaAsDocument),
                        forceGif: Boolean(sendVideoAsGif),
                        forceHD: Boolean(sendAsHD),
                    };

                    attOptions = (
                        sendMediaAsSticker
                            ? await app.preProcessors.processStickerData(attachment)
                            : await app.preProcessors.processMediaData(attachment, mediaOpt)
                    ) as WA.attcOptions;
                } else {
                    attOptions = attachment as WA.attcOptions;
                }

                attOptions.caption = caption;

                content = (!sendMediaAsSticker && attOptions?.preview) ?? "";

                attOptions.isViewOnce = Boolean(isViewOnce);

                delete options.attachment;
                // delete options.sendMediaAsSticker;
            }

            /** If 'linkPreview' is setted 'true' */
            if (options?.linkPreview) {
                content = typeof content === "string" ? content : "";
                options = {
                    ...options,
                    ...(await app.preProcessors.generateLinkPreview(content)),
                };
                delete options.linkPreview;
            }

            /** Not support for Quoted Message yet */
            let quotedMsgOptions = {};
            // if (options?.quotedMessageId) {
            //     let quotedMessage = await app.Msg.getMessagesById([options.quotedMessageId]);
            //     if (quotedMessage["messages"].length != 1) {
            //         throw new Error("Could not get the quoted message.");
            //     }

            //     quotedMessage = quotedMessage["messages"][0];

            //     // TODO remove .canReply() once all clients are updated to >= v2.2241.6
            //     const canReply = window.Store.ReplyUtils
            //         ? window.Store.ReplyUtils.canReplyMsg(quotedMessage.unsafe())
            //         : quotedMessage.canReply();

            //     if (canReply) {
            //         quotedMsgOptions = quotedMessage.msgContextInfo(chat);
            //     }
            //     delete options.quotedMessageId;
            // }

            /** Not support for Mentioning yet */
            let mentionedJidList = [];
            // if (options?.mentionedJidList) {
            //     options.mentionedJidList = await Promise.all(
            //         options.mentionedJidList.map(async (id) => {
            //             const wid = window.Store.WidFactory.createWid(id);
            //             if (await window.Store.QueryExist(wid)) {
            //                 return wid;
            //             }
            //         })
            //     );
            //     options.mentionedJidList = options.mentionedJidList.filter(Boolean);
            // }

            /** Not support for Group Mentioning yet */
            let groupMentions = [];
            // if (options?.groupMentions) {
            //     options.groupMentions = options.groupMentions.map((e) => ({
            //         groupSubject: e.subject,
            //         groupJid: window.Store.WidFactory.createWid(e.id),
            //     }));
            // }

            /** Not support for Location message yet */
            let locationOptions = {};
            // if (options?.location) {
            //     let { latitude, longitude, description, url } = options.location;
            //     url = window.Store.Validators.findLink(url)?.href;
            //     url && !description && (description = url);
            //     locationOptions = {
            //         type: "location",
            //         loc: description,
            //         lat: latitude,
            //         lng: longitude,
            //         clientUrl: url,
            //     };
            //     delete options.location;
            // }

            /** Not support for Polling message yet */
            let _pollOptions = {};
            // if (options?.poll) {
            //     const { pollName, pollOptions } = options.poll;
            //     const { allowMultipleAnswers, messageSecret } = options.poll.options;
            //     _pollOptions = {
            //         type: "poll_creation",
            //         pollName: pollName,
            //         pollOptions: pollOptions,
            //         pollSelectableOptionsCount: allowMultipleAnswers ? 0 : 1,
            //         messageSecret:
            //             Array.isArray(messageSecret) && messageSecret.length === 32
            //                 ? new Uint8Array(messageSecret)
            //                 : window.crypto.getRandomValues(new Uint8Array(32)),
            //     };
            //     delete options.poll;
            // }

            /** Not support for VCard message yet */
            let vcardOptions = {};
            // if (options?.contactCard) {
            //     let contact = window.Store.Contact.get(options.contactCard);
            //     vcardOptions = {
            //         body: window.Store.VCard.vcardFromContactModel(contact).vcard,
            //         type: "vcard",
            //         vcardFormattedName: contact.formattedName,
            //     };
            //     delete options.contactCard;
            // } else if (options.contactCardList) {
            //     let contacts = options.contactCardList.map((c) => window.Store.Contact.get(c));
            //     let vcards = contacts.map((c) => window.Store.VCard.vcardFromContactModel(c));
            //     vcardOptions = {
            //         type: "multi_vcard",
            //         vcardList: vcards,
            //         body: undefined,
            //     };
            //     delete options.contactCardList;
            // } else if (
            //     options.parseVCards &&
            //     typeof content === "string" &&
            //     content.startsWith("BEGIN:VCARD")
            // ) {
            //     delete options.parseVCards;
            //     try {
            //         const parsed = window.Store.VCard.parseVcard(content);
            //         if (parsed) {
            //             vcardOptions = {
            //                 type: "vcard",
            //                 vcardFormattedName: window.Store.VCard.vcardGetNameFromParsed(parsed),
            //             };
            //         }
            //     } catch (_) {
            //         // not a vcard
            //     }
            // }

            /** Not support for buttons message yet */
            let buttonOptions = {};
            // if (options?.buttons) {
            //     let caption;
            //     if (options.buttons.type === "chat") {
            //         content = options.buttons.body;
            //         caption = content;
            //     } else {
            //         caption = options.caption ? options.caption : " "; //Caption can't be empty
            //     }
            //     buttonOptions = {
            //         productHeaderImageRejected: false,
            //         isFromTemplate: false,
            //         isDynamicReplyButtonsMsg: true,
            //         title: options.buttons.title ? options.buttons.title : undefined,
            //         footer: options.buttons.footer ? options.buttons.footer : undefined,
            //         dynamicReplyButtons: options.buttons.buttons,
            //         replyButtons: options.buttons.buttons,
            //         caption: caption,
            //     };
            //     delete options.buttons;
            // }

            /** Not support for list Options message yet */
            let listOptions = {};
            // if (options?.list) {
            //     if (window.Store.Conn.platform === "smba" || window.Store.Conn.platform === "smbi") {
            //         throw "[LT01] Whatsapp business can't send this yet";
            //     }
            //     listOptions = {
            //         type: "list",
            //         footer: options.list.footer,
            //         list: {
            //             ...options.list,
            //             listType: 1,
            //         },
            //         body: options.list.description,
            //     };
            //     delete options.list;
            //     delete listOptions.list.footer;
            // }

            /** Not support for bot sender yet */
            const botOptions = {};
            // if (options.invokedBotWid) {
            //     botOptions.messageSecret = window.crypto.getRandomValues(new Uint8Array(32));
            //     botOptions.botMessageSecret = await window.Store.BotSecret.genBotMsgSecretFromMsgSecret(
            //         botOptions.messageSecret
            //     );
            //     botOptions.invokedBotWid = window.Store.WidFactory.createWid(options.invokedBotWid);
            //     botOptions.botPersonaId = window.Store.BotProfiles.BotProfileCollection.get(
            //         options.invokedBotWid
            //     ).personaId;
            //     delete options.invokedBotWid;
            // }

            // const meUser = app.MeUtils.getMaybeMeUser();
            // const newId = await app.MsgKey.newId();

            // const newMsgId = new app.MsgKey({
            //     from: meUser,
            //     to: this.id,
            //     id: newId,
            //     participant: this.id.isGroup() ? meUser : undefined,
            //     selfDir: "out",
            // });

            /** Set additional options */
            let extraOptions = {};
            if (options?.extraOptions) {
                extraOptions = options.extraOptions;
                delete options.extraOptions;
            }

            const baseMessage = await app.preProcessors.generateBaseMessage(content, this);
            const message: WA.MessageModel = {
                ...options,
                ...baseMessage,
                ...locationOptions, // Not supported yet
                ..._pollOptions, // Not supported yet
                ...attOptions,
                ...(attOptions?.toJSON ? attOptions?.toJSON() : {}),
                ...quotedMsgOptions, // Not supported yet
                ...vcardOptions, // Not supported yet
                ...buttonOptions, // Not supported yet
                ...listOptions, // Not supported yet
                ...botOptions, // Not supported yet
                ...extraOptions,
            };

            if (this.hasDraftMessage) this.clearDraft();
            if (!this.active) await this.open();

            let [_, res] = await Promise.all(await app.MsgUtils.addAndSendMsgToChat(this, message));

            return Boolean(options?.ret) ? this.getModel() : res;
        },
        enumerable: true,
    };
};

export default sendMessage;
