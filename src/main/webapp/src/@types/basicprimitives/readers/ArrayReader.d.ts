export default function ArrayReader(itemTemplate: any, containsUniqueItems: any, uniquePropertyKey: any, createSourceHash: any, isOrdered: any): void;
export default class ArrayReader {
    constructor(itemTemplate: any, containsUniqueItems: any, uniquePropertyKey: any, createSourceHash: any, isOrdered: any);
    itemTemplate: any;
    containsUniqueItems: any;
    uniquePropertyKey: any;
    containsPrimitiveValues: boolean;
    createSourceHash: any;
    isOrdered: any;
    read(target: any, source: any, path: any, context: any): any[];
}
