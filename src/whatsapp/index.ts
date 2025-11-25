import WAPI from "../../index";
import businessProfieModel from "./BusinessProfileModel/index";
import catalogModel from "./CatalogModel/index";
import chat from "./Chat/index";
import chatModel from "./ChatModel/index";
import contact from "./Contact/index";
import contactModel from "./ContactModel/index";
import groupMetadata from "./GroupMetadata/index";
import messageModel from "./MessageModel/index";
import productModel from "./ProductModel";

/** Construct Custom Store's Catalog object */
function constructCatalog(app: WAPI) {
    let { Catalog } = app;
    try {
        let _model_ = catalogModel(app);

        Object.defineProperties(Catalog.modelClass.prototype, _model_);
        if (typeof Catalog.modelClass.prototype.getModel === "undefined") {
            throw new Error("Failed to construct Catalog Model!");
        }
        return true;
    } catch (err: Error | any) {
        throw new Error(`From: Construct Catalog > ${err.message}`);
    }
}

/** Construct Custom Store's Chat object */
function constructChat(app: WAPI) {
    let { Chat } = app;
    try {
        let _proto_ = chat(app),
            _model_ = chatModel(app);

        Object.defineProperties(Chat.constructor.prototype, _proto_);
        if (typeof Chat.clearAllDraft === "undefined") {
            throw new Error("Failed to construct Chat!");
        }
        Object.defineProperties(Chat.modelClass.prototype, _model_);
        if (typeof Chat.modelClass.prototype.getModel === "undefined") {
            throw new Error("Failed to construct Chat Model!");
        }
        return true;
    } catch (err: Error | any) {
        throw new Error(`From: Construct Chat > ${err.message}`);
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
        if (typeof Contact.findContact === "undefined") {
            throw new Error("Failed to construct Contact!");
        }
        Object.defineProperties(Contact.modelClass.prototype, _model_);
        if (typeof Contact.modelClass.prototype.getModel === "undefined") {
            throw new Error("Failed to construct Contact Model!");
        }
        return true;
    } catch (err: Error | any) {
        throw new Error(`From: Construct Contact > ${err.message}`);
    }
}

function constructBusinessPorfile(app: WAPI) {
    let { BusinessProfile } = app;

    try {
        let _model_ = businessProfieModel(app);

        Object.defineProperties(BusinessProfile.modelClass.prototype, _model_);
        if (typeof BusinessProfile.modelClass.prototype.getModel === "undefined") {
            throw new Error("Failed to construct BusinessProfile Model!");
        }
        return true;
    } catch (err: Error | any) {
        throw new Error(`From: Construct BusinessProfile > ${err.message}`);
    }
}

/** Construct Custom Store's GroupMetadata object */
function constructGroupMetadata(app: WAPI) {
    let { GroupMetadata } = app;

    try {
        let _model_ = groupMetadata(app);

        Object.defineProperties(GroupMetadata.modelClass.prototype, _model_);
        if (typeof GroupMetadata.modelClass.prototype.getModel === "undefined") {
            throw new Error("Failed to construct GroupMetadata Model!");
        }
        return true;
    } catch (err: Error | any) {
        throw new Error(`From: Construct GroupMetadata > ${err.message}`);
    }
}

/** Construct Custom Store's Message object */
function constructMessage(app: WAPI) {
    let { Msg } = app;

    try {
        let _model_ = messageModel(app);

        Object.defineProperties(Msg.modelClass.prototype, _model_);
        if (typeof Msg.modelClass.prototype.getModel === "undefined") {
            throw new Error("Failed to construct Msg Model!");
        }
        return true;
    } catch (err: Error | any) {
        throw new Error(`From: Construct Message > ${err.message}`);
    }
}

/** Construct Costom Store's ProductModel object */
function constructProductModel(app: WAPI) {
    let { BusinessUtils } = app,
        { ProductModel } = BusinessUtils;

    try {
        let _model_ = productModel(app);

        Object.defineProperties(ProductModel.prototype, _model_);
        if (typeof ProductModel.prototype.getModel === "undefined") {
            throw new Error("Failed to construct Product Model!");
        }
        return true;
    } catch (err: Error | any) {
        throw new Error(`From: Construct Product > ${err.message}`);
    }
}

