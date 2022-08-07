export default function CustomRenderTemplate(options: any, onRender: any): {
    template: () => (string | {
        style: {
            position: string;
        };
    })[];
    getHashCode: () => string;
    render: (event: any, data: any) => void;
};
