/**
 * @class LevelAnnotationConfig
 * @classdesc Level annotation highlights the same level nodes of the diagram via
 * drawing continuous rectangular shapes from side to side and the optional title
 * on the side of the diagram view area. Title placement can be inside or outside
 * of the diagram. The inside placement does not occupy diagram space and
 * is rendered in the background.
 *
 * @param {object} arg0 Object properties.
 */
export default function LevelAnnotationConfig(arg0: object, ...args: any[]): void;
export default class LevelAnnotationConfig {
    /**
     * @class LevelAnnotationConfig
     * @classdesc Level annotation highlights the same level nodes of the diagram via
     * drawing continuous rectangular shapes from side to side and the optional title
     * on the side of the diagram view area. Title placement can be inside or outside
     * of the diagram. The inside placement does not occupy diagram space and
     * is rendered in the background.
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
     * Collection of levels this level annotation is drawn for.
     *
     * @type {string[]}
     */
    levels: string[];
    /**
     * Title.
     *
     * @type {string}
     */
    title: string;
    /**
     * Title font color.
     *
     * @type {string}
     */
    titleFontColor: string;
    /**
     * The title background color.
     *
     * @type {string}
     */
    titleColor: string;
    /**
     * Background offset relative to its default position.
     *
     * @type {Thickness}
     */
    offset: Thickness;
    /**
     * The background border line width. Use {Thickness} to set border width individually per side.
     *
     * @type {Thickness}
     */
    lineWidth: Thickness;
    /**
     * Background color opacity.
     *
     * @type {number}
     */
    opacity: number;
    /**
     * Background border line color
     *
     * @type {string}
     */
    borderColor: string;
    /**
     * Background fill Color.
     *
     * @type {string}
     */
    fillColor: string;
    /**
     * Background border line type
     *
     * @type {LineType}
     */
    lineType: {
        Solid: number;
        Dotted: number;
        Dashed: number;
    };
    items: any[];
}
import Thickness from "../graphics/structs/Thickness";
