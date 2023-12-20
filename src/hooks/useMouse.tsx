import { RefObject, useEffect, useMemo } from "react";

interface IMouse {
  startX: number;
  startY: number;
  x: number;
  y: number;
  wheelIsDown: boolean;
  leftIsDown: boolean;
  rightIsDown: boolean;
}

export const useMouse = ({
  ref,
  onWheelDown,
  onWheelDrag,
  onWheelUp,
  onWheel,
  onRightDown,
  onRightUp,
  onRightDrag,
  onLeftDown,
  onLeftUp,
  onLeftDrag,
  onUp,
  onMove,
  onDown,
}: {
  ref?: RefObject<HTMLCanvasElement> | undefined;
  onWheelDrag?: (mouse: IMouse, delta: { x: number; y: number }) => void;
  onWheelDown?: (mouse: IMouse) => void;
  onWheelUp?: (mouse: IMouse) => void;
  onWheel?: (delta: { x: number; y: number }) => void;

  onRightDown?: (mouse: IMouse) => void;
  onRightUp?: (mouse: IMouse) => void;
  onRightDrag?: (mouse: IMouse, delta: { x: number; y: number }) => void;

  onLeftDown?: (mouse: IMouse) => void;
  onLeftUp?: (mouse: IMouse) => void;
  onLeftDrag?: (mouse: IMouse, delta: { x: number; y: number }) => void;

  onMove?: (mouse: IMouse) => void;
  onUp?: (mouse: IMouse) => void;
  onDown?: (mouse: IMouse) => void;
}) => {
  const mouse = useMemo(
    () => ({
      startX: 0,
      startY: 0,
      x: 0,
      y: 0,
      wheelIsDown: false,
      leftIsDown: false,
      rightIsDown: false,
    }),
    []
  );
  useEffect(() => {
    const element = (ref ? ref.current : window) as HTMLElement;
    const mosueDown = (e: MouseEvent) => {
      mouse.startX = e.clientX;
      mouse.startY = e.clientY;
      mouse.y = e.clientY;
      mouse.x = e.clientX;

      if (e.button == 1) {
        mouse.wheelIsDown = true;
        if (onWheelDown) onWheelDown(mouse);
      }
      if (e.button == 0) {
        mouse.leftIsDown = true;
        if (onLeftDown) onLeftDown(mouse);
      }
      if (e.button == 1) {
        mouse.rightIsDown = true;
        if (onRightDown) onRightDown(mouse);
      }

      if (onDown) {
        onDown(mouse);
      }
    };
    const mouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (mouse.wheelIsDown) {
        if (onWheelDrag)
          onWheelDrag(mouse, {
            x: e.clientX - mouse.startX,
            y: e.clientY - mouse.startY,
          });
      }

      if (mouse.rightIsDown) {
        if (onRightDrag)
          onRightDrag(mouse, {
            x: e.clientX - mouse.startX,
            y: e.clientY - mouse.startY,
          });
      }

      if (mouse.leftIsDown) {
        if (onLeftDrag)
          onLeftDrag(mouse, {
            x: e.clientX - mouse.startX,
            y: e.clientY - mouse.startY,
          });
      }

      if (onMove) {
        onMove(mouse);
      }
    };
    const mouseUp = (e: MouseEvent) => {
      if (e.button == 1) {
        mouse.wheelIsDown = false;
        if (onWheelUp) onWheelUp(mouse);
      }
      if (e.button == 0) {
        mouse.leftIsDown = false;
        if (onLeftUp) onLeftUp(mouse);
      }
      if (e.button == 1) {
        mouse.rightIsDown = false;
        if (onRightUp) onRightUp(mouse);
      }
      if (onUp) {
        onUp(mouse);
      }
    };

    const wheel = (e: WheelEvent) => {
      if (onWheel) {
        onWheel({ x: e.deltaX, y: e.deltaY });
      }
    };

    element.addEventListener("mousedown", mosueDown);
    element.addEventListener("pointermove", mouseMove);
    element.addEventListener("mouseup", mouseUp);
    element.addEventListener("wheel", wheel, { passive: true });
    return () => {
      element.removeEventListener("mousedown", mosueDown);
      element.removeEventListener("pointermove", mouseMove);
      element.removeEventListener("mouseup", mouseUp);
      element.removeEventListener("wheel", wheel);
    };
  });
};
