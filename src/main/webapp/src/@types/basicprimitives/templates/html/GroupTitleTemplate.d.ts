export default function GroupTitleTemplate(options: any): {
    template: () => (string | any[] | {
        style: {
            fontSize: any;
            fontFamily: any;
            fontWeight: any;
            fontStyle: any;
        };
        class: string[];
    })[];
    getHashCode: () => string;
    render: (event: any, data: any) => void;
};
