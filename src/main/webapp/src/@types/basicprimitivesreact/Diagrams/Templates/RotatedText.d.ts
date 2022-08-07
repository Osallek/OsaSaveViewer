export default RotatedText;
declare class RotatedText extends Component<any, any, any> {
    static propTypes: {
        width: any;
        height: any;
        orientation: any;
        horizontalAlignment: any;
        verticalAlignment: any;
    };
    static defaultProps: {
        orientation: string;
        horizontalAlignment: string;
        verticalAlignment: string;
    };
    constructor(props: any);
    constructor(props: any, context: any);
    getTransform(orientation: any): string;
}
import { Component } from "react";
//# sourceMappingURL=RotatedText.d.ts.map