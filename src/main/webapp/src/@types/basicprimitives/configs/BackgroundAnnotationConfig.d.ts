/**
 * @class BackgroundAnnotationConfig
 * @classdesc Background annotation draws a rectangular shape around annotated items.
 * Annotations borders are offset around nodes, so if two annotations overlap,
 * they are merged into one continuous shape with a single borderline.
 *
 * @param {object} arg0 Object properties.
 */
export default function BackgroundAnnotationConfig(arg0: object, ...args: any[]): void;
export default class BackgroundAnnotationConfig {
    /**
     * @class BackgroundAnnotationConfig
     * @classdesc Background annotation draws a rectangular shape around annotated items.
     * Annotations borders are offset around nodes, so if two annotations overlap,
     * they are merged into one continuous shape with a single borderline.
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
        Label: number; /**
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
        Background: number;
        Level: number;
    };
    /**
     * The `items` Collection contains nodes ids the background annotation is drawn for.
     *
     * @type {string[]}
     */
    items: string[];
    /**
     * If this property is true, background annotation includes all descendants of every
     * item in the `items` collection. It works in {OrgDiagram} only.
     *
     * @type {boolean}
     */
    includeChildren: boolean;
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
     * Sets background borderline offset around annotated items.
     *
     * @type {Thickness}
     */
    offset: Thickness;
    /**
     * Border line width
     *
     * @type {number}
     */
    lineWidth: number;
    /**
     * Background color opacity.
     *
     * @type {number}
     */
    opacity: number;
    /**
     * Border line color
     *
     * @type {string}
     */
    borderColor: string;
    /**
     * Fill Color.
     *
     * @type {string}
     */
    fillColor: string;
    /**
     * Border line type
     *
     * @type {LineType}
     */
    lineType: {
        Solid: number;
        Dotted: number;
        Dashed: number;
    };
    /**
     * If true, annotated nodes are shown in their expanded form using item
     * templates regardless of controls autofit mode and available screen space.
     * @type {boolean}
     */
    selectItems: boolean;
}
import Thickness from "../graphics/structs/Thickness";
