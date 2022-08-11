export default function Polyline(newPaletteItem: any, ...args: any[]): {
    paletteItem: PaletteItem;
    arrowPaletteItem: PaletteItem;
    addSegment: (segment: any) => void;
    addSegments: (newSegments: any) => void;
    mergeTo: (polyline: any) => void;
    length: () => number;
    loop: (thisArg: any, onItem: any) => void;
    loopReversed: (thisArg: any, onItem: any) => void;
    transform: (transformArg: any, forward: any) => void;
    isInvertable: () => boolean;
    addInverted: (polyline: any) => void;
    addArrow: (lineWidth: any, onAddArrowSegments: any) => void;
    addOffsetArrow: (forward: any, lineWidth: any, offsetPercent: any, minimumDistance: any, onAddArrowSegments: any) => void;
    optimizeMoveSegments: () => void;
    getOffsetPolyine: (offset: any) => any;
    toString: () => string;
    getStartPoint: () => any;
    getEndPoint: () => any;
    clone: () => any;
};
import PaletteItem from "./PaletteItem";