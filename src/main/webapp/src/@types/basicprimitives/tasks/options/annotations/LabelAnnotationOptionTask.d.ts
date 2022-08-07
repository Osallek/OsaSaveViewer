export default function LabelAnnotationOptionTask(splitAnnotationsOptionTask: any, logicalFamilyTask: any, defaultLabelAnnotationConfig: any): {
    process: () => boolean;
    getAnnotations: () => any[];
    getMaximumId: () => any;
    getConfig: (itemId: any) => any;
};
