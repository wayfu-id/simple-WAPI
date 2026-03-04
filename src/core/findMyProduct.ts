import WAPI from "../../index";

const findMyProduct: PropertyDescriptor & ThisType<WAPI> = {
    value: async function findMyProduct(id: string) {
        if (!id) return null;

        const { ME, Contact, ModelClass } = this,
            { BusinessContact } = ModelClass;
        let contact = ME ?? Contact.getMeContact().getModel();

        if (!(contact instanceof BusinessContact)) {
            console.log("Current account is not a business account.");
            return null;
        }

        const { Catalog } = contact;
        if (!Catalog) {
            console.log("No catalog found for this business account.");
            return null;
        }
        return await Catalog.findProductById(id);
    },
};

export default findMyProduct;
