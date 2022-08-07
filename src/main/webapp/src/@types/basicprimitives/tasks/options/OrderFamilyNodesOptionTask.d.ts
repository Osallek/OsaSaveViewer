export default function OrderFamilyNodesOptionTask(optionsTask: any, defaultConfig: any, defaultItemConfig: any): {
    process: () => boolean;
    getOptions: () => {};
    getConfig: (itemId: any) => any;
};
