import { useSpring, animated, to } from "@react-spring/web";
import { ReactNode, useContext, useEffect } from "react";
import { useMouse } from "../../hooks/useMouse";
import { GridContext } from "./GridContext";
import { GridItemContext } from "./GridItemContext";

export const GridItem = ({ children }: { children: ReactNode }) => {
  const { traveler, left, top, id, idx, isTraveler } =
    useContext(GridItemContext);
  const { itemWidth, onDown, onUp, onMove, gap, intermediateElement } =
    useContext(GridContext);

  const [styles, set] = useSpring(() => {
    console.log(traveler);
    return {
      xy: [left, top],
      immediate: true,
      scale: 1,
      zIndex: 0,
    };
  });

  useMouse({
    onLeftDrag(_, delta) {
      if (!isTraveler || traveler == null) return;

      const n_pos: [number, number] = [
        traveler.idx * itemWidth +
          (traveler.idx + 1) * gap +
          (intermediateElement.initialWidth || 0) * (traveler.idx + 1) +
          delta.x,
        0,
      ];

      set({
        xy: n_pos,
        immediate: true,
        scale: 1,
        zIndex: 1,
      });

      onMove(id, idx, n_pos);
    },
    onLeftUp() {
      onUp(id, idx);
    },
  });

  useEffect(() => {
    if (isTraveler) return;
    set({
      xy: [left, top],
      scale: 1,
      zIndex: 0,
    });
  }, [idx, isTraveler, itemWidth, left, set, top, traveler]);

  const auxStyled = {
    width: itemWidth + "px",
    height: "100%",
  };

  const onMouseDown = () => {
    onDown(id, idx);
  };

  return (
    <animated.div
      onMouseDown={onMouseDown}
      style={{
        boxSizing: "border-box",
        position: "absolute",
        zIndex: styles.zIndex,
        transform: to(
          [styles.xy, styles.scale],
          (xy, s) =>
            `translate3d(${(xy as number[])[0]}px, ${
              (xy as number[])[1]
            }px, 0) scale(${s})`
        ),
        ...auxStyled,
      }}
    >
      {children}
    </animated.div>
  );
};
