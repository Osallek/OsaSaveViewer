export default BranchAligner;
declare function BranchAligner(): {
    mergeToParent: (parentNodeId: any, nodes: any) => void;
    mergeToChild: (parentNodeId: any, nodes: any, rowType: any, index: any, offset: any, extendChildren: any) => void;
    addChild: (parentNodeId: any, nodes: any, rowType: any, index: any, offset: any, extendChildren: any) => void;
    addSplitChildren: (parentNodeId: any, nodes: any, rowType: any, index: any, offset: any) => void;
    align: (debug: any) => void;
    loopGroupTypes: (thisArg: any, nodeId: any, onGroupType: any) => void;
    getRowDepth: (nodeId: any, groupType: any, index: any) => any;
    getRowsDepth: (nodeId: any, groupType: any) => any;
    loopRows: (thisArg: any, nodeId: any, rowType: any, onRow: any) => void;
    getGroupSize: (nodeId: any, groupType: any) => any;
};
