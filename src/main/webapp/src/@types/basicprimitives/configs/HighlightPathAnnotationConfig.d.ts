/**
 * @class HighlightPathAnnotationConfig
 * @classdesc  Highlight path annotation renders the route between the
 * given sequence of nodes over existing connector lines in the diagram.
 *
 * @param {object} arg0 Object properties.
 */
export default function HighlightPathAnnotationConfig(arg0: object, ...args: any[]): void;
export default class HighlightPathAnnotationConfig {
    /**
     * @class HighlightPathAnnotationConfig
     * @classdesc  Highlight path annotation renders the route between the
     * given sequence of nodes over existing connector lines in the diagram.
     *
     * @param {object} arg0 Object properties.
     */
    constructor(arg0: object, ...args: any[]);
    /**
     * Annotation type property explicitly defines annotation object type when
     * it is defined as a JSON object. The `annotations` collection contains
     * a mixture of all kinds of control annotations.
     *
     * @type {AnnotationType}
     */
    annotationType: {
        Connector: number;
        Shape: number;
        HighlightPath: number;
        Label: number;
        Background: number;
        Level: number;
    };
    /**
     * Sets annotation z-order placement relative to the diagram items.
     * Diagram visual elements are drawn in layers on top of each other.
     * If you place annotations over diagram nodes, you block mouse events
     * of UI elements in nodes templates. Browsers don't support mouse events
     * transparency consistently yet. So to avoid mouse events blocking UI
     * elements in node templates, you have to place annotation items under
     * nodes or manipulate z-index for UI interactive controls and make them
     * placed on top of other visual elements. The component puts the buttons panel
     * on top of everything, so annotations drawn over the diagram nodes are not blocked.
     *
     * @type {ZOrderType}
     */
    zOrderType: {
        Auto: number;
        Background: number;
        Foreground: number;
    };
    /**
     * Collection of nodes ids this path is drawn for. Please, pay attention
     * that this is the array of nodes ids. So if the diagram finds the wrong
     * way from start to end nodes, you can sequence the route yourself.
     *
     * @type {string[]}
     */
    items: string[];
    /**
     * Border line width
     *
     * @type {number}
     */
    lineWidth: number;
    /**
     * Line color
     *
     * @type {string}
     */
    color: string;
    /**
     * Line type
     *
     * @type {LineType}
     */
    lineType: {
        Solid: number;
        Dotted: number;
        Dashed: number;
    };
    /**
     * Opacity.
     *
     * @type {number}
     */
    opacity: number;
    /**
     * If true, then annotation has arrows along the route.
     *
     * @type {boolean}
     */
    showArrows: boolean;
    /**
     * If true, annotated nodes are shown in their expanded form using item
     * templates regardless of controls autofit mode and available screen space.
     *
     * @type {boolean}
     */
    selectItems: boolean;
}
