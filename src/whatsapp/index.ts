import WAPI from "../../index";
import chat from "./Chat/index";
import chatModel from "./ChatModel/index";
import contact from "./Contact/index";
import contactModel from "./ContactModel/index";
import groupMetadata from "./GroupMetadata/index";
import messageModel from "./MessageModel/index";

/** Construct Custom Store's Chat object */
function constructChat(app: WAPI) {
    let { Chat } = app;
    try {
        let _proto_ = chat(app),
            _model_ = chatModel(app);

        Object.defineProperties(Chat.constructor.prototype, _proto_);
        Object.defineProperties(Chat.modelClass.prototype, _model_);
        return true;
    } catch (err) {
        console.error("From: Construct Chat", err);
        return false;
    }
}

/** Construct Custom Store's Contact object */
function constructContact(app: WAPI) {
    let { Contact } = app;

    try {
        let { _proto_, _core_ } = contact(app),
            _model_ = contactModel(app);

        Object.defineProperties(Contact.constructor.prototype, _proto_);
        Object.defineProperties(Contact, _core_);
        Object.defineProperties(Contact.modelClass.prototype, _model_);
        return true;
    } catch (err) {
        console.error("From: Construct Contact", err);
        return false;
    }
}

/** Construct Custom Store's GroupMetadata object */
function constructGroupMetadata(app: WAPI) {
    let { GroupMetadata } = app;

    try {
        let _model_ = groupMetadata(app);

        Object.defineProperties(GroupMetadata.modelClass.prototype, _model_);
        return true;
    } catch (err) {
        console.error("From: Construct GroupMetadata", err);
        return false;
    }
}

/** Construct Custom Store's Message object */
function constructMessage(app: WAPI) {
    let { Msg } = app;

    try {
        let _model_ = messageModel(app);

        Object.defineProperties(Msg.modelClass.prototype, _model_);
        return true;
    } catch (err) {
        console.error("From: Construct Contact", err);
        return false;
    }
}

/** Construct Custom Store object */
export function constructStore(app: WAPI) {
    let { Chat } = app;
    if (Chat.modelClass.prototype.getModel === undefined) {
        return (
            constructChat(app) &&
            constructContact(app) &&
            constructGroupMetadata(app) &&
            constructMessage(app)
        );
    }
    return true;
}

