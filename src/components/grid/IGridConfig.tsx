import { IAddButtonConfig } from "./IAddButtonConfig";

export interface IntermediateElementConfig {
  addButton?: IAddButtonConfig;
  element?: () => JSX.Element;
  width?: number;
  onHover?: {
    width: number;
    mouseDelay?: number;
  };
}

export interface IGridConfig {
  itemWidth?: number;
  gap?: number;
  intermediateElement?: IntermediateElementConfig;
}
