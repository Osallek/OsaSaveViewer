declare function SvgGraphics(element: any, ...args: any[]): void;
declare class SvgGraphics {
    constructor(element: any, ...args: any[]);
    parent: any;
    _svgxmlns: string;
    clean(...args: any[]): void;
    resizePlaceholder(placeholder: any, left: any, top: any, width: any, height: any, ...args: any[]): void;
    _getCanvas(): any;
    polyline(polylineData: any): void;
}
export default SvgGraphics;
