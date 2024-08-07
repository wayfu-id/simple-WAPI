declare global {
    namespace WAPI {
        type BizInfo = {
            verifiedName: {
                isApi: boolean;
                level: string;
                name: string;
                privacyMode: string | null;
                serial: string;
            };
        };
        type WebpackLoader = {
            type: "webpack";
            chunk: Array<any>;
        };
        type MetaLoader = {
            type: "meta";
            chunk: Object;
        };
        export type MessageSendResult = WA.MessageSendResult;

        export type LoaderType = WebpackLoader | MetaLoader | { type: undefined; chunk: undefined };

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
            ret?: boolean;
        }

        export type PhoneExist = {
            biz: boolean;
            bizInfo?: BizInfo;
            wid: wid;
        };

        abstract class Base<o> {
            constructor(app: WAPI);
            /** Main WAPI app */
            app: WAPI;
            /** Class raw data */
            raw: o;
            /** Serialize Class Data */
            _serialized: any;
            /** Cloning class */
            _clone(): any;
            /** Patching data */
            _patch(data: o): o;

            /** Default properties */
            [k: string]: any | undefined;
        }

        interface Serialized<o extends wid> {
            id: o;
            name: string | undefined;

            /** Default properties */
            [k: string]: any | undefined;
        }

        interface ProfilePicThumbSerialized {
            eurl: string;
            id: wid;
            img: string;
            imgFull: string;
            raw: string;
            tag: string;
        }

        interface ContactSerialized extends Serialized<ContactId> {
            disappearingModeDuration: number | undefined;
            disappearingModeSettingTimestamp: number | undefined;
            isBlocked: boolean;
            isBusiness: boolean;
            isContactSyncCompleted: number;
            isEnterprise: boolean;
            isGroup: boolean;
            isMe: boolean;
            isMyContact: boolean;
            isUser: boolean;
            isSmb: boolean;
            labels: Array<string>;
            privacyMode: {
                actualActors: number;
                hostStorage: number;
                privacyModeTs: number;
            } | null;
            pushname: string;
            phoneNumber: string;
            profilePicThumb: ProfilePicThumbSerialized;
            requestedPnTimestamp: number | undefined;
            sectionHeader: string | undefined;
            shortName: string | undefined;
            statusMute: string | boolean | undefined;
            textStatusLastUpdateTime: number;
            type: string;
            username: string | undefined;
            verifiedLevel: number;
            verifiedName: string | undefined;
        }

        interface ChatSerialized extends Serialized<ChatId> {
            isGroup: boolean;
            active: boolean;
            hasDraftMessage: boolean;
            timestamp: number;
            contact: ContactSerialized;
        }

        interface GroupSerialized extends Serialized<GroupId> {
            announce: boolean;
            creation: number;
            desc: string;
            displayedDesc: string;
            groupType: string;
            owner: ContactId;
            parentGroupId?: GroupId;
            participants: GroupParticipant[];
            size: number;
            subGroupsId: GroupId[];
        }

        interface GroupParticipantSerialized extends Omit<Serialized<ContactId>, "name"> {
            contact: ContactSerialized;
            isAdmin: boolean;
            isSuperAdmin: boolean;
        }

        /**
         * Represents a Contact on WhatsApp
         *
         * @example
         * {
         *   id: {
         *     server: 'c.us',
         *     user: '554199999999',
         *     _serialized: `554199999999@c.us`
         *   },
         *   number: '554199999999',
         *   isBusiness: false,
         *   isEnterprise: false,
         *   name: undefined,
         *   pushname: 'John',
         *   shortName: undefined,
         *   isMe: false,
         *   isUser: true,
         *   isGroup: false,
         *   isMyContact: false,
         *   isBlocked: false
         * }
         */
        export abstract class Contact extends Base<WA.ContactModel> {
            /** Get serialized object */
            _serialized: ContactSerialized;
            /** Forrmated Name */
            formatedName: string;
            /** Indicates if the contact is a business contact */
            isBusiness: boolean;
            /** ID that represents the contact */
            id: ContactId;
            /** Indicates if the contact is an enterprise contact */
            isEnterprise: boolean;
            /** Indicates if the contact is a group contact */
            isGroup: boolean;
            /** Indicates if the contact is a user contact */
            isUser: boolean;
            /** Indicates if the contact is the current user's contact */
            isMe: boolean;
            /** Indicates if the number is saved in the current phone's contacts */
            isMyContact: boolean;
            /** Indicates if you have blocked this contact */
            isBlocked: boolean;
            /** The contact's name, as saved by the current user */
            name?: string;
            /** Contact's phone number */
            phoneNumber: string;
            /** Profil pic thumb */
            profilePicThumb: ProfilePicThumb;
            /** The name that the contact has configured to be shown publically */
            pushname: string | undefined;
            /** A shortened version of name */
            shortName?: string;
            /** Status Mute */
            statusMute?: string | boolean;

            // Available functions
            /**
             * Returns the Chat that corresponds to this Contact.
             * Will return null when getting chat for currently logged in user.
             */
            getChat(): Promise<Chat | null>;

            /** Gets the Contact's common groups with you. Returns empty array if you don't have any common group. */
            getCommonGroups(): Promise<Chat[]>;
        }

        /**
         * Represents a Chat on WhatsApp
         *
         * @example
         * {
         *   id: {
         *     server: 'c.us',
         *     user: '554199999999',
         *     _serialized: `554199999999@c.us`
         *   },
         *   active: active
         *   hasDraftMessage: false,
         *   isGroup: false,
         *   name: '+55 41 9999-9999',
         *   timestamp: 1591484087,
         * }
         */
        export abstract class Chat extends Base<WA.ChatModel> {
            /** Get serialized object */
            _serialized: ChatSerialized;
            /** Indicates current active status */
            active: boolean | undefined;
            /** Contact model */
            contact: Contact;
            /** Indicates current draft message status */
            hasDraftMessage: boolean;
            /** ID that represents the chat */
            id: ChatId;
            /** Indicates if the Chat is a Group Chat */
            isGroup: boolean;
            /** Title of the chat */
            name: string;
            /** Unix timestamp for when the last activity occurred */
            timestamp: number;

            // Available functions
            /** Clearing draft message */
            clearDraft(): Chat | this;
            /** Close this chat */
            close(): Promise<void>;
            /** Open this chat */
            open(): Promise<void>;
            /** Input text message and send it to chat */
            inputAndSendTextMessage(text: string): Promise<Chat | null>;
            /** Send text message to this chat */
            // sendText(message: string): Promise<MessageSendResult>;
            sendText(message: string, model?: boolean): Promise<WAPI.Chat | WA.MessageSendResult>;
            /** Send image message to this chat */
            // sendMedia(file: File, caption: string): Promise<MessageSendResult>;
            sendMedia(
                file: File,
                caption: string,
                model?: boolean
            ): Promise<WAPI.Chat | WA.MessageSendResult>;
        }

        /**
         * Represents a Group from GroupMetadata on WhatsApp
         *
         * @example
         * {
         *   id: {
         *     server: 'g.us',
         *     user: '554199999999',
         *     _serialized: `554199999999@g.us`
         *   },
         *   announce: false,
         *   creation: 1657054203,
         *   desc: "John's Group" |
         *   displayedDesc: 'Lorem Ipsum',
         *   name: "John's Group" |
         *   groupType: 'DEFAULT',
         *   owner: {
         *     server: 'c.us',
         *     user: '554199999999',
         *     _serialized: `554199999999@c.us`
         *   },
         *   parentGroupId: undefined,
         *   size: 10,
         *   subGroupsId: [],
         * }
         */
        export abstract class Group extends Base<WA.GroupModel> {
            /** Get serialized object */
            _serialized: GroupSerialized;
            /** Is Announcement Group */
            announce: boolean;
            /** Group creation timestampt */
            creation: number;
            /** Group Description */
            desc: string;
            /** Group Displayed Description */
            displayedDesc: string;
            /** Group Type */
            groupType: string;
            /** Group Id */
            id: GroupId;
            /** Group subject name */
            name: string;
            /** Group Owner Contact */
            owner: ContactId;
            /** Parent Group */
            parentGroupId?: GroupId;
            /** Group Participant Size */
            size: number;
            /** All Sub Groups Id */
            subGroupsId: GroupId[] | undefined;

            // Getter Function
            /** Group participants */
            get participants(): GroupParticipant[] | undefined;
            /** Get Parent Group as object */
            get parentGroup(): Group | null | undefined;
            /** Get child groups as array of Group */
            get childGroups(): Group[] | undefined;

            /** Returns the Chat that corresponds to this Group. */
            getChat(): Promise<Chat | null>;
            /** Returns the Contact that corresponds to this Group. */
            getContact(): Promise<Contact>;
            /** Open chat that corresponds to this group. */
            openChat(): Promise<WA.ChatModel | null>;
        }

        export abstract class GroupParticipant {
            constructor(data: WA.GroupParticipantModel);
            /** Get serialized object */
            _serialized: GroupParticipantSerialized;
            /** The contact model of this participant */
            contact: Contact;
            /** ID that represents the participant */
            id: ContactId;
            /** Is the participant Admin */
            isAdmin: boolean;
            /** Is the participant SuperAdmin */
            isSuperAdmin: boolean;

            static create(data: WA.GroupParticipantModel): GroupParticipant;
        }

        export abstract class ProfilePicThumb {
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

            _serialized: ProfilePicThumbSerialized;

            static create(data: WA.ProfilePicThumbModel): ProfilePicThumb;
        }

        export interface GroupChat extends Chat {
            groupMetadata: GroupMetadata;

            // Getter Functions
            /** Group owner */
            get owner(): Contact | null;
            /** Group participants */
            get participants(): GroupParticipant[];
        }

        export interface GroupMetadata {
            owner: wid | undefined;
            participants: {
                getModelsArray: () => Array<WA.GroupParticipantModel>;
            };
        }
    }

    /** From Original WhatsApp Web */
    namespace WA {
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
            id: WAPI.wid;
        };

        type InsertOpt = { merge: boolean };

        interface BaseClass<t> {
            constructor: BaseClass<t>;

            modelClass: t;
            /** Insert data to Collection */
            add(data: InsertData, opt: InsertOpt): [t];
            /** Find a single data from Collection */
            find(query: string | WAPI.wid): Promise<t | null>;
            /** Get a single data from Collection */
            get(query: string | WAPI.wid): t | null;
            /** Get all Collection Data */
            getModelsArray(): t[];

            prototype: this;
        }
        interface ModelClass {
            id: WAPI.wid;
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
            groupMetadata?: WAPI.GroupMetadata;
            clearDraft(): ChatModel | null;
            close(): Promise<void>;
            getModel(): WAPI.Chat;
            open(): Promise<void>;
            sendText(body: string): Promise<MessageSendResult>;
            sendText(body: string, model: true): Promise<WAPI.Chat>;
            sendMedia(file: File, caption: string): Promise<MessageSendResult>;
            sendMedia(file: File, caption: string, model: true): Promise<WAPI.Chat>;
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
            getModel(): WAPI.Contact;
            openChat(): Promise<ChatModel>;
            fetchProfilePic(): Promise<boolean>;
            getProfilePicThumb(): ProfilePicThumbModel | null;
        }

        export interface ProfilePicThumbModel extends Omit<ModelClass, "name"> {
            eurl: string;
            filehash: string;
            fullDirectPath: string;
            id: WAPI.wid;
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
            announce: boolean;
            creation: number;
            desc: string;
            descId: string;
            descOwner: WAPI.wid;
            descTime: number;
            displayedDesc: string;
            groupMetadata: WAPI.GroupMetadata;
            groupType: string;
            joinedSubgroups?: Array<WAPI.wid>;
            participants: {
                getModelsArray: () => WA.GroupParticipantModel[];
            };
            owner: WAPI.wid;
            parentGroup?: WAPI.wid;
            size: number;
            getModel(): WAPI.Group;
            getContactModel(): WAPI.Contact;
            getChatModel(): WAPI.Chat;
            openChat(): Promise<ChatModel>;
        }

        export interface GroupParticipantModel {
            id: WAPI.wid;
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
                remote: WAPI.wid;
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
            getMeContact(): ContactModel;
            getFilteredContacts(opt: { showMe: boolean }): ContactModel[];
            getGroupContacts(): ContactModel[];
        }
        export interface GroupMetadata extends BaseClass<GroupModel> {}
        export interface Message extends BaseClass<MessageModel> {}
        export interface ProfilePicThumb extends BaseClass<ProfilePicThumbModel> {}

        export interface MessageMedia extends BaseClass<MediaModel> {
            processAttachments(files: [{ file: File }], ack: number, chat: ChatModel): Promise<void>;
        }

        export class MediaCollection implements Omit<MessageMedia, "constructor"> {
            constructor(chat: ChatModel);
            modelClass: MediaModel;
            prototype: MessageMedia;
            add(data: InsertData, opt: InsertOpt): [MediaModel];
            find(query: string): Promise<MediaModel | null>;
            get(query: string | WAPI.wid): MediaModel | null;
            getModelsArray(): MediaModel[];
            processAttachments(files: [{ file: File }], ack: number, chat: ChatModel): Promise<void>;
        }

        export type WapQueryResult = WAPI.PhoneExist & {
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
    }
}

