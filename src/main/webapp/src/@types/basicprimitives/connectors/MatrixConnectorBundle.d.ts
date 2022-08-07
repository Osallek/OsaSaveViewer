declare function MatrixConnectorBundle(isChildren: any, items: any, matrixNodeId: any, connectionId: any, matrixWidth: any): void;
declare class MatrixConnectorBundle {
    constructor(isChildren: any, items: any, matrixNodeId: any, connectionId: any, matrixWidth: any);
    isChildren: any;
    items: any;
    len: any;
    matrixNodeId: any;
    connectionId: any;
    matrixWidth: any;
    blocksCount: number;
    rowsCount: number;
    trace(data: any, params: any, options: any): void;
    traceChildrenLayout(data: any, params: any, options: any): void;
    traceParentsLayout(data: any, params: any, options: any): void;
    getNodeIndex(blockIndex: any, row: any, isLeft: any, isChild: any): number;
}
export default MatrixConnectorBundle;
