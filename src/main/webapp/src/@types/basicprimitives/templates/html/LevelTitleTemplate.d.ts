export default function LevelTitleTemplate(options: any, orientation: any): {
    template: () => (string | any[] | {
        style: {
            fontSize: any;
            fontFamily: any;
            fontWeight: any;
            fontStyle: any;
        };
        class: string[];
    })[];
    getHashCode: () => number;
    render: (event: any, data: any) => void;
};
