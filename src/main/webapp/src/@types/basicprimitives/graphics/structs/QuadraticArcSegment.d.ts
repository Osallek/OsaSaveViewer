export default function QuadraticArcSegment(arg0: any, arg1: any, arg2: any, arg3: any, ...args: any[]): void;
export default class QuadraticArcSegment {
    constructor(arg0: any, arg1: any, arg2: any, arg3: any, ...args: any[]);
    x: any;
    y: any;
    cpX: any;
    cpY: any;
    segmentType: number;
    clone(): QuadraticArcSegment;
    loop(thisArg: any, onItem: any): void;
    setPoint(point: any, index: any): void;
    getEndPoint(): QuadraticArcSegment;
    invert(endPoint: any): void;
    transform(transform: any, forward: any): void;
    trim(prevEndPoint: any, offset: any): QuadraticArcSegment;
    offsetPoint(firstX: any, firstY: any, controlX: any, controlY: any, secondX: any, secondY: any, time: any): Point;
}
import Point from "./Point";
