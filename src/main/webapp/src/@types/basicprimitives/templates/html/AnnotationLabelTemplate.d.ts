export default function AnnotationLabelTemplate(): {
    template: () => (string | {
        type: string;
        name: string;
        class: string[];
    })[];
    getHashCode: () => string;
    render: (event: any, data: any) => void;
};
