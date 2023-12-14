import { useEffect, useMemo, useRef } from "react";
import { CeldVertexShader, CeldFragmentShader } from "../../shaders/CeldShader";

import { Color, ShaderMaterial, Vector4 } from "three";

interface CeldProps {
  celdSize: number;
  celdPos: [number, number];
  position: [number, number, number];
  backgroundColors: [Color, Color];
  idx: number;
  color: Color;
  showBackground: boolean;
  opacity: number;
}

export const CeldMesh = ({
  position,
  idx,
  celdSize,
  color,
  backgroundColors,
  showBackground,
  opacity,
}: CeldProps) => {
  const ref = useRef<ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      u_color: {
        value: new Vector4(color.r, color.g, color.b, opacity),
      },
      u_background_colors: {
        value: backgroundColors.map((item) => new Color(item)),
      },
      u_show_background: {
        value: showBackground,
      },
    }),
    [backgroundColors, color.b, color.g, color.r, showBackground, opacity]
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.uniforms.u_color.value = new Vector4(
        color.r,
        color.g,
        color.b,
        opacity
      );
      ref.current.uniforms.u_background_colors.value = backgroundColors.map(
        (item) => new Color(item)
      );
    }
  }, [idx, backgroundColors, color.r, color.g, color.b, opacity]);

  return (
    <mesh position={position} name={"" + idx}>
      <planeGeometry args={[celdSize, celdSize]}></planeGeometry>
      <shaderMaterial
        attach="material"
        vertexShader={CeldVertexShader}
        fragmentShader={CeldFragmentShader}
        uniforms={uniforms}
        ref={ref}
      />
    </mesh>
  );
};
