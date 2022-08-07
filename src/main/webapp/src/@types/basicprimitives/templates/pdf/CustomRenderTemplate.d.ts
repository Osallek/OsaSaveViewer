export default function CustomRenderTemplate(options: any, onRender: any): {
    template: () => {};
    getHashCode: () => number;
    render: (doc: any, position: any, data: any) => void;
};
