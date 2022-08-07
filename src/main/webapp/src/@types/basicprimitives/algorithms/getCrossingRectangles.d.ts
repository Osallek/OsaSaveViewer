/**
 * Callback function to iterate over pairs of crossing rectangles
 *
 * @callback onCrossingRectanglesItemCallback
 * @param {Rect} rect1 First rectangle
 * @param {Rect} rect2 Second rectangle
 */
/**
 * Finds pairs of crossing rectangles.
 *
 * @param {Object} thisArg The callback function invocation context
 * @param {Rect[]} rectangles Collection of rectangles.
 * @param {onCrossingRectanglesItemCallback} onCrossing Callback function to pass pair of crossing rectangles.
 */
export default function getCrossingRectangles(thisArg: any, rectangles: Rect[], onCrossing: onCrossingRectanglesItemCallback): void;
/**
 * Callback function to iterate over pairs of crossing rectangles
 */
export type onCrossingRectanglesItemCallback = (rect1: Rect, rect2: Rect) => any;
