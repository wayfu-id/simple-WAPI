import Contact from "./Contact";

export default class BusinessContact extends Contact {
    isBusiness: boolean = true;
    businessCatalog?: WAPI.Catalog = undefined;
    businessProfile?: WAPI.BusinessProfile = undefined;
    raw: WA.BusinessContact;

    _patch(data: WA.BusinessContact) {
        super._patch(data);
        this.businessCatalog = data.businessCatalog?.getModel();
        this.businessProfile = data.businessProfile?.getModel();
        // this.fetchCatalog();
        return data;
    }

    async fetchAll() {
        await Promise.all([this.fetchCatalog(), this.fetchProducts(), this.fetchBusinessProfile()]);
        return this;
    }

    async fetchBusinessProfile() {
        if (this.businessProfile) return Promise.resolve(this.businessProfile);
        try {
            let profile = await this.app.BusinessProfile.fetchBizProfile(this.id);
            if (profile) {
                this.businessProfile = profile.getModel();
                this.raw.businessProfile = profile;
                return this.businessProfile;
            }
            return undefined;
        } catch (err: Error | any) {
            console.warn(err?.message || "Error fetching business profile: Profile not found");
            return undefined;
        }
    }

    async fetchCatalog() {
        if (this.businessCatalog) return Promise.resolve(this.businessCatalog);
        try {
            let catalog = await this.app.Catalog.find(this.id);
            if (catalog) {
                this.businessCatalog = catalog.getModel();
                this.raw.businessCatalog = catalog;
                return this.businessCatalog;
            }
            return undefined;
        } catch (err: Error | any) {
            console.warn(err?.message || "Error fetching catalog: Catalog not found");
            return undefined;
        }
    }

    async fetchProducts() {
        if (!this.businessCatalog || !this.Catalog) return false;
        if (!(await this.Catalog?.fetchProducts())) return false;
        return true;
    }

    get Catalog() {
        return this.businessCatalog;
    }

    get Products() {
        if (!this.Catalog) return null;
        let results = this.Catalog.Products;
        if (!results || results.length === 0) {
            results = this.Catalog.productCollection.getModelsArray().map((p) => {
                return p.getModel();
            });
        }
        return results;
    }

    // get BusinessProfile() {}
}
