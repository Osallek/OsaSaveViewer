/**
* Creates JavaScript Family Diagram Control
 * @class Control
 * @param {object} element Reference to placeholder `div` element in the DOM. The control renders diagram content
 * inside of that div element and adds events listeners.
 * @param {FamConfig} options Family Diagram Configuration object
 *
 * @returns {FamDiagram} Returns reference to family diagram control. Since control adds event listeners bound
 * to its contents, call `destroy` method to clean up everything.
 */
export default function FamDiagram(element: object, options: FamConfig, templates: any): FamDiagram;
export default class FamDiagram {
    /**
    * Creates JavaScript Family Diagram Control
     * @class Control
     * @param {object} element Reference to placeholder `div` element in the DOM. The control renders diagram content
     * inside of that div element and adds events listeners.
     * @param {FamConfig} options Family Diagram Configuration object
     *
     * @returns {FamDiagram} Returns reference to family diagram control. Since control adds event listeners bound
     * to its contents, call `destroy` method to clean up everything.
     */
    constructor(element: object, options: FamConfig, templates: any);
}