/** Construct Custom Store object */
export function constructStore(app: WAPI) {
    let { Chat } = app;
    if (Chat.modelClass.prototype.getModel === undefined) {
        return (
            constructBusinessPorfile(app) &&
            constructCatalog(app) &&
            constructChat(app) &&
            constructContact(app) &&
            constructGroupMetadata(app) &&
            constructProductModel(app) &&
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
            media?: File | Blob;
            /** Media Quality */
            quality?: "Standard" | "HD";
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
        type SendMessageResponse<T extends boolean> = Promise<
            T extends true ? WAPI.Chat : [MessageModel, MessageSendResult]
        >;

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
            gadd(query: wid | t): [t];
            /** Get all Collection Data */
            getModelsArray(): t[];

            prototype: this;
        }

        /** BusinessProfile Collection */
        export interface BusinessProfile extends BaseClass<BusinessProfileModel> {
            fetchBizProfile(id: wid): Promise<BusinessProfileModel | null>;
        }

        /** Catalog Collection */
        export interface Catalog extends BaseClass<CatalogModel> {}

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
        type mediaAttachment = {
            file: File | Blob;
            quality?: "Standard" | "HD";
        };

        export interface MessageMedia extends BaseClass<MediaModel> {
            getActive(): MessageMedia;
            processAttachments(files: mediaAttachment[], ack: number, chat: ChatModel): Promise<void>;
        }

        /** Product Collection */
        export interface Product extends BaseClass<ProductModel> {
            getProductModels(): ProductModel[];
            getProductModels(filter?: Set<reviewStatus>): ProductModel[];
        }

        /** Product Image Collection */
        export interface ProductImage extends BaseClass<ProductImageModel> {}

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
            /** Is it Lid wid */
            isLid(): boolean;
        }

        export interface devieId extends wid {
            device: number;
        }

        /** All Wid that inheritance with base wid */
        export interface BusinessProfileId extends wid {}
        export interface ContactId extends wid {}
        export interface ChatId extends wid {}
        export interface GroupId extends wid {}
        export interface CatalogId extends wid {}

        /** Base Model Class */
        interface BaseModel {
            id: wid;
            name?: string;
            prototype: this;
            /** Default properties */
            [k: string]: any | undefined;
        }

        type sendMediaOptions = {
            caption?: string;
            quality?: "Standard" | "HD";
            ret?: boolean;
        } & WAPI.MediaProcessOptions;

        type businessDay = "fri" | "mon" | "sat" | "sun" | "thu" | "tue" | "wed";

        export type businessHours = {
            [k in businessDay]?: {
                mode: string;
                hours: [number, number][];
            };
        };

        type fbPage = {
            displayName: string | undefined;
            id: string | undefined;
            likes: number | undefined;
        };

        type igProfile = {
            followers: number | undefined;
            handle: unknown | undefined;
        };

        type category = {
            id: string;
            localized_display_name: string;
        };

        type businessWebsite = {
            url: string;
        };

        type coverPhoto = {
            id: string;
            url: URL;
        };

        export interface BusinessProfileModel extends BaseModel {
            address: string | undefined;
            businessHours?: { config: businessHours; timezone: string };
            categories: category[];
            coverPhoto: coverPhoto | undefined;
            dataSource: "db" | "server";
            description: string;
            email: string | undefined;
            fbPage: fbPage | undefined;
            id: BusinessProfileId;
            igProfessional: igProfile | undefined;
            memberSinceText: string | undefined;
            profileOptions: {
                commerceExperience: string | undefined;
                cartEnabled: boolean | undefined;
                directConnection: boolean | undefined;
            };
            stale: boolean;
            tag: string;
            website: businessWebsite[] | undefined;

            fetchData(): Promise<BusinessProfileModel | null>;
            getModel(): WAPI.BusinessProfile;
        }

        export interface CatalogModel extends Omit<BaseModel, "name"> {
            afterCursor: string;
            hasCatalogCategories?: boolean;
            id: CatalogId;
            index?: number;
            isState?: boolean;
            lastUsedCountryCode?: string;
            msgProductCollection: Product;
            productCollection: Product;

            fetchData(): Promise<CatalogModel | null>;
            fetchProducts(): Promise<ProductModel[]>;
            getModel(): WAPI.Catalog;
        }

        /** Chat Model */
        export interface ChatModel extends BaseModel {
            id: ChatId;
            active?: boolean;
            composeQuotedMsg?: MessageModel;
            hasDraftMessage: boolean;
            endOfHistoryTransferType: number;
            // isGroup: boolean;
            contact: ContactModel;
            groupMetadata?: GroupModel;

            clearDraft(): ChatModel | null;
            close(): Promise<void>;
            getModel(): WAPI.Chat;
            historySync(): Promise<boolean>;
            open(): Promise<void>;
            sendText<T extends boolean>(body: string, model?: T): Promise<SendMessageResult<T>>;
            sendMedia<T extends boolean>(
                file: File | Blob,
                options?: sendMediaOptions,
                model?: T
            ): Promise<SendMessageResult<T>>;
            sendMessage<T extends boolean>(
                content: string | kindOfAttachment,
                options?: WAPI.SendMessageOptions
            ): Promise<SendMessageResponse<T>>;
        }

        /** GroupChat Model */
        export interface GroupChat extends ChatModel {
            isGroup: true;
            groupMetadata: GroupModel;
        }

        /** Contact Model */
        export interface ContactModel extends BaseModel {
            id: ContactId;
            commonGroups?: ChatModel[];
            isBusiness: boolean;
            isContactBlocked: boolean;
            phoneNumber?: wid;
            pushname?: string;
            shortName?: string;
            username?: string;
            verifiedName?: string;

            getModel(): WAPI.Contact | WAPI.BusinessContact;
            openChat(): Promise<ChatModel>;
            fetchProfilePic(): Promise<ContactModel>;
            getProfilePicThumb(): ProfilePicThumbModel | null;
        }

        export interface BusinessContact extends ContactModel {
            isBusiness: true;
            businessCatalog?: CatalogModel;
            businessProfile?: BusinessProfileModel;
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

        export enum reviewStatus {
            "NO_REVIEW",
            "PENDING",
            "REJECTED",
            "APPROVED",
            "OUTDATED",
        }

        /** Product Model */
        export interface ProductModel extends Omit<BaseModel, "id"> {
            prototype: this;

            additionalImageCdnUrl: string[];
            availability?: string;
            catalogWid: CatalogId;
            currency: string;
            description?: string;
            fetchedFromServer: boolean;
            id: string;
            index?: number;
            isHidden: boolean;
            isSanctioned: boolean;
            isState: boolean;
            imageCdnUrl?: string;
            imageCount?: number;
            imageHash?: string;
            maxAvailable: number;
            old: boolean;
            priceAmount1000: number;
            productImageCollection?: ProductImage;
            retailerId: string;
            reviewStatus: reviewStatus;
            url?: string;
            salePriceAmount1000: number | undefined;

            getModel(): WAPI.Product;
            getProductImageCollectionHead(): ProductImageModel | null;
        }

        export interface ProductImageModel extends Omit<BaseModel, "id"> {
            blobUrl?: string;
            id: string;
            mediaData: MediaData;
            mediaUrl?: string;
            old: boolean;
            stale: boolean;
            type?: string;
            preview: OpaqueData;
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
            processAttachments(files: mediaAttachment[], ack: number, chat: ChatModel): Promise<void>;
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

            caption?: string;
            clientUrl?: string;
            encFilehash?: string;
            deprecatedMms3Url?: string;
            directPath?: string;
            filehash: string;
            firstFrameSidecar?: any;
            fullHeight?: number;
            fullWidth?: number;
            isViewOnce?: boolean;
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
            createFromData(file: File | Blob, type: string): Promise<OpaqueData>;
            formData(): File;
        }
        export class OpaqueData {
            blob: Blob | undefined;
            released: boolean;
            _b64: string | undefined;
            _mimeType: string | undefined;
            renderableUrl: string;
            autorelease(): void;
            url(): string;
        }

        /**
         * Any other Objet
         */

        /** Original 'WAWebABProps' and 'WAWebABPropsConfigs'  module */
        export interface ABProps {
            getABPropConfigValue(name: string): string | boolean | number;
            usedBeforeInitializationConfigs: Array<string>;
        }

        type ProductImageDataKey = "requested" | "full";

        type productImageData = {
            key: ProductImageDataKey;
            value: string;
        }[];

        type productFetchResults = {
            id: string;
            retailer_id: string;
            name: string;
            description: string;
            url: string;
            currency: string;
            price: string;
            is_hidden: boolean;
            is_sanctioned: boolean;
            max_available: number;
            availability: string;
            checkmark: boolean;
            image_hashes_for_whatsapp: string[];
            image_cdn_urls: productImageData;
            additional_image_cdn_urls: productImageData[];
            whatsapp_product_can_appeal: boolean;
            capability_to_review_status: { key: string; value: string }[];
            videos: [];
        };

        type catalogPagingResults = {
            cursors: {
                before: string;
                after: string;
            };
        };

        type catalogFetchResults = {
            data: productFetchResults[];
            paging: catalogPagingResults;
        };

        /** */
        export interface BusinessUtils {
            ProductModel: ProductModel;

            addProduct(product: ProductModel, imageWidth?: number, imageHeight?: number): Promise<any>;
            createProductInquiry(p: ProductModel, b: ChatId, e: wid, f?: MediaData, g?: any): MessageModel;
            deleteProducts(productIds: string[]): Promise<any>;
            editProduct(product: ProductModel, imageWidth?: number, imageHeight?: number): Promise<any>;
            mapMsgToProductModel(message: MessageModel): ProductModel;
            mapProductResponseToModel(product: productFetchResults, catId: CatalogId): ProductModel;
            queryCatalog(
                chatId?: CatalogId,
                cursorAfter?: string,
                limit?: number,
                width?: number,
                height?: number,
                s?: any,
                l?: any
            ): Promise<catalogFetchResults>;
            queryProduct(
                chatId?: ChatId,
                productId?: any,
                imageWidth?: number,
                imageHeight?: number,
                i?: any,
                s?: boolean
            ): any;
            sendProductToChat(...args: any[]): Promise<any>;
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

        /** Original 'WAWebFindChatAction' module */
        export interface FindAndCreateChat {
            findExistingChatC(
                chatId: ChatId,
                t?: any,
                n?: any
            ): Promise<{ chat: ChatModel; created: boolean }> | null;
            findOrCreateLatestChat(
                chatId: ChatId,
                t?: any,
                n?: any
            ): Promise<{ chat: ChatModel; created: boolean }> | null;
        }

        type FILETYPE = {
            AUDIO: "audio";
            DOCUMENT: "document";
            IMAGE: "image";
            STICKER: "sticker";
            STICKER_PACK: "sticker-pack";
            VIDEO: "video";
        };

        /** Original 'WAWebFileUtils' module */
        export interface FileUtilities {
            FILETYPE: FILETYPE;
            blobToArrayBuffer(file: Blob): Promise<ArrayBuffer>;
            blobToText(file: Blob): Promise<String>;
            createFile(blobPart: BlobPart[], name: string, opt?: BlobPropertyBag): Blob;
            getAudioDuration(audioBlob: Blob): Promise<number>;
            getFileExtension(filename: string): string | null;
            getMimeTypeForFilepath(filepath: string): string;
            isDocument(file: Blob): boolean;
            removeTrailingDots(filename: string): string;
            typeFromMimetype(
                mimeType: string
            ): FILETYPE["IMAGE"] | FILETYPE["VIDEO"] | FILETYPE["AUDIO"] | FILETYPE["DOCUMENT"];
            validateBlob(file: Blob): Promise<boolean>;
        }

        export interface foundedCommonGroups<T extends wid> extends Omit<Chat, "getModelsArray"> {
            contact: T;
            getModelsArray: () => GroupChat[];
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

        export interface HistorySync {
            sendPeerDataOperationRequest: (operation: number, data: { chatId: ChatId }) => Promise<boolean>;
        }

        type lidMapChache = Map<String, { lid: wid; phoneNumber: wid; phoneNumberCreatedAt: number }>;

        /** Original 'WAWebApiContact' module */
        export interface LidUtils {
            CheckPnToLidMappingCaller: {
                WAWEB_ADV_SYNC_DEVICE_LIST_SEND_DEVICE_SYNC_REQUEST: "waweb-asdl-send-device-sync-request";
                WAWEB_API_DEVICE_LIST_BULK_CREATE_OR_REPLACE_DEVICE_RECORD: "waweb-adl-bulk-create-or-replace-device-record";
                WAWEB_API_DEVICE_LIST_BULK_GET_DEVICE_RECORD: "waweb-adl-bulk-get-device-record";
                WAWEB_API_DEVICE_LIST_CREATE_OR_REPLACE_DEVICE_RECORD: "waweb-adl-create-or-replace-device-record";
                WAWEB_API_DEVICE_LIST_GET_DEVICE_RECORD: "waweb-adl-get-device-record";
                WAWEB_CRYPTO_LIBRARY_DB_CALLBACK_API_HANDLE_NEW_SESSION: "waweb-cldca-handle-new-session";
                WAWEB_CRYPTO_LIBRARY_DB_CALLBACK_API_LOAD_SENDER_KEY_SESSION: "waweb-cldca-load-sender-key-session";
                WAWEB_CRYPTO_LIBRARY_DB_CALLBACK_API_LOAD_SESSION: "waweb-cldca-load-session";
                WAWEB_CRYPTO_LIBRARY_DB_CALLBACK_API_SAVE_SENDER_KEY_SESSION: "waweb-cldca-save-sender-key-session";
                WAWEB_SIGNAL_SESSION_DELETE_DEVICE_SENDER_KEY: "waweb-ss-delete-device-sender-key";
                WAWEB_SIGNAL_SESSION_DELETE_GROUP_SENDER_KEY_INFO: "waweb-ss-delete-group-sender-key-info";
                WAWEB_SIGNAL_SESSION_DELETE_REMOTE_INFO: "waweb-ss-delete-remote-info";
                WAWEB_SIGNAL_SESSION_DELETE_REMOTE_SESSION: "waweb-ss-delete-remote-session";
                WAWEB_SIGNAL_SESSION_HAS_SAME_BASE_KEY: "waweb-ss-has-same-base-key";
                WAWEB_SIGNAL_SESSION_HAS_SIGNAL_SESSIONS: "waweb-ss-has-signal-sessions";
                WAWEB_SIGNAL_SESSION_SAVE_SESSION_BASE_KEY: "waweb-ss-save-session-base-key";
            };
            bulkUpdateUsernamesInDb: (a: any) => any;
            checkPnToLidMapping: (a: any, b: any) => Promise<any>;
            clearLidPnMappingCache: () => void;
            createOrMergeAddressBookContacts: (a: any) => Promise<any>;
            deleteAddressBookContacts: (a: any) => Promise<any>;
            getAccountLidFromChat: (a: ChatModel) => wid;
            getAllLidContacts: () => ContactModel[];
            getAlternateDeviceWid: (a: wid) => wid;
            getAlternateUserWid: (a: wid) => wid;
            getAlternateWidBulk_DEPRECATED: (a: wid) => wid;
            getContactHash: (a: ContactId) => string;
            getContactRecord: (a: wid) => any;
            getContactUsername: (a: wid) => string | null;
            getCurrentLid: (a: wid) => wid;
            getCurrentLidDevice: (a: wid) => wid;
            getLatestLid: (a: wid) => wid;
            getPhoneNumber: (a: wid) => ContactId;
            getPnIfLidIsLatestMapping: (a: any) => any;
            hasLidMapping: (a: wid) => boolean;
            isAddressBookContact: (a: ContactId) => boolean;
            lidPnCache: { $1: lidMapChache; $2: lidMapChache };
            lidPnCacheDirtySet: Set<wid>;
            setNotAddressBookContacts: (a: any) => any;
            updateContactAdvHostedType: (a: any, b: any) => Promise<any>;
            updateLidMetadata: (a: wid) => Promise<any>;
            warmUpAllLidPnMappings: (a: any) => any;
            warmUpLidPnMapping: (a: any, b: any, c: any) => Promise<any>;
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
            mediaBlob: OpaqueData;
            type: string;
            consolidate(data: any): any;
        }

        /** Orignial 'WAWebMediaStorage' module */
        export interface MediaObjects {
            getOrCreateMediaObject(filehash: string): MediaObject;
        }

        export interface MediaPreparation {
            waitForPrep(): Promise<MediaData>;
            sendToChat(chat: ChatModel, options: any): Promise<MessageSendResult>;
        }

        /** Collection of
         * 'WAWebMediaPrep',
         * 'WAWebPrepRawMedia'
         * 'WAWebProcessRawMedia',
         * modules */
        export interface MediaPrep {
            prepRawMedia(data: OpaqueData, options: { [k: string]: any }): MediaPreparation;
            processRawMedia(data: OpaqueData, options: { [k: string]: any }): Promise<MediaData>;
            sendMediaMsgToChat(media: MediaPreparation, chat: ChatModel, opt?: attcOptions): Promise<void>;
        }

        type mediaEntry = {
            mmsUrl: string;
            deprecatedMms3Url: string;
            directPath: string;
            mediaKey: string;
            mediaKeyTimestamp: number;
            encFilehash: string;
            uploadHash: string;
            sidecar: any;
            firstFrameSidecar: any;
        };

        type UploadedMedia = {
            clientUrl: string;
            encFilehash: string;
            deprecatedMms3Url: string;
            directPath: string;
            filehash: string;
            firstFrameSidecar: any;
            mediaEntry?: mediaEntry;
            mediaHandle: any | null;
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
            castToV4(mimeType: string): string;
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
            addAndSendMsgToChat(
                chat: ChatModel,
                message: MessageModel
            ): [Promise<MessageModel>, Promise<MessageSendResult>];
            addAndSendTextMsg(chat: ChatModel, message: MessageModel): Promise<MessageSendResult>;
            createTextMsgData(chat: ChatModel, body: string): Promise<MessageModel>;
        }

        /** Original 'WAWebUserPrefsMeUser' module */
        export interface Profiles {
            isMeAccount(id: wid): boolean;
            // getMaybeMeLid(): { device: number } & wid;
            getMaybeMeLidUser(): wid;
            getMaybeMePnUser(): wid;
            getMePNandLIDWids(): [devieId, devieId];
            // getMeUser(): wid;
            // getMe(): { device: number } & wid;
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

        /** Original 'WAWebStateUtils' module */
        export interface StateUtils {
            unproxy<T extends any>(obj: T): T;
        }

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
            /** Original BusinessProfile Collection */
            BusinessProfile: BusinessProfile;
            /** Collection of
             * 'WAWebBizProductCatalogAction',
             * 'WAWebBizProductCatalogBridge',
             * 'WAWebProductModel'
             * modules */
            BusinessUtils: BusinessUtils;
            /** Original WhatsApp Catalog Object Collection */
            Catalog: Catalog;
            /** Original WhatsApp Chat Object Collection */
            Chat: Chat;
            /** Original 'WAWebChatPreferenceCollection' Collection */
            ChatPreference: {};
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
            /** Original 'WAWebFindChatAction' module */
            FindAndCreateChat: FindAndCreateChat;
            /** Original 'WAWebFileUtils' module */
            FileUtilities: FileUtilities;
            /** Original WhatsApp GroupMetadata Object Collection */
            GroupMetadata: GroupMetadata;
            /** Collection of
             * 'WAWebFindCommonGroupsContactAction',
             * 'WAWebGroupCreateJob',
             * 'WAWebGroupModifyInfoJob',
             * 'WAWebExitGroupAction'
             * modules */
            GroupUtils: GroupUtils;
            /** Original "WAWebSendNonMessageDataRequest" module*/
            HistorySync: HistorySync;
            /** Original 'WAWebApiContact' module */
            lidUtils: LidUtils;
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
            /** Original 'WAWebStateUtils' module */
            StateUtils: StateUtils;
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
