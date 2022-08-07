/**
 * Callback for iterating rows
 *
 * @callback onRowCallback
 * @param {number} row The y coordinate of the horizontal line
 */
/**
 * Finds minimum number of horizontal lines crossing all rectangles
 *
 * @param {Object} thisArg The callback function invocation context
 * @param {React[]} rectangles Collection of rectangles
 * @param {onRowCallback} onItem Callback function to call for every found row
 */
export default function getMinimumCrossingRows(thisArg: any, rectangles: React[], onItem: onRowCallback): void;
/**
 * Callback for iterating rows
 */
export type onRowCallback = (row: number) => any;
