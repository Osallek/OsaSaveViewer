export default function CursorTemplate(options: any, itemTemplateConfig: any): {
    template: () => {};
    getHashCode: () => number;
    render: (doc: any, position: any, data: any) => void;
};
