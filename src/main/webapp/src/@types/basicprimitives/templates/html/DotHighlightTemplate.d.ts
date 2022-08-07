export default function DotHighlightTemplate(options: any, itemTemplateConfig: any): {
    template: () => (string | {
        style: {
            borderWidth: string;
            MozBorderRadius: string;
            WebkitBorderRadius: string;
            "-khtml-border-radius": string;
            borderRadius: string;
        };
        class: string[];
    })[];
    getHashCode: () => string;
    render: (event: any, data: any) => void;
};
