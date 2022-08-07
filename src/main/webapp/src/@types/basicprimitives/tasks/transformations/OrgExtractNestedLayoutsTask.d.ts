export default function OrgExtractNestedLayoutsTask(extractNestedLayoutsOptionTask: any, bindFamilyConnectorsTask: any): {
    process: (debug: any) => boolean;
    getNestedLayoutParentConnectorIds: () => {};
    getNestedLayoutBottomConnectorIds: () => {};
    getBundles: () => any[];
    getLayouts: () => {};
};
