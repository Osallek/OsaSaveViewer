declare function FamilyMatrixesExtractor(debug: any, ...args: any[]): void;
declare class FamilyMatrixesExtractor {
    constructor(debug: any, ...args: any[]);
    parent: any;
    extract(options: any, getConfig: any, logicalFamily: any, maximumId: any): {
        maximumId: any;
        nestedLayoutParentConnectorIds: {};
        nestedLayoutBottomConnectorIds: {};
        layouts: {};
        bundles: any[];
    };
    getMatrixWidth(maximumColumnsInMatrix: any, len: any): number;
}
export default FamilyMatrixesExtractor;
