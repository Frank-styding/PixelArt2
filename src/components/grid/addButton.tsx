import { animated, useSpring } from "@react-spring/web";
import { ReactNode, useContext } from "react";
import { GridContext } from "./GridContext";
import { GridItemContext } from "./GridItemContext";
import { AddButtonContainer } from "./AddButtonContainer";
import { IAddButtonConfig } from "./IAddButtonConfig";

export const AddButton = ({
  children,
  config,
}: {
  children: ReactNode;
  config: IAddButtonConfig;
}) => {
  const { traveler } = useContext(GridItemContext);
  const { addItem } = useContext(GridContext);

  const [style, set] = useSpring(() => config.dynamicStyle);

  const { idx } = useContext(GridItemContext);

  const onClick = () => {
    if (traveler != null) return;
    addItem(idx);
  };

  const onMouseHover = () => {
    if (traveler != null) return;
    set(config.onHoverDynamicStyle);
  };

  const onMouseEnter = () => {
    if (traveler != null) return;
    set(config.onLeaveDynamicStyle);
  };

  return (
    <AddButtonContainer onMouseOver={onMouseHover} onMouseLeave={onMouseEnter}>
      <animated.div
        onClick={onClick}
        style={{
          width: "30px",
          height: "30px",
          backgroundColor: "white",
          borderRadius: "50%",
          ...style,
          ...config.style,
        }}
      >
        {children}
      </animated.div>
    </AddButtonContainer>
  );
};
