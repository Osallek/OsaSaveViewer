/**
 * @class ShapeAnnotationConfig
 * @classdesc  Shape annotation draws geometrical shapes over nodes
 * of the diagram. Consider them as free-hand figures drawn over nodes with a highlighter.
 *
 * @param {object} arg0 Object properties.
 */
export default function ShapeAnnotationConfig(arg0: object, ...args: any[]): void;
export default class ShapeAnnotationConfig {
    /**
     * @class ShapeAnnotationConfig
     * @classdesc  Shape annotation draws geometrical shapes over nodes
     * of the diagram. Consider them as free-hand figures drawn over nodes with a highlighter.
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
     * Collection of nodes ids this shape annotation is drawn for.
     *
     * @type {string[]}
     */
    items: string[];
    /**
     * Shape
     *
     * @type {ShapeType}
     */
    shapeType: {
        Rectangle: number;
        Oval: number;
        Triangle: number;
        CrossOut: number;
        Circle: number;
        Rhombus: number;
        Wedge: number;
        FramedOval: number;
        FramedTriangle: number;
        FramedWedge: number;
        FramedRhombus: number;
        None: number;
    };
    /**
     * Shape offset around annotated items.
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
     * Adds rounded corners for applicable shapes. Radius is defined in percents or pixels.
     *
     * @type {string|number}
     */
    cornerRadius: string | number;
    /**
     * Background color opacity
     *
     * @type {number}
     */
    opacity: number;
    /**
     * Shape border line color
     *
     * @type {string}
     */
    borderColor: string;
    /**
     * Shape fill color
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
     *
     * @type {boolean}
     */
    selectItems: boolean;
    /**
     * Annotation label, it is styled with 'bp-connector-label' CSS class
     *
     * @type {string}
     */
    label: string;
    /**
     * Label size
     *
     * @type {Size}
     */
    labelSize: Size;
    /**
     * Label placement around the annotation.
     *
     * @type {PlacementType}
     */
    labelPlacement: {
        Auto: number;
        TopLeft: number;
        Top: number;
        TopRight: number;
        RightTop: number;
        Right: number;
        RightBottom: number;
        BottomRight: number;
        Bottom: number;
        BottomLeft: number;
        LeftBottom: number;
        Left: number;
        LeftTop: number;
    };
    /**
     * Label offset in pixels.
     *
     * @type {number}
     */
    labelOffset: number;
}
import Thickness from "../graphics/structs/Thickness";
import Size from "../graphics/structs/Size";
