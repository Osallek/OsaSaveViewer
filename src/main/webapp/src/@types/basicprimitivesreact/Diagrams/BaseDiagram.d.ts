import { Component } from "react";
import Graphics from "./Graphics";
import {
    AnnotationLabelTemplate,
    ButtonsTemplate,
    CheckBoxTemplate,
    CursorTemplate,
    CustomRenderTemplate,
    DotHighlightTemplate,
    GroupTitleTemplate,
    HighlightTemplate,
    ItemTemplate,
    LabelAnnotationTemplate,
    LevelBackgroundTemplate,
    LevelTitleTemplate,
    UserTemplate
} from "./Templates";

export default BaseDiagram;
declare class BaseDiagram extends Component<any, any, any> {
    static propTypes: {
        centerOnCursor: any;
        onHighlightChanging: any;
        onHighlightChanged: any;
        onCursorChanging: any;
        onCursorChanged: any;
        onSelectionChanging: any;
        onSelectionChanged: any;
    };
    static defaultProps: {
        centerOnCursor: boolean;
        onHighlightChanging: any;
        onHighlightChanged: any;
        onCursorChanging: any;
        onCursorChanged: any;
        onSelectionChanging: any;
        onSelectionChanged: any;
    };
    static getDerivedStateFromProps(nextProps: any, state: any): {
        config: any;
        highlightItem: any;
        cursorItem: any;
        selectedItems: any;
        centerOnCursor: any;
    };
    constructor(props: any, TaskManagerFactory: any, EventArgs: any);
    TaskManagerFactory: any;
    EventArgs: any;
    onRefreshViewport(): void;
    onSizeChanged(): void;
    onScroll(): void;
    onMouseMove(event: any): void;
    onClick(event: any): void;
    onCheckboxChange(event: any): void;
    onKeyDown(event: any): void;
    onFrameClick(event: any): void;
    onFrameMouseMove(event: any): void;
    getOptions(): any;
    getGraphics(): Graphics;
    getLayout(): {
        forceCenterOnCursor: any;
        scrollPanelSize: any;
        placeholderOffset: any;
    };
    setLayout(layoutOptions: any): void;
    getEventArgs(oldTreeItemId: any, newTreeItemId: any, name: any): any;
    centerOnCursor(): void;
    onItemRender(data: any): any;
    onHighlightRender(data: any): any;
    onCursorRender(data: any): any;
    controlPanelRef: any;
    frameMousePanelRef: any;
    framePlaceholderRef: any;
    titlesMousePanelRef: any;
    titlesPlaceholderRef: any;
    scrollPanelRef: any;
    mousePanelRef: any;
    placeholderRef: any;
    calloutPlaceholderRef: any;
    layoutOptions: {};
    templatesHash: {};
    graphics: Graphics;
    templates: {
        AnnotationLabelTemplate: typeof AnnotationLabelTemplate;
        ButtonsTemplate: typeof ButtonsTemplate;
        CheckBoxTemplate: typeof CheckBoxTemplate;
        CursorTemplate: typeof CursorTemplate;
        DotHighlightTemplate: typeof DotHighlightTemplate;
        GroupTitleTemplate: typeof GroupTitleTemplate;
        HighlightTemplate: typeof HighlightTemplate;
        ItemTemplate: typeof ItemTemplate;
        UserTemplate: typeof UserTemplate;
        CustomRenderTemplate: typeof CustomRenderTemplate;
        LabelAnnotationTemplate: typeof LabelAnnotationTemplate;
        LevelTitleTemplate: typeof LevelTitleTemplate;
        LevelBackgroundTemplate: typeof LevelBackgroundTemplate;
    };
    tasks: any;
    observer: any;
    timer: NodeJS.Timeout;
    fixPixelAlignment(): void;
    setHighlightItem(event: any, newHighlightItemId: any): void;
    setCursorItem(event: any, newCursorItemId: any): void;
}
