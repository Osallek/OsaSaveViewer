/**
 * Callback for finding distance for a collection item
 *
 * @callback funcDistance
 * @param {Object} item A collection item
 * @param {number} index An index of the collection item
 * @returns {number} Returns a distance for the item
 */
/**
* @typedef {Object} BinarySearchResult
* @property {number} index The index of the nearest item in the collection
* @property {Object} item The nearest item
*/
/**
 * Search sorted list of elements for the nearest item.
 *
 * @param {Object[]} items - The collection of elements.
 * @param {funcDistance} callback - A callback function to get distance for the collection item.
 * @param {number} [startMinimum=undefined] - The minimum index in the array to start search from
 * @param {number} [startMaximum=undefined] - The maximum index in the array to start search from
 * @returns {BinarySearchResult} Returns an item of the collection, which is nearest to optimal measured by callback function
*/
export default function binarySearch(items: any[], callback: funcDistance, startMinimum?: number, startMaximum?: number): BinarySearchResult;
/**
 * Callback for finding distance for a collection item
 */
export type funcDistance = (item: any, index: number) => number;
export type BinarySearchResult = {
    /**
     * The index of the nearest item in the collection
     */
    index: number;
    /**
     * The nearest item
     */
    item: any;
};
