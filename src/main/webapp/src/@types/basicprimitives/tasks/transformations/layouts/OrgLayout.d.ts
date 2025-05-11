export default function OrgLayout(visualTree: any, treeLevels: any, leftMargins: any, rightMargins: any, getConnectorsStacksSizes: any): void;
export default class OrgLayout {
    constructor(visualTree: any, treeLevels: any, leftMargins: any, rightMargins: any, getConnectorsStacksSizes: any);
    visualTree: any;
    treeLevels: any;
    leftMargins: any;
    rightMargins: any;
    getConnectorsStacksSizes: any;
    treeLevelsPositions: any[];
    childLayoutsPositions: {};
    loop(thisArg: any, onItem: any): void;
    measure(levelVisibility: any, isCursor: any, isSelected: any, treeItemTemplate: any, treeItemsPositions: any, options: any): TreeItemPosition;
    getLayoutSize(treeLevels: any, treeItemsPositions: any, childLayoutsPositions: any, treeLevelsPositions: any, padding: any): Rect;
    getLayoutWidth(treeLevels: any, treeItemsPositions: any, childLayoutsPositions: any, padding: any): number;
    getLayoutHeight(treeLevelsPositions: any, padding: any): any;
    setLevelsDepth(treeLevels: any, treeItemsPositions: any, treeLevelsPositions: any, verticalAlignment: any): void;
    shiftLevels(treeLevelsPositions: any, shift: any, shifts: any, arrowsDirection: any, linesWidth: any, getConnectorsStacksSizes: any): void;
    setOffsets(treeLevels: any, treeItemsPositions: any, childLayoutsPositions: any, treeLevelsPositions: any, visualTree: any, rightMargins: any, leftMargins: any, intervals: any, arrowsDirection: any, linesWidth: any, cousinsIntervalMultiplier: any, horizontalAlignment: any, padding: any): void;
    getGapBetweenSiblings(leftItem: any, rightItem: any, rightMargins: any, leftMargins: any, treeItemsPositions: any, childLayoutsPositions: any): number;
    getRightMargins(treeItem: any, rightMargins: any, treeItemsPositions: any, childLayoutsPositions: any): any[];
    getLeftMargins(treeItem: any, leftMargins: any, childLayoutsPositions: any): number[];
    getChildrenOffset(treeItem: any, treeItemsPositions: any, childLayoutsPositions: any, visualTree: any, horizontalAlignment: any): number;
    offsetItem(treeItem: any, offset: any, treeLevels: any, treeItemsPositions: any, childLayoutsPositions: any, treeLevelsPositions: any): void;
    offsetItemChildren(treeItem: any, offset: any, treeLevels: any, visualTree: any, treeItemsPositions: any, childLayoutsPositions: any, treeLevelsPositions: any): void;
    arrange(thisArg: any, position: any, layoutDirection: any, treeItemsPositions: any, options: any, onItemPositioned: any): void;
    getItemPosition(visibility: any, offset: any, size: any, prevLevel: any, level: any, verticalAlignment: any): {
        actualPosition: Rect;
        horizontalConnectorsShift: any;
        topConnectorShift: any;
        topConnectorInterval: number;
        bottomConnectorShift: any;
        bottomConnectorInterval: number;
    };
}
import Rect from "../../../graphics/structs/Rect";
import TreeItemPosition from "../../../models/TreeItemPosition";
