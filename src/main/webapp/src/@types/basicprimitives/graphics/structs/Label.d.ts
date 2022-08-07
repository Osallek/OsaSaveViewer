declare function Label(...args: any[]): void;
declare class Label {
    constructor(...args: any[]);
    text: any;
    position: any;
    weight: number;
    isActive: boolean;
    labelType: number;
    labelOrientation: number;
    horizontalAlignmentType: number;
    verticalAlignmentType: number;
    parent: any;
}
export default Label;
