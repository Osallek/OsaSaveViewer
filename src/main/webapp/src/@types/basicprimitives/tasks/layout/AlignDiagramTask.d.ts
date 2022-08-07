export default function AlignDiagramTask(orientationOptionTask: any, itemsSizesOptionTask: any, visualTreeOptionTask: any, scaleOptionTask: any, currentControlSizeTask: any, activeItemsTask: any, itemsPositionsTask: any): {
    process: () => boolean;
    getItemPosition: (itemid: any) => any;
    getItemsPositions: () => {};
    getContentSize: () => any;
    getTreeItemForMousePosition: (x: any, y: any, gravityRadius: any) => any;
    getNextItem: (cursorItem: any, direction: any) => any;
};
