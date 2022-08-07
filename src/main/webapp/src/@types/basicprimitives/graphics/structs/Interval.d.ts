/**
 * @class Interval
 * @classdesc Class represents interval defined by two values.
 *
 * @param {Interval} arg0 Interval object to clone.
 *
 * @param {number} arg0 The from value.
 * @param {number} arg1 The to value.
 */
export default function Interval(arg0: Interval, arg1: number, arg2: any, ...args: any[]): void;
export default class Interval {
    /**
     * @class Interval
     * @classdesc Class represents interval defined by two values.
     *
     * @param {Interval} arg0 Interval object to clone.
     *
     * @param {number} arg0 The from value.
     * @param {number} arg1 The to value.
     */
    constructor(arg0: Interval, arg1: number, arg2: any, ...args: any[]);
    /**
     * The from value
     * @type {number}
     */
    from: number;
    /**
     * The to value
     * @type {number}
     */
    to: number;
    /**
     * Reference to the context object associated with this Interval.
     * @type {object}
     */
    context: object;
    /**
     * Width
     *
     * @returns {number} Returns interval width
     */
    width(): number;
    /**
     * Checks if intervals are equal
     *
     * @param {Interval} interval Interval
     * @returns {boolean} Returns true if intervals are equal.
     */
    equalTo(interval: Interval): boolean;
    /**
     * Clones the interval
     *
     * @returns {Interval} Returns copy of the interval.
     */
    clone(): Interval;
    /**
     * Returns interval in form of user friendly string
     *
     * @returns {string} Returns string interval representation.
     */
    toString(): string;
    /**
     * Checks if the interval overlaps the specified interval
     *
     * @param {Interval} interval The interval to check overlapping for.
     * @returns {boolean} Returns true if two intervals overlap each other.
     */
    overlaps(interval: Interval): boolean;
}
