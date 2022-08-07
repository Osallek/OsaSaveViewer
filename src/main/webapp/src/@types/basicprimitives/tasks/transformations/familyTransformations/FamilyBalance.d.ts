export default function FamilyBalance(): void;
export default class FamilyBalance {
    balance(params: any): {
        maximumId: any;
        treeLevels: any;
        bundles: any[];
        connectorStacks: any[];
    };
    Family(id: any, ...args: any[]): void;
    id: any;
    familyPriority: number;
    childFamilies: any[];
    items: any[];
    links: any[];
    backLinks: any[];
    FamLink(fromItem: any, toItem: any): void;
    fromItem: any;
    toItem: any;
    createOrgTree(params: any, data: any): void;
    getGrandChildren(data: any): {};
    balanceOrgTree(orgTree: any, extraGravities: any, grandChildren: any, itemsPositions: any, itemsGroups: any): void;
    balanceItems(sequence: any, leftId: any, rightId: any, graphGravities: any, grandChildren: any, itemsPositions: any, itemsGroups: any): any[];
    ExtraGravity(level: any): void;
    commonParent: any;
    fromParent: any;
    toParent: any;
    level: any;
    getExtraGravity(data: any): {};
    addExtraGravitiesForConnection(orgTree: any, extraGravities: any, fromItem: any, toItem: any): void;
    addExtraGravityForItem(extraGravities: any, id: any, extraGravity: any): void;
    attachFamilyToOrgChart(data: any, parent: any, family: any): void;
    extractOrgChart(grandParentId: any, logicalFamily: any, primaryParentsPath: any, orgTree: any, orgPartners: any, itemByChildrenKey: any, famItemsExtracted: any, family: any): void;
    extractChildren(parentItem: any, logicalFamily: any, primaryParentsPath: any, orgTree: any, orgPartners: any, itemByChildrenKey: any, famItemsExtracted: any, family: any): any[];
    recalcLevelsDepth(bundles: any, connectorStacks: any, treeLevels: any, logicalFamily: any): void;
}
