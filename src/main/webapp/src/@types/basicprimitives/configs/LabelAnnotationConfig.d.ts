/**
 * @class LabelAnnotationConfig
 * @classdesc In-layout label annotations are placed between nodes,
 * impacting diagram layout and node placement. Label annotations are
 * designed for auto-placement and bundling connection lines between nodes when needed.
 *
 * @param {object} arg0 Object properties.
 */
export default function LabelAnnotationConfig(arg0: object, arg1: any, ...args: any[]): void;
export default class LabelAnnotationConfig {
    /**
     * @class LabelAnnotationConfig
     * @classdesc In-layout label annotations are placed between nodes,
     * impacting diagram layout and node placement. Label annotations are
     * designed for auto-placement and bundling connection lines between nodes when needed.
     *
     * @param {object} arg0 Object properties.
     */
    constructor(arg0: object, arg1: any, ...args: any[]);
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
     * This is the item id you are creating annotation for.
     *
     * @type {string}
     */
    fromItem: string;
    /**
     * The collection of destination nodes should have only child or parent
     * items of the annotated item simultaneously. It cannot include children
     * and parents at the same time. Suppose the annotated item has several
     * label annotations for different sub-sets of children. In that case,
     * annotations form into cascades of labels over connection lines in the diagram.
     *
     * @type {string[]}
     */
    toItems: string[];
    /**
     * The label of the annotation. It is styled with `bp-connector-label` CSS class name.
     *
     * @type {string}
     */
    title: string;
    /**
     * Background color.
     *
     * @type {string}
     */
    itemTitleColor: string;
    /**
     * Item template name. See items templates collection for more details.
     *
     * @type {string}
     */
    templateName: string;
    toItem: any;
}
