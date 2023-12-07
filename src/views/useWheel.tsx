import { useEffect, useState } from "react";

export const useMouse = () => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const wheel = (e: WheelEvent) => {
      const direction = e.deltaY < 0 ? 1 : -1;
      if (scale + direction * 0.1 > 0) {
        setScale(scale + direction * 0.1);
      }
    };
    window.addEventListener("wheel", wheel);
    return () => {
      window.removeEventListener("wheel", wheel);
    };
  });

  return { scale };
};
