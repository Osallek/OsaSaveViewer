export default function VisualTreeTask(orgTreeTask: any, activeItemsTask: any, visualTreeOptionTask: any): {
    process: () => boolean;
    getVisualTree: () => any;
    getLogicalFamily: () => any;
    getLeftMargins: () => any;
    getRightMargins: () => any;
    getMaximumId: () => any;
    getBranchAligner: () => any;
};
