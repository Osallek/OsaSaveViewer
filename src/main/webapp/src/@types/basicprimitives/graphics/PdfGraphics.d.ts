export default function PdfGraphics(doc: any): void;
export default class PdfGraphics {
    constructor(doc: any);
    _doc: any;
    _context: any;
    m_placeholders: {};
    m_activePlaceholder: any;
    saveCounter: number;
    clean(): void;
    resize(name: any, width: any, height: any): void;
    position(name: any, left: any, top: any, width: any, height: any): void;
    begin(): void;
    end(): void;
    reset(arg0: any, arg1: any): void;
    activate(name: any, layer: any): any;
    text(x: any, y: any, width: any, height: any, label: any, orientation: any, horizontalAlignment: any, verticalAlignment: any, attr: any): void;
    polylinesBuffer(buffer: any): void;
    polyline(polylineData: any): void;
    rightAngleLine(fromX: any, fromY: any, toX: any, toY: any, attr: any): void;
    template(x: any, y: any, width: any, height: any, contentx: any, contenty: any, contentWidth: any, contentHeight: any, template: any, hashCode: any, onRenderTemplate: any, uiHash: any, attr: any): void;
    getPxSize(value: any, base: any): any;
}
