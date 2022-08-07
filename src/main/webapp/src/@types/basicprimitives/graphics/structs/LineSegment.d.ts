declare function LineSegment(...args: any[]): void;
declare class LineSegment {
    constructor(...args: any[]);
    parent: Point;
    segmentType: number;
    clone(): LineSegment;
    trim(prevEndPoint: any, offset: any): LineSegment;
    x: number;
    y: number;
    offsetPoint(first: any, second: any, offset: any): Point;
}
export default LineSegment;
import Point from "./Point";
