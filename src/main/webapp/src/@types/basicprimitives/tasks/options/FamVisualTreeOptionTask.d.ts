export default function FamVisualTreeOptionTask(optionsTask: any): {
    process: () => boolean;
    getOptions: () => {
        leavesPlacementType: number;
        childrenPlacementType: number;
        maximumColumnsInMatrix: number;
        horizontalAlignment: number;
    };
};
