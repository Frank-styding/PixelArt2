import { CSSProperties } from "react";
import { Remap, ControllerUpdate, Lookup } from "@react-spring/web";

export interface IAddButtonConfig {
  onClick: (idx: number) => void;
  element?: () => JSX.Element;
  delay?: number;
  onHoverDynamicStyle?: Remap<ControllerUpdate<Lookup<unknown>, undefined>>;
  onLeaveDynamicStyle?: Remap<ControllerUpdate<Lookup<unknown>, undefined>>;
  dynamicStyle?: Remap<ControllerUpdate<Lookup<unknown>, undefined>>;
  style?: CSSProperties;
}
