/**
 * @class PaletteItemConfig
 * @classdesc Palette Item configuration object defines cross-family
 * connections lines styles. Multi-parent diagrams may have a lot of
 * parallel lines, so to make their visual tracing easier, the component
 * supports multiple line styles and evenly distributes them. It is a similar
 * approach as for visualization of regular line charts. If we have numerous
 * lines in the chart area, it makes sense to style every line individually.
 *
 * @param {PaletteItemConfig} arg0 Palette properties object.
 *
 * @param {string} arg0 Line color
 * @param {number} arg1 Line width
 * @param {LineType} arg2 Line type
 */
export default function PaletteItemConfig(arg0: PaletteItemConfig, arg1: number, arg2: {
    Solid: number;
    Dotted: number;
    Dashed: number;
}, ...args: any[]): void;
export default class PaletteItemConfig {
    /**
     * @class PaletteItemConfig
     * @classdesc Palette Item configuration object defines cross-family
     * connections lines styles. Multi-parent diagrams may have a lot of
     * parallel lines, so to make their visual tracing easier, the component
     * supports multiple line styles and evenly distributes them. It is a similar
     * approach as for visualization of regular line charts. If we have numerous
     * lines in the chart area, it makes sense to style every line individually.
     *
     * @param {PaletteItemConfig} arg0 Palette properties object.
     *
     * @param {string} arg0 Line color
     * @param {number} arg1 Line width
     * @param {LineType} arg2 Line type
     */
    constructor(arg0: PaletteItemConfig, arg1: number, arg2: {
        Solid: number;
        Dotted: number;
        Dashed: number;
    }, ...args: any[]);
    /**
     * Line color
     *
     * @type {string}
     */
    lineColor: string;
    /**
     * Line width
     *
     * @type {number}
     */
    lineWidth: number;
    /**
     * Line type
     *
     * @type {LineType}
     */
    lineType: {
        Solid: number;
        Dotted: number;
        Dashed: number;
    };
}
