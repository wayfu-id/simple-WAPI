import WAPI from "../../..";
import toLid from "./toLid";

const widModel: (app: WAPI) => PropertyDescriptorMap = (app: WAPI) => {
    return {
        toLid: toLid(app),
    };
};

export default widModel;
