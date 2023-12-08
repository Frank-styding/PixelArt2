import { CeldMesh } from "./CeldMesh";
import { Line } from "@react-three/drei";
import { Vector3 } from "three";
import { useAppSelector } from "../../hooks/redux";
import { useThree } from "@react-three/fiber";

export const GridMesh = ({
  location,
  scale,
}: {
  location: [number, number, number];
  scale: number;
}) => {
  const { lineColorHEX, lineWidth, gridDim } = useAppSelector(
    (state) => state.editor
  );

  const { size } = useThree();

  const celdSize =
    (Math.min(size.width, size.height) - 100) /
    Math.max(gridDim[0], gridDim[1]);

  const width = gridDim[0] * celdSize;
  const height = gridDim[1] * celdSize;

  const celds = [];
  const lines = [];
  for (let i = 0; i < gridDim[0]; i++) {
    for (let j = 0; j < gridDim[1]; j++) {
      celds.push(
        <CeldMesh
          key={i + j * gridDim[0]}
          idx={i + j * gridDim[0]}
          position={[
            -width / 2 + celdSize * (i + 0.5),
            -height / 2 + celdSize * (j + 0.5),
            0,
          ]}
          celdSize={celdSize}
          celdPos={[i, j]}
        />
      );
    }
  }
  for (let j = 0; j <= gridDim[1]; j++) {
    lines.push(
      <Line
        key={"y" + j}
        points={[
          new Vector3(-width / 2, -height / 2 + celdSize * j, 0),
          new Vector3(width / 2, -height / 2 + celdSize * j, 0),
        ]}
        color={lineColorHEX}
        lineWidth={lineWidth}
      />
    );
  }
  for (let i = 0; i <= gridDim[0]; i++) {
    lines.push(
      <Line
        key={"x" + i}
        points={[
          new Vector3(-width / 2 + celdSize * i, height / 2, 0),
          new Vector3(-width / 2 + celdSize * i, -height / 2, 0),
        ]}
        color={lineColorHEX}
        lineWidth={lineWidth}
      />
    );
  }

  return (
    <mesh position={location} scale={scale}>
      {celds}
      {lines}
    </mesh>
  );
};
