export default function Graphics(element: any): void;
export default class Graphics {
    constructor(element: any);
    m_element: any;
    m_placeholders: {};
    m_activePlaceholder: any;
    m_cache: Cache;
    debug: boolean;
    layerNames: {};
    clean(): void;
    resize(name: any, width: any, height: any): void;
    position(name: any, left: any, top: any, width: any, height: any): void;
    show(name: any): void;
    hide(name: any): void;
    resizePlaceholder(placeholder: any, left: any, top: any, width: any, height: any): void;
    begin(): void;
    end(): void;
    reset(arg0: any, arg1: any, ...args: any[]): void;
    activate(arg0: any, arg1: any, ...args: any[]): any;
    _activatePlaceholder(placeholderName: any): any;
    _activateLayer(layerName: any): void;
    prepend(parent: any, newElement: any): void;
    insertAfter(insertAfterElement: any, newElement: any): void;
    text(x: any, y: any, width: any, height: any, label: any, orientation: any, horizontalAlignment: any, verticalAlignment: any, attr: any): void;
    polylinesBuffer(buffer: any): void;
    template(x: any, y: any, width: any, height: any, contentx: any, contenty: any, contentWidth: any, contentHeight: any, template: any, hashCode: any, onRenderTemplate: any, uiHash: any, attr: any): any;
    getElementByTemplate(template: any): any;
    getPxSize(value: any, base: any): any;
}
import Cache from "./Cache";