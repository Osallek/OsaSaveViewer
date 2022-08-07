/**
 * Callback function to measure item weights of merged arrays.
 *
 * @callback getItemWeightCallback
 * @param {object} item The item to weight
 * @returns {number} Returns item's weight.
 */
/**
 * Merges array of sorted arrays into one using call back function for comparison.
 *
 * @param {object[][]} arrays  Array of sorted arrays of objects.
 * @param {getItemWeightCallback} getItemWeight Callback function to measure item weight.
 * @param {boolean} ignoreDuplicates If true returns distinct weight items only.
 * @returns {object[]} Returns merged sorted array.
 */
export default function mergeSort(arrays: object[][], getItemWeight: getItemWeightCallback, ignoreDuplicates: boolean): object[];
/**
 * Callback function to measure item weights of merged arrays.
 */
export type getItemWeightCallback = (item: object) => number;
