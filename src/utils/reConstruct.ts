/**
 * Reconstruct Object properties
 * @param obj
 * @returns
 */
const reConstruct: (obj: any) => PropertyDescriptorMap = (obj: any) => {
    return Object.keys(obj).reduce((o: any, k: string) => {
        o[k] = { value: obj[k], enumerable: true };
        return o;
    }, {} as { [k: string]: any });
};

export default reConstruct;
