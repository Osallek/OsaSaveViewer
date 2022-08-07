export default function CursorItemTask(cursorItemOptionTask: any, activeItemsTask: any): {
    process: () => boolean;
    getCursorTreeItem: () => any;
    getItems: () => any[];
};
