/**
 * Callback function to iterate over result intervals
 *
 * @callback onMergedIntervalItemCallback
 * @param {Interval} interval Merged interval
 * @param {Object} context First interval context.
 */
/**
 * Merges collection of overlapping intervals into continuous group of intervals. Calls callback
 * function to pass result interval per group of overlapping intervals.
 *
 * @param {Object} thisArg The callback function invocation context
 * @param {Interval[]} items Collection of intervals.
 * @param {onMergedIntervalItemCallback} onItem Callback function to pass result group of merged intervals.
 */
export default function getMergedIntervals(thisArg: any, items: Interval[], onItem: onMergedIntervalItemCallback): void;
/**
 * Callback function to iterate over result intervals
 */
export type onMergedIntervalItemCallback = (interval: Interval, context: any) => any;
import Interval from "../graphics/structs/Interval";
