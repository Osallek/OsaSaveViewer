declare function CubicArcSegment(arg0: any, arg1: any, arg2: any, arg3: any, arg4: any, arg5: any, ...args: any[]): void;
declare class CubicArcSegment {
    constructor(arg0: any, arg1: any, arg2: any, arg3: any, arg4: any, arg5: any, ...args: any[]);
    parent: any;
    x: any;
    y: any;
    cpX1: any;
    cpY1: any;
    cpX2: any;
    cpY2: any;
    segmentType: number;
    clone(): CubicArcSegment;
    loop(thisArg: any, onItem: any): void;
    setPoint(point: any, index: any): void;
    getEndPoint(): CubicArcSegment;
    invert(endPoint: any): void;
    transform(transform: any, forward: any): void;
    trim(prevEndPoint: any, offset: any): CubicArcSegment;
    offsetPoint(x: any, y: any, cpX1: any, cpY1: any, cpX2: any, cpY2: any, x2: any, y2: any, time: any): Point;
}
export default CubicArcSegment;
import Point from "./Point";
