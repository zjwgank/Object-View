import { VueComponent } from "./component";

declare class ObjectViewTs extends VueComponent {
  data: any;
  deep: number;
  showDoubleQuotes: boolean;
  showLength: boolean;
  showLine: boolean;
  collapsedOnClickBrackets: boolean;
}

export default ObjectViewTs;
