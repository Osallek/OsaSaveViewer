declare function Shape(graphics: any): void;
declare class Shape {
    constructor(graphics: any);
    m_graphics: any;
    transform: Transform;
    orientationType: number;
    panelSize: any;
    shapeType: number;
    offset: Thickness;
    lineWidth: number;
    labelOffset: number;
    cornerRadius: string;
    opacity: number;
    fillColor: any;
    labelSize: Size;
    lineType: number;
    borderColor: any;
    hasLabel: boolean;
    labelTemplate: any;
    labelPlacement: number;
    draw(position: any, uiHash: any): void;
}
export default Shape;
import Size from "../structs/Size";
import Thickness from "../structs/Thickness";
import Transform from "../Transform";
