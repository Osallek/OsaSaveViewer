export default function FamilyLayout(logicalFamily: any, treeLevels: any, getConnectorsStacksSizes: any): void;
export default class FamilyLayout {
    constructor(logicalFamily: any, treeLevels: any, getConnectorsStacksSizes: any);
    logicalFamily: any;
    treeLevels: any;
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
    setOffsets(treeLevels: any, treeItemsPositions: any, childLayoutsPositions: any, treeLevelsPositions: any, logicalFamily: any, intervals: any, padding: any): void;
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
