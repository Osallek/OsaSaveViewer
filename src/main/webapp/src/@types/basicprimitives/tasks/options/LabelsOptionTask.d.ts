export default function LabelsOptionTask(optionsTask: any, defaultConfig: any, defaultItemConfig: any): {
    process: () => boolean;
    getItemOptions: (itemid: any) => any;
    getItemsOptions: () => any;
    getOptions: () => {};
    description: string;
};
