/**
 * @class EventArgs
 *
 * Context object
 */
export default function OrgEventArgs(): void;
export default class OrgEventArgs {
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
     * Parent item
     *
     * @type {string}
     * @ignore
     */
    parentItem: string;
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
