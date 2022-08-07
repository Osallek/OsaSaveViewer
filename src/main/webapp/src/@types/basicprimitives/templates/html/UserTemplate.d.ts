export default function UserTemplate(options: any, content: any, onRender: any): {
    template: () => any;
    getHashCode: () => number;
    render: (event: any, data: any) => void;
};
