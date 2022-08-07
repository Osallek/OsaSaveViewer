export default function PaletteItem(options: any): void;
export default class PaletteItem {
    constructor(options: any);
    lineColor: string;
    lineWidth: number;
    lineType: number;
    fillColor: any;
    opacity: any;
    _key: string;
    toAttr(): {
        lineWidth: number;
        lineType: number;
    };
    toString(): string;
}
