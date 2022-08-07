/**
 * JavaScript Abstract Control
 * @class BaseControl
 */
export default function BaseControl(element: any, options: any, taskManagerFactory: any, eventArgsFactory: any, templates: any): {
    destroy: () => void;
    setOptions: (options: object) => void;
    getOptions: () => object;
    setOption: (option: any, value: any) => any;
    getOption: (option: any) => any;
    update: (updateMode: {
        Recreate: number;
        Refresh: number;
        PositonHighlight: number;
    }, forceCenterOnCursor: boolean) => void;
};
export default class BaseControl {
    /**
     * JavaScript Abstract Control
     * @class BaseControl
     */
    constructor(element: any, options: any, taskManagerFactory: any, eventArgsFactory: any, templates: any);
}
