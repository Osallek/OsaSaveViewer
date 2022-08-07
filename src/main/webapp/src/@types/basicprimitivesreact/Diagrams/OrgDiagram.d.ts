import BaseDiagram from "./BaseDiagram";

export default OrgDiagram;

declare class OrgDiagram extends BaseDiagram {
  static propTypes: {
    config: any;
  };

  constructor(props: any);
}