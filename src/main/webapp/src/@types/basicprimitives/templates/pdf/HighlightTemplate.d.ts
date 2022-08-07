export default function HighlightTemplate(options: any, itemTemplateConfig: any): {
    template: () => {};
    getHashCode: () => number;
    render: (doc: any, position: any, _data: any) => void;
};
