export default function SplitAnnotationsOptionTask(optionsTask: any): {
    process: () => boolean;
    getAnnotations: (annotationType: any, zOrderType: any) => any;
};
