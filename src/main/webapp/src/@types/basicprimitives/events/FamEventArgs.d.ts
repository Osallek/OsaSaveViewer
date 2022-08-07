/**
 * @class EventArgs
 *
 * Context object
 */
export default function FamEventArgs(): void;
export default class FamEventArgs {
    /**
     * Current item
     *
     * @type {string}
     */
    oldContext: string;
    /**
     * New item
     *
     * @type {string}
     */
    context: string;
    /**
     * Parent items
     *
     * @type {string[]}
     * @ignore
     */
    parentItems: string[];
    /**
   * Child items
   *
   * @type {string[]}
   * @ignore
   */
    childrenItems: string[];
    /**
     * Node position on the diagram.
     *
     * @type {Rect}
     */
    position: Rect;
    /**
     * Relative object name.
     *
     * @type {string}
     */
    name: string;
    /**
     * If true cancels subsequent event and layout update.
     *
     * @type {boolean}
     */
    cancel: boolean;
}
