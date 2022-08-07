/**
 * @class Point
 * @classdesc Class represents pair of x and y coordinates that define a point in 2D plane.
 *
 * @param {Point} arg0 Point object to clone.
 *
 * @param {number} arg0 The x coordinate.
 * @param {number} arg1 The y coordinate.
 */
export default function Point(arg0: Point, arg1: number, ...args: any[]): void;
export default class Point {
    /**
     * @class Point
     * @classdesc Class represents pair of x and y coordinates that define a point in 2D plane.
     *
     * @param {Point} arg0 Point object to clone.
     *
     * @param {number} arg0 The x coordinate.
     * @param {number} arg1 The y coordinate.
     */
    constructor(arg0: Point, arg1: number, ...args: any[]);
    /**
     * The x coordinate
     * @type {number}
     */
    x: number;
    /**
     * The y coordinate
     * @type {number}
     */
    y: number;
    /**
     * Reference to the context object associated with this point.
     * @type {object}
     */
    context: object;
    /**
     * Scales the point location by the specified value
     *
     * @param {number} scale
     * @returns {Point} Returns reference to the current point.
     */
    scale(scale: number): Point;
    /**
     * Calculates distance to the specified point
     *
     * @param {Point} arg0 Point
     *
     * @param {number} arg0 X coordinate
     * @param {number} arg1 Y coordinate
     *
     * @returns {number} Returns distance to the specified point
     */
    distanceTo(arg0: Point, arg1: number, ...args: any[]): number;
    /**
     * Checks if points are equal
     *
     * @param {Point} point Point
     * @returns {boolean} Returns true if points are equal.
     */
    equalTo(point: Point): boolean;
    /**
     * Swaps values of 2 points
     *
     * @param {Point} point The point to swap values with
     */
    swap(point: Point): void;
    /**
     * Clones the point
     *
     * @returns {Point} Returns copy of the point.
     */
    clone(): Point;
    /**
     * Returns point in form of CSS style string.
     *
     * @param {string} [units="px"] The string name of units.
     * @returns {string} CSS style string.
     */
    toString(units?: string): string;
    /**
     * Returns size in form of CSS style object.
     *
     * @param {string} [units="px"] The string name of units.
     * @returns {object} CSS style object
     */
    getCSS(units?: string): object;
}
