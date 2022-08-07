export default function CalloutOptionTask(optionsTask: any, defaultConfig: any, defaultItemConfig: any): {
    process: () => boolean;
    getOptions: () => {};
    getItemOptions: (itemid: any) => any;
    description: string;
};
