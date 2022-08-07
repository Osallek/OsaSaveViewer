export default function PaletteManager(options: any, linesPalette: any): void;
export default class PaletteManager {
    constructor(options: any, linesPalette: any);
    palette: PaletteItem[];
    cursor: number;
    paletteLength: number;
    regularIndex: number;
    highlightIndex: number;
    selectPalette(index: any): void;
    getPalette(connectorStyleType: any): PaletteItem;
}
import PaletteItem from "./PaletteItem";
