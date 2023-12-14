import { useThree } from "@react-three/fiber";
import { GridLines } from "./gridLinesMesh";
import { CeldMesh } from "./CeldMesh";
import { Color } from "three";

interface GridMeshProps {
  scale: number;
  position: [number, number, number];
  gridDim: [number, number];
  lineColor: number;
  lineWidth: number;
  showGrid?: boolean;
  showBackground?: boolean;
  backgroundColors: [number, number];
  gridData: {
    color: number;
    opacity: number;
  }[];
}

export const GridMesh = ({
  scale,
  position,
  gridDim,
  lineColor,
  lineWidth,
  backgroundColors,
  gridData,
  showGrid = true,
  showBackground = true,
}: GridMeshProps) => {
  const { size } = useThree();

  const celdSize =
    (Math.min(size.width, size.height) - 100) /
    Math.max(gridDim[0], gridDim[1]);

  const width = gridDim[0] * celdSize;
  const height = gridDim[1] * celdSize;

  const celds = [];

  for (let i = 0; i < gridDim[0]; i++) {
    for (let j = 0; j < gridDim[1]; j++) {
      const { color, opacity } = gridData[i + j * gridDim[0]];
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
          backgroundColors={[
            new Color(backgroundColors[0]),
            new Color(backgroundColors[1]),
          ]}
          showBackground={showBackground}
          color={new Color(color)}
          opacity={opacity}
        />
      );
    }
  }

  return (
    <mesh position={position} scale={scale}>
      {celds}
      {showGrid && (
        <GridLines
          gridDim={gridDim}
          lineColor={new Color(lineColor)}
          lineWidth={lineWidth}
          width={width}
          height={height}
          celdSize={celdSize}
        />
      )}
    </mesh>
  );
};