// All code bellow here is about Global namespace WA
declare global {
    namespace WA {
        export type InsertData = {
            createLocally: boolean;
            id: wid;
        };

        export type InsertOpt = {
            merge: boolean;
        };

        export type WebSCSSKey =
            | "App"
            | "LinkDeviceApiCmdTooltip"
            | "LinkDeviceCodeView"
            | "LinkDeviceQrcode"
            | "LogoutReason"
            | "LogoutLoadingScreen"
            | "LoadingScreen"
            | "StartupMd"
            | "LinkDeviceQrVideo"
            | "DrawerBlock"
            | "Name"
            | "DropdownItem"
            | "CopyPasteSelectable"
            | "CopyPasteCopyableArea"
            | "MessageLargeEmoji"
            | "Butterbar"
            | "ImgWithFallback"
            | "ProgressBar"
            | "Dropdown"
            | "ProfileImage"
            | "Header"
            | "ProductCatalogProductImageViewFlow"
            | "BotCommandSuggestionResult"
            | "ComposeBox"
            | "AttachMenuBarItemMenuDropdown"
            | "StickerSuggestionsPanelContent"
            | "ConversationLoadMoreMessagesHistorySync"
            | "ConversationMsgs"
            | "MessageStickyDateMarker"
            | "ConversationPanel"
            | "GroupDescriptionBanner"
            | "MediaPanelHeader"
            | "MediaViewerModal"
            | "ConversationPanelWrapper"
            | "IntroPanel"
            | "UserNoticeModal"
            | "Main"
            | "ChatlistHeader"
            | "NavBar"
            | "PhotoPicker"
            | "ChatIcons"
            | "ChatLastMsg"
            | "ChatMsgAck"
            | "ChatstateInfo"
            | "MessageGroupNotification"
            | "MoveResizeComponent"
            | "PipCtwaSourceButton"
            | "PipVideoControls"
            | "MultiSelectBar"
            | "PipYoutubeVideoPlayer"
            | "MessageGroupedStickerCheckbox"
            | "Wrapper"
            | "MessageUnread"
            | "MessageStickerLikeBubbleContainer"
            | "ContentPlaceholder"
            | "GuidePopup"
            | "ChatlistPanel"
            | "MixedMultiSelectBar"
            | "OfflineResumeProgressToastbar"
            | "PttButton"
            | "PttMessageStatus"
            | "MentionsPluginResult"
            | "MessageText"
            | "MediaVideoLinkPreview"
            | "GalleryMsg"
            | "QuotedMsgQuotedMedia"
            | "PaymentAmount"
            | "PaymentBackground"
            | "MenuBar"
            | "LazyLoadLoading"
            | "CellFrame"
            | "PaymentIcon"
            | "PaymentType"
            | "PanelsMenuTab"
            | "ObjectFit"
            | "EmojiPanel"
            | "EmojiPanelContentEmojiRow"
            | "EmojiPanelContentSectionScrollList"
            | "PanelsSearchInput"
            | "GifPanelGifPreview"
            | "StickerPanelContent"
            | "StickerPanelContentStickerItem"
            | "Sticker"
            | "EmojiPanelEmojiSuggestionsPanel"
            | "MessageAuthor"
            | "QuotedMsg"
            | "QuotedMsgContent"
            | "MediaLinkPreview"
            | "ChatGroupMsgInfoCell"
            | "RichTextField"
            | "BizCtwaContextImagePreview"
            | "MessageSpacerText"
            | "MessageGif"
            | "DrawerButton"
            | "PhotoViewerModal"
            | "ChatContact"
            | "SectionHeader"
            | "FlatListLoadingSpinnerItem"
            | "ChatListSearch"
            | "MessagePlaceholder"
            | "ListMsgModal"
            | "GroupsV4InviteMsg"
            | "PaymentInfo"
            | "PaymentMessageInvite"
            | "PaymentMessagePlaceholder"
            | "SendOrRequestPaymentMessage"
            | "PttAudioBubble"
            | "PttAudioPlayer"
            | "MessageSmoothRangeInput"
            | "MessageStickerMediaControl"
            | "MessageButtons"
            | "MessageCheckbox"
            | "MessageList"
            | "MessageVcard"
            | "VcardWidChoiceModal"
            | "MessageViewOncePendingCancel"
            | "QuotedMsgAdminGroupName"
            | "MessageMenu"
            | "LinkMsg"
            | "MediaAudio"
            | "ThumbList"
            | "ImageCarousel"
            | "ImageSlide"
            | "ChatContactMsgInfoCell"
            | "ImageGallery"
            | "EditImageDrawer"
            | "MediaEditor"
            | "MediaEditorFilmstripAttachMediaThumb"
            | "MediaEditorImage"
            | "MediaEditorPreviewCropRotate"
            | "MediaEditorToolbarColor"
            | "MediaEditorToolbarColorChip"
            | "MediaEditorToolbarFontDropdown"
            | "MediaEditorToolbarTextBackground"
            | "MediaEditorToolbarCropRotate"
            | "MediaEditorToolbarThickness"
            | "AttachMediaDrawerAttachMediaTypeAudio"
            | "MediaEditorPreview"
            | "AttachMediaDrawerAttachMediaTypeFile"
            | "AttachMediaDrawerAttachMediaTypePdf"
            | "AttachMediaDrawerAttachMediaTypeMedia"
            | "MediaEditorPreviewVideo";

        export enum MessageTypes {
            "NOTIFICATION" = "notification",
            "NOTIFICATION_TEMPLATE" = "notification_template",
            "GP2" = "gp2",
            "BROADCAST_NOTIFICATION" = "broadcast_notification",
            "NEWSLETTER_NOTIFICATION" = "newsletter_notification",
            "E2E_NOTIFICATION" = "e2e_notification",
            "CALL_LOG" = "call_log",
            "PROTOCOL" = "protocol",
            "HISTORY_BUNDLE" = "history_bundle",
            "CHAT" = "chat",
            "LOCATION" = "location",
            "PAYMENT" = "payment",
            "VCARD" = "vcard",
            "CIPHERTEXT" = "ciphertext",
            "DEBUG_PLACEHOLDER" = "debug_placeholder",
            "MULTI_VCARD" = "multi_vcard",
            "REVOKED" = "revoked",
            "OVERSIZED" = "oversized",
            "GROUPS_V4_INVITE" = "groups_v4_invite",
            "HSM" = "hsm",
            "TEMPLATE_BUTTON_REPLY" = "template_button_reply",
            "DEBUG" = "debug",
            "IMAGE" = "image",
            "VIDEO" = "video",
            "PTV" = "ptv",
            "AUDIO" = "audio",
            "PTT" = "ptt",
            "STICKER" = "sticker",
            "STATUS" = "status",
            "DOCUMENT" = "document",
            "PRODUCT" = "product",
            "ORDER" = "order",
            "LIST" = "list",
            "INTERACTIVE" = "interactive",
            "INTERACTIVE_RESPONSE" = "interactive_response",
            "LIST_RESPONSE" = "list_response",
            "BUTTONS_RESPONSE" = "buttons_response",
            "REACTION" = "reaction",
            "REACTION_ENC" = "reaction_enc",
            "POLL_CREATION" = "poll_creation",
            "REQUEST_PHONE_NUMBER" = "request_phone_number",
            "POLL_UPDATE" = "poll_update",
            "NATIVE_FLOW" = "native_flow",
            "BIZ_COVER_PHOTO" = "biz-cover-photo",
            "KEEP_IN_CHAT" = "keep_in_chat",
            "PIN_MESSAGE" = "pin_message",
            "PINNED_MESSAGE" = "pinned_message",
            "COMMENT" = "comment",
            "NEWSLETTER_ADMIN_INVITE" = "newsletter_admin_invite",
            "EVENT_CREATION" = "event_creation",
            "EVENT_RESPONSE" = "event_response",
            "BIZ_CONTENT_PLACEHOLDER" = "biz_content_placeholder",
            "EVENT_EDIT_ENCRYPTED" = "event_edit_encrypted",
            "ALBUM" = "album",
            "STICKER_PACK" = "sticker-pack",
            "POLL_RESULT_SNAPSHOT" = "poll_result_snapshot",
            "UNKNOWN" = "unknown",
        }

        export type MessageSendOptions = {
            /** Image caption */
            caption?: string;
            /** Media to be sent */
            media?: File;
            /** Return chat model */
            ret?: boolean;
        };

        export type MessageSendResult = {
            count: number | null;
            messageSendResult: string;
            t: number;
        };

        export type attcOptions = MediaData &
            StickerData & {
                caption?: string;
                preview?: any;
                isViewOnce: boolean;
                toJSON?: () => any;
            };

        type SendMessageResult<T extends boolean> = Promise<T extends true ? WAPI.Chat : MessageSendResult>;

        export type kindOfAttachment = WAPI.MediaInput | File | StickerData | MediaData;

        export type MediaInfo = {
            data: string;
            filename: string;
            mimetype: string;
            size?: number;
        };

        interface MsgsByChat {
            modelClass: MessageModel;
            _index: { [k: string]: MessageModel };
            _key: string;
            _models: Array<MessageModel>;
        }

        /** Base Collection Class */
        export interface BaseClass<t> {
            constructor: BaseClass<t>;

            modelClass: t;
            /** Insert data to Collection */
            add(data: InsertData, opt: InsertOpt): [t];
            /** Find a single data from Collection */
            find(query: string | wid): Promise<t | null>;
            /** Get a single data from Collection */
            get(query: string | wid): t | null;
            /** Insert and Get the data from collection */
            gadd(query: wid): [t];
            /** Get all Collection Data */
            getModelsArray(): t[];

            prototype: this;
        }

        /** Chat Collection */
        export interface Chat extends BaseClass<ChatModel> {
            clearAllDraft(): void;
            getActive(): ChatModel | undefined;
        }

        /** Contact Collection */
        export interface Contact extends BaseClass<ContactModel> {
            findContact(query: string): Promise<ContactModel | null>;
            getMeContact(): ContactModel;
            getFilteredContacts(opt: { showMe: boolean }): ContactModel[];
            getGroupContacts(): ContactModel[];
        }

        /** GroupMetadata Collection */
        export interface GroupMetadata extends BaseClass<GroupModel> {
            owner: wid | undefined;
            participants: {
                getModelsArray: () => GroupParticipantModel[];
            };
        }

        /** Message Collection */
        export interface Message extends BaseClass<MessageModel> {
            byChat(chat: ChatModel): MsgsByChat;
            getMessagesById(id: any[]): any;
        }

        /** MessageMedia Collection */
        export interface MessageMedia extends BaseClass<MediaModel> {
            getActive(): MessageMedia;
            processAttachments(files: [{ file: File }], ack: number, chat: ChatModel): Promise<void>;
        }

        /** ProfilePicThub Collection */
        export interface ProfilePicThumb extends BaseClass<ProfilePicThumbModel> {}

        /** Base Wid Interface */
        export interface wid {
            /**
             * Whatsapp server domain
             * @example `c.us`
             */
            server: string;
            /**
             * User whatsapp number
             * @example `554199999999`
             */
            user: string;
            /**
             * Serialized id
             * @example `554199999999@c.us`
             */
            _serialized: string;
            /** Is it group wid */
            isGroup(): boolean;
            /** Is it User wid */
            isUser(): boolean;
        }

        /** All Wid that inheritance with base wid */
        export interface ContactId extends wid {}
        export interface ChatId extends wid {}
        export interface GroupId extends wid {}

        /** Base Model Class */
        interface BaseModel {
            id: wid;
            name?: string;
            prototype: this;
            /** Default properties */
            [k: string]: any | undefined;
        }

        /** Chat Model */
        export interface ChatModel extends BaseModel {
            id: ChatId;
            active?: boolean;
            hasDraftMessage: boolean;
            // isGroup: boolean;
            contact: ContactModel;
            groupMetadata?: GroupModel;

            clearDraft(): ChatModel | null;
            close(): Promise<void>;
            getModel(): WAPI.Chat;
            open(): Promise<void>;
            sendText<T extends boolean>(body: string, model?: T): Promise<SendMessageResult<T>>;
            sendMedia<T extends boolean>(
                file: File,
                caption: string,
                model?: T
            ): Promise<SendMessageResult<T>>;
            sendMessage<T extends boolean>(
                content: string | kindOfAttachment,
                options?: WAPI.SendMessageOptions
            ): Promise<SendMessageResult<T>>;
        }

        /** GroupChat Model */
        type groupChat = {
            isGroup: true;
            groupMetadata: GroupModel
        } & ChatModel;

        /** Contact Model */
        export interface ContactModel extends BaseModel {
            id: ContactId;
            commonGroups?: ChatModel[];
            isBusiness: boolean;
            isContactBlocked: boolean;
            phonenumber?: string;
            pushname?: string;
            shortName?: string;
            username?: string;
            verifiedName?: string;

            getModel(): WAPI.Contact;
            openChat(): Promise<ChatModel>;
            fetchProfilePic(): Promise<boolean>;
            getProfilePicThumb(): ProfilePicThumbModel | null;
        }

        /** Group Model */
        export interface GroupModel extends Omit<BaseModel, "name"> {
            id: GroupId;
            announce: boolean;
            creation: number;
            desc: string;
            descId: string;
            descOwner: wid;
            descTime: number;
            displayedDesc: string;
            groupMetadata: GroupMetadata;
            groupType: string;
            joinedSubgroups?: Array<wid>;
            participants: {
                getModelsArray: () => GroupParticipantModel[];
            };
            owner: wid;
            parentGroup?: wid;
            size: number;

            prototype: this;

            getModel(): WAPI.Group;
            getContactModel(): WAPI.Contact;
            getChatModel(): WAPI.Chat;
            openChat(): Promise<ChatModel>;
        }

        /** GroupParticipant Model */
        export interface GroupParticipantModel {
            id: wid;
            contact: ContactModel;
            isAdmin: boolean;
            isSuperAdmin: boolean;
            isState: boolean;
        }

        /** Message Model */
        export interface MessageModel extends Omit<BaseModel, "id"> {
            [k: string]: any;
            ack: number;
            body: string;
            from: wid;
            id: MsgKeyObj;
            isNewMsg: boolean;
            local: boolean;
            t: number;
            type: MessageTypes;
            to: wid;
            viewMode: string;
            mediaData?: MediaData;

            prototype: this;

            downloadMedia(opt: downloadMediaOpt): Promise<void>;
            getModel(): WAPI.Message;
        }

        /** Media Model */
        export interface MediaModel extends BaseModel {
            type: string;
            sendToChat(chat: ChatModel, opt: { caption: string }): Promise<ChatModel>;
        }

        /** ProfilePicThumb Model */
        export interface ProfilePicThumbModel extends Omit<BaseModel, "name"> {
            eurl: string;
            filehash: string;
            fullDirectPath: string;
            id: wid;
            img: string;
            imgFull: string;
            previewDirectPath: string;
            previewEurl: string;
            raw: string;
            stale: boolean;
            tag: string;
            timestamp: number;
        }

        /**
         * All Classes
         */

        // Media Collection
        interface MediaCollection {
            new (chat: ChatModel): MessageMedia;
            model(): MessageMedia;
        }
        export class MediaCollection implements Omit<MessageMedia, "constructor" | "gadd"> {
            // constructor(chat: ChatModel);
            modelClass: MediaModel;
            prototype: MessageMedia;
            add(data: InsertData, opt: InsertOpt): [MediaModel];
            find(query: string): Promise<MediaModel | null>;
            get(query: string | wid): MediaModel | null;
            getModelsArray(): MediaModel[];
            getActive(): MessageMedia;
            processAttachments(files: [{ file: File }], ack: number, chat: ChatModel): Promise<void>;
        }

        // Media Data
        interface MediaData {
            new (): MediaData;
            (): MediaData;
            isIdType(arg: any): any;
        }
        export class MediaData {
            isGif: boolean;
            filename?: string;
            mediaBlob: OpaqueData | File;
            mimetype: string;
            renderableUrl?: string;
            mediaStage: string;
            type: MessageTypes;

            clientUrl?: string;
            encFilehash?: string;
            deprecatedMms3Url?: string;
            directPath?: string;
            filehash: string;
            firstFrameSidecar?: any;
            mediaKey?: string;
            mediaKeyTimestamp?: number;
            streamingSidecar?: any;
            size?: number;
            uploadhash?: string;

            waveform: any;

            set(data: UploadedMedia): this;
            toJSON(): { [k: string]: any };
        }

        // Opaque Data
        interface OpaqueData {
            new (): OpaqueData;
            (): OpaqueData;
            createFromBase64Jpeg(data: string): Promise<OpaqueData>;
            createFromData(file: File, type: string): Promise<OpaqueData>;
        }
        export class OpaqueData {
            renderableUrl: string;
            autorelease(): void;
            url(): string;
        }

        /**
         * Any other Objet
         */

        /** Original '' module */
        export interface ABProps {
            getABPropConfigValue(name: string): string | boolean | number;
            usedBeforeInitializationConfigs: Array<string>;
        }

        /** Original 'WAWebCmd' module */
        export interface Cmd {
            openChatAt(opt: { chat: ChatModel; msgs: MsgsByChat }): Promise<void>;
            closeChat(chat: ChatModel): Promise<void>;
        }

        /** Original 'WAWebComposeBoxActions' module */
        export interface ComposeBox {
            paste: (chat: ChatModel | WAPI.Chat, text: string) => Promise<void>;
            send: (chat: ChatModel | WAPI.Chat) => Promise<void>;
        }

        type downloadMediaOpt = {
            downloadEvenIfExpensive: boolean;
            rmrReason: number;
        };

        type downloadAndDecriptMediaOpt = {
            directPath?: string;
            encFilehash?: string;
            filehash?: string;
            mediaKeyTimestamp?: number;
            mediaKey?: string;
            type?: string;
            signal: AbortSignal;
        };

        /** Original 'WAWebDownloadManager' module */
        export interface Downloader {
            downloadAndMaybeDecrypt(fileInfo: downloadAndDecriptMediaOpt): Promise<ArrayBuffer>;
        }

        /** Original 'WAWebGetEphemeralFieldsMsgActionsUtils' module */
        export interface EphemeralFields {
            getEphemeralFields(chat: ChatModel): any;
        }

        export interface foundedCommonGroups<T extends wid> extends Omit<Chat, "getModelsArray"> {
            contact: T;
            getModelsArray: () => groupChat[];
        }

        /** Collection of
         * 'WAWebFindCommonGroupsContactAction',
         * 'WAWebGroupCreateJob',
         * 'WAWebGroupModifyInfoJob',
         * 'WAWebExitGroupAction'
         * modules */
        export interface GroupUtils {
            findCommonGroups<T extends ContactModel>(
                contact: T
            ): Promise<foundedCommonGroups<T["id"]> | null>;
        }

        export type LinkPreviewData = {
            description: string;
            doNotPlayInline: boolean;
            isLoading: boolean;
            matchedText: string;
            richPreviewType: number;
            thumbnail?: any;
            title: string;
            thumbnailDirectPath?: string;
            thumbnailSha256?: string;
            thumbnailHQ?: string;
            thumbnailHeight?: number;
            thumbnailWidth?: number;
            thumbnailEncSha256?: string;
            mediaKeyTimestamp?: number;
            mediaKey?: string;
        };

        export type LinkPreviews = {
            data?: LinkPreviewData;
            url: string;
            preview?: boolean;
            subtype?: string;
        };

        /** Original 'WAWebLinkPreviewChatAction' module */
        export interface LinkPreview {
            getLinkPreview(url: foundedLink): Promise<LinkPreviews>;
        }

        /** Original 'WAWebMediaDataUtils' */
        export interface MediaDataUtils {
            canPlayOgg(): any;
            decodeWebpToRGBANoOpaque(media: any): any;
            fetchMedia(url: string): any;
            gatherAndSetMetadata(media: any, opt: any): any;
            gatherAndSetMetadataNoOpaque(media: any, opt: any): any;
            getHighestQualityThumbnailUrl(media: any): any;
            getImageMetadata(media: any, opt: any): any;
            getImageWidthHeight(media: any): any;
            getImageWidthHeightNoOpaque(media: any): any;
            getRawDocumentMimetype(media: any, opt: any): any;
            getResizedThumbData(media: any, opt: any): any;
            opaqueDataToArrayBuffer(media: OpaqueData): ArrayBuffer;
            parseWebpNoOpaque(media: any): any;
            processRawAudioVideo(...args: Array<any>): any;
            processRawDocument(...args: Array<any>): any;
            processRawImage(media: any, opt: any): any;
            processRawSticker(media: any): any;
            shouldUseLruMediaStore(media: any): any;
            shouldUseMediaCache(media: any): any;
            videoWidthHeightDuration(media: any): any;
        }

        interface MediaObject {
            contentInfo: { [k: string]: any };
            filehash: string;
            size: number;
            consolidate(data: any): any;
        }

        /** Orignial 'WAWebMediaStorage' module */
        export interface MediaObjects {
            getOrCreateMediaObject(filehash: string): MediaObject;
        }

        export interface MediaPreparation {
            waitForPrep(): Promise<MediaData>;
        }

        /** Collection of
         * 'WAWebMediaPrep',
         * 'WAWebPrepRawMedia'
         * 'WAWebProcessRawMedia',
         * modules */
        export interface MediaPrep {
            prepRawMedia(data: OpaqueData, options: { [k: string]: any }): MediaPreparation;
            processRawMedia(data: OpaqueData, options: { [k: string]: any }): Promise<MediaData>;
        }

        type UploadedMedia = {
            clientUrl: string;
            encFilehash: string;
            deprecatedMms3Url: string;
            directPath: string;
            filehash: string;
            firstFrameSidecar: any;
            mediaEntry?: { [k: string]: string | number };
            mediaKey: string;
            mediaKeyTimestamp: number;
            streamingSidecar: any;
            size: number;
            uploadhash: string;
        };

        type MediaToUpload = {
            mimetype: string;
            mediaObject: MediaObject;
            mediaType: string;
        };

        /** Orignial 'WAWebMediaMmsV4Upload' module */
        export interface MediaUpload {
            uploadMedia(media: MediaToUpload): Promise<UploadedMedia>;
        }

        type MsgKeyInput = {
            from: ContactId;
            to: ChatId;
            id: string;
            participant?: ContactId;
            selfDir: string;
        };

        type MsgKeyObj = {
            fromMe: boolean;
            id: ChatId;
            remote: ContactId;
            self?: string;
            _serialized: string;
        };

        /** Orignial 'WAWebMmsMediaTypes' module */
        export interface MediaTypes {
            msgToMediaType(option: { type: string; isGif: boolean }): string;
        }

        /** Original 'WAWebMsgKey' module */
        export interface MsgKey {
            new (data: MsgKeyInput): MsgKeyObj;
            newId(): Promise<string>;
            from(id: WA.wid): Promise<string>;
            fromString(id: string): Promise<string>;
        }

        /** Collection of
         * 'WAWebSendTextMsgChatAction',
         * 'WAWebSendMsgChatAction',
         * 'WAWebApiMessageInfoStore'
         * modules */
        export interface MsgUtils {
            addAndSendMsgToChat(chat: ChatModel, message: MessageModel): Promise<any>;
            addAndSendTextMsg(chat: ChatModel, message: MessageModel): Promise<MessageSendResult>;
            createTextMsgData(chat: ChatModel, body: string): Promise<MessageModel>;
        }

        /** Original 'WAWebUserPrefsMeUser' module */
        export interface Profiles {
            isMeAccount(id: wid): boolean;
            getMaybeMeLid(): { device: number } & wid;
            getMaybeMeLidUser(): wid;
            getMaybeMeUser(): wid;
            getMeUser(): wid;
            getMe(): { device: number } & wid;
        }

        /** Original 'WAWebContactProfilePicThumbBridge' module */
        export interface Settings {
            profilePicResync(id: wid): Promise<any>;
            requestDeletePicture(id: wid): Promise<any>;
            requestProfilePicFromServer(id: wid): Promise<any>;
            sendSetPicture(id: wid): Promise<any>;
        }

        type FileToUpload = {
            blob: File;
            type: "sticker";
            signal: AbortSignal;
            mediaKey: string;
        };

        type UploadedFile = {
            url: string;
        } & UploadedMedia;

        export type StickerData = {
            clientUrl: string;
            deprecatedMms3Url: string;
            uploadhash: string;
            size: number;
            type: MessageTypes.STICKER;
        };

        /** Original 'WAWebUploadManager' module */
        export interface UploadUtils {
            encryptAndUpload(file: FileToUpload): Promise<UploadedFile>;
            unencryptedUpload(file: FileToUpload): Promise<UploadedFile>;
            uploadCoverPhoto(file: FileToUpload): Promise<UploadedFile>;
        }

        type foundedLink = {
            anchor?: string;
            domain: string;
            href: string;
            index: number;
            input: string;
            isHttp: boolean;
            params?: string;
            path: string;
            scheme: string;
            url: string;
            username?: string;
        };

        /** Original 'WALinkify' module */
        export interface Validators {
            findLink(url: string): foundedLink;
        }

        type BizInfo = {
            verifiedName: {
                isApi: boolean;
                level: string;
                name: string;
                privacyMode: string | null;
                serial: string;
            };
        };

        type PhoneExist = {
            biz: boolean;
            bizInfo?: BizInfo;
            wid: wid;
        };

        type WapQueryResult = PhoneExist & {
            disappearingMode: {
                duration: number;
                settingTimestamp: number;
            };
        };

        /** Original 'WAWebQueryExistsJob' module */
        export interface WapQuery {
            queryPhoneExists(query: string): Promise<WapQueryResult | null>;
            queryWidExists(query: wid): Promise<WapQueryResult | null>;
        }

        /** Original 'WAWebWidFactory' module */
        export interface WidFactory {
            createWid(id: string): wid;
            createWidFromWidLike(id: string): wid;
        }

        export type WidDomain = {
            BROADCAST: "broadcast";
            CALL: "call";
            C_US: "c.us";
            G_US: "g.us";
            LID: "lid";
            MSGR: "msgr";
            NEWSLETTER: "newsletter";
            S_WHATSAPP_NET: "s.whatsapp.net";
        };

        export type WidParts = {
            devicePart: string | undefined;
            serverPart: string | undefined;
            userPart: string | undefined;
        };

        /** Original 'WAWebWidValidator' module */
        export interface WidUtils {
            Domains: WidDomain;
            validateAndGetParts(widLike: string, accept: boolean): WidParts;
            validateWid(widLike: string, accept: boolean): boolean;
        }

        /** WhatsApp Web Modules Collection as 'Store' */
        export interface Store {
            /** Original 'WAWebABProps' module */
            ABProps: ABProps;
            /** Original WhatsApp Chat Object Collection */
            Chat: Chat;
            /** Original 'WAWebCmd' module */
            Cmd: Cmd;
            /** Original 'WAWebComposeBoxActions' module */
            ComposeBox: ComposeBox;
            /** Original WhatsApp Contact Object Collection */
            Contact: Contact;
            /** Original WhatsApp Contact Object Collection */
            Debug: { VERSION: string };
            /** Original 'WAWebDownloadManager' module */
            Downloader: Downloader;
            /** Original 'WAWebGetEphemeralFieldsMsgActionsUtils' module */
            EphemeralFields: EphemeralFields;
            /** Original WhatsApp GroupMetadata Object Collection */
            GroupMetadata: GroupMetadata;
            /** Collection of
             * 'WAWebFindCommonGroupsContactAction',
             * 'WAWebGroupCreateJob',
             * 'WAWebGroupModifyInfoJob',
             * 'WAWebExitGroupAction'
             * modules */
            GroupUtils: GroupUtils;
            /** Original 'WAWebLinkPreviewChatAction' module */
            LinkPreview: LinkPreview;
            /** Original 'WAWebAttachMediaCollection' Class */
            MediaCollection: MediaCollection;
            /** Original 'WAWebMediaData' */
            MediaData: MediaData;
            /** Original 'WAWebMediaDataUtils' */
            MediaDataUtils: MediaDataUtils;
            /** Orignial 'WAWebMediaStorage' module */
            MediaObject: MediaObjects;
            /** Orignial 'WAWebPrepRawMedia' module */
            MediaPrep: MediaPrep;
            /** Orignial 'WAWebMediaMmsV4Upload' module */
            MediaUpload: MediaUpload;
            /** Orignial 'WAWebMmsMediaTypes' module */
            MediaTypes: MediaTypes;
            /** Original 'WAWebUserPrefsMeUser' module */
            MeUtils: Profiles;
            /** Original WhatsApp Msg Object */
            Msg: Message;
            /** Original 'WAWebMsgKey' module */
            MsgKey: MsgKey;
            /** Collection of
             * 'WAWebSendTextMsgChatAction',
             * 'WAWebSendMsgChatAction',
             * 'WAWebApiMessageInfoStore'
             * modules */
            MsgUtils: MsgUtils;
            /** Original 'WAWebMediaOpaqueData' Class */
            OpaqueData: OpaqueData;
            /** Original 'WAWebContactProfilePicThumbBridge' module */
            Profile: Settings;
            /** Original WhatsApp ProfilePicThumb Object */
            ProfilePicThumb: ProfilePicThumb;
            /** Original 'WAWebUploadManager' module */
            UploadUtils: UploadUtils;
            /** Original 'WALinkify' module */
            Validators: Validators;
            /** Original 'WAWebQueryExistsJob' module */
            WapQuery: WapQuery;
            /** Original 'WAWebWidFactory' module */
            WidFactory: WidFactory;
            /** Original 'WAWebWidValidator' module */
            WidUtils: WidUtils;
        }
    }
}
