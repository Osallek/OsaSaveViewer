/**
 * @class Matrix
 * @classdesc Square matrix having 2 rows and 2 columns.
 *
 * @param {Matrix} arg0 Matrix to clone
 *
 * @param {number} arg0 A1 - top left.
 * @param {number} arg1 B1 - top right.
 * @param {number} arg2 A2 - bottom left.
 * @param {number} arg3 B2 - bottom right.
 */
export default function Matrix(arg0: Matrix, arg1: number, arg2: number, arg3: number, ...args: any[]): void;
export default class Matrix {
    /**
     * @class Matrix
     * @classdesc Square matrix having 2 rows and 2 columns.
     *
     * @param {Matrix} arg0 Matrix to clone
     *
     * @param {number} arg0 A1 - top left.
     * @param {number} arg1 B1 - top right.
     * @param {number} arg2 A2 - bottom left.
     * @param {number} arg3 B2 - bottom right.
     */
    constructor(arg0: Matrix, arg1: number, arg2: number, arg3: number, ...args: any[]);
    a1: any;
    b1: number;
    a2: number;
    b2: number;
    /**
     * Finds matrix determinant
     *
     * @returns {number} Returns matrix determinant
     */
    determinant(): number;
}
