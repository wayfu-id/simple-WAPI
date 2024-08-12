import { Chat as WAPIChat, Contact as WAPIContact, Group } from "./src/structures/index";

declare global {
    export const __VERSION__: string;

    namespace WA {
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
        export interface ContactId extends wid {}
        export interface ChatId extends wid {}
        export interface GroupId extends wid {}

        export interface MessageSendOptions {
            /** Image caption */
            caption?: string;
            /** Media to be sent */
            media?: File;
            /** Return chat model */
            ret: boolean;
        }

        export type MessageSendResult = {
            count: number | null;
            messageSendResult: string;
            t: number;
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

        type InsertData = {
            createLocally: boolean;
            id: wid;
        };

        type InsertOpt = { merge: boolean };

        interface BaseClass<t> {
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

        interface ModelClass {
            id: wid;
            name?: string;

            prototype: this;
            /** Default properties */
            [k: string]: any | undefined;
        }

        export interface ChatModel extends ModelClass {
            active?: boolean;
            hasDraftMessage: boolean;
            isGroup: boolean;
            contact: ContactModel;
            groupMetadata?: GroupMetadata;
            clearDraft(): ChatModel | null;
            close(): Promise<void>;
            getModel(): WAPIChat;
            open(): Promise<void>;
            sendText<T extends boolean>(
                body: string,
                model?: T
            ): Promise<T extends true ? Chat : MessageSendResult>;
            sendMedia<T extends boolean>(
                file: File,
                caption: string,
                model?: T
            ): Promise<T extends true ? Chat : MessageSendResult>;
        }

        export interface ContactModel extends ModelClass {
            commonGroups?: ChatModel[];
            isBusiness: boolean;
            isContactBlocked: boolean;
            phonenumber?: string;
            pushname?: string;
            shortName?: string;
            username?: string;
            verifiedName?: string;
            getModel(): WAPIContact;
            openChat(): Promise<ChatModel>;
            fetchProfilePic(): Promise<boolean>;
            getProfilePicThumb(): ProfilePicThumbModel | null;
        }

        export interface ProfilePicThumbModel extends Omit<ModelClass, "name"> {
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

        export interface GroupModel extends Omit<ModelClass, "name"> {
            id: wid;
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
                getModelsArray: () => WA.GroupParticipantModel[];
            };
            owner: wid;
            parentGroup?: wid;
            size: number;
            getModel(): Group;
            getContactModel(): Contact;
            getChatModel(): WAPIChat;
            openChat(): Promise<ChatModel>;
        }

        export interface GroupParticipantModel {
            id: wid;
            contact: ContactModel;
            isAdmin: boolean;
            isSuperAdmin: boolean;
            isState: boolean;
        }

        export interface MessageModel extends Omit<ModelClass, "id"> {
            ack: number;
            body: string;
            id: {
                fromMe: boolean;
                id: string;
                remote: wid;
                _serialized: string;
            };
        }

        export interface MediaModel extends ModelClass {
            sendToChat(chat: ChatModel, opt: { caption: string }): Promise<ChatModel>;
        }

        export interface Chat extends BaseClass<ChatModel> {
            getActive(): ChatModel | undefined;
            clearAllDraft(): void;
        }
        export interface Contact extends BaseClass<ContactModel> {
            findContact(query: string): Promise<ContactModel | null>;
            getMeContact(): ContactModel;
            getFilteredContacts(opt: { showMe: boolean }): ContactModel[];
            getGroupContacts(): ContactModel[];
        }
        export interface GroupMetadata extends BaseClass<GroupModel> {
            owner: wid | undefined;
            participants: {
                getModelsArray: () => GroupParticipantModel[];
            };
        }
        export interface Message extends BaseClass<MessageModel> {}
        export interface ProfilePicThumb extends BaseClass<ProfilePicThumbModel> {}

        export interface MessageMedia extends BaseClass<MediaModel> {
            processAttachments(files: [{ file: File }], ack: number, chat: ChatModel): Promise<void>;
        }

        export class MediaCollection implements Omit<MessageMedia, "constructor" | "gadd"> {
            constructor(chat: ChatModel);
            modelClass: MediaModel;
            prototype: MessageMedia;
            add(data: InsertData, opt: InsertOpt): [MediaModel];
            find(query: string): Promise<MediaModel | null>;
            get(query: string | wid): MediaModel | null;
            getModelsArray(): MediaModel[];
            processAttachments(files: [{ file: File }], ack: number, chat: ChatModel): Promise<void>;
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

        export type PhoneExist = {
            biz: boolean;
            bizInfo?: BizInfo;
            wid: wid;
        };

        export type WapQueryResult = PhoneExist & {
            disappearingMode: {
                duration: number;
                settingTimestamp: number;
            };
        };

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

        type groupChat = ChatModel & { isGroup: true };

        export interface foundedCommonGroups<T extends wid> extends Omit<Chat, "getModelsArray"> {
            contact: T;
            getModelsArray: () => groupChat[];
        }
    }
}

export interface Store {
    /** Original WhatsApp Chat Object Collection */
    Chat: WA.Chat;
    Cmd: {
        openChatAt(chat: WA.ChatModel): Promise<void>;
        closeChat(chat: WA.ChatModel): Promise<void>;
    };
    ComposeBox: {
        paste: (chat: WA.Chat | WAPIChat, text: string) => Promise<void>;
        send: (chat: WA.Chat | WAPIChat) => Promise<void>;
    };
    /** Original WhatsApp Contact Object Collection */
    Contact: WA.Contact;
    /** Original WhatsApp Contact Object Collection */
    Debug: { VERSION: string };
    /** Original WhatsApp GroupMetadata Object Collection */
    GroupMetadata: WA.GroupMetadata;
    GroupUtils: {
        findCommonGroups<T extends WA.ContactModel>(
            contact: T
        ): Promise<WA.foundedCommonGroups<T["id"]> | null>;
    };
    /** Original WhatsApp MediaCollection Class */
    MediaCollection: typeof WA.MediaCollection;
    //
    MeUtils: {
        isMeAccount(id: WA.wid): boolean;
        getMaybeMeLid(): { device: number } & WA.wid;
        getMaybeMeLidUser(): WA.wid;
        getMaybeMeUser(): WA.wid;
        getMeUser(): WA.wid;
        getMe(): { device: number } & WA.wid;
    };
    /** Original WhatsApp Msg Object */
    Msg: WA.Message;
    /** Original WhatsApp Message Composing Functions */
    MsgUtils: {
        addAndSendTextMsg(chat: WA.ChatModel, message: WA.MessageModel): Promise<WA.MessageSendResult>;
        createTextMsgData(chat: WA.ChatModel, body: string): Promise<WA.MessageModel>;
    };
    Profile: {
        profilePicResync(id: WA.wid): Promise<any>;
        requestDeletePicture(id: WA.wid): Promise<any>;
        requestProfilePicFromServer(id: WA.wid): Promise<any>;
        sendSetPicture(id: WA.wid): Promise<any>;
    };
    /** Original WhatsApp ProfilePicThumb Object */
    ProfilePicThumb: WA.ProfilePicThumb;
    /** Original WhatsApp WapQuery Functions */
    WapQuery: {
        queryPhoneExists(query: string): Promise<WA.WapQueryResult | null>;
        queryWidExists(query: WA.wid): Promise<WA.WapQueryResult | null>;
    };
    /** Original WhatsApp WidFactory Functions */
    WidFactory: {
        createWid(id: string): WA.wid;
        createWidFromWidLike(id: string): WA.wid;
    };
    WidUtils: {
        Domains: WA.WidDomain;
        validateAndGetParts(widLike: string, accept: boolean): WA.WidParts;
        validateWid(widLike: string, accept: boolean): boolean;
    };
}
