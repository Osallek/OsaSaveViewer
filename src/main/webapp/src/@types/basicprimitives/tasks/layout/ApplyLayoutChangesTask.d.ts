export default function ApplyLayoutChangesTask(getGraphics: any, setLayout: any, itemsSizesOptionTask: any, currentControlSizeTask: any, scaleOptionTask: any, alignDiagramTask: any, frameSizeTask: any, levelTitleSizeTask: any): {
    process: () => boolean;
    getOptimalPanelSize: () => Size;
    getScrollPanelSize: () => Size;
    getFrameThickness: () => Thickness;
    getFrameOffset: () => Thickness;
    getTitlesThickness: () => Thickness;
};
import Size from "../../graphics/structs/Size";
import Thickness from "../../graphics/structs/Thickness";
