import { Line } from "@react-three/drei";
import { Color, Vector3 } from "three";

interface GridLines {
  lineColor: Color;
  lineWidth: number;
  gridDim: [number, number];
  width: number;
  height: number;
  celdSize: number;
}

export const GridLines = ({
  lineColor,
  lineWidth,
  gridDim,
  width,
  height,
  celdSize,
}: GridLines) => {
  const lines = [];

  for (let j = 0; j <= gridDim[1]; j++) {
    lines.push(
      <Line
        key={"y" + j}
        points={[
          new Vector3(-width / 2, -height / 2 + celdSize * j, 0),
          new Vector3(width / 2, -height / 2 + celdSize * j, 0),
        ]}
        color={lineColor}
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
        color={lineColor}
        lineWidth={lineWidth}
      />
    );
  }

  return <mesh>{lines}</mesh>;
};
