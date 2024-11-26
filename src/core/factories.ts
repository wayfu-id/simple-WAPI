import WAPI from "../../index";
import { ChatFactory, ContactFactory, GroupFactory, MessageFactory } from "../factories";

export type FactoriesType = "Chat" | "Contact" | "Group" | "Message";

export type FactoriesData<T extends FactoriesType> = T extends "Chat"
    ? WA.ChatModel
    : T extends "Contact"
    ? WA.ContactModel
    : T extends "Group"
    ? WA.GroupModel
    : T extends "Message"
    ? WA.MessageModel
    : never;

type Factories<T extends FactoriesType> = {
    type: T;
    data: FactoriesData<T>;
};
type CreateChat = Factories<"Chat">;
type CreateContact = Factories<"Contact">;
type CreateGroup = Factories<"Group">;
type CreateMessage = Factories<"Message">;
type ToCreate = CreateChat | CreateContact | CreateGroup | CreateMessage;

export type FactoriesReturn<T extends FactoriesType> = T extends "Chat"
    ? WAPI.Chat | WAPI.GroupChat
    : T extends "Contact"
    ? WAPI.Contact
    : T extends "Group"
    ? WAPI.Group
    : T extends "Message"
    ? WAPI.Message
    : never;

const factories: PropertyDescriptor & ThisType<WAPI> = {
    value: function factories<T extends FactoriesType>(type: T, data: FactoriesData<T>): FactoriesReturn<T> {
        let factory = { type, data } as ToCreate;
        switch (factory.type) {
            case "Chat":
                return ChatFactory.create(this, factory.data) as FactoriesReturn<T>;
            case "Contact":
                return ContactFactory.create(this, factory.data) as FactoriesReturn<T>;
            case "Group":
                return GroupFactory.create(this, factory.data) as FactoriesReturn<T>;
            case "Message":
                return MessageFactory.create(this, factory.data) as FactoriesReturn<T>;
        }
    },
};

export default factories;
