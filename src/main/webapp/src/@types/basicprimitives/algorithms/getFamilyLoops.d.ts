/**
 * Graph edge structure
 * @class Edge
 * @property {string} from From node id
 * @property {string} to To node id
 */
export function Edge(from: any, to: any): void;
export class Edge {
    /**
     * Graph edge structure
     * @class Edge
     * @property {string} from From node id
     * @property {string} to To node id
     */
    constructor(from: any, to: any);
    from: any;
    to: any;
}
/**
 * This function finds [optimal collection of feedback edges](https://en.wikipedia.org/wiki/Feedback_arc_set) needed to be cut in
 * order to eliminate loops in family structure.
 *
 * @param {Family} family Family structure
 * @returns {Edge[]} Returns optimal collection of feedback loops
 */
export default function getFamilyLoops(family: Family, debug: any): Edge[];
