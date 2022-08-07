export default function MinimizedItemsOptionTask(optionsTask: any): {
    process: () => boolean;
    getItemOptions: (itemid: any) => any;
    getOptions: () => {};
    description: string;
};
