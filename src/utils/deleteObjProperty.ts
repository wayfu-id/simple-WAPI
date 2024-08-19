/**
 * Return deleted properties from an Object
 * @param keys
 * @param obj
 * @returns
 */
function deleteObjProperty(keys: string | string[], obj: any) {
    (Array.isArray(keys) ? keys : [keys]).forEach((key) => delete obj[key]);
    return obj;
}

export default deleteObjProperty;
