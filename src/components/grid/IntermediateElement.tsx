import { animated, useSpring } from "@react-spring/web";
import { ReactNode, useContext, useEffect } from "react";
import { GridContext } from "./GridContext";
import { GridItemContext } from "./GridItemContext";
import debounce from "lodash.debounce";
import { IntermediateElementConfig } from "./IGridConfig";

export const IntermediateElement = ({
  children,
  config,
  left,
  top,
  width,
}: {
  children: ReactNode;
  config: IntermediateElementConfig;
  left: number;
  top: number;
  width: number;
}) => {
  const { intermediateElementSpaces, setSpace } = useContext(GridContext);
  const { onHover, width: initialWidth = 0 } = config;
  const { itemIdx, traveler } = useContext(GridItemContext);

  const [styles, set] = useSpring(() => ({
    width: initialWidth,
    left,
    top,
  }));

  useEffect(() => {
    set({
      width,
      left,
      top,
    });
  }, [left, set, top, width, intermediateElementSpaces]);

  const onMouseOver = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (onHover && traveler == null) {
      const n_width = onHover ? onHover.width : (width as number);
      setSpace(itemIdx, n_width);
      return;
    }
    event.stopPropagation();
  };

  const onMouseLeave = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (onHover && traveler == null) {
      const n_width = initialWidth as number;
      setSpace(itemIdx, n_width);
      return;
    }

    event.stopPropagation();
  };

  return (
    <animated.div
      style={{
        position: "absolute",
        height: "100%",
        ...styles,
      }}
      onMouseOver={debounce(onMouseOver)}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </animated.div>
  );
};
