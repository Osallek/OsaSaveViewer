export default function HighlightTemplate(options: any, itemTemplateConfig: any): {
    template: () => (string | {
        style: {
            borderWidth: string;
        };
        class: string[];
    })[];
    getHashCode: () => string;
    render: (event: any, data: any) => void;
};
