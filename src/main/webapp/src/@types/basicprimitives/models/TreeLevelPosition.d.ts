export default function TreeLevelPosition(source: any): void;
export default class TreeLevelPosition {
    constructor(source: any);
    currentvisibility: number;
    actualVisibility: number;
    shift: number;
    depth: number;
    nextLevelShift: number;
    horizontalConnectorsDepth: number;
    topConnectorShift: number;
    connectorShift: number;
    levelSpace: number;
    currentOffset: number;
    labels: any[];
    labelsRect: any;
    showLabels: boolean;
    hasFixedLabels: boolean;
    setShift(shift: any, levelSpace: any, topConnectorSpace: any, connectorSpace: any, partnerConnectorOffset: any): number;
    getNodesBottom(): number;
    toString(): number;
}