declare abstract class Store {
    /** Original WhatsApp Chat Object Collection */
    Chat: WA.Chat;
    Cmd: {
        openChatAt(chat: WA.Chat): Promise<void>;
        closeChat(chat: WA.Chat): Promise<void>;
    };
    /** Original WhatsApp Contact Object Collection */
    Contact: WA.Contact;
    /** Original WhatsApp Contact Object Collection */
    Debug: { VERSION: string };
    /** Original WhatsApp GroupMetadata Object Collection */
    GroupMetadata: WA.GroupMetadata;
    GroupUtils: {
        findCommonGroups(contact: WA.ContactModel): Promise<WA.GroupModel[] | []>;
    };
    /** Original WhatsApp MediaCollection Class */
    MediaCollection: typeof WA.MediaCollection;
    //
    MeUtils: {
        isMeAccount(id: WAPI.wid): boolean;
        getMaybeMeLid(): { device: number } & WAPI.wid;
        getMaybeMeLidUser(): WAPI.wid;
        getMaybeMeUser(): WAPI.wid;
        getMeUser(): WAPI.wid;
        getMe(): { device: number } & WAPI.wid;
    };
    /** Original WhatsApp Msg Object */
    Msg: WA.Message;
    /** Original WhatsApp Message Composing Functions */
    MsgUtils: {
        addAndSendTextMsg(chat: WA.ChatModel, message: WA.MessageModel): Promise<WA.MessageSendResult>;
        createTextMsgData(chat: WA.ChatModel, body: string): Promise<WA.MessageModel>;
    };
    Profile: {
        profilePicResync(id: WAPI.wid): Promise<any>;
        requestDeletePicture(id: WAPI.wid): Promise<any>;
        requestProfilePicFromServer(id: WAPI.wid): Promise<any>;
        sendSetPicture(id: WAPI.wid): Promise<any>;
    };
    /** Original WhatsApp ProfilePicThumb Object */
    ProfilePicThumb: WA.ProfilePicThumb;
    /** Original WhatsApp WapQuery Functions */
    WapQuery: {
        queryPhoneExists(query: string): Promise<WA.WapQueryResult | null>;
        queryWidExists(query: WAPI.wid): Promise<WA.WapQueryResult | null>;
    };
    /** Original WhatsApp WidFactory Functions */
    WidFactory: {
        createWid(id: string): WAPI.wid;
        createWidFromWidLike(id: string): WAPI.wid;
    };
    WidUtils: {
        Domains: WA.WidDomain;
        validateAndGetParts(widLike: string, accept: boolean): WA.WidParts;
        validateWid(widLike: string, accept: boolean): boolean;
    };
}

