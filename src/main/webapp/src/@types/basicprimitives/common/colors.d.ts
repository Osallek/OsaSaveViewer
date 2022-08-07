/**
 * Converts color string into HEX color string.
 *
 * @param {string} color Regular HTML color string.
 * @returns {string} Returns color value in form of HEX string.
 */
export function getColorHexValue(color: string): string;
/**
 * Converts color string into HTML color name string or return hex color string.
 *
 * @param {string} color Regular HTML color string
 * @returns {string} Returns HTML Color name or HEX string.
 */
export function getColorName(color: string): string;
/**
 * Gets red value of HEX color string.
 *
 * @param {string} color Color
 * @returns {number} Returns red value of the HEX color string.
 */
export function getRed(color: string): number;
/**
 * Gets green value of HEX color string.
 *
 * @param {string} color Color
 * @returns {number} Returns green value of the HEX color string.
 */
export function getGreen(color: string): number;
/**
 * Gets blue value of HEX color string.
 *
 * @param {string} color Color
 * @returns {number} Returns blue value of the HEX color string.
 */
export function getBlue(color: string): number;
/**
 * Calculates before opacity color value producing color you need after applying opacity.
 *
 * @param {string} color The color you want to get after applying opacity.
 * @param {number} opacity Opacity
 * @returns {string} The HEX color before opacity
 */
export function beforeOpacity(color: string, opacity: number): string;
/**
 * Finds contrast between base color and two optional first and second colors and returns the one which has highest contrast.
 *
 * @param {string} baseColor Base color to compare with
 * @param {string} firstColor First color.
 * @param {string} secondColor Second color.
 *
 * @returns {string} Returns highest contrast color compared to base color.
 */
export function highestContrast(baseColor: string, firstColor: string, secondColor: string): string;
/**
 * Calculates luminosity between two HEX string colors.
 *
 * @param {string} firstColor First color.
 * @param {string} secondColor Second color.
 *
 * @returns {number} Returns luminosity value
 */
export function luminosity(firstColor: string, secondColor: string): number;
