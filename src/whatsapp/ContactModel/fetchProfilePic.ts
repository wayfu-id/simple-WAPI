import WAPI from "../../../index";

const fetchProfilePic: (app: WAPI) => PropertyDescriptor & ThisType<WA.ContactModel> = (app: WAPI) => {
    return {
        value: async function fetchProfilePic() {
            await app.ProfilePicThumb.find(this.id);
            return this;
        },
        enumerable: true,
    };
};

export default fetchProfilePic;
