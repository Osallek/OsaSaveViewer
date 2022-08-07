/**
 * @class RenderEventArgs
 * @classdesc The render event arguments contains parameters of rendering callback function
 */
export default function RenderEventArgs(): void;
export default class RenderEventArgs {
    /**
     * Node id
     * @type {string}
     */
    id: string;
    /**
     * Reference to DOM element.
     * @type {object}
     */
    element: object;
    /**
     * Context object of the node
     * @type {object}
     */
    context: object;
    /**
     * Node template name
     * @type {string}
     */
    templateName: string;
    /**
     * This option indicates current template state.
     * @type {RenderingMode}
     */
    renderingMode: RenderingMode;
    /**
     * The rendered item is current diagram cursor item
     * @type {boolean}
     */
    isCursor: boolean;
    /**
     * The rendered item is selected
     * @type {boolean}
     */
    isSelected: boolean;
}
