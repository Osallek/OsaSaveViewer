/**
 * Breaks collection of values into 3 intervals, so values stay close to each other within interval.
 *
 * @param {number[]} values Array of values
 * @returns {number[]} Returns array containing 3 indexes. The first 2 break values into 3 intervals,
 * the last index is actual index of the last element in the values collection.
 */
export default function getLiniarBreaks(values: number[]): number[];
