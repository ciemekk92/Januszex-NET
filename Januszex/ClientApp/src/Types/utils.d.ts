export interface OptionNode {
  label: string;
  value: string;
  children?: OptionNode[];
  depth: number;
}
