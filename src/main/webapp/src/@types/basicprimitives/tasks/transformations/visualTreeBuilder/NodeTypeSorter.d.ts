export default NodeTypeSorter;
declare function NodeTypeSorter(): {
    addChild: (itemType: any, levelOffset: any, orgItem: any) => void;
    getRow: (itemType: any, index: any) => any;
    getRows: (itemType: any) => any;
};
