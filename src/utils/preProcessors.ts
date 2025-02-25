import WAPI from "../..";
import { Chat } from "../structures";

type KindOfChat = WA.ChatModel | WAPI.Chat;

const preProcessors = (app: WAPI) => {
    return {
        /** Generate and get new MsgKey Object */
        msgKey: async function msgKey(chat: WA.ChatModel) {
            return new app.MsgKey({
                from: app.ME.id,
                to: chat.id,
                id: await app.MsgKey.newId(),
                participant: chat.isGroup ? app.ME.id : undefined,
                selfDir: "out",
            });
        },
        /** Generate base WA.Message Object */
        generateBaseMessage: async function generateBaseMessage(content: any, chat: KindOfChat) {
            let useChat = chat instanceof Chat ? chat.raw : chat;

            if (typeof content === "string" && !!content) {
                return (await app.MsgUtils.createTextMsgData(useChat, content)) as WA.MessageModel;
            }

            const newMsgKey = await this.msgKey(useChat),
                ephemeralFields = app.EphemeralFields.getEphemeralFields(useChat);

            return {
                id: newMsgKey,
                ack: 0,
                body: content,
                from: app.ME.id,
                to: useChat.id,
                local: true,
                self: "out",
                t: parseInt(`${new Date().getTime() / 1000}`),
                isNewMsg: true,
                type: "chat",
                viewMode: "VISIBLE",
                ...ephemeralFields,
            } as WA.MessageModel;
        },
        /** Generate Link Preview data Object */
        generateLinkPreview: async function generateLinkPreview(content: string) {
            const link = app.Validators.findLink(content);
            if (!link) return null;

            const preview = await app.LinkPreview.getLinkPreview(link);
            if (preview && preview?.data) {
                let { data, url } = preview;
                return {
                    ...data,
                    url,
                    subtype: "url",
                    preview: true,
                };
            }
            return null;
        },
        processMedia: async function processMedia(media: WA.MediaPreparation) {
            let [_media, _filehash] = await (async function (m: WA.MediaPreparation) {
                let media = await m.waitForPrep(),
                    { mediaBlob, filehash } = media;

                media.mediaBlob = !(mediaBlob instanceof app.OpaqueData)
                    ? await app.OpaqueData.createFromData(mediaBlob, mediaBlob.type)
                    : mediaBlob;

                return [media, filehash];
            })(media);

            if (!_filehash) throw new Error("Filehash not found");

            let mediaObject = app.MediaObject.getOrCreateMediaObject(_filehash),
                mediaBlob = mediaObject.mediaBlob;

            if (_media.mediaBlob instanceof app.OpaqueData) {
                _media.mediaBlob.autorelease();
                _media.mediaBlob = mediaBlob;

                _media.renderableUrl = mediaBlob.url();
                mediaObject.consolidate(_media.toJSON());
                _media.mediaBlob.autorelease();
            }

            // let _media = await media.waitForPrep();

            // if (!(_media.mediaBlob instanceof app.OpaqueData)) {
            //     _media.mediaBlob = await app.OpaqueData.createFromData(_media.mediaBlob, _media.mediaBlob.type);
            // }

            // let _fileHash = _media.filehash;
        },
        /** Process File to Media Data for Message Attachment */
        processMediaData: async function processMediaData(
            media: File | Blob | WAPI.MediaInput,
            { forceVoice, forceDocument, forceGif, forceHD }: WAPI.MediaProcessOptions = {}
        ) {
            const file = await app.fileUtils.mediaInfoToBlob(media);
            const mediaPrepOpt = ((hd) => {
                let configName = `web_image_max${hd ? "_hd_" : "_"}edge`,
                    maxDimension = app.ABProps.getABPropConfigValue(configName) as number;
                return {
                    asDocument: forceDocument,
                    asGif: forceGif,
                    maxDimension,
                };
            })(forceHD);
            console.log(`file`, file, `mediaPrepOpt:`, mediaPrepOpt);
            const mData = await app.OpaqueData.createFromData(file, file.type);
            console.log(`mData:`, mData);
            const mediaPrep = app.MediaPrep.prepRawMedia(mData, mediaPrepOpt); // a, e = WA.ChatModel, f  = msg
            console.log(`mediaPrep:`, mediaPrep);
            const mediaData = await mediaPrep.waitForPrep();
            console.log(`mediaData:`, mediaData);
            const mediaObject = app.MediaObject.getOrCreateMediaObject(mediaData.filehash);

            const mediaType = app.MediaTypes.msgToMediaType({
                type: mediaData.type,
                isGif: mediaData.isGif,
            });

            if (forceVoice && mediaData.type === "audio") {
                mediaData.type = "ptt" as WA.MessageTypes;
                const waveform = mediaObject.contentInfo.waveform;
                let audioFile = app.fileUtils.blobToFile(file, "audio.ogg");
                mediaData.waveform = waveform ?? (await app.fileUtils.generateWaveform(audioFile));
            }

            if (forceGif && mediaData.type === "video") {
                mediaData.isGif = true;
            }

            if (forceDocument) {
                mediaData.type = "document" as WA.MessageTypes;
            }

            if (!(mediaData.mediaBlob instanceof app.OpaqueData)) {
                mediaData.mediaBlob = await app.OpaqueData.createFromData(
                    mediaData.mediaBlob,
                    mediaData.mediaBlob.type
                );
            }

            mediaData.renderableUrl = mediaData.mediaBlob.url();
            mediaObject.consolidate(mediaData.toJSON());
            mediaData.mediaBlob.autorelease();

            const uploadedMedia = await app.MediaUpload.uploadMedia({
                mimetype: mediaData.mimetype,
                mediaObject,
                mediaType,
            });

            const mediaEntry = uploadedMedia.mediaEntry;
            if (!mediaEntry) {
                throw new Error("upload failed: media entry was not created");
            }

            mediaData.set({
                filehash: mediaObject.filehash,
                size: mediaObject.size,
                streamingSidecar: mediaEntry.sidecar,
                firstFrameSidecar: mediaEntry.firstFrameSidecar,
                clientUrl: mediaEntry.mmsUrl as string,
                deprecatedMms3Url: mediaEntry.deprecatedMms3Url as string,
                directPath: mediaEntry.directPath as string,
                mediaKey: mediaEntry.mediaKey as string,
                mediaKeyTimestamp: mediaEntry.mediaKeyTimestamp as number,
                encFilehash: mediaEntry.encFilehash as string,
                uploadhash: mediaEntry.uploadHash as string,
            });

            return mediaData;
        },
        processMediaMessage: async function processMediaMessage(
            media: File | Blob | WAPI.MediaInput,
            { forceVoice, forceDocument, forceGif, forceHD }: WAPI.MediaProcessOptions = {}
        ) {
            const file = await app.fileUtils.mediaInfoToBlob(media);
            const mediaPrepOpt = ((hd) => {
                let configName = `web_image_max${hd ? "_hd_" : "_"}edge`,
                    maxDimension = app.ABProps.getABPropConfigValue(configName) as number;
                return {
                    asDocument: forceDocument,
                    asGif: forceGif,
                    maxDimension,
                };
            })(forceHD);
            console.log(`file`, file, `mediaPrepOpt:`, mediaPrepOpt);
            const mData = await app.OpaqueData.createFromData(file, file.type);
            console.log(`mData:`, mData);
            return app.MediaPrep.prepRawMedia(mData, mediaPrepOpt); // a, e = WA.ChatModel, f  = msg
        },
        /** Process File or Media Info 'image/webp' type for Sticker attachment */
        processStickerData: async function processStickerData(
            media: File | Blob | WAPI.MediaInput
        ) {
            const { mediaInfoToFile, getFileHash, generateHash, getMimeType } = app.fileUtils;

            let mimetype = await (async (m) => {
                return m instanceof Blob ? (await getMimeType(m)) ?? m.type : m.mimetype;
            })(media);
            if (mimetype !== "image/webp") throw new Error("Invalid media type");

            const file = mediaInfoToFile(media),
                filehash = await getFileHash(file),
                mediaKey = await generateHash(32);

            const uploadedInfo = await app.UploadUtils.encryptAndUpload({
                blob: file,
                type: "sticker",
                signal: new AbortController().signal,
                mediaKey,
            });

            return {
                ...uploadedInfo,
                clientUrl: uploadedInfo.url,
                deprecatedMms3Url: uploadedInfo.url,
                uploadhash: uploadedInfo.encFilehash,
                size: file.size,
                type: "sticker",
                filehash,
            } as WA.StickerData;
        },
    };
};

export default preProcessors;
