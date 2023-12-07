import { useEffect, useMemo, useState } from "react";

export const useDrag = () => {
  const [location, setLocation] = useState({ x: 0, y: 0 });
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

    window.addEventListener("mousedown", mosueDown);
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
    return () => {
      window.removeEventListener("mousedown", mosueDown);
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
    };
  });
  return location;
};
