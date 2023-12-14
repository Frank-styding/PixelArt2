import { Canvas } from "@react-three/fiber";
import { Camera } from "./Camera";
import styled from "styled-components";
import { useMemo, useRef, useState } from "react";
import { GridMesh } from "./GridMesh";
import { useAppSelector } from "../../hooks/redux";
import { useMouse } from "../../hooks/useMouse";

const StyledDisplay = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const Display = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const {
    backgroundColors,
    lineColor,
    layers,
    activeLayer,
    showBackground,
    showGrid,
  } = useAppSelector((state) => state.editor);

  const prevTransform = useMemo(
    () => ({
      translateX: 0,
      translateY: 0,
      scale: 1,
    }),
    []
  );

  const [transform, setTransform] = useState({
    translateX: 0,
    translateY: 0,
    scale: 1,
  });

  useMouse({
    ref,
    onWheelDrag(_, delta) {
      setTransform({
        ...transform,
        translateX: prevTransform.translateX + delta.x,
        translateY: prevTransform.translateY - delta.y,
      });
    },
    onWheelUp() {
      prevTransform.scale = transform.scale;
      prevTransform.translateX = transform.translateX;
      prevTransform.translateY = transform.translateY;
    },
    onWheel(delta) {
      setTransform({
        ...transform,
        scale: transform.scale + 0.1 * (delta.y < 0 ? 1 : -1),
      });
    },
  });

  return (
    <StyledDisplay>
      <Canvas ref={ref}>
        <ambientLight />
        <Camera>
          <GridMesh
            gridDim={[16, 16]}
            lineColor={lineColor}
            gridData={layers[activeLayer]}
            lineWidth={1}
            backgroundColors={backgroundColors}
            scale={transform.scale}
            position={[transform.translateX, transform.translateY, 0]}
            showBackground={showBackground}
            showGrid={showGrid}
          />
        </Camera>
      </Canvas>
    </StyledDisplay>
  );
};
