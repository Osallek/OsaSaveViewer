export default function HighlightItemOptionTask(optionsTask: any, defaultConfig: any): {
    process: () => boolean;
    getHighlightItem: () => any;
    hasHighlightEnabled: () => boolean;
    getGravityRadius: () => any;
    description: string;
};
