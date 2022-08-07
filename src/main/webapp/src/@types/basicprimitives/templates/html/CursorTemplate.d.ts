export default function CursorTemplate(options: any, itemTemplateConfig: any): {
    template: () => (string | {
        style: {
            width: string;
            height: string;
            borderWidth: string;
        };
        class: string[];
    })[];
    getHashCode: () => string;
    render: (event: any, data: any) => void;
};
