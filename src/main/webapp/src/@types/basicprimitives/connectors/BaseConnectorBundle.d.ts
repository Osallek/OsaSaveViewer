export default function BaseConnectorBundle(): void;
export default class BaseConnectorBundle {
    NORMAL_ITEM_WEIGHT: number;
    LINE_ITEM_WEIGHT: number;
    trace(data: any, params: any, options: any): void;
    getId(data: any): string;
    ConnectorEdge(from: any, to: any, polyline: any, parentsArrowId: any, childrenArrowId: any, dotId: any, weight: any, fromOffset: any, hasMiddle: any, middleParent: any, hasArrow: any): void;
    polyline: any;
    from: any;
    to: any;
    weight: any;
    fromOffset: any;
    hasArrow: any;
    parentsArrowId: any;
    childrenArrowId: any;
    dotId: any;
    hasMiddle: any;
    middleParent: any;
    isOppositeFlow: boolean;
    ConnectorDestination(options: any): void;
    id: any;
    x: any;
    y: any;
    bundleid: any;
    hasElbow: boolean;
    elbowPoint1: any;
    elbowPoint2: any;
    visibility: any;
    isSquared: boolean;
    traceFork(data: any, params: any, options: any, parentPoint: any, points: any, hasSquared: any, isParents: any, fromOffset: any, showHorizontalArrows: any): void;
    traceAngularSegments(data: any, params: any, options: any, bundlePoint: any, points: any, drawToBundle: any): void;
}