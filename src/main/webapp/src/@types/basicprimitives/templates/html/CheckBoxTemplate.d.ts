export default function CheckBoxTemplate(selectCheckBoxLabel: any): {
    template: () => (string | (string | (string | any[])[])[])[];
    getHashCode: () => string;
    render: (event: any, data: any) => void;
};
