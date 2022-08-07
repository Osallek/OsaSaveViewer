export default function CursorItemOptionTask(optionsTask: any, defaultConfig: any): {
    process: () => boolean;
    getCursorItem: () => any;
    hasCursorEnabled: () => boolean;
    description: string;
};
