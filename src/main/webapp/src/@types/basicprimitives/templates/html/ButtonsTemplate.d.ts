export default function ButtonsTemplate(options: any): {
    template: () => (string | {
        style: {
            position: string;
        };
    })[];
    getHashCode: () => string;
    render: (event: any, data: any) => void;
};
