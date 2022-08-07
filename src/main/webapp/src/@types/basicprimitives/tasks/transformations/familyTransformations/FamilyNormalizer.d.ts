declare function FamilyNormalizer(debug: any, ...args: any[]): void;
declare class FamilyNormalizer {
    constructor(debug: any, ...args: any[]);
    parent: any;
    normalize(options: any, logicalFamily: any, maximumId: any): any;
    resortItemsBylevels(logicalFamily: any): void;
    setLevelsForItems(items: any, logicalFamily: any): void;
    fillInItems(logicalFamily: any, createFamItem: any): void;
}
export default FamilyNormalizer;
