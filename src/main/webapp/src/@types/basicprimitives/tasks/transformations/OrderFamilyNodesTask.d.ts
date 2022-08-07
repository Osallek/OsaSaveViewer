export default function OrderFamilyNodesTask(orderFamilyNodesOptionTask: any, userDefinedNodesOrderTask: any, normalizeLogicalFamilyTask: any): {
    process: (debug: any) => boolean;
    getLogicalFamily: () => any;
    getMaximumId: () => any;
    getTreeLevels: () => any;
    getBundles: () => any;
    getConnectorsStacksSizes: (levelid: any) => any;
};
