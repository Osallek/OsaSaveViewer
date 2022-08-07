export default function KeyboardNavigationManager(): {
    addRect: (rect: any, itemid: any) => void;
    prepair: () => void;
    getItemAbove: (itemid: any) => any;
    getItemBelow: (itemid: any) => any;
    getItemOnLeft: (itemid: any) => any;
    getItemOnRight: (itemid: any) => any;
    getNavigationLevels: () => any[];
};
