export default function LabelAnnotationPlacementOptionTask(labelAnnotationOptionTask: any, defaultLabelAnnotationConfig: any): {
    process: () => boolean;
    getAnnotations: () => any[];
    getMaximumId: () => any;
};
