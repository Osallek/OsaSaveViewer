export default function MatrixLayout(items: any, hideParentConnection: any, hideChildrenConnection: any): void;
export default class MatrixLayout {
    constructor(items: any, hideParentConnection: any, hideChildrenConnection: any);
    items: any;
    hideParentConnection: any;
    hideChildrenConnection: any;
    data: {
        columns: any[];
        rows: any[];
    };
    loop(thisArg: any, onItem: any): void;
    Column(): void;
    depth: number;
    offset: number;
    leftPadding: number;
    rightPadding: number;
    layoutDirection: number;
    Row(): void;
    horizontalConnectorsDepth: number;
    minimalDepth: any;
    dotsDepth: any;
    getMatrixWidth(maximumColumnsInMatrix: any, len: any): number;
    measure(levelVisibility: any, isCursor: any, isSelected: any, treeItemTemplate: any, treeItemsPositions: any, options: any): TreeItemPosition;
    measureColumns(data: any, items: any, treeItemsPositions: any, options: any): void;
    measureRows(data: any, items: any, treeItemsPositions: any, options: any): void;
    getLayoutSize(data: any): Rect;
    getLayoutWidth(data: any): number;
    getLayoutHeight(data: any): number;
    arrange(thisArg: any, parentPosition: any, layoutDirection: any, treeItemsPositions: any, options: any, onItemPositioned: any): void;
    getItemPosition(visibility: any, column: any, row: any, size: any, verticalAlignment: any): Rect;
}
import Rect from "../../../graphics/structs/Rect";
import TreeItemPosition from "../../../models/TreeItemPosition";
