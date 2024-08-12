import WAPI from "../../../index";

const fetchProfilePic: (app: WAPI) => PropertyDescriptor & ThisType<WA.ContactModel> = (app: WAPI) => {
    return {
        value: async function fetchProfilePic() {
            let res = await app.ProfilePicThumb.find(this.id);
            return !!res;
        },
        enumerable: true,
    };
};

export default fetchProfilePic;
