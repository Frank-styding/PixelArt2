import { Canvas } from "@react-three/fiber";
import { Camera } from "./Camera";
import { GridMesh } from "./GridMesh";
import styled from "styled-components";
import { useRef } from "react";
import { useDisplayMouse } from "../../hooks/useDispayMouse";

const StyledDisplay = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const Display = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const { scale, location } = useDisplayMouse(ref);
  return (
    <StyledDisplay>
      <Canvas ref={ref}>
        <ambientLight />
        <Camera>
          <GridMesh scale={scale} location={[location.x, location.y, 0]} />
        </Camera>
      </Canvas>
    </StyledDisplay>
  );
};
