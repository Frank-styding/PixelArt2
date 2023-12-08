import { RefObject, useEffect, useMemo, useState } from "react";

export const useDisplayMouse = (ref: RefObject<HTMLCanvasElement>) => {
  const [location, setLocation] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  const mouse = useMemo(
    () => ({
      x: 0,
      y: 0,
      prevX: 0,
      prevY: 0,
      wheelIsDown: false,
    }),
    []
  );
  useEffect(() => {
    const element = ref.current as HTMLElement;
    const mosueDown = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (e.button == 1) {
        mouse.wheelIsDown = true;
      }
    };
    const mouseMove = (e: MouseEvent) => {
      if (mouse.wheelIsDown) {
        setLocation({
          x: e.clientX - mouse.x + mouse.prevX,
          y: mouse.y - e.clientY + mouse.prevY,
        });
      }
    };
    const mouseUp = (e: MouseEvent) => {
      mouse.prevX = location.x;
      mouse.prevY = location.y;
      if (e.button == 1) {
        mouse.wheelIsDown = false;
      }
    };
    const wheel = (e: WheelEvent) => {
      const direction = e.deltaY < 0 ? 1 : -1;
      if (scale + direction * 0.1 > 0) {
        setScale(scale + direction * 0.1);
      }
    };

    element.addEventListener("wheel", wheel);
    element.addEventListener("mousedown", mosueDown);
    element.addEventListener("mousemove", mouseMove);
    element.addEventListener("mouseup", mouseUp);
    return () => {
      element.removeEventListener("mousedown", mosueDown);
      element.removeEventListener("mousemove", mouseMove);
      element.removeEventListener("mouseup", mouseUp);
      element.removeEventListener("wheel", wheel);
    };
  });
  return { location, scale };
};
