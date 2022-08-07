export default function FamItemsOptionTask(optionsTask: any, defaultItemConfig: any): {
    process: () => boolean;
    getItems: () => any;
    getConfig: (itemId: any) => any;
};
