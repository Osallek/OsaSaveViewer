export default function RemoveLoopsTask(logicalFamilyTask: any): {
    process: (debug: any) => boolean;
    getLogicalFamily: () => any;
    getMaximumId: () => any;
    getLoops: () => any[];
};
