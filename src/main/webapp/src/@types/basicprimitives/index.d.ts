declare module 'basicprimitives' {
  export * from "./common/colors";
  export * from "./graphics/dom";
  export { default as JsonML } from "./common/jsonml-html";
  export { default as Point } from "./graphics/structs/Point";
  export { default as Size } from "./graphics/structs/Size";
  export { default as Rect } from "./graphics/structs/Rect";
  export { default as Matrix } from "./graphics/structs/Matrix";
  export { default as Thickness } from "./graphics/structs/Thickness";
  export { default as Vector } from "./graphics/structs/Vector";
  export { default as Interval } from "./graphics/structs/Interval";
  export { default as binarySearch } from "./algorithms/binarySearch";
  export { default as getCrossingRectangles } from "./algorithms/getCrossingRectangles";
  export { default as getFamilyLoops } from "./algorithms/getFamilyLoops";
  export { default as getFamilyUnits } from "./algorithms/getFamilyUnits";
  export { default as getLiniarBreaks } from "./algorithms/getLiniarBreaks";
  export { default as getMergedRectangles } from "./algorithms/getMergedRectangles";
  export { default as getMinimumCrossingRows } from "./algorithms/getMinimumCrossingRows";
  export { default as mergeSort } from "./algorithms/mergeSort";
  export { default as getMergedIntervals } from "./algorithms/getMergedIntervals";
  export { default as Family } from "./algorithms/Family";
  export { default as FamilyAlignment } from "./algorithms/FamilyAlignment";
  export { default as FamilyMargins } from "./algorithms/FamilyMargins";
  export { default as Graph } from "./algorithms/Graph";
  export { default as LCA } from "./algorithms/LCA";
  export { default as LinkedHashItems } from "./algorithms/LinkedHashItems";
  export { default as Pile } from "./algorithms/Pile";
  export { default as QuadTree } from "./algorithms/QuadTree";
  export { default as RMQ } from "./algorithms/RMQ";
  export { default as SortedList } from "./algorithms/SortedList";
  export { default as SpatialIndex } from "./algorithms/SpatialIndex";
  export { default as Tree } from "./algorithms/Tree";
  export { default as TreeLevels } from "./algorithms/TreeLevels";
  export { default as OrgConfig } from "./configs/OrgConfig";
  export { default as OrgItemConfig } from "./configs/OrgItemConfig";
  export { default as OrgEventArgs } from "./events/OrgEventArgs";
  export { default as FamConfig } from "./configs/FamConfig";
  export { default as FamItemConfig } from "./configs/FamItemConfig";
  export { default as FamEventArgs } from "./events/FamEventArgs";
  export { default as BackgroundAnnotationConfig } from "./configs/BackgroundAnnotationConfig";
  export { default as ConnectorAnnotationConfig } from "./configs/ConnectorAnnotationConfig";
  export { default as HighlightPathAnnotationConfig } from "./configs/HighlightPathAnnotationConfig";
  export { default as LabelAnnotationConfig } from "./configs/LabelAnnotationConfig";
  export { default as PaletteItemConfig } from "./configs/PaletteItemConfig";
  export { default as ShapeAnnotationConfig } from "./configs/ShapeAnnotationConfig";
  export { default as LevelAnnotationConfig } from "./configs/LevelAnnotationConfig";
  export { default as TemplateConfig } from "./configs/TemplateConfig";
  export { default as OrgDiagram } from "./OrgDiagram";
  export { default as FamDiagram } from "./FamDiagram";
  export { default as OrgDiagramPdfkit } from "./OrgDiagramPdfkit";
  export { default as FamDiagramPdfkit } from "./FamDiagramPdfkit";
  export { default as FamTaskManagerFactory } from "./FamTaskManagerFactory";
  export { default as OrgTaskManagerFactory } from "./OrgTaskManagerFactory";
  export { default as FibonacciHeap, HeapResult } from "./algorithms/FibonacciHeap";

  export namespace AdviserPlacementType {
    const Auto: number;
    const Left: number;
    const Right: number;
  }
  export namespace AnnotationType {
    const Connector: number;
    const Shape: number;
    const HighlightPath: number;
    const Label: number;
    const Background: number;
    const Level: number;
  }
  export namespace ChildrenPlacementType {
    const Auto_1: number;
    export { Auto_1 as Auto };
    export const Vertical: number;
    export const Horizontal: number;
    export const Matrix: number;
  }
  export namespace Colors {
    const AliceBlue: string;
    const AntiqueWhite: string;
    const Aqua: string;
    const Aquamarine: string;
    const Azure: string;
    const Beige: string;
    const Bisque: string;
    const Black: string;
    const BlanchedAlmond: string;
    const Blue: string;
    const BlueViolet: string;
    const Brown: string;
    const BurlyWood: string;
    const Bronze: string;
    const CadetBlue: string;
    const ChartReuse: string;
    const Chocolate: string;
    const Coral: string;
    const CornflowerBlue: string;
    const Cornsilk: string;
    const Crimson: string;
    const Cyan: string;
    const DarkBlue: string;
    const DarkCyan: string;
    const DarkGoldenrod: string;
    const DarkGray: string;
    const DarkGreen: string;
    const DarkKhaki: string;
    const DarkMagenta: string;
    const DarkOliveGreen: string;
    const Darkorange: string;
    const DarkOrchid: string;
    const DarkRed: string;
    const DarkSalmon: string;
    const DarkSeaGreen: string;
    const DarkSlateBlue: string;
    const DarkSlateGray: string;
    const DarkTurquoise: string;
    const DarkViolet: string;
    const DeepPink: string;
    const DeepSkyBlue: string;
    const DimGray: string;
    const DodgerBlue: string;
    const FireBrick: string;
    const FloralWhite: string;
    const ForestGreen: string;
    const Fuchsia: string;
    const Gainsboro: string;
    const GhostWhite: string;
    const Gold: string;
    const Goldenrod: string;
    const Gray: string;
    const Green: string;
    const GreenYellow: string;
    const Honeydew: string;
    const Hotpink: string;
    const IndianRed: string;
    const Indigo: string;
    const Ivory: string;
    const Khaki: string;
    const Lavender: string;
    const LavenderBlush: string;
    const Lawngreen: string;
    const Lemonchiffon: string;
    const LightBlue: string;
    const LightCoral: string;
    const LightCyan: string;
    const LightGoldenrodYellow: string;
    const LightGray: string;
    const LightGreen: string;
    const LightPink: string;
    const LightSalmon: string;
    const LightSeaGreen: string;
    const LightSkyBlue: string;
    const LightSlateGray: string;
    const LightSteelBlue: string;
    const LightYellow: string;
    const Lime: string;
    const Limegreen: string;
    const Linen: string;
    const Magenta: string;
    const Maroon: string;
    const MediumAquamarine: string;
    const MediumBlue: string;
    const MediumOrchid: string;
    const MediumPurple: string;
    const MediumSeaGreen: string;
    const MediumSlateBlue: string;
    const MediumSpringGreen: string;
    const MediumTurquoise: string;
    const MediumVioletRed: string;
    const MidnightBlue: string;
    const MintCream: string;
    const MistyRose: string;
    const Moccasin: string;
    const NavajoWhite: string;
    const Navy: string;
    const Oldlace: string;
    const Olive: string;
    const Olivedrab: string;
    const Orange: string;
    const OrangeRed: string;
    const Orchid: string;
    const PaleGoldenRod: string;
    const PaleGreen: string;
    const PaleTurquoise: string;
    const PaleVioletRed: string;
    const Papayawhip: string;
    const Peachpuff: string;
    const Peru: string;
    const Pink: string;
    const Plum: string;
    const PowderBlue: string;
    const Purple: string;
    const Red: string;
    const RosyBrown: string;
    const RoyalBlue: string;
    const SaddleBrown: string;
    const Salmon: string;
    const SandyBrown: string;
    const SeaGreen: string;
    const Seashell: string;
    const Sienna: string;
    const Silver: string;
    const SkyBlue: string;
    const SlateBlue: string;
    const SlateGray: string;
    const Snow: string;
    const SpringGreen: string;
    const SteelBlue: string;
    const Tan: string;
    const Teal: string;
    const Thistle: string;
    const Tomato: string;
    const Turquoise: string;
    const Violet: string;
    const Wheat: string;
    const White: string;
    const WhiteSmoke: string;
    const Yellow: string;
    const YellowGreen: string;
  }
  export namespace ConnectorLabelPlacementType {
    const From: number;
    const Between: number;
    const To: number;
  }
  export namespace ConnectorPlacementType {
    const Offbeat: number;
    const Straight: number;
  }
  export namespace ConnectorShapeType {
    const OneWay: number;
    const TwoWay: number;
    const BothWay: number;
  }
  export namespace ConnectorStyleType {
    const Extra: number;
    const Regular: number;
    const Highlight: number;
  }
  export namespace ConnectorType {
    const Squared: number;
    const Angular: number;
    const Curved: number;
  }
  export namespace ElbowType {
    const None: number;
    const Dot: number;
    const Bevel: number;
    const Round: number;
  }
  export namespace Enabled {
    const Auto_2: number;
    export { Auto_2 as Auto };
    export const True: number;
    export const False: number;
  }
  export namespace GroupByType {
    const None_1: number;
    export { None_1 as None };
    export const Parents: number;
    export const Children: number;
  }
  export namespace HorizontalAlignmentType {
    export const Center: number;
    const Left_1: number;
    export { Left_1 as Left };
    const Right_1: number;
    export { Right_1 as Right };
  }
  export namespace ItemType {
    const Regular_1: number;
    export { Regular_1 as Regular };
    export const Assistant: number;
    export const SubAssistant: number;
    export const Adviser: number;
    export const SubAdviser: number;
    export const GeneralPartner: number;
    export const LimitedPartner: number;
    export const AdviserPartner: number;
  }
  export namespace LabelType {
    const Regular_2: number;
    export { Regular_2 as Regular };
    export const Dummy: number;
    export const Fixed: number;
    const None_2: number;
    export { None_2 as None };
  }
  export namespace Layers {
    export const LevelAnnotation: number;
    export const BackgroundAnnotation: number;
    export const BackgroundAnnotations: number;
    export const BackgroundConnectorAnnotation: number;
    export const BackgroundHighlightPathAnnotations: number;
    const Connector_1: number;
    export { Connector_1 as Connector };
    export const ForegroundHighlightPathAnnotations: number;
    const Highlight_1: number;
    export { Highlight_1 as Highlight };
    export const Marker: number;
    const Label_1: number;
    export { Label_1 as Label };
    export const Cursor: number;
    export const Item: number;
    export const ForegroundAnnotations: number;
    export const ForegroundConnectorAnnotation: number;
    export const Annotation: number;
    export const Controls: number;
  }
  export namespace LineType {
    const Solid: number;
    const Dotted: number;
    const Dashed: number;
  }
  export namespace NavigationMode {
    const Default: number;
    const CursorOnly: number;
    const HighlightOnly: number;
    const Inactive: number;
  }
  export namespace NeighboursSelectionMode {
    const ParentsAndChildren: number;
    const ParentsChildrenSiblingsAndSpouses: number;
  }
  export namespace OrientationType {
    export const Top: number;
    export const Bottom: number;
    const Left_2: number;
    export { Left_2 as Left };
    const Right_2: number;
    export { Right_2 as Right };
    const None_3: number;
    export { None_3 as None };
  }
  export namespace PageFitMode {
    const None_4: number;
    export { None_4 as None };
    export const PageWidth: number;
    export const PageHeight: number;
    export const FitToPage: number;
    export const AutoSize: number;
    export const SelectionOnly: number;
  }
  export namespace PlacementType {
    const Auto_3: number;
    export { Auto_3 as Auto };
    export const TopLeft: number;
    const Top_1: number;
    export { Top_1 as Top };
    export const TopRight: number;
    export const RightTop: number;
    const Right_3: number;
    export { Right_3 as Right };
    export const RightBottom: number;
    export const BottomRight: number;
    const Bottom_1: number;
    export { Bottom_1 as Bottom };
    export const BottomLeft: number;
    export const LeftBottom: number;
    const Left_3: number;
    export { Left_3 as Left };
    export const LeftTop: number;
  }
  export namespace RenderingMode {
    const Create: number;
    const Update: number;
  }
  export namespace SegmentType {
    export const Line: number;
    export const Move: number;
    export const QuadraticArc: number;
    export const CubicArc: number;
    const Dot_1: number;
    export { Dot_1 as Dot };
  }
  export namespace SelectionPathMode {
    const None_5: number;
    export { None_5 as None };
    export const FullStack: number;
  }
  export namespace ShapeType {
    export const Rectangle: number;
    export const Oval: number;
    export const Triangle: number;
    export const CrossOut: number;
    export const Circle: number;
    export const Rhombus: number;
    export const Wedge: number;
    export const FramedOval: number;
    export const FramedTriangle: number;
    export const FramedWedge: number;
    export const FramedRhombus: number;
    const None_6: number;
    export { None_6 as None };
  }
  export namespace SideFlag {
    const Top_2: number;
    export { Top_2 as Top };
    const Right_4: number;
    export { Right_4 as Right };
    const Bottom_2: number;
    export { Bottom_2 as Bottom };
    const Left_4: number;
    export { Left_4 as Left };
  }
  export namespace TextOrientationType {
    const Horizontal_1: number;
    export { Horizontal_1 as Horizontal };
    export const RotateLeft: number;
    export const RotateRight: number;
    const Auto_4: number;
    export { Auto_4 as Auto };
  }
  export namespace UpdateMode {
    const Recreate: number;
    const Refresh: number;
    const PositonHighlight: number;
  }
  export namespace VectorRelationType {
    const None_7: number;
    export { None_7 as None };
    export const Null: number;
    export const Collinear: number;
    export const Opposite: number;
  }
  export namespace VerticalAlignmentType {
    const Top_3: number;
    export { Top_3 as Top };
    export const Middle: number;
    const Bottom_3: number;
    export { Bottom_3 as Bottom };
  }
  export namespace Visibility {
    const Auto_5: number;
    export { Auto_5 as Auto };
    export const Normal: number;
    const Dot_2: number;
    export { Dot_2 as Dot };
    const Line_1: number;
    export { Line_1 as Line };
    export const Invisible: number;
  }
  export namespace ZOrderType {
    const Auto_6: number;
    export { Auto_6 as Auto };
    const Background_1: number;
    export { Background_1 as Background };
    export const Foreground: number;
  }

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

}