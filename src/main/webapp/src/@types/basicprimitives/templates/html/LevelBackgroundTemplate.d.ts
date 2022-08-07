export default function LevelBackgroundTemplate(options: any, levelAnnotationConfig: any): {
    template: () => string[];
    getHashCode: () => string;
    render: (event: any, data: any) => void;
};
