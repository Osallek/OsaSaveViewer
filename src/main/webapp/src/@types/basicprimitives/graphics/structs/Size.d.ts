/**
 * @class Size
 * @classdesc Size object defines width and height.
 *
 * @param {Size} arg0 Size object to clone.
 *
 * @param {number} arg0 Width.
 * @param {number} arg1 Height.
 */
export default function Size(arg0: Size, arg1: number, ...args: any[]): void;
export default class Size {
    /**
     * @class Size
     * @classdesc Size object defines width and height.
     *
     * @param {Size} arg0 Size object to clone.
     *
     * @param {number} arg0 Width.
     * @param {number} arg1 Height.
     */
    constructor(arg0: Size, arg1: number, ...args: any[]);
    /**
     * The width
     * @type {number}
     */
    width: number;
    /**
     * The height
     * @type {number}
     */
    height: number;
    /**
     * Checks if size is empty. Size is empty if one of its dimensions is undefined or less than zero.
     *
     * @returns {boolean} Returns true if size is empty.
     */
    isEmpty(): boolean;
    /**
     * Inverts size dimensions
     *
     * @returns {Size} Returns reference to the current size.
     */
    invert(): Size;
    /**
     * Scales the size by the specified value
     *
     * @param {number} scale
     * @returns {Size} Returns reference to the current size.
     */
    scale(scale: number): Size;
    /**
     * Returns square size
     *
     * @returns {number} Returns square size.
     */
    space(): number;
    /**
     * Returns size in form of CSS style object.
     *
     * @param {string} [units="px"] The string name of units.
     * @returns {object} CSS style object
     */
    getCSS(units?: string): object;
    /**
     * Crops the size by the other size object.
     *
     * @param {Size} size The size to use as the crop boundaries.
     * @returns {Size} Returns reference to the current size object
     */
    cropBySize(size: Size): Size;
    /**
     * Extends the current size by the other size.
     *
     * @param {Size} size The size to use as extension.
     * @returns {Size} Returns reference to the current size object
     */
    maxSize(size: Size): Size;
    /**
     * Expands the current size by the thickness object.
     *
     * @param {Thickness} thickness The thickness to use for expansion.
     * @returns {Size} Returns reference to the current size object
     */
    addThickness(thickness: Thickness): Size;
    /**
     * Shrinks the current size by the thickness object.
     *
     * @param {Thickness} thickness The thickness to use for contraction.
     * @returns {Size} Returns reference to the current size object
     */
    removeThickness(thickness: Thickness): Size;
    /**
     * Validates size properties
     *
     * @returns {boolean} Returns true if size properties are valid.
     */
    validate(): boolean;
}
