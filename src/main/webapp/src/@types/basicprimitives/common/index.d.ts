/**
 * Indicates whether the specified number is even or not.
 *
 * @param {number} value The number to test.
 * @returns {boolean} Returns true if the value is even.
 * @ignore
 */
export function isEven(value: number): boolean;
/**
 * Indicates whether the specified string is null or an Empty string.
 *
 * @ignore
 * @param {string} value The string to test.
 * @returns {boolean} Returns true if the value is null or an empty string(""); otherwise, false.
 */
export function isNullOrEmpty(value: string): boolean;
/**
 * Callback for looping collection items
 *
 * @callback onLoopItemCallback
 * @param {number} index An index of the collection item
 * @param {Object} item A collection item
 * @returns {boolean} Returns true to break iteration process
 */
/**
 * Loops array elements or object properties.
 *
 * @param {Object} thisArg The callback function invocation context
 * @param {Object|Object[]} items - Array of items or object with properties to iterate on
 * @param {onLoopItemCallback} onItem A call back function to call on each item in the array or object.
 * @ignore
 */
export function loop(thisArg: any, items: any | any[], onItem: onLoopItemCallback): void;
/**
 * Splits string of merged cameled words into array.
 *
 * @param {string} name String of cameled words
 * @returns {string[]} Returns array of cameled words
 * @ignore
 */
export function splitCamelCaseName(name: string): string[];
/**
 * Indicates whether the specified value is object
 *
 * @param {string} item The value to test.
 * @returns {boolean} Returns true if the item is object otherwise, false.
 * @ignore
 */
export function isObject(item: string): boolean;
/**
 * Indicates whether the specified object is empty.
 *
 * @param {string} item The object to test.
 * @returns {boolean} Returns true if the item is empty object otherwise, false.
 * @ignore
 */
export function isEmptyObject(item: string): boolean;
/**
 * Makes deep copy of the object.
 *
 * @param {object} source The source object to take values from
 * @param {boolean} isShallow If true then method makes shallow copy
 * @returns {object} Returns cloned copy of the object
 * @ignore
 */
export function cloneObject(source: object, isShallow: boolean): object;
/**
 * Shallow copy of source object properites into destination
 *
 * @param {object} destination The object to add properties to
 * @param {object} source The source object to take values from
 * @returns {object} Returns reference to destination object
 * @ignore
 */
export function mergeObjects(destination: object, source: object, ...args: any[]): object;
/**
 * Returns hash code for specified string value. This function is not needed because
 * JavaScript supports near unlimited length of object property names.
 *
 * @param {string} value The string to calculate hash code for.
 * @returns {number} Returns hash code for the given string
 * @ignore
 */
export function getHashCode(value: string): number;
/**
 * Callback for getting item key for an element of the array
 *
 * @callback getKeyFuncCallback
 * @param {Object} item A collection item
 * @returns {number} Returns key of the item
 */
/**
 * Compares non-sorted arrays.
 *
 * @param {Object[]} array1 - The first collection of elements.
 * @param {Object[]} array2 - The second collection of elements.
 * @param {getKeyFuncCallback|undefined} getKeyFunc If callback function is defined it is used to get a key for an array element
 * @returns {boolean} Returns true if the arrays are identical.
 */
export function compareArrays(array1: any[], array2: any[], getKeyFunc: getKeyFuncCallback | undefined): boolean;
/**
 * Callback for looping collection items
 */
export type onLoopItemCallback = (index: number, item: any) => boolean;
/**
 * Callback for getting item key for an element of the array
 */
export type getKeyFuncCallback = (item: any) => number;
