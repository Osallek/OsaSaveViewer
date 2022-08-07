declare function MoveSegment(...args: any[]): void;
declare class MoveSegment {
    constructor(...args: any[]);
    parent: any;
    segmentType: number;
    clone(): MoveSegment;
    loop(thisArg: any, onItem: any): void;
    setPoint(point: any, index: any): void;
    x: any;
    y: any;
    getEndPoint(): MoveSegment;
    invert(endPoint: any): void;
    transform(transform: any, forward: any): void;
}
export default MoveSegment;
