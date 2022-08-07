/**
 * Callback function for getting family node width
 *
 * @callback onFamilyAlignmentItemSizeCallback
 * @param {string} itemid Family node id
 * @param {object} item Family node context object
 * @returns {number} Family node width
 */
/**
 * Creates family alignment data structure. This structure aligns horizontally planar family of nodes.
 * @class FamilyAlignment
 *
 * @param {Object} thisArg The callback function invocation context
 * @param {family} family Family data structure
 * @param {TreeLevels} treeLevels Three levels data structure
 * @param {onFamilyAlignmentItemSizeCallback} onItemSize Callback function to measure family node width
 * @returns {FamilyAlignment} Returns family alignment structure
 */
export default function FamilyAlignment(thisArg: any, family: any, treeLevels: TreeLevels, onItemSize: onFamilyAlignmentItemSizeCallback): FamilyAlignment;
export default class FamilyAlignment {
    /**
     * Callback function for getting family node width
     *
     * @callback onFamilyAlignmentItemSizeCallback
     * @param {string} itemid Family node id
     * @param {object} item Family node context object
     * @returns {number} Family node width
     */
    /**
     * Creates family alignment data structure. This structure aligns horizontally planar family of nodes.
     * @class FamilyAlignment
     *
     * @param {Object} thisArg The callback function invocation context
     * @param {family} family Family data structure
     * @param {TreeLevels} treeLevels Three levels data structure
     * @param {onFamilyAlignmentItemSizeCallback} onItemSize Callback function to measure family node width
     * @returns {FamilyAlignment} Returns family alignment structure
     */
    constructor(thisArg: any, family: any, treeLevels: TreeLevels, onItemSize: onFamilyAlignmentItemSizeCallback);
}
/**
 * Callback function for getting family node width
 */
export type onFamilyAlignmentItemSizeCallback = (itemid: string, item: object) => number;
