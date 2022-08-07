export default function ItemsSizesOptionTask(optionsTask: any, defaultConfig: any, defaultItemConfig: any): {
    process: () => boolean;
    getItemOptions: (itemid: any) => any;
    getOptions: () => {};
    description: string;
};
