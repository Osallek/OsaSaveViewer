/**
 * @class Thickness
 * @classdesc Class describes the thickness of a frame around rectangle.
 *
 * @param {number} left Left.
 * @param {number} top Top.
 * @param {number} right Right.
 * @param {number} bottom Bottom.
 */
export default function Thickness(arg0: any, arg1: any, arg2: any, arg3: any, ...args: any[]): this;
export default class Thickness {
    /**
     * @class Thickness
     * @classdesc Class describes the thickness of a frame around rectangle.
     *
     * @param {number} left Left.
     * @param {number} top Top.
     * @param {number} right Right.
     * @param {number} bottom Bottom.
     */
    constructor(arg0: any, arg1: any, arg2: any, arg3: any, ...args: any[]);
    /**
     * The thickness for the left side of the rectangle.
     */
    left: any;
    /**
     * The thickness for the upper side of the rectangle.
     */
    top: any;
    /**
     * The thickness for the right side of the rectangle.
     */
    right: any;
    /**
     * The thickness for the bottom side of the rectangle.
     */
    bottom: any;
    /**
     * Checks object is empty
     *
     * @returns {boolean} Returns true if object has no thickness defined for any of its sides
     */
    isEmpty(): boolean;
    /**
     * Checks if at least one side is positive
     *
     * @returns {boolean} Returns true if any of its sides is positive
     */
    isPositive(): boolean;
    /**
     * Checks if at least one side is negative
     *
     * @returns {boolean} Returns true if any of its sides is negative
     */
    isNegative(): boolean;
    /**
     * Maximum thickness.
     *
     * @param {Thickness} thickness The thickness to compare with.
     * @returns {Thickness} Returns reference to the current thickness object
     */
    maxThickness(thickness: Thickness): Thickness;
    /**
     * Add thickness.
     *
     * @param {Thickness} thickness The thickness to add.
     * @returns {Thickness} Returns reference to the current thickness object
     */
    addThickness(arg0: any, arg1: any, arg2: any, arg3: any, ...args: any[]): Thickness;
    /**
     * Scales the thickness by the specified value
     *
     * @param {number} scale
     * @returns {Thickness} Returns reference to the current size.
     */
    scale(scale: number): Thickness;
    /**
     * Returns thickness object in form of CSS style string. It is conversion to padding style string.
     *
     * @param {string} [units="px"] The string name of units.
     * @returns {string} CSS style string.
     */
    toString(units?: string): string;
}
