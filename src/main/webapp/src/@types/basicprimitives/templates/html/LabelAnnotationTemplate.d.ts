export default function LabelAnnotationTemplate(): {
    template: () => (string | {
        class: string[];
    })[];
    getHashCode: () => string;
    render: (event: any, data: any) => void;
};
