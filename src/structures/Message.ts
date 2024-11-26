import WAPI from "../..";
import Base from "./Base";
import MessageMedia from "./MessageMedia";

type T = WA.MessageModel;

export default class Message extends Base<T, { [k: string]: any }> {
    ack: number;
    author: string;
    body: string;
    businessOwnerJid?: object;
    broadcast: boolean;
    description?: string;
    deviceType: string;
    duration?: string;
    forwardingScore: number;
    from: string;
    fromMe: boolean;
    hasMedia: boolean;
    hasQuotedMsg: boolean;
    hasReaction: boolean;
    id: WA.MsgKeyObj;
    isEphemeral: boolean;
    isForwarded: boolean;
    isGif: boolean;
    isStarred: boolean;
    isStatus: boolean;
    latestEditMsgKey?: number;
    latestEditSenderTimestampMs?: number;
    links: Array<{ link: string; isSuspicious: boolean }>;
    mediaData?: WA.MediaData;
    mediaKey?: string;
    orderId?: string;
    productId?: string;
    timestamp: number;
    title?: string;
    to: string;
    token?: string;
    type: WA.MessageTypes;

    constructor(app: WAPI, data: T) {
        super(app);

        if (data) this._patch(data);
        return this;
    }

    _patch(data: T): T {
        super._patch(data);
        /** MediaKey that represents the sticker 'ID' */
        this.mediaKey = data.mediaKey;

        /** ID that represents the message */
        this.id = data.id;

        /** ACK status for the message */
        this.ack = data.ack;

        /** Indicates if the message has media available for download */
        this.hasMedia = Boolean(data.mediaKey && data.directPath);

        this.mediaData = data.mediaData;

        /** Message content */
        this.body = this.hasMedia ? data.caption || "" : data.body || data.pollName || "";

        /** Message type */
        this.type = data.type;

        /** Unix timestamp for when the message was created */
        this.timestamp = data.t;

        /** ID for the Chat that this message was sent to, except if the message was sent by the current user. */
        this.from = data.from?._serialized ?? data.from;

        /**
         * ID for who this message is for.
         *
         * If the message is sent by the current user, it will be the Chat to which the message is being sent.
         * If the message is sent by another user, it will be the ID for the current user.
         */
        this.to = data.to?._serialized ?? data.to;

        /** If the message was sent to a group, this field will contain the user that sent the message. */
        this.author = data.author?._serialized ?? data.author;

        /** String that represents from which device type the message was sent */
        this.deviceType = (({ id }) => {
            let idx = ((_) => {
                return typeof id === "string" ? id : id._serialized;
            })(id);
            return idx.length > 21 ? "android" : idx.substring(0, 2) === "3A" ? "ios" : "web";
        })(data.id);

        /** Indicates if the message was forwarded */
        this.isForwarded = data.isForwarded;

        /**
         * Indicates how many times the message was forwarded.
         *
         * The maximum value is 127.
         */
        this.forwardingScore = data.forwardingScore || 0;

        /** Indicates if the message is a status update */
        this.isStatus = (({ isStatusV3, id }) => {
            return isStatusV3 || id.remote._serialized === "status@broadcast";
        })(data);

        /** Indicates if the message was starred */
        this.isStarred = data.star;

        /** Indicates if the message was a broadcast */
        this.broadcast = data.broadcast;

        /** Indicates if the message was sent by the current user */
        this.fromMe = data.id.fromMe;

        /** Indicates if the message was sent as a reply to another message. */
        this.hasQuotedMsg = data.quotedMsg ? true : false;

        /** Indicates whether there are reactions to the message */
        this.hasReaction = data.hasReaction ? true : false;

        /** Indicates the duration of the message in seconds */
        this.duration = data.duration ? data.duration : undefined;

        /** Order ID for message type ORDER */
        this.orderId = data.orderId ?? undefined;

        /** Order Token for message type ORDER */
        this.token = data.token ?? undefined;

        /** Indicates whether the message is a Gif */
        this.isGif = Boolean(data.isGif);

        /** Indicates if the message will disappear after it expires */
        this.isEphemeral = data.isEphemeral;

        /** Title */
        this.title = data.title;

        /** Description */
        this.description = data.description;

        /** Business Owner JID */
        this.businessOwnerJid = data.businessOwnerJid;

        /** Product ID */
        this.productId = data.productId;

        /** Last edit time */
        this.latestEditSenderTimestampMs = data.latestEditSenderTimestampMs;

        /** Last edit message author */
        this.latestEditMsgKey = data.latestEditMsgKey;

        /** Links included in the message. */
        this.links = data._links;

        return data;
    }

    async getChat() {
        let chatId = this.fromMe ? this.to : this.from;
        return this.app.findChat(chatId);
    }

    async getContact() {
        let contactId = this.author ?? this.from;
        return this.app.findContact(contactId);
    }

    async downloadMedia() {
        if (!this.hasMedia || !this.mediaData) return undefined;

        if (this.mediaData.mediaStage != "RESOLVED") {
            await this.raw.downloadMedia({ downloadEvenIfExpensive: true, rmrReason: 1 });
        }

        if (this.mediaData.mediaStage.includes("ERROR") || this.mediaData.mediaStage === "FETCHING") {
            return undefined;
        }

        try {
            let { directPath, encFilehash, filehash, mediaKey, mediaKeyTimestamp, type } = this.mediaData;

            const decryptedMedia = await this.app.Downloader.downloadAndMaybeDecrypt({
                directPath: directPath as string,
                encFilehash: encFilehash as string,
                filehash: filehash,
                mediaKeyTimestamp: mediaKeyTimestamp as number,
                mediaKey: mediaKey as string,
                type: type,
                signal: new AbortController().signal,
            });

            let { filename, size } = this.mediaData;

            const mimetype = (await this.app.fileUtils.getMimeType(decryptedMedia)) as string,
                data = await this.app.fileUtils.arrayBufferToBase64Async(decryptedMedia);

            return new MessageMedia({ filename: filename ?? "", size, mimetype, data });
        } catch (e: any) {
            if (e?.status && e?.status === 404) return undefined;
            throw e;
        }
    }
}
