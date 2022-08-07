export default function ItemTemplate(options: any, itemTemplateConfig: any): {
    template: () => (string | {
        style: {
            borderWidth: string;
        };
        class: string[];
    } | (string | {
        name: string;
        style: {
            top: string;
            left: string;
            width: string;
            height: string;
        };
        class: string[];
    } | (string | {
        name: string;
        style: {
            top: string;
            left: string;
            width: string;
            height: string;
        };
        class: string[];
    })[])[] | (string | {
        name: string;
        style: {
            top: string;
            left: string;
            width: string;
            height: string;
        };
        class: string[];
    } | (string | {
        name: string;
        alt: string;
        style: {
            width: string;
            height: string;
        };
    })[])[])[];
    getHashCode: () => string;
    render: (event: any, data: any) => void;
};
