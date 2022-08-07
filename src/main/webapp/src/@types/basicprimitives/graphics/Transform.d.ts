export default function Transform(): void;
export default class Transform {
    invertArea: boolean;
    invertHorizontally: boolean;
    invertVertically: boolean;
    size: any;
    setOrientation(orientationType: any): void;
    getOrientation(orientationType: any): any;
    transformPoint(x: any, y: any, forward: any, self: any, func: any): void;
    transformPoints(x: any, y: any, x2: any, y2: any, forward: any, self: any, func: any): void;
    transform3Points(x: any, y: any, x2: any, y2: any, x3: any, y3: any, forward: any, self: any, func: any): void;
    transformRect(x: any, y: any, width: any, height: any, forward: any, self: any, func: any): void;
    transformThickness(thickness: any, forward: any): Thickness;
}
import Thickness from "./structs/Thickness";
