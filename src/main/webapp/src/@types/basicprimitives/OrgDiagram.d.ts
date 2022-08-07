/**
 * Creates JavaScript Organizational Chart Control
 * @class Control
 * @param {object} element Reference to placeholder `div` element in the DOM. The control renders diagram content
 * inside of that div element and adds events listeners.
 * @param {OrgConfig} options Organizational Chart Configuration object
 *
 * @returns {OrgDiagram} Returns reference to Organizational Chart control. Since control adds event listeners bound
 * to its contents, call `destroy` method to clean up everything.
 */
export default function OrgDiagram(element: object, options: OrgConfig, templates: any): OrgDiagram;
export default class OrgDiagram {
    /**
     * Creates JavaScript Organizational Chart Control
     * @class Control
     * @param {object} element Reference to placeholder `div` element in the DOM. The control renders diagram content
     * inside of that div element and adds events listeners.
     * @param {OrgConfig} options Organizational Chart Configuration object
     *
     * @returns {OrgDiagram} Returns reference to Organizational Chart control. Since control adds event listeners bound
     * to its contents, call `destroy` method to clean up everything.
     */
    constructor(element: object, options: OrgConfig, templates: any);
}
