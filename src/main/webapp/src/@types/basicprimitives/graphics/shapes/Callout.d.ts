declare function Callout(graphics: any): void;
declare class Callout {
    constructor(graphics: any);
    m_graphics: any;
    pointerPlacement: number;
    cornerRadius: string;
    offset: number;
    opacity: number;
    lineWidth: number;
    pointerWidth: string;
    borderColor: string;
    lineType: number;
    fillColor: string;
    m_map: number[][];
    draw(snapPoint: any, position: any): void;
    _getPlacement(point: any, point1: any, point2: any): number;
    _drawSegment(polyline: any, pointA: any, pointB: any, pointC: any, base: any, radius: any, sideSnapPoint: any, cornerSnapPoint: any): void;
}
export default Callout;
