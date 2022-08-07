export default function CreateTransformTask(orientationOptionTask: any, scaleOptionTask: any, alignDiagramTask: any): {
    process: () => boolean;
    getTransform: () => any;
    getTreeItemForMousePosition: (x: any, y: any, gravityRadius: any) => any;
    description: string;
};
