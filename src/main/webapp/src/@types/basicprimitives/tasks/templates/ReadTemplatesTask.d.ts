export default function ReadTemplatesTask(templatesOptionTask: any, defaultTemplates: any): {
    process: () => boolean;
    getTemplate: (templateName1: any, templateName2: any, templateName3: any) => any;
    getItemTemplates: () => any[];
    DefaultWidgetTemplateName: string;
    DefaultWidgetLabelAnnotationTemplateName: string;
};
