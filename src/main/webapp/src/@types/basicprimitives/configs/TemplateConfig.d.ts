/**
 * @class TemplateConfig
 * @classdesc Template configuration object defines DOM elements for node content, cursor,
 * and mouseover highlight visual representation. If one of them is not set, then the
 * component uses an internal default template. We separate template creation and
 * rendering functions for security reasons. It is not needed in modern frameworks anymore.
 */
export default function TemplateConfig(): void;
export default class TemplateConfig {
    /**
     * A unique template name is used to reference templates from items
     * and other diagram components. The 'onItemRender' callback passes the template name as an argument.
     *
     * @type {string}
     */
    name: string;
    /**
     * If it is true, it makes templated items inactive in the diagram layout.
     * Inactive items are regular items excluded from navigation, which means they
     * are not clickable, and it is impossible to set the cursor to them. Consider
     * the inactive nodes as in-layout labels or titles having a custom item template.
     * It is worth mentioning that they impact neighbors of cursor item selection.
     * The component skips them and selects neighbors of inactive nodes.
     *
     * @type {boolean}
     */
    isActive: boolean;
    /**
     * Size. Control deals with the fixed-size layout. It makes no guesses about
     * the content of nodes. So we don't support in any form nodes auto-sizing;
     * otherwise, the component should measure the content of every node before
     * the rendering cycle. Considering that the visibility of nodes depends on
     * available space, it will be an infinite loop of diagram layout, and nodes
     * measure iterations. The more room we provide to nodes, the fewer diagram nodes
     * are visible. So control expects that node size is hard valued in the
     * template configuration.
     *
     * @type {Size}
     */
    itemSize: Size;
    /**
     * Border width. We use the archaic method to layout cursor and highlight
     * frames around nodes, so we need to know border width to measure gaps between them correctly.
     *
     * @type {number}
     */
    itemBorderWidth: number;
    /**
     * Item template. The control provides two ways to define item templates.
     * The first one sets HTML elements content via innerHTML DOM element property.
     * See the following reference at https://developer.mozilla.org website for more details.
     * The second uses JSON ML library for templates definition.
     * See http://www.jsonml.org/ for more details. That is only 3d party MIT licensed
     * code included in our codebase; everything else is 100% authentic.
     * We included it with minor modifications.
     *
     * The control calls the 'onItemRender' callback function to populate the template's content for a specific node.
     *
     * @type {string|object}
     */
    itemTemplate: string | object;
    /**
     * The markers shape type property sets the default marker shape for nodes.
     * It is possible to set it individually for every node or in the item template.
     * By default color of the marker is equal to the `itemTitleColor` property set for individual items.
     *
     * @type {ShapeType}
     */
    minimizedItemShapeType: ShapeType;
    /**
     * Marker size.
     *
     * @type {Size}
     */
    minimizedItemSize: Size;
    /**
     * Marker corner radius. It applies to simple square shapes only. If it is null,
     * then squire markers are displayed as cycles. Squares have no rounded corners if the corner radius is set to 0.
     *
     * @type {number}
     */
    minimizedItemCornerRadius: number;
    /**
     * Marker border line width
     *
     * @type {number}
     */
    minimizedItemLineWidth: number;
    /**
     * Marker border line color. It equals the `itemTitleColor` of the rendered node by default.
     *
     * @type {string}
     */
    minimizedItemBorderColor: string;
    /**
     * Marker border line pattern
     *
     * @type {LineType}
    */
    minimizedItemLineType: {
        Solid: number;
        Dotted: number;
        Dashed: number;
    };
    /**
     * Marker fill color. It equals to `itemTitleColor` of the rendered node by default.
     *
     * @type {string}
     */
    minimizedItemFillColor: string;
    /**
     * Marker fill color opacity
     *
     * @type {number}
     */
    minimizedItemOpacity: number;
    /**
     * Highlight frame offset
     *
     * @type {Thickness}
     */
    highlightPadding: Thickness;
    /**
     * Highlight frame border width
     *
     * @type {number}
     */
    highlightBorderWidth: number;
    /**
     * Highlight Template. See item template for details.
     *
     * The control calls the 'onHighlightRender' callback function to populate the highlight template content for a specific node.
     *
     * @type {string|object}
     */
    highlightTemplate: string | object;
    /**
     * Cursor frame offset from node
     *
     * @type {Thickness}
     */
    cursorPadding: Thickness;
    /**
     * Cursor frame border width
     *
     * @type {number}
     */
    cursorBorderWidth: number;
    /**
     * Cursor Template. See item template for details.
     *
     * The control calls the 'onCursorRender' callback function to populate the cursor template content for a specific node.
     *
     * @type {string|object}
     */
    cursorTemplate: string | object;
    /**
     * Sets buttons panel visibility.
     *
     * `Auto` - depends on the controls config `hasButtons` property setting.
     * `True` - visible
     * `False` - hidden
     *
     * @group Templates
     * @type {boolean}
     */
    hasButtons: boolean;
    /**
     * On buttons render callback function. This function is called to render context of buttons panel.
     *
     * @callback
     * @param {EventArgs} data Context information
     */
    onButtonsRender: any;
}
import Size from "../graphics/structs/Size";
import Thickness from "../graphics/structs/Thickness";
