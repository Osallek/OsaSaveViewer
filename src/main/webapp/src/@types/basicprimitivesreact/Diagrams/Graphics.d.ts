export default Graphics;
declare class Graphics {
    constructor(size: any);
    placeholders: {};
    activePlaceholder: any;
    size: any;
    hasGraphics: boolean;
    names: any[];
    orientations: string[];
    horizontalAlignments: string[];
    verticalAlignments: string[];
    clean(): void;
    resize(name: any, width: any, height: any): void;
    position(name: any, left: any, top: any, width: any, height: any): void;
    show(name: any): void;
    hide(name: any): void;
    resizePlaceholder(placeholder: any, left: any, top: any, width: any, height: any): void;
    reset(placeholderName: any, layerKey: any): void;
    activate(placeholderName: any, layerKey: any): any;
    activatePlaceholder(name: any): void;
    activateLayer(value: any): void;
    map(thisArg: any, placeholderName: any, onLayer: any): any[];
    text(x: any, y: any, width: any, height: any, label: any, orientation: any, horizontalAlignment: any, verticalAlignment: any, attr: any): void;
    polylinesBuffer(buffer: any): void;
    polyline(polylineData: any): void;
    template(x: any, y: any, width: any, height: any, contentx: any, contenty: any, contentWidth: any, contentHeight: any, template: any, hashCode: any, onRenderTemplate: any, uiHash: any, attr: any): void;
    getPxSize(value: any, base: any): any;
}
//# sourceMappingURL=Graphics.d.ts.map