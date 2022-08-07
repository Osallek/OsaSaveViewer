export default function CombinedContextsTask(task1: any, task2: any): {
    process: () => boolean;
    getConfig: (itemId: any) => any;
};
