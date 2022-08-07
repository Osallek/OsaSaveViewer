export default function SelectedItemsTask(selectedItemsOptionTask: any, itemsOptionTask: any): {
    process: () => boolean;
    getItems: () => any[];
    isSelected: (itemid: any) => any;
};
