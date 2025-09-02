import WAPI from "../../index";
import {
    BusinessProfileFactory,
    CatalogFactory,
    ChatFactory,
    ContactFactory,
    GroupFactory,
    MessageFactory,
} from "../factories";
import ProductFactory from "../factories/ProductFactory";

export type FactoriesType =
    | "BusinessProfile"
    | "Catalog"
    | "Chat"
    | "Contact"
    | "Group"
    | "Message"
    | "Product";

export type FactoriesData<T extends FactoriesType> = T extends "BusinessProfile"
    ? WA.BusinessProfileModel
    : T extends "Catalog"
    ? WA.CatalogModel
    : T extends "Chat"
    ? WA.ChatModel
    : T extends "Contact"
    ? WA.ContactModel
    : T extends "Group"
    ? WA.GroupModel
    : T extends "Message"
    ? WA.MessageModel
    : T extends "Product"
    ? WA.ProductModel
    : never;

type Factories<T extends FactoriesType> = {
    type: T;
    data: FactoriesData<T>;
};

type CreateBusinessProfile = Factories<"BusinessProfile">;
type CreateCatalog = Factories<"Catalog">;
type CreateChat = Factories<"Chat">;
type CreateContact = Factories<"Contact">;
type CreateGroup = Factories<"Group">;
type CreateMessage = Factories<"Message">;
type CreateProduct = Factories<"Product">;

type ToCreate =
    | CreateBusinessProfile
    | CreateCatalog
    | CreateChat
    | CreateContact
    | CreateGroup
    | CreateMessage
    | CreateProduct;

export type FactoriesReturn<T extends FactoriesType> = T extends "BusinessProfile"
    ? WAPI.BusinessProfile
    : T extends "Catalog"
    ? WAPI.Catalog
    : T extends "Chat"
    ? WAPI.Chat | WAPI.GroupChat
    : T extends "Contact"
    ? WAPI.Contact | WAPI.BusinessContact
    : T extends "Group"
    ? WAPI.Group
    : T extends "Message"
    ? WAPI.Message
    : T extends "Product"
    ? WAPI.Product
    : never;

const factories: PropertyDescriptor & ThisType<WAPI> = {
    value: function factories<T extends FactoriesType>(type: T, data: FactoriesData<T>): FactoriesReturn<T> {
        let factory = { type, data } as ToCreate;
        switch (factory.type) {
            case "BusinessProfile":
                return BusinessProfileFactory.create(this, factory.data) as FactoriesReturn<T>;
            case "Catalog":
                return CatalogFactory.create(this, factory.data) as FactoriesReturn<T>;
            case "Chat":
                return ChatFactory.create(this, factory.data) as FactoriesReturn<T>;
            case "Contact":
                return ContactFactory.create(this, factory.data) as FactoriesReturn<T>;
            case "Group":
                return GroupFactory.create(this, factory.data) as FactoriesReturn<T>;
            case "Message":
                return MessageFactory.create(this, factory.data) as FactoriesReturn<T>;
            case "Product":
                return ProductFactory.create(this, factory.data) as FactoriesReturn<T>;
        }
    },
};

export default factories;
