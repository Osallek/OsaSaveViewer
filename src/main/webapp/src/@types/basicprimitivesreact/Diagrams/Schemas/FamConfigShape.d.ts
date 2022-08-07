import {
  Enabled,
  FamItemConfig,
  NavigationMode,
  NeighboursSelectionMode,
  PageFitMode,
  ShapeAnnotationConfig
} from 'basicprimitives';

export type FamConfigShape = {
  annotations: ShapeAnnotationConfig[];
  cursorItem: string;
  emptyDiagramMessage: string;
  enablePanning: boolean;
  hasSelectorCheckbox: Enabled;
  highlightGravityRadius: number;
  highlightItem: string;
  items: FamItemConfig[];
  navigationMode: NavigationMode;
  neighboursSelectionMode: NeighboursSelectionMode;
  scale: number;
  selectedItems: string[];
  alignBylevels: boolean;
  pageFitMode: PageFitMode;
};
//# sourceMappingURL=FamConfigShape.d.ts.map