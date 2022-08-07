export default function ValueReader(acceptedTypes: any, isNullable: any, defaultValue: any): void;
export default class ValueReader {
    constructor(acceptedTypes: any, isNullable: any, defaultValue: any);
    acceptedTypes: any;
    isNullable: any;
    defaultValue: any;
    hash: {};
    stringify(target: any): any;
    read(target: any, source: any, path: any, context: any): any;
}
