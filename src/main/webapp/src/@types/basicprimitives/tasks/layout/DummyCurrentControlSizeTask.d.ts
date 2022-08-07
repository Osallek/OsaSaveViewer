export default function DummyCurrentControlSizeTask(optionsTask: any): {
    process: () => boolean;
    getOptions: () => {
        scrollPanelSize: Size;
        optimalPanelSize: Size;
        hasFrame: boolean;
        hasLevelTitles: boolean;
    };
};
import Size from "../../graphics/structs/Size";
