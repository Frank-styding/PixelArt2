import { ReactNode, useContext, useEffect } from "react";
import { animated, useSpring } from "@react-spring/web";
import { useMouse } from "../../hooks/useMouse";
import { GridContext } from "./GridProvider";

export const GridItem = ({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) => {
  const {
    register,
    getPos,
    itemWidth,
    startDrag,
    activeItem,
    onMove,
    endDrag,
    varUpdate,
  } = useContext(GridContext);

  register(name);

  const pos = getPos(name);

  const [styles, set] = useSpring(() => ({
    x: pos.x + "px",
    y: pos.y + "px",
    immediate: true,
    zIndex: "0",
    scale: "1",
    opacity: "1",
  }));

  useMouse({
    onRightDrag(_, delta) {
      if (activeItem?.name != name) return;
      set({
        zIndex: "1",
        immediate: true,
        x: pos.x + delta.x + "px",
        y: pos.y + delta.y + "px",
        scale: "1.1",
      });
      onMove(pos.x + delta.x, pos.y + delta.y);
    },
    onRightUp() {
      endDrag();
      set({
        zIndex: "0",
        x: pos.x + "px",
        y: pos.y + "px",
        scale: "1",
      });
    },
  });

  useEffect(() => {
    const pos = getPos(name);
    if (activeItem == null) {
      set({
        x: pos.x + "px",
        y: pos.y + "px",
        zIndex: "0",
        scale: "1",
        opacity: "1",
      });
      return;
    }
    if (name == activeItem?.name) return;
    set({
      x: pos.x + "px",
      y: pos.y + "px",
      zIndex: "0",
      opacity: "0.8",
    });
  }, [activeItem?.name, getPos, name, set, varUpdate]);

  const onMouseDown = () => {
    startDrag(name);
  };

  return (
    <animated.div
      onMouseDown={onMouseDown}
      style={{
        width: `${itemWidth}px`,
        height: "100%",
        backgroundColor: "white",
        position: "absolute",
        userSelect: "none",
        fontSize: "40px",
        display: "grid",
        placeContent: "center",
        ...styles,
      }}
    >
      {children}
    </animated.div>
  );
};
