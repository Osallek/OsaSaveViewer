export default function Cache(): void;
export default class Cache {
    threshold: number;
    m_visible: {};
    m_invisible: {};
    begin(): void;
    end(): void;
    reset(placeholder: any, layer: any): void;
    clear(): void;
    get(placeholder: any, layer: any, type: any): any;
    put(placeholder: any, layer: any, type: any, control: any): void;
}
