/**
 * Create spatial index structure. It uses collection of sizes to distribute
 * rectangles into buckets of similar size elements. Elements of the same bucket
 * are approximated to points. The search of rectangles is transformed to search of points
 * within given range plus offset for maximum linear rectangle size.
 *
 * @class SpatialIndex
 *
 * @param {Array} sizes Reference to optional collection of possible sizes of items we plan to store
 * in the index
 *
 * @returns {SpatialIndex} Returns spacial index data structure.
 */
export default function SpatialIndex(sizes: any[]): SpatialIndex;
export default class SpatialIndex {
    /**
     * Create spatial index structure. It uses collection of sizes to distribute
     * rectangles into buckets of similar size elements. Elements of the same bucket
     * are approximated to points. The search of rectangles is transformed to search of points
     * within given range plus offset for maximum linear rectangle size.
     *
     * @class SpatialIndex
     *
     * @param {Array} sizes Reference to optional collection of possible sizes of items we plan to store
     * in the index
     *
     * @returns {SpatialIndex} Returns spacial index data structure.
     */
    constructor(sizes: any[]);
}
