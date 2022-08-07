export default function ExtractNestedLayoutsTask(extractNestedLayoutsOptionTask: any, bindFamilyConnectorsTask: any): {
    process: (debug: any) => boolean;
    getLogicalFamily: () => any;
    getMaximumId: () => any;
    getLayouts: () => any;
    getNestedLayoutParentConnectorIds: () => any;
    getNestedLayoutBottomConnectorIds: () => any;
    getBundles: () => any;
};
