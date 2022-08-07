export default NodeGroupSorter;
declare function NodeGroupSorter(): {
    addChild: (itemType: any, index: any, orgItem: any) => void;
    getLength: () => number;
    getRow: (groupType: any, index: any) => any;
    getRows: (groupType: any) => any;
};
