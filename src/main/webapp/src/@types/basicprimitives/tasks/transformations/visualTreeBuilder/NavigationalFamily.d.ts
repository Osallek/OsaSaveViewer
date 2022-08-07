export default function NavigationalFamily(activeItems: any): {
    define: (parentItem: any, treeItem: any, skipFirstParent: any) => void;
    getFamily: () => any;
};
