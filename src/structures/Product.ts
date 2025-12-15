import WAPI from "../..";
import Base, { BaseSerialized } from "./Base";
import { Chat } from "../structures";

type T = WA.ProductModel;

type productSerialized = {
    additionalImageCdnUrl: string;
    catalogWid: string;
    currency: string;
    description: string;
    imageCdnUrl: string;
    isSale: boolean;
    phone: string;
    priceAmount: number;
    priceAmount1000: number;
    url: string;
    salePriceAmount1000: number;
} & BaseSerialized<string>;

export default class Product extends Base<T, productSerialized> {
    additionalImageCdnUrl: string[];
    availability?: string;
    catalogWid: WA.CatalogId;
    currency: string;
    description?: string;
    fetchedFromServer: boolean;
    id: string;
    index?: number;
    isHidden: boolean;
    isSanctioned: boolean;
    isSale: boolean;
    isState: boolean;
    imageCdnUrl?: string;
    imageCount?: number;
    imageHash?: string;
    maxAvailable: number;
    name?: string;
    old: boolean;
    priceAmount1000: number;
    productImageCollection?: WA.ProductImage;
    retailerId: string;
    reviewStatus: WA.reviewStatus;
    url?: string;
    salePriceAmount1000: number | undefined;

    constructor(app: WAPI, data: T) {
        super(app);

        if (data) this._patch(data);
        return this;
    }

    _patch(data: T) {
        this.additionalImageCdnUrl = data.additionalImageCdnUrl;
        this.availability = data.availability;
        this.catalogWid = data.catalogWid;
        this.currency = data.currency;
        this.description = data.description;
        this.fetchedFromServer = data.fetchedFromServer;
        this.id = data.id;
        this.index = data.index;
        this.isHidden = data.isHidden;
        this.isSanctioned = data.isSanctioned;
        this.isSale = !!data.salePriceAmount1000;
        this.isState = data.isState;
        this.imageCdnUrl = data.imageCdnUrl;
        this.imageCount = data.imageCount;
        this.imageHash = data.imageHash;
        this.name = data.name;
        this.maxAvailable = data.maxAvailable;
        this.old = data.old;
        this.priceAmount1000 = data.priceAmount1000;
        this.productImageCollection = data.productImageCollection;
        this.retailerId = data.retailerId;
        this.reviewStatus = data.reviewStatus;
        this.url = data.url;
        this.salePriceAmount1000 = data.salePriceAmount1000;

        this._serialized = {
            additionalImageCdnUrl: this.additionalImageCdnUrl?.join("|"),
            catalogWid: this.catalogWid._serialized,
            currency: this.currency,
            description: this.description ?? "",
            id: this.id,
            imageCdnUrl: this.imageCdnUrl ?? "",
            isSale: this.isSale,
            name: this.name ?? "",
            phone: this.catalogWid.user,
            priceAmount: (this.salePriceAmount1000 || this.priceAmount1000) / 1000,
            priceAmount1000: this.priceAmount1000,
            salePriceAmount1000: this.salePriceAmount1000 ?? 0,
            url: this.url ?? "",
        };

        return super._patch(data);
    }

    getFile() {
        return this.raw.getHeadImageFile();
    }

    getProductImageCollectionHead() {
        return this.raw.getProductImageCollectionHead();
    }

    async sendToChat(chat: WA.wid | string | WAPI.Chat) {
        return await this.app.sendAdvMessage(chat, "", { product: this });
    }
}
