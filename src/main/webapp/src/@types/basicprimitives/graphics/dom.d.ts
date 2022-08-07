export function getElementsByName(thisArg: any, parent: any, name: any, onNode: any): void;
export function getFixOfPixelAlignment(element: any): Size;
export function getElementOffset(element: any): {
    top: number;
    left: number;
};
export function hasClass(element: any, className: any): boolean;
/**
 * This method uses various approaches used in different browsers to stop event propagation.
 * @param {object} event Event to be stopped
 * @ignore
 */
export function stopPropagation(event: object): void;
export function getInnerSize(element: any): Size;
import Size from "./structs/Size";
