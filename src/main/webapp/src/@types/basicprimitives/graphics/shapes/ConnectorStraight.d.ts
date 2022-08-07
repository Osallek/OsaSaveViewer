declare function ConnectorStraight(): void;
declare class ConnectorStraight {
    draw(buffer: any, linePaletteItem: any, fromRect: any, toRect: any, linesOffset: any, bundleOffset: any, labelSize: any, panelSize: any, connectorShapeType: any, labelOffset: any, labelPlacementType: any, hasLabel: any, connectorAnnotationOffsetResolver: any, onLabelPlacement: any, labelConfig: any): void;
    _drawLine(buffer: any, linePaletteItem: any, fromPoint: any, toPoint: any, bothWays: any): void;
    _getLabelPositionBySnapPoint(x: any, y: any, labelWidth: any, labelHeight: any, labelOffset: any, placementType: any): Rect;
}
export default ConnectorStraight;
import Rect from "../structs/Rect";
