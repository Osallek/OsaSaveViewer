export default function ItemTemplate(options: any, itemTemplateConfig: any): {
    template: () => {};
    getHashCode: () => number;
    render: (doc: any, position: any, data: any) => void;
};
