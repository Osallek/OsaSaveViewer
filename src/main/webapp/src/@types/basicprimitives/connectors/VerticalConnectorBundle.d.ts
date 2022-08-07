declare function VerticalConnectorBundle(fromItems: any, toItems: any, dotId: any): void;
declare class VerticalConnectorBundle {
    constructor(fromItems: any, toItems: any, dotId: any);
    fromItems: any;
    toItems: any;
    dotId: any;
    fromOffset: number;
    fromStackSize: number;
    trace(data: any, params: any, options: any): void;
}
export default VerticalConnectorBundle;
