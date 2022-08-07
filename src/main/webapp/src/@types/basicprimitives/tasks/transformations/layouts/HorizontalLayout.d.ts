export default function HorizontalLayout(items: any, hideParentConnection: any, hideChildrenConnection: any): void;
export default class HorizontalLayout {
    constructor(items: any, hideParentConnection: any, hideChildrenConnection: any);
    items: any;
    hideParentConnection: any;
    hideChildrenConnection: any;
    data: {
        columns: any[];
        row: any;
    };
    loop(thisArg: any, onItem: any): void;
    Column(): void;
    depth: number;
    offset: number;
    parentsPadding: number;
    childrenPadding: number;
    Row(): void;
    minimalDepth: any;
    dotsDepth: any;
    measure(levelVisibility: any, isCursor: any, isSelected: any, treeItemTemplate: any, treeItemsPositions: any, options: any): TreeItemPosition;
    measureColumns(data: any, items: any, treeItemsPositions: any, options: any): void;
    measureRow(data: any, items: any, treeItemsPositions: any, options: any): void;
    getLayoutSize(data: any): Rect;
    arrange(thisArg: any, parentPosition: any, layoutDirection: any, treeItemsPositions: any, options: any, onItemPositioned: any): void;
    getItemPosition(visibility: any, offset: any, row: any, size: any, options: any): Rect;
}
import TreeItemPosition from "../../../models/TreeItemPosition";
import Rect from "../../../graphics/structs/Rect";
