export default function VisualTreeLevelsTask(visualTreeTask: any, itemTemplateParamsTask: any): {
    process: () => boolean;
    getTreeLevels: () => any;
    getBundles: () => any;
    getConnectorsStacksSizes: (levelid: any) => any;
    getNestedLayoutParentConnectorIds: () => {};
    getNestedLayoutBottomConnectorIds: () => {};
};
