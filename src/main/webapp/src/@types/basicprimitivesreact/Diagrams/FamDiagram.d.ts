import { FamConfigShape } from 'basicprimitivesreact';
import BaseDiagram from "./BaseDiagram";

export default FamDiagram;
declare class FamDiagram extends BaseDiagram {
    static propTypes: {
        config: FamConfigShape;
    };
    constructor(props: any);
}
