import { animated, useSpring } from "@react-spring/web";
import { ReactNode, useContext, useEffect } from "react";
import { GridContext } from "./GridContext";
import { GridItemContext } from "./GridItemContext";

export const IntermediateElement = ({ children }: { children: ReactNode }) => {
  const { intermediateElement: gridContext, setSize } = useContext(GridContext);
  const {
    intermediateElement: gridItemContext,
    itemIdx,
    traveler,
  } = useContext(GridItemContext);
  const { left, top, width } = gridItemContext;
  const { sizes, onHover, initialWidth } = gridContext;

  const [styles, set] = useSpring(() => ({
    width,
    left,
    top,
  }));

  useEffect(() => {
    set({
      width,
      left,
      top,
    });
  }, [left, set, top, width, sizes]);

  const onMouseOver = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (onHover && traveler == null) {
      const n_width = onHover ? onHover.width : (initialWidth as number);
      setSize(itemIdx, n_width);
      return;
    }
    event.stopPropagation();
  };

  const onMouseLeave = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (onHover && traveler == null) {
      const n_width = initialWidth as number;
      setSize(itemIdx, n_width);
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
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </animated.div>
  );
};
