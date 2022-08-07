export default function CombinedTemplateParamsTask(itemTemplateParamsTask: any, labelAnnotationTemplateParamsTask: any): {
    process: () => boolean;
    getTemplateParams: (itemId: any) => any;
};
