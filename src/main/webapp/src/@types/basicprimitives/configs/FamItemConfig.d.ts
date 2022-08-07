/**
 * @class FamItemConfig
 * @classdesc Family chart item configuration object defines properties
 * of individual nodes in the family diagram. Nodes configurations
 * populate the `items` collection property of the family chart
 * configuration object used to describe the entire component configuration.
 *
 * @param {FamItemConfig} arg0 Item config properties
 *
 * @param {string} arg0 Item id
 * @param {string[]|undefined} arg1 Parents ids
 * @param {string} arg2 Title
 * @param {string} arg3 Description
 * @param {string} arg4 Image
 */
export default function FamItemConfig(arg0: FamItemConfig, arg1: string[] | undefined, arg2: string, arg3: string, arg4: string, ...args: any[]): void;
export default class FamItemConfig {
    /**
     * @class FamItemConfig
     * @classdesc Family chart item configuration object defines properties
     * of individual nodes in the family diagram. Nodes configurations
     * populate the `items` collection property of the family chart
     * configuration object used to describe the entire component configuration.
     *
     * @param {FamItemConfig} arg0 Item config properties
     *
     * @param {string} arg0 Item id
     * @param {string[]|undefined} arg1 Parents ids
     * @param {string} arg2 Title
     * @param {string} arg3 Description
     * @param {string} arg4 Image
     */
    constructor(arg0: FamItemConfig, arg1: string[] | undefined, arg2: string, arg3: string, arg4: string, ...args: any[]);
    /**
     * Unique item id.
     *
     * @type {string}
     */
    id: string;
    /**
     * The parents collection property contains parent nodes ids.
     * If it is empty, then the item is considered a root item.
     *
     * @type {string[]}
     */
    parents: string[];
    /**
     * The relative item id is used to place the given item in the diagram on the left
     * or right side of the referenced item. See the `placementType` property.
     * If multiple items share the same relative item, their order can be customized
     * with the `position` property. If this property is set to null, the family layout
     * algorithm will try to choose elements order via placing connected nodes
     * as close to each other as possible.
     *
     * @group Order
     * @type {string}
     */
    relativeItem: string;
    /**
     * The placement type property defines the node position on the left or the right side of the relative node.
     *
     * @group Order
     * @type {AdviserPlacementType}
     */
    placementType: {
        Auto: number;
        Left: number;
        Right: number;
    };
    /**
     * The position property sets the sequence of elements placed relative to the same relative item on the same side.
     *
     * @group Order
     * @type {number}
     */
    position: number;
    /**
     * The primary parent id lets place item close to the selected parent when the
     * node has multiple parents. If the referenced parent does not exist,
     * this property is simply ignored.
     *
     * @group Order
     * @type {string}
     */
    primaryParent: string;
    /**
     * Title. It is used in the default template.
     *
     * @group Template
     * @type {string}
     */
    title: string;
    /**
     * Description
     *
     * @group Template
     * @type {string}
     */
    description: string;
    /**
     * Image
     *
     * @group Template
     * @type {string}
     */
    image: string;
    /**
     * Context object
     *
     * @group Template
     * @type {object}
     */
    context: object;
    /**
     * Title background color for default template.
     * When the node is displayed as a marker, it sets the marker color.
     *
     * @group Template
     * @type {string}
     */
    itemTitleColor: string;
    /**
     * Marker type. The shape of the marker when the node is minimized in the diagram layout.
     * The component is designed for automatic nodes positioning; it optimizes nodes placement
     * and size depending on the available screen space. When the diagram size is significantly
     * larger than the available screen space, its scrolling and navigation become problematic,
     * so control replaces some nodes with markers. That feature has a lot of options for tuning.
     *
     * @group Template
     * @type {ShapeType}
     */
    minimizedItemShapeType: {
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
     * Group Title. The group title is a panel on the side of the node with rotated text inside.
     * It is one of the control's default easy-to-use features.
     * It gives extra dimension for the visual grouping in the diagram.
     *
     * @group Group Title
     * @type {string}
     */
    groupTitle: string;
    /**
     * The group title background color.
     *
     * @group Group Title
     * @type {string}
     */
    groupTitleColor: string;
    /**
     * Matrix id defines the grouping of multiple nodes into matrixes.
     * Use this property to split large matrixes into small ones.
     *
     * @type {string}
     */
    matrixId: string;
    /**
     * Add to matrix property allows the node to be grouped with other nodes. It is true, by default.
     *
     * @type {boolean}
     */
    addToMatrix: boolean;
    /**
     * If it is true, it makes the node inactive in the diagram layout.
     * The inactive item is excluded from navigation, which means it is not clickable,
     * and it is impossible to set the cursor to it. Consider the inactive node as an in-layout
     * label or title having a custom item template. It is worth mentioning that it
     * impacts cursor neighbors selection. The component skips the static node
     * and selects its neighbors instead
     *
     * @type {boolean}
     */
    isActive: boolean;
    /**
     * It controls the visibility of the selection check box for the node.
     * The selection checkbox is a default, easy-to-use feature to add and
     * remove nodes to selected items collection
     *
     * Auto - depends on the control's configuration `hasSelectorCheckbox` property setting
     * True - visible
     * False - hidden
     *
     * @type {Enabled}
     */
    hasSelectorCheckbox: {
        Auto: number;
        True: number;
        False: number;
    };
    /**
     * It controls the visibility of the context buttons panel for the node.
     * The context buttons panel is a built-in, easy-to-use feature to add
     * interactive UI elements around the cursor node. On-screen annotations
     * do not block context buttons panel as well
     *
     * Auto - depends on the control's configuration `hasButtons` property setting
     * True - visible
     * False - hidden
     *
     * @group Template
     * @type {Enabled}
     */
    hasButtons: {
        Auto: number;
        True: number;
        False: number;
    };
    /**
     * Template name lets individually assign rendering templates per individual
     * node of the diagram. Templates contain settings defining node size,
     * interactivity options, and HTML fragments to render nodes.
     * See the family chart configuration object for the `templates` property
     *
     * @group Template
     * @type {string}
     */
    templateName: string;
    /**
     * Show callout property sets callout annotation visibility per individual node.
     * The callout annotation is one of the easy-to-use features of the control.
     * It is displayed for markers to preview the node's content. The content is displayed
     * using the current node template it is rendered for. The callout can be forced
     * to be displayed for templated nodes as well. In that case, use the `calloutTemplateName`
     * property to change the callout template
     *
     * Auto - depends on the control's configuration `showCallout` property setting
     * True - always visible
     * False - hidden
     *
     * @group Callout
     * @type {Enabled}
     */
    showCallout: {
        Auto: number;
        True: number;
        False: number;
    };
    /**
     * Callout annotation template name redefined default item template used to display
     * the content of the callout annotation. Templates contain size and HTML fragments
     * to display node content. See the `templates` property of the family
     * chart control configuration object
     *
     * @group Callout
     * @type {string}
     */
    calloutTemplateName: string;
    /**
     * Marker label
     *
     * @group Label
     * @type {string}
     */
    label: string;
    /**
     * The show label property sets labels visibility for individual nodes.
     * The control displays label only for node markers. The control does not
     * preserve space for labels in the diagram layout. The application's
     * responsibility is to set intervals between nodes to fit labels.
     * Use controls `dotLevelShift`, `dotItemsInterval` properties to preserve
     * space between nodes for labels. Labels are displayed inside `div's of
     * the fixed size, see the `labelSize` property, and the control provides
     * simple conflict resolution to avoid displaying overlapping labels.
     * If two labels overlap each other with their bounding rectangles,
     * then only one of them will stay visible.
     *
     * Auto - avoid labels overlapping, hide some of them
     * True - visible
     * False - hidden
     *
     * @group Label
     * @type {Enabled}
     */
    showLabel: {
        Auto: number;
        True: number;
        False: number;
    };
    /**
     * The label size property defines the label's placeholder `div` size,
     * which impacts conflict resolution if labels overlap. If it is `null`,
     * it uses the `labelSize` property of the control configuration
     *
     * @group Label
     * @type {Size}
     */
    labelSize: Size;
    /**
     * Label orientation defines label rotation. If it is `Auto`,
     * it uses the `labelOrientation` property of the control configuration
     *
     * @group Label
     * @type {TextOrientationType}
     */
    labelOrientation: {
        Horizontal: number;
        RotateLeft: number;
        RotateRight: number;
        Auto: number;
    };
    /**
     * Label placement sets label placement around the marker.
     * If it is `Auto`, it uses the `labelPlacement` of the control configuration
     *
     * @group Label
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
}
