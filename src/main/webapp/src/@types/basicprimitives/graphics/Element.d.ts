export default function Element(arg0: any, arg1: any, ...args: any[]): void;
export default class Element {
    constructor(arg0: any, arg1: any, ...args: any[]);
    ns: any;
    name: any;
    attr: {};
    style: {};
    children: any[];
    setAttribute(key: any, value: any): void;
    appendChild(child: any): void;
    create(ie8mode: any): any;
    update(target: any, ie8mode: any): void;
}