declare abstract class WAPI extends Store {
    /** Create new WAPI Object */
    private constructor();
    /** Create new WAPI with store Object */
    private constructor(store: any);

    BUILD_ID: string | undefined;
    DESKTOP_BETA: boolean | undefined;
    /** WhatsApp Web Version */
    VERSION: string;
    /** Current contact info */
    ME: WAPI.Contact;
    /** HTML classes that web are using */
    WebClasses: Record<WA.WebSCSSKey, { [k: string]: string }>;
    /** Check given phone number */
    checkPhone(phone: string): Promise<WA.WapQueryResult | null>;
    /** Find chat by Id */
    findChat(id: string): Promise<WAPI.Chat | null>;
    findChat(id: WAPI.wid): Promise<WAPI.Chat>;
    findChat(id: WAPI.Chat | WAPI.Contact): Promise<WAPI.Chat>;
    /** Find contact by Id */
    findContact(id: string): Promise<WAPI.Contact | null>;
    findContact(id: WAPI.wid): Promise<WAPI.Contact>;
    findContact(id: WAPI.Chat | WAPI.Contact): Promise<WAPI.Contact>;
    /** Find contact by Id */
    findCommonGroups(id: string): Promise<WAPI.Chat[] | []>;
    findCommonGroups(id: WAPI.wid): Promise<WAPI.Chat[] | []>;
    /** Find contact by Id */
    findGroup(id: string): Promise<WAPI.Group | null>;
    findGroup(id: WAPI.wid): Promise<WAPI.Group>;
    /** find user WID for given id as string or WAPI wid */
    findUserWid(id: string): Promise<WAPI.wid | null>;
    findUserWid(id: WAPI.wid): Promise<WAPI.wid>;
    /** Find contact by Id */
    getAllGroups(): WAPI.Group[] | [];
    /** Get current active chat data */
    getActiveChat(): WAPI.Chat | null;
    /** Input text message and send it to chat */
    inputAndSendTextMsg(chat: string | WAPI.Chat | WAPI.wid, text: string): Promise<WAPI.Chat | null>;
    /** Close chat by id */
    closeChat(id: string): Promise<WA.ChatModel | null>;
    closeChat(id: WAPI.Chat | WAPI.wid): Promise<WA.ChatModel>;
    /** Open chat by id */
    openChat(id: string): Promise<WA.ChatModel | null>;
    openChat(id: WAPI.Chat | WAPI.wid): Promise<WA.ChatModel>;
    /** Send message to id */
    sendMessage(id: string | WAPI.Chat | WAPI.wid, message: string): Promise<WA.MessageSendResult>;
    sendMessage(
        id: string | WAPI.Chat | WAPI.wid,
        message: string,
        option: { ret: boolean }
    ): Promise<WAPI.Chat | WA.MessageSendResult>;
    sendMessage(
        id: string | WAPI.Chat | WAPI.wid,
        message: string,
        option: WAPI.MessageSendOptions & { ret: boolean }
    ): Promise<WAPI.Chat | WA.MessageSendResult>;
    /** Delay some function */
    sleep(time: number): Promise<void>;
    /** Static methor for initiating WAPI class */
    static init(target?: Window): WAPI;
}

export default WAPI;
