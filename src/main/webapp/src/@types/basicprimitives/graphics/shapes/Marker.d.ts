declare function Marker(): void;
declare class Marker {
    draw(polylinesBuffer: any, shapeType: any, position: any, paletteItem: any): void;
}
declare namespace Marker {
    const Markers: typeof Markers;
    function DrawCircle(polyline: any, position: any): void;
    function DrawRectangle(polyline: any, position: any): void;
    function DrawOval(polyline: any, position: any): void;
    function DrawTriangle(polyline: any, position: any): void;
    function DrawCrossOut(polyline: any, position: any): void;
    function DrawRhombus(polyline: any, position: any): void;
    function DrawWedge(polyline: any, position: any): void;
    function DrawFramedOval(polyline: any, position: any): void;
    function DrawFramedTriangle(polyline: any, position: any): void;
    function DrawFramedWedge(polyline: any, position: any): void;
    function DrawFramedRhombus(polyline: any, position: any): void;
    function DrawNone(polyline: any, position: any): void;
}
export default Marker;
