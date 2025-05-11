/**
 * @class FamConfig
 * @classdesc Family Chart configuration object. Use this object as a reference
 * for available properties and their default values.
 *
 * Family Chart control has API options similar to regular UI collection controls.
 * It supports single node selection with the `cursorItem` property, mouse click,
 * or keyboard `Enter` key. The `highlightItem` functionality provides mouse over feedback
 * and lets the user navigate diagram nodes with keyboard arrow keys. The `selectedItems`
 * collection and checkboxes enable multi-select available in ListView and TreeView controls.
 *
 * @param {string} name
 */
export default function FamConfig(name: string): void;
export default class FamConfig {
    /**
     * @class FamConfig
     * @classdesc Family Chart configuration object. Use this object as a reference
     * for available properties and their default values.
     *
     * Family Chart control has API options similar to regular UI collection controls.
     * It supports single node selection with the `cursorItem` property, mouse click,
     * or keyboard `Enter` key. The `highlightItem` functionality provides mouse over feedback
     * and lets the user navigate diagram nodes with keyboard arrow keys. The `selectedItems`
     * collection and checkboxes enable multi-select available in ListView and TreeView controls.
     *
     * @param {string} name
     */
    constructor(name: string);
    name: string;
    classPrefix: string;
    /**
     * The navigation mode property allows disabling control interactivity.
     * By default, the control behaves like a regular collection control. It has a cursor to select
     * a single item in the collection. So user can click and select any node in the diagram.
     * The control has a highlight for mouseover feedback. So user can move the mouse and see highlight
     * frame and callout callback annotation for a node under the cursor.
     *
     * By `Default`, the control has both cursor and highlight. If they are disabled, then control is rendered as a static image.
     *
     * @type {NavigationMode}
     */
    navigationMode: {
        Default: number;
        CursorOnly: number;
        HighlightOnly: number;
        Inactive: number;
    };
    /**
     * The page fit mode option minimizes the diagram size via replacing nodes with markers and labels.
     * That mode can show a large number of nodes while not affecting the rendering performance.
     * It can fit thousands of nodes into available screen space without losing usability.
     * On the other hand, when we use a graphics editor to draw our diagrams manually,
     * it is common to have a sparse layout with significant gaps between the nodes.
     * If we don't fit the graph, the space between nodes can easily make
     * the diagram/chart unusable hard to view, edit and navigate.
     *
     * @group Auto Layout
     * @type {PageFitMode}
     */
    pageFitMode: {
        None: number;
        PageWidth: number;
        PageHeight: number;
        FitToPage: number;
        AutoSize: number;
        SelectionOnly: number;
    };
    /**
     * The minimal nodes visibility option controls how small nodes of the diagram can be in auto-fit mode.
     *
     * @group Auto Layout
     * @type {Visibility}
     */
    minimalVisibility: {
        Auto: number;
        Normal: number;
        Dot: number;
        Line: number;
        Invisible: number;
    };
    /**
     * The minimum visible levels option prevents top-level nodes from folding into markers.
     * It accounts for family chart relations and the `levelOffset` of individual items.
     *
     * @group Auto Layout
     * @type {number}
     */
    minimumVisibleLevels: number;
    /**
     * The orientation property rotates the diagram layout. It is needed for right-to-left languages support and custom layouts.
     *
     * @group Auto Layout
     * @type {OrientationType}
     */
    orientationType: OrientationType;
    /**
     * The vertical alignment sets nodes alignment inside row's vertical boundaries.
     * If a row of nodes contains nodes of multiple sizes, small nodes
     * are vertically aligned relative to their bigger siblings.
     * It does not change anything if diagram nodes are all of the same size.
     *
     * @group Auto Layout
     * @type {VerticalAlignmentType}
     */
    verticalAlignment: {
        Top: number;
        Middle: number;
        Bottom: number;
    };
    /**
     * The arrows direction property shows arrows for connector lines.
     * If it is set to the `Parents`, arrows are drawn towards logical parents from logical children.
     *
     * @group Relation Lines
     * @type {GroupByType}
     */
    arrowsDirection: {
        None: number;
        Parents: number;
        Children: number;
    };
    /**
     * Show extra horizontal arrows for long horizontal connection lines for the easy visual
     * tracking of relations between parents and children. By default, it is off.
     *
     * @group Relation Lines
     * @type {boolean}
     */
    showExtraArrows: boolean;
    /**
     * The extra arrows minimum space on horizontal connection lines. See `showExtraArrows` property.
     *
     * @group Relation Lines
     * @type {number}
     */
    extraArrowsMinimumSpace: number;
    /**
     * The group by property sets loose nodes alignment between rows. Nodes can be placed close towards parents or children.
     *
     * @group Auto Layout
     * @type {GroupByType}
     */
    groupByType: {
        None: number;
        Parents: number;
        Children: number;
    };
    /**
     * The align by levels option keeps items at the same levels after bundling connection lines between parents and children.
     *
     * @group Auto Layout
     * @type {boolean}
     */
    alignBylevels: boolean;
    /**
     * The matrix layout option enables nodes sharing the same parents and children into a matrix formation.
     *
     * @group Auto Layout
     * @type {boolean}
     */
    enableMatrixLayout: boolean;
    /**
     * The minimum matrix size sets the number of nodes needed to be shaped into matrix formation. See the `enableMatrixLayout` property.
     *
     * @group Auto Layout
     * @type {number}
     */
    minimumMatrixSize: number;
    /**
     * The maximum number of columns in the matrix formation prevents
     * it from outgrowing screen width and forces it to grow vertically.
     *
     * @group Auto Layout
     * @type {number}
     */
    maximumColumnsInMatrix: number;
    /**
     * The hide grandparents connections property enables hiding of direct connectors to grandparents.
     * It helps to reduce diagrams connectors layout complexity.
     *
     * @group Auto Layout
     * @type {boolean}
     */
    hideGrandParentsConnectors: boolean;
    /**
     * The elbow style of squared connectors lines.
     *
     * @group Relation Lines
     * @type {ElbowType}
     */
    elbowType: {
        None: number;
        Dot: number;
        Bevel: number;
        Round: number;
    };
    /**
     * The bevel size of squared connection lines.
     *
     * @group Relation Lines
     * @type {number}
     */
    bevelSize: number;
    /**
     * The elbow dot size property sets marker size in elbows of connector lines.
     *
     * @group Relation Lines
     * @type {number}
     */
    elbowDotSize: number;
    /**
     * Empty diagram message. This option should tell the user
     * that the chart is blank when no data is available for rendering.
     *
     * @type {string}
     */
    emptyDiagramMessage: string;
    /**
     * The items collection defines the data we render in the diagram.
     * Every item should have a unique `id`. They are used to create relations
     * between the nodes of the graph and render various UI elements associated with nodes.
     *
     * @type {FamItemConfig[]}
     */
    items: FamItemConfig[];
    /**
     * Annotations are visual elements attached to the diagram nodes and designed to spotlight
     * some nodes or relations. They are drawn either in front of the diagram or the background.
     * The annotations don't impact the placement of the nodes, though, with some exceptions.
     * As a result, the control redraws them instantaneously without rendering
     * or recalculating the actual diagram layout.
     *
     * @type {Array.<(ShapeAnnotationConfig | BackgroundAnnotationConfig | ConnectorAnnotationConfig | HighlightPathAnnotationConfig)>}
     */
    annotations: Array<(ShapeAnnotationConfig | BackgroundAnnotationConfig | ConnectorAnnotationConfig | HighlightPathAnnotationConfig)>;
    /**
     * The cursor item provides a single node selection, navigation, and local zoom in the diagram.
     * The component shows the cursor, neighbors, and selected nodes using templates and folds
     * everything into markers to save space. So clicking and moving the cursor from node to node
     * works as stepping in and expanding nodes in the neighboring diagram area. To select cursor
     * node with keyboard, use arrow keys to change focus selection first in the diagram and press
     * the `Enter` key to set the `cursorItem` to the required node. See the'onCursorChanging`
     * and `onCursorChanged` events to handle user clicks on nodes. If the cursor item is set to
     * null, then no cursor item is selected in the diagram.
     *
     * @type {string}
     */
    cursorItem: string;
    /**
     * The highlighted item sets focus to some node in the diagram. It is a redundant feature on
     * touch screen devices, so use the `navigationMode` property to disable it.
     * The highlight item can be set programmatically, with mouseover, keyboard arrow keys, or the `Tab` key.
     * The default visual is a rounded rectangle; use templates to customize the highlight's graphic.
     * The highlight item setting does not trigger diagram layout or scrolling, so it is near-instant.
     * It is designed to synchronize mouse moves over diagram nodes with other collection controls or UI elements.
     * The component triggers  the `onHighlightChanging` and `onHighlightChanged` events on highlight changes.
     * Set it to `null` to hide the highlight of the diagram.
     *
     * @type {string}
     */
    highlightItem: string;
    /**
     * The highlight gravity radius controls distance to the nearest marker to trigger the highlight setting
     * and callout annotation. For the templated nodes, it is required for the mouse to be inside the node's
     * bounding rectangle to activate the highlight setting. It can be problematic to put the mouse precisely
     * over the marker. The gravity radius helps to overcome that issue, but at the same time, it can be a source
     * of performance if the component gets too many markers within the scope of the gravity radius.
     * Please, keep this in mind and don't make it too big. It is crucial when the diagram has
     * over 5 thousand nodes in the hierarchy.
     *
     * @type {number}
     */
    highlightGravityRadius: number;
    /**
     * The selected items collection property allows the end-user to choose multiple nodes in the diagram.
     * It is a collection of ids of checked nodes. The selected items impact the diagram layout and navigation
     * process since they are always shown in the expanded templated form. So it also helps users pin nodes while they browse in the diagram.
     * The control notifies about the user changes in this collection with the `onSelectionChanging` and the `onSelectionChanged` events.
     *
     * @type {string[]}
     */
    selectedItems: string[];
    /**
    * The selection checkboxes are built-in UI elements managing the `selectedItems` collection property.
    * `Auto` - visible for cursor item only
    * `True` - visible
    * `False` - hidden
    *
    * Adding a custom checkbox element to the item template requires its name to be `checkbox`,
    * so the control can use it the same way as the built-in checkbox element.
    *
    * @type {Enabled}
    */
    hasSelectorCheckbox: {
        Auto: number;
        True: number;
        False: number;
    };
    /**
     * The checkbox label. See `hasSelectorCheckbox` and `selectedItems` properties.
     *
     * @group Templates
     * @type {string}
     */
    selectCheckBoxLabel: string;
    /**
     * The selection path mode property makes all parents of the cursor item up to the root nodes
     * to be shown with templates. It is a complimentary feature to the auto-fit mode of the
     * diagram. See the `pageFitMode` for more details.
     *
     *
     * @group Auto Layout
     * @type {SelectionPathMode}
     */
    selectionPathMode: {
        None: number;
        FullStack: number;
    };
    /**
     * The neighbors selection method defines how many neighbors are selected around the cursor.
     *
     * @type {NeighboursSelectionMode}
     */
    neighboursSelectionMode: {
        ParentsAndChildren: number;
        ParentsChildrenSiblingsAndSpouses: number;
    };
    /**
     * The show frame controls the visibility of decorating frame around the diagram.
     * The frame displays markers for selected nodes in the chart when they are outside
     * the screen and not visible to the end-user.
     *
     * @group Frame
     * @type {boolean}
     */
    showFrame: boolean;
    /**
     * The frame's inner padding adds extra padding around markers on the inner side of the frame.
     *
     * @group Frame
     * @type {Thickness}
     */
    frameInnerPadding: Thickness;
    /**
     * The frame's outer padding adds extra padding around markers on the outer side of the frame.
     *
     * @group Frame
     * @type {Thickness}
     */
    frameOuterPadding: Thickness;
    /**
     * The diagram padding adds extra padding around the diagram nodes.
     *
     * @group Frame
     * @type {Thickness}
    */
    padding: Thickness;
    /**
     * The templates property is a collection of uniquely named templates objects used
     * to customize nodes size, interactivity, and visuals for content, cursor, and highlight.
     * By default, the control provides templates for all types of visual elements.
     * So to start experimenting with the Basic Primitives library, you don't need to define any templates.
     *
     * @group Templates
     * @type {TemplateConfig[]}
     */
    templates: TemplateConfig[];
    /**
     * The default template name property allows overriding the default template for all nodes
     * without setting the template name individually per node. See the `templates` property for mode details.
     * To customize the template per node, see the `templateName` property of the `FamItemConfig`.
     *
     * @group Templates
     * @type {string}
     */
    defaultTemplateName: string;
    /**
     * The default label annotation template sets the template's name used to
     * render label annotations. Label annotations are labels placed in the layout of the diagram.
     *
     * @group Templates
     * @type {string}
     */
    defaultLabelAnnotationTemplate: string;
    /**
     * The button visibility is a legacy property. The only reason it is still available on the components API
     * is the lack of consistent support of the mouse transparency across browsers.
     * The buttons panel is placed over all other visuals in the diagram,
     * so they are not obstructed by the connector and shape annotations.
     *
     * `Auto` - cursor item only.
     * `True` - visible
     * `False` - hidden
     *
     * @group Templates
     * @type {Enabled}
     */
    hasButtons: {
        Auto: number;
        True: number;
        False: number;
    };
    /**
     * The event property is used to render the content of the buttons panel.
     *
     * @callback
     * @param {EventArgs} data Context information
     */
    onButtonsRender: any;
    /**
     * This callback function is called before the `onHighlightChanged` event.
     * See the `highlightItem` property. Use this event to modify diagram elements
     * not affecting diagram layout. For example, on-screen connector annotations
     * added in this event handler to the diagram configuration would be rendered
     * together with highlight. Use properties of this event to stop event propagation
     * and the following diagram layout and rendering if needed.
     *
     * @callback
     * @param {Object} event Mouse event
     * @param {EventArgs} data Context information
     */
    onHighlightChanging: any;
    /**
     * The on highlight changed event. See `highlightItem` property.
     *
     * @callback
     * @param {Object} event Mouse event
     * @param {EventArgs} data Context information
     */
    onHighlightChanged: any;
    /**
     * This callback function is called before the `onCursorChanged` event.
     * See the `cursorItem` property. Use properties of this event to stop event propagation
     * and the following diagram layout and rendering if needed.
     *
     * @callback
     * @param {Object} event Mouse event
     * @param {EventArgs} data Context information
     */
    onCursorChanging: any;
    /**
     * The on cursor item changed event. See `cursorItem` property.
     *
     * @callback
     * @param {Object} event Mouse event
     * @param {EventArgs} data Context information
     */
    onCursorChanged: any;
    /**
     * The on selected items being changed event. See `selectedItems` property.
     *
     * @callback
     * @param {Object} event Mouse event
     * @param {EventArgs} data Context information
     */
    onSelectionChanging: any;
    /**
     * The on selected items changed event. See `selectedItems` property.
     *
     * @callback
     * @param {Object} event Mouse event
     * @param {EventArgs} data Context information
     */
    onSelectionChanged: any;
    /**
     * The on content button click event is a legacy property.
     * To use it, buttons in the buttons panel in the item template should have the `data-buttonname` property set.
     *
     * @callback
     * @param {Object} event Mouse event
     * @param {EventArgs} data Context information
     */
    onButtonClick: any;
    /**
     * Mouse click event.
     *
     * @callback
     * @param {Object} event Mouse event
     * @param {EventArgs} data Context information
     */
    onMouseClick: any;
    /**
     * Mouse double click event.
     *
     * @callback
     * @param {Object} event Mouse event
     * @param {EventArgs} data Context information
     */
    onMouseDblClick: any;
    /**
     * The on item render callback function is used to populate the content of templated
     * nodes in the diagram. It is called for user templates only. The callback references
     * the DOM element and the node configuration object. The control reuses existing DOM elements,
     * so the application should update the entire content of the template.
     *
     * @callback
     * @param {Object} event Event if available
     * @param {RenderEventArgs} data The context information
     */
    onItemRender: any;
    /**
     * The on highlight render callback function is used to update the highlight visual content having a custom template.
     *
     * @callback
     * @param {Object} event Event if available
     * @param {RenderEventArgs} data The context information
     */
    onHighlightRender: any;
    /**
     * The on cursor render callback function is used to update the cursor visual content having a custom template.
     *
     * @callback
     * @param {Object} event Event if available
     * @param {RenderEventArgs} data The context information
     */
    onCursorRender: any;
    /**
     * The normal level shift sets spacing between rows of templated nodes.
     *
     * @group Intervals
     * @type {number}
     */
    normalLevelShift: number;
    /**
     * The dot level shift property sets the spacing between rows of markers.
     *
     * @group Intervals
     * @type {number}
     */
    dotLevelShift: number;
    /**
     * The lines level shift property sets the spacing between rows
     * having only connection lines. Nodes are hidden completely.
     *
     * @group Intervals
     * @type {number}
     */
    lineLevelShift: number;
    /**
     * The normal items interval property sets the spacing between templated nodes.
     *
     * @group Intervals
     * @type {number}
     */
    normalItemsInterval: number;
    /**
     * The dotted items interval property sets the spacing between markers.
     *
     * @group Intervals
     * @type {number}
     */
    dotItemsInterval: number;
    /**
     * The line items interval property sets the spacing between lines.
     *
     * @group Intervals
     * @type {number}
     */
    lineItemsInterval: number;
    /**
     * The cousins interval multiplier property adds extra space between branches of the hierarchy.
     * For example, if the multiplier equals five, nodes of the same parent will have interval 20,
     * and nodes of two different parents will have interval 100.
     *
     * @group Intervals
     * @type {number}
     */
    cousinsIntervalMultiplier: number;
    /**
     * The first choice title color. The component has two properties for the title color to automatically select
     * the one having the highest contract for the node's background-color
     *
     * @group Templates
     * @type {string}
     */
    itemTitleFirstFontColor: string;
    /**
     * The second choice title color.
     *
     * @group Templates
     * @type {string}
     */
    itemTitleSecondFontColor: string;
    /**
     * The markers shape type property sets the default marker shape for nodes.
     * It is possible to set it individually for every node or in the item template.
     * By default color of the marker is equal to the `itemTitleColor` property set for individual items.
     *
     * @group Templates
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
     * The color of the relations lines
     *
     * @group Relation Lines
     * @type {string}
     */
    linesColor: string;
    /**
     * The line width of the relations lines
     *
     * @group Relation Lines
     * @type {number}
     */
    linesWidth: number;
    /**
     * The line style of the relations lines
     *
     * @group Relation Lines
     * @type {LineType}
     */
    linesType: {
        Solid: number;
        Dotted: number;
        Dashed: number;
    };
    /**
     * The property shows connection lines between the cursor item and its neighbors highlighted.
     * See the `neighboursSelectionMode` and `highlightLinesColor`, `highlightLinesWidth`
     * and `highlightLinesType` to style highlighted lines.
     *
     * @group Relation Lines
     * @type {boolean}
     */
    showNeigboursConnectorsHighlighted: boolean;
    /**
     * The color of the highlighted relation lines.
     *
     * @group Relation Lines
     * @type {string}
     */
    highlightLinesColor: string;
    /**
     * The line width of the highlighted relation lines.
     *
     * @group Relation Lines
     * @type {number}
     */
    highlightLinesWidth: number;
    /**
     * The line style of the highlighted relation lines.
     *
     * @group Relation Lines
     * @type {LineType}
     */
    highlightLinesType: {
        Solid: number;
        Dotted: number;
        Dashed: number;
    };
    /**
     * The lines palette collection contains lines styles for rendering relations across the family hierarchy.
     * The multi-parent diagram may have a lot of parallel lines, so to make their visual tracing easier,
     * the component supports multiple line styles and evenly distributes them. It is a similar
     * approach as for visualization of regular line charts. If we have numerous lines in the chart area,
     * it makes sense to style every line individually.
     *
     * If this collection is empty then default `linesColor`, `linesWidth` and `linesType` are used for all connector lines.
     *
     * @group Relation Lines
     * @type {PaletteItemConfig[]}
     */
    linesPalette: PaletteItemConfig[];
    /**
     * The show callout property enables on mouse over node callout for the diagram.
     *
     * @group Callout
     * @type {boolean}
     */
    showCallout: boolean;
    /**
     * The callout maximum visibility property enables callout
     * for the diagram nodes having specified visibility. See the `pageFitMode` property.
     *
     * @group Callout
     * @type {Visibility}
     */
    calloutMaximumVisibility: {
        Auto: number;
        Normal: number;
        Dot: number;
        Line: number;
        Invisible: number;
    };
    /**
     * The callout annotation placement offset sets how far the callout rectangle is offset from the marker it is displayed for.
     *
     * @group Callout
     * @type {number}
     */
    calloutPlacementOffset: number;
    /**
     * The callout default template name. Templates are HTML fragments used to render diagram nodes.
     * They are defined with named configuration objects. See the `templates` property for more details.
     *
     * @group Callout
     * @type {string}
     */
    defaultCalloutTemplateName: string;
    /**
     * Callout annotation fill color.
     *
     * @group Callout
     * @type {string}
     */
    calloutfillColor: string;
    /**
     * Callout annotation border color.
     *
     * @group Callout
     * @type {string}
     */
    calloutBorderColor: string;
    /**
     * Callout annotation border line offset.
     *
     * @group Callout
     * @type {number}
     */
    calloutOffset: number;
    /**
     * Callout annotation corner radius.
     *
     * @group Callout
     * @type {number}
     */
    calloutCornerRadius: number;
    /**
     * Callout annotation pointer width.
     *
     * @group Callout
     * @type {string}
     */
    calloutPointerWidth: string;
    /**
     * Callout annotation border line width.
     *
     * @group Callout
     * @type {number}
     */
    calloutLineWidth: number;
    /**
     * Callout annotation opacity
     *
     * @group Callout
     * @type {number}
     */
    calloutOpacity: number;
    /**
     * The size of the button panel
     *
     * @group Templates
     * @type {number}
     */
    buttonsPanelSize: number;
    /**
     * The size of the group title
     *
     * @group Group Titles
     * @type {number}
     */
    groupTitlePanelSize: number;
    /**
     * The size of the selection checkbox
     *
     * @group Templates
     * @type {number}
     */
    checkBoxPanelSize: number;
    /**
     * The group titles placement property sets left to right or right to left alignment
     * for group title and buttons panel relative to the node.
     *
     * @group Group Titles
     * @type {AdviserPlacementType}
     */
    groupTitlePlacementType: {
        Auto: number;
        Left: number;
        Right: number;
    };
    /**
     * Group titles orientation.
     *
     * @group Group Titles
     * @type {TextOrientationType}
     */
    groupTitleOrientation: {
        Horizontal: number;
        RotateLeft: number;
        RotateRight: number;
        Auto: number;
    };
    /**
     * The group titles vertical alignment property sets text vertical alignment inside the group title panel.
     *
     * @group Group Titles
     * @type {VerticalAlignmentType}
     */
    groupTitleVerticalAlignment: {
        Top: number;
        Middle: number;
        Bottom: number;
    };
    /**
     * The group titles horizontal alignment property sets text horizontal alignment inside the group title panel.
     *
     * @group Group Titles
     * @type {HorizontalAlignmentType}
     */
    groupTitleHorizontalAlignment: {
        Center: number;
        Left: number;
        Right: number;
    };
    /**
     * Group titles font size.
     *
     * @group Group Titles
     * @type {number}
     */
    groupTitleFontSize: number;
    /**
     * Group titles font family.
     *
     * @group Group Titles
     * @type {string}
     */
    groupTitleFontFamily: string;
    /**
     * Group titles color.
     *
     * @group Group Titles
     * @type {string}
     */
    groupTitleColor: string;
    /**
     * Group titles font weight: normal, bold
     *
     * @group Group Titles
     * @type {string}
     */
    groupTitleFontWeight: string;
    /**
     * Group titles font style: normal, italic
     *
     * @group Group Titles
     * @type {string}
     */
    groupTitleFontStyle: string;
    /**
      * On group title render event. This callback function renders the group title panel.
      * It overwrites the default group title renderer. It is called only when the group title is visible.
      * See other group title options for details.
      *
      * @group Group Titles
      * @callback
      * @param {EventArgs} data Context information
      */
    onGroupTitleRender: any;
    /**
     * The panel size of the level annotation titles
     *
     * @group Level Titles
     * @type {number}
     */
    levelTitlePanelSize: number;
    /**
     * The panel placement of the level annotation titles
     *
     * @group Level Titles
     * @type {AdviserPlacementType}
     */
    levelTitlePlacementType: {
        Auto: number;
        Left: number;
        Right: number;
    };
    /**
     * If this property is true, level titles are placed inside the diagram's viewport above or below diagram nodes.
     *
     * @group Level Titles
     * @type {boolean}
     */
    levelTitlePlaceInside: boolean;
    /**
     * The level annotation titles orientation.
     *
     * @group Level Titles
     * @type {TextOrientationType}
     */
    levelTitleOrientation: {
        Horizontal: number;
        RotateLeft: number;
        RotateRight: number;
        Auto: number;
    };
    /**
     * The level annotation titles vertical alignment.
     *
     * @group Level Titles
     * @type {VerticalAlignmentType}
     */
    levelTitleVerticalAlignment: {
        Top: number;
        Middle: number;
        Bottom: number;
    };
    /**
     * The level annotation titles horizontal alignment.
     *
     * @group Level Titles
     * @type {HorizontalAlignmentType}
     */
    levelTitleHorizontalAlignment: {
        Center: number;
        Left: number;
        Right: number;
    };
    /**
     * Level titles font size.
     *
     * @group Level Titles
     * @type {number}
     */
    levelTitleFontSize: number;
    /**
     * Level titles font family.
     *
     * @group Level Titles
     * @type {string}
     */
    levelTitleFontFamily: string;
    /**
     * Level titles font color.
     *
     * @group Level Titles
     * @type {string}
     */
    levelTitleFontColor: string;
    /**
     * Level titles color.
     *
     * @group Level Titles
     * @type {string}
     */
    levelTitleColor: string;
    /**
     * Level titles font weight: normal, bold
     *
     * @group Level Titles
     * @type {string}
     */
    levelTitleFontWeight: string;
    /**
     * Level titles font style: normal, italic
     *
     * @group Level Titles
     * @type {string}
     */
    levelTitleFontStyle: string;
    /**
     * The level title callback function allows rendering custom content in the level annotation title panel.
     * It is called only for the visible level annotations. See other level annotation options for details.
      *
      * @group Level Titles
      * @callback
      * @param {EventArgs} data Context information
      */
    onLevelTitleRender: any;
    /**
     * The level background callback function allows rendering custom content in the level annotation background panel.
     * It is called only for the visible level annotations. See other level annotation options for details.
      *
      * @group Level Titles
      * @callback
      * @param {EventArgs} data Context information
      */
    onLevelBackgroundRender: any;
    /**
     * @ignore
     */
    distance: number;
    /**
     * The scale property sets the CSS scale-transform property for the diagram content.
     *
     * @type {number}
     */
    scale: number;
    /**
     * Minimum scale
     *
     * @ignore
     */
    minimumScale: number;
    /**
     * Maximum scale
     *
     * @ignore
     */
    maximumScale: number;
    /**
     * The show label property sets labels visibility for individual nodes.
     * The control displays label only for node markers. The control does not
     * preserve space for labels in the diagram layout. The application's
     * responsibility is to set intervals between nodes to fit labels.
     * Use controls `dotLevelShift`, `dotItemsInterval` and `padding` properties to preserve
     * space between nodes for labels. Labels are displayed inside `div's of
     * the fixed size, see the `labelSize` property, and the control provides
     * simple conflict resolution to avoid displaying overlapping labels.
     * If two labels overlap with their bounding rectangles,
     * then only one of them will stay visible.
     *
     * Auto - avoid labels overlapping, hide some of them
     * True - visible
     * False - hidden.
     *
     * @group Labels
     * @type {Enabled}
     */
    showLabels: {
        Auto: number;
        True: number;
        False: number;
    };
    /**
     * The label size property defines the label's placeholder `div` size,
     * which impacts conflict resolution if labels overlap.
     *
     * @group Labels
     * @type {Size}
     */
    labelSize: Size;
    /**
     * The label offset property sets the distance from the markers bounding rectangles.
     *
     * @group Labels
     * @type {number}
     */
    labelOffset: number;
    /**
     * Label orientation defines label rotation.
     *
     * @group Labels
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
     *
     * @group Labels
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
     * Labels font size.
     *
     * @group Labels
     * @type {string}
     */
    labelFontSize: string;
    /**
     * Labels font family.
     *
     * @group Labels
     * @type {string}
     */
    labelFontFamily: string;
    /**
     * Labels color
     *
     * @group Labels
     * @type {string}
     */
    labelColor: string;
    /**
     * Labels font weight
     * Font weight: normal, bold
     *
     * @group Labels
     * @type {string}
     */
    labelFontWeight: string;
    /**
     * Labels font style. Font style: normal, italic
     *
     * @group Labels
     * @type {string}
     */
    labelFontStyle: string;
    /**
     * The enable panning property enables chart panning with mouse drag for
     * desktop browsers. Disable it if you need to support items Drag & Drop.
     *
     * @type {boolean}
     */
    enablePanning: boolean;
    /**
     * Sets minimum size, the diagram can shrink itself in auto size mode. See `pageFitMode` property.
     * In the auto size mode diagram controls its placeholder size itself,
     * it sets its size to accommodate all nodes and render them normally.
     *
     * @group Auto Layout
     * @type {Size}
     */
    autoSizeMinimum: Size;
    /**
     * Sets maximum size, the diagram can expand itself in auto size mode. See `pageFitMode` property.
     * In the auto size mode diagram controls its placeholder size itself,
     * it sets its size to accommodate all nodes and render them normally.
     *
     * @group Auto Layout
     * @type {Size}
     */
    autoSizeMaximum: Size;
}
import { OrientationType } from "../enums";
import Size from "../graphics/structs/Size";
import Thickness from "../graphics/structs/Thickness";
