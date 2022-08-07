/**
 * Callback function to iterate over result shapes
 *
 * @callback onMergedRectangleItemCallback
 * @param {Point[]} points Collection of points tracing margin around result area formed via merge of rectangles.
 * The outer shape margin has clock wise sequence of data points. Internal holes inside of the shape are formed by counter clock wise
 * sequence of data points.
 */
/**
 * Merges collection of rectangles into shapes. Calls callback function to pass result sequences of data points.
 *
 * @param {Object} thisArg The callback function invocation context
 * @param {Rect[]} items Collection of rectangles.
 * @param {onMergedRectangleItemCallback} onItem Callback function to pass result sequences of margin data points.
 */
export default function getMergedRectangles(thisArg: any, items: Rect[], onItem: onMergedRectangleItemCallback): void;
/**
 * Callback function to iterate over result shapes
 */
export type onMergedRectangleItemCallback = (points: Point[]) => any;
import Point from "../graphics/structs/Point";
