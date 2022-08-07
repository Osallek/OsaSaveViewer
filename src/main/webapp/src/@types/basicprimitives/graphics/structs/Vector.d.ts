/**
 * @class Vector
 * @classdesc Class defines a vector in 2D plane.
 *
 * @param {Vector} arg0 Vector object to clone.
 *
 * @param {Point} arg0 From point.
 * @param {Point} arg1 To point
 */
export default function Vector(arg0: Vector, arg1: Point, ...args: any[]): void;
export default class Vector {
    /**
     * @class Vector
     * @classdesc Class defines a vector in 2D plane.
     *
     * @param {Vector} arg0 Vector object to clone.
     *
     * @param {Point} arg0 From point.
     * @param {Point} arg1 To point
     */
    constructor(arg0: Vector, arg1: Point, ...args: any[]);
    /**
     * The start point
     */
    from: any;
    /**
     * The end point
     */
    to: Point;
    /**
     * Reference to context object associated with this vector.
     * @type {object}
     */
    context: object;
    /**
     * Checks if start and end points are the same
     *
     * @returns {boolean} Returns true if start and end points are the same.
     */
    isNull(): boolean;
    /**
     * Vector length
     *
     * @returns {number} Returns vector length
     */
    length(): number;
    /**
     * Checks if vectors are equal
     *
     * @param {Vector} vector Vector
     * @returns {boolean} Returns true if vectors are equal.
     */
    equalTo(vector: Vector): boolean;
    /**
     * Returns middle point of the current vector
     *
     * @returns {Point} Returns middle point
     */
    getMiddlePoint(): Point;
    /**
     * Finds how two vectors relate to each other
     *
     * @param {Vector} vector The vector to relate with
     * @returns {VectorRelationType} Returns how the vector relates to the specified vector
     */
    relateTo(vector: Vector): {
        None: number;
        Null: number;
        Collinear: number;
        Opposite: number;
    };
    /**
     * Offsets vector coordinates
     *
     * @param {number} offset Offset
     */
    offset(offset: number): void;
    /**
     * Gets line
     *
     * @returns {number[]} Returns line coefficients
     */
    getLine(): number[];
    /**
     * Gets line key
     *
     * @returns {string} Returns unique line key
     */
    getLineKey(): string;
    /**
     * Checks if two vectors have intersection point
     *
     * @param {vector} vector The vector to check intersection with
     * @returns {boolean} Returns true if vectors intersect
     */
    intersect(vector: vector): boolean;
    /**
     * Finds intersection point of two vectors
     *
     * @param {Vector} vector The vector to find intersection with
     * @param {boolean} strict If true then intersection point should belong to both vectors
     * @param {number} rounding The precision of calculations
     * @returns {Point|null} Returns intersection point or null if intersection does not exists
     */
    getIntersectionPoint(vector: Vector, strict: boolean, rounding: number): Point | null;
    /**
     * @ignore
     */
    _contains(x: any, y: any, rounding: any): boolean;
}
import Point from "./Point";
