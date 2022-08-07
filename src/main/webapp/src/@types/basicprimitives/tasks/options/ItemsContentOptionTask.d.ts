export default function ItemsContentOptionTask(optionsTask: any, defaultItemConfig: any): {
    process: () => boolean;
    getItems: () => any;
    getConfig: (itemId: any) => any;
    description: string;
};
