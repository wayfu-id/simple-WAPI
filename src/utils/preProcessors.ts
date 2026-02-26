import WAPI from "../..";
import { Chat, Product } from "../structures";

type KindOfChat = WA.ChatModel | WAPI.Chat;

const preProcessors = (app: WAPI) => {
    const { ABProps, Contact, ME, MediaPrep, MediaTypes, OpaqueData } = app, // Precache some used original `WAWeb` properties and classes for better performance
        fromId = ME && ME.id ? ME.id : Contact.getMeContact().id;

    return {
        /** Generate base WA.Message Object */
        generateBaseMessage: async function generateBaseMessage(content: any, chat: KindOfChat) {
            const { MsgUtils, EphemeralFields } = app;
            let useChat = chat instanceof Chat ? chat.raw : chat;

            if (typeof content === "string" && !!content) {
                return (await MsgUtils.createTextMsgData(useChat, content)) as WA.MessageModel;
            }

            const newMsgKey = await this.generateMsgKey(useChat),
                ephemeralFields = EphemeralFields.getEphemeralFields(useChat);

            return {
                id: newMsgKey,
                ack: 0,
                body: "",
                from: fromId,
                to: useChat.id,
                local: true,
                self: "out",
                t: parseInt(`${new Date().getTime() / 1000}`),
                isNewMsg: true,
                ...ephemeralFields,
            } as WA.MessageModel;
        },
        /** Generate Link Preview data Object */
        generateLinkPreview: async function generateLinkPreview(content: string) {
            const { LinkPreview, Validators } = app,
                link = Validators.findLink(content);

            if (!link) return null;
            const preview = await LinkPreview.getLinkPreview(link);

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
        /** Generate and get new MsgKey Object */
        generateMsgKey: async function generateMsgKey(chat: WA.ChatModel) {
            const { MsgKey } = app;

            return new MsgKey({
                from: fromId,
                to: chat.id,
                id: await MsgKey.newId(),
                participant: chat.isGroup ? fromId : undefined,
                selfDir: "out",
            });
        },
        /** Process File to Media Data for Message Attachment */
        processMediaData: async function processMediaData(
            media: File | Blob | WAPI.MediaInput | WAPI.Product,
            { forceVoice, forceDocument, forceGif, forceHD }: WAPI.MediaProcessOptions = {},
        ) {
            const { BlobCache, fileUtils, MediaDataUtils, MediaObject, MediaUpload } = app;
            const file = media instanceof Product ? media.getFile() : fileUtils.mediaInfoToFile(media);
            if (!file) throw new Error("Invalid media input");
            const opaqueData = await OpaqueData.createFromData(file, file.type);
            const mediaParams = ((hd) => {
                let configName = `web_image_max${hd ? "_hd_" : "_"}edge`,
                    maxDimension = ABProps.getABPropConfigValue(configName) as number;
                return {
                    asDocument: forceDocument,
                    asGif: forceGif,
                    maxDimension,
                };
            })(forceHD);

            const mediaPrep = MediaPrep.prepRawMedia(opaqueData, mediaParams);
            const mediaData = await mediaPrep.waitForPrep();
            const mediaObject = MediaObject.getOrCreateMediaObject(mediaData.filehash);
            const mediaType = MediaTypes.msgToMediaType({
                type: mediaData.type,
                isGif: mediaData.isGif,
            });

            if (!mediaData.filehash) {
                throw new Error("media-fault: sendToChat filehash undefined");
            }

            if (forceVoice && mediaData.type === "ptt") {
                const waveform = mediaObject.contentInfo.waveform;
                mediaData.waveform = waveform || (await fileUtils.generateWaveform(file));
            }

            if (!(mediaData.mediaBlob instanceof OpaqueData)) {
                mediaData.mediaBlob = await OpaqueData.createFromData(
                    mediaData.mediaBlob,
                    mediaData.mediaBlob.type,
                );
            }

            mediaData.renderableUrl = mediaData.mediaBlob.url();
            mediaObject.consolidate(mediaData.toJSON());

            mediaData.mediaBlob.autorelease();
            const shouldUseMediaCache = MediaDataUtils.shouldUseMediaCache(
                MediaTypes.castToV4(mediaObject.type),
            );
            if (shouldUseMediaCache && mediaData.mediaBlob instanceof OpaqueData) {
                const formData = mediaData.mediaBlob.formData();
                BlobCache.InMemoryMediaBlobCache.put(mediaObject.filehash, formData);
            }

            const dataToUpload = {
                mimetype: mediaData.mimetype,
                mediaObject,
                mediaType,
            };

            const uploadedMedia = await MediaUpload.uploadMedia(dataToUpload),
                mediaEntry = uploadedMedia.mediaEntry;

            if (!mediaEntry) {
                throw new Error("upload failed: media entry was not created");
            }

            mediaData.set({
                clientUrl: mediaEntry.mmsUrl,
                deprecatedMms3Url: mediaEntry.deprecatedMms3Url,
                directPath: mediaEntry.directPath,
                mediaKey: mediaEntry.mediaKey,
                mediaKeyTimestamp: mediaEntry.mediaKeyTimestamp,
                encFilehash: mediaEntry.encFilehash,
                uploadhash: mediaEntry.uploadHash,
                filehash: mediaObject.filehash,
                size: mediaObject.size,
                streamingSidecar: mediaEntry.sidecar,
                firstFrameSidecar: mediaEntry.firstFrameSidecar,
                mediaHandle: null,
            });

            return mediaData;
        },
        /** Process File to Media message Attachment */
        processMediaMessage: async function processMediaMessage(
            media: File | Blob | WAPI.MediaInput,
            { forceImage, forceDocument, forceGif, forceHD }: WAPI.MediaProcessOptions = {},
        ) {
            const { fileUtils } = app;
            const file = fileUtils.mediaInfoToFile(media);
            const mediaPrepOpt = ((hd) => {
                let configName = `web_image_max${hd ? "_hd_" : "_"}edge`,
                    maxDimension = ABProps.getABPropConfigValue(configName) as number;
                return {
                    asDocument: forceDocument,
                    asGif: forceGif,
                    maxDimension,
                };
            })(forceHD);
            const type = forceImage ? "image/jpeg" : file.type; // override the type to `image/*` if setted to `forceImage` is true;
            // console.log(`file`, file, `mediaPrepOpt:`, mediaPrepOpt);
            const mData = await OpaqueData.createFromData(file, type);
            // console.log(`mData:`, mData);
            return MediaPrep.prepRawMedia(mData, mediaPrepOpt);
        },
        /** Process File or Media Info 'image/webp' type for Sticker attachment */
        processStickerData: async function processStickerData(media: File | Blob | WAPI.MediaInput) {
            const {
                fileUtils: { mediaInfoToFile, getFileHash, generateHash, getMimeType },
                UploadUtils,
            } = app;

            let mimetype = await (async (m) => {
                return m instanceof Blob ? ((await getMimeType(m)) ?? m.type) : m.mimetype;
            })(media);
            if (mimetype !== "image/webp") throw new Error("Invalid media type");

            const file = mediaInfoToFile(media);
            let filehash = await getFileHash(file),
                mediaKey = await generateHash(32);

            const controller = new AbortController(),
                uploadedInfo = await UploadUtils.encryptAndUpload({
                    blob: file,
                    type: "sticker",
                    signal: controller.signal,
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
        /** Process Product Object into Message */
        processProductMessage: function processProductMessage(product: WA.ProductModel | WAPI.Product) {
            const { MsgTypes, BusinessUtils } = app;
            let useProduct = product instanceof Product ? product.raw : product;

            return {
                type: MsgTypes.MSG_TYPE.PRODUCT,
                businessOwnerJid: fromId.toJid(),
                productId: useProduct.id.toString(),
                url: useProduct.url,
                productImageCount: useProduct.getProductImageCollectionCount(),
                title: useProduct.name,
                description: useProduct.description,
                currencyCode: useProduct.currency,
                priceAmount1000: useProduct.priceAmount1000,
                salePriceAmount1000: BusinessUtils.isSalePriceActive(useProduct)
                    ? useProduct.salePriceAmount1000
                    : null,
                // caption: useProduct.description,
            };
        },
    };
};

export default preProcessors;
