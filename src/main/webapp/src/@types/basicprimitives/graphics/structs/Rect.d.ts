/**
 * @class Rect
 * @classdesc Class describes the width, height and location of rectangle.
 *
 * @param {Rect} arg0 Rectangle to clone.
 *
 * @param {Point} arg0 The top left point.
 * @param {Point} arg1 The bottom right point.
 *
 * @param {number} arg0 The x coordinate of top left corner.
 * @param {number} arg1 The y coordinate of top left corner.
 * @param {number} arg2 Rect width.
 * @param {number} arg3 Rect height.
 */
export default function Rect(arg0: Rect, arg1: Point, arg2: number, arg3: number, ...args: any[]): void;
export default class Rect {
    /**
     * @class Rect
     * @classdesc Class describes the width, height and location of rectangle.
     *
     * @param {Rect} arg0 Rectangle to clone.
     *
     * @param {Point} arg0 The top left point.
     * @param {Point} arg1 The bottom right point.
     *
     * @param {number} arg0 The x coordinate of top left corner.
     * @param {number} arg1 The y coordinate of top left corner.
     * @param {number} arg2 Rect width.
     * @param {number} arg3 Rect height.
     */
    constructor(arg0: Rect, arg1: Point, arg2: number, arg3: number, ...args: any[]);
    /**
     * The location x coordinate
     * @type {number}
     */
    x: number;
    /**
     * The location y coordinate
     * @type {number}
     */
    y: number;
    /**
     * The width of rectangle.
     * @type {number}
     */
    width: number;
    /**
     * The height of rectangle.
     * @type {number}
     */
    height: number;
    /**
     * Reference to context object associated with this rectangle.
     * @type {object}
     */
    context: object;
    /**
     * Left
     *
     * @returns {number} Returns x coordinate of the rectangle
     */
    left(): number;
    /**
     * Top
     *
     * @returns {number} Returns y coordinate of the rectangle
     */
    top(): number;
    /**
     * Right
     *
     * @returns {number} Returns x-axis coordinate of the right side of the rectangle
     */
    right(): number;
    /**
     * Bottom
     *
     * @returns {number} Returns y-axis coordinate of the bottom side of the rectangle
     */
    bottom(): number;
    /**
     * Vertical center
     *
     * @returns {number} Returns y-axis coordinate of the center point of the rectangle.
     */
    verticalCenter(): number;
    /**
     * Horizontal center
     *
     * @returns {number} Returns x-axis coordinate of the center point of the rectangle.
     */
    horizontalCenter(): number;
    /**
     * Center point
     *
     * @returns {Point} Returns center point of the rectangle.
     */
    centerPoint(): Point;
    /**
     * Checks if rectangle is empty. Rectangle is empty if one of its sizes is undefined or less than zero.
     *
     * @returns {boolean} Returns true if rectangle is empty.
     */
    isEmpty(): boolean;
    /**
     * Expands rectangle boundaries by using specified value in all directions. Value can be negative.
     *
     * @param {number} arg0 The amount by which to expand or shrink the sides of the rectangle.
     * @param {number} arg0 Left side
     * @param {number} arg1 Top side
     * @param {number} arg2 Right side
     * @param {number} arg3 Bottom side
     */
    offset(arg0: number, arg1: number, arg2: number, arg3: number, ...args: any[]): Rect;
    /**
     * Scales the rectangle by the specified value
     *
     * @param {number} scale
     * @returns {Rect} Returns reference to the current rectangle.
     */
    scale(scale: number): Rect;
    /**
     * Moves the rectangle by the specified horizontal and vertical offsets.
     *
     * @param {number} x Horizontal offset
     * @param {number} y Vertical offset
     *
     * @returns {Rect} Returns reference to the current rectangle.
     */
    translate(x: number, y: number): Rect;
    /**
     * Inverts rectangle coordinates
     *
     * @returns {Rect} Returns reference to the current rectangle.
     */
    invert(): Rect;
    /**
     * Callback for iterating rectangle's sides
     *
     * @callback loopRectEdgesCallback
     * @param {Vector} vector Vector connecting two corners of the rectangle's side
     * @param {PlacementType} placementType The current side
     * @returns {boolean} Returns true to break iteration process
     */
    /**
     * Loops edges of the rectangle in the clockwise order: Top, Right, Bottom, Left
     *
     * @param {loopRectEdgesCallback} callback A callback function to iterate over sides of the rectangle.
     * @returns {Rect} Returns reference to the current rectangle.
    */
    loopEdges(callback: loopRectEdgesCallback): Rect;
    /**
     * Checks if the rectangle contains given point
     *
     * @param {Point} arg0 The point to check.
     *
     * @param {number} arg0  The x coordinate of the point to check.
     * @param {number} arg1  The y coordinate of the point to check.
     * @returns {boolean} Returns true if the rectangle contains the specified point; otherwise, false.
     */
    contains(arg0: Point, arg1: number, ...args: any[]): boolean;
    /**
     * Crops the rectangle by the boundaries of the specified rectangle.
     *
     * @param {Rect} rect The rectangle that is used to crop boundaries by
     * @returns {Rect} Returns reference to the current rectangle.
     */
    cropByRect(rect: Rect): Rect;
    /**
     * Checks if the rectangle overlaps the specified rectangle
     *
     * @param {Rect} rect The rectangle to check overlapping for.
     * @returns {boolean} Returns true if two rectangles overlap each other.
     */
    overlaps(rect: Rect): boolean;
    /**
     * Expands the rectangle boundaries to contain the specified rectangle.
     *
     * @param {Rect} arg0 The rectangle to contain.
     *
     * @param {number} arg0 The x coordinate of top left corner.
     * @param {number} arg1 The y coordinate of top left corner.
     * @param {number} [arg2=undefined] Width.
     * @param {number} [arg3=undefined] Height.
     * @returns {Rect} Returns reference to the current rectangle.
     */
    addRect(arg0: Rect, arg1: number, arg2?: number, arg3?: number, ...args: any[]): Rect;
    /**
     * Returns rectangle location and size in form of CSS style object.
     *
     * @param {string} [units="px"] The string name of units.
     * @returns {object} CSS style object
     */
    getCSS(units?: string): object;
    /**
     * Returns rectangle location and size in form of CSS style string.
     *
     * @param {string} [units="px"] The string name of units.
     * @returns {string} CSS style string.
     */
    toString(units?: string): string;
    /**
     * Validates rectangle properties
     *
     * @returns {boolean} Returns true if rectangle properties are valid.
     */
    validate(): boolean;
    /**
     * Checks if rectangles are equal
     *
     * @param {Rect} rect Rectangle
     * @returns {boolean} Returns true if rectangles are equal.
     */
    equalTo(rect: Rect): boolean;
    /**
     * Find intersection point between rectangle's perimeter and line connecting the given point and center of the rectangle
     *
     * @param {Point} point Point to project
     * @returns {Point} Returns point or null if point is inside rectangle.
     */
    getProjectionPoint(point: Point): Point;
    /**
     * Vertical Interval
     *
     * @returns {Interval} Returns vertical interval of the rectangle
     */
    verticalInterval(): Interval;
}
/**
 * Callback for iterating rectangle's sides
 */
export type loopRectEdgesCallback = (vector: Vector, placementType: {
    Auto: number;
    TopLeft: number;
    Top: number;
    TopRight: number;
    RightTop: number;
    Right: number;
    RightBottom: number;
    BottomRight: number;
    Bottom: number;
    BottomLeft: number;
    LeftBottom: number;
    Left: number;
    LeftTop: number;
}) => boolean;
import Point from "./Point";
import Interval from "./Interval";
import Vector from "./Vector";
