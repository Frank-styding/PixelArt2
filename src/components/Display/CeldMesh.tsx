import { useEffect, useMemo, useRef } from "react";
import { CeldVertexShader, CeldFragmentShader } from "../../shaders/CeldShader";
import { CeldProps } from "./CeldProps";
import { useAppSelector } from "../../hooks/redux";
import { Color, ShaderMaterial, Vector4 } from "three";

export const CeldMesh = ({ position, idx, celdSize }: CeldProps) => {
  const {
    showBackground,
    backgroundColorsHEX: backgroundColors,
    gridColorData,
    layerIdx,
  } = useAppSelector((state) => state.editor);

  const ref = useRef<ShaderMaterial>(null);

  const { colorHEX, opacity } = gridColorData[layerIdx][idx];
  const color = new Color(colorHEX);

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
    [backgroundColors, color.b, color.g, color.r, opacity, showBackground]
  );

  useEffect(() => {
    const { colorHEX, opacity } = gridColorData[layerIdx][idx];
    const color = new Color(colorHEX);
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
  }, [gridColorData, idx, backgroundColors, layerIdx]);

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
