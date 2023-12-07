import { useThree } from "@react-three/fiber";
import { ShaderMaterial, Vector4 } from "three";
import { useEffect, useMemo, useRef } from "react";
import { useMouse } from "./useWheel";
import { useDrag } from "./useDrag";

const fragmentShader = `
precision mediump float;


uniform vec4 u_color;

uniform float u_celd_size;
uniform vec2 u_offset;
uniform vec2 u_dim;
uniform vec3 u_colors[2];
uniform float u_line_width;

void main() {
  vec4 color = u_color;
  vec2 pos = gl_FragCoord.xy - u_offset.xy;
  vec2 mod_pos = mod(pos, u_celd_size);
  
  if (
   (mod_pos.x <= u_celd_size/2.0 && 
    mod_pos.y <= u_celd_size/2.0)||
  (u_celd_size/2.0 <= mod_pos.x && mod_pos.x <= u_celd_size &&
   u_celd_size/2.0 <= mod_pos.y && mod_pos.y <= u_celd_size
  )
  ){
    color = vec4(u_colors[1],1.0);
  }

  if (
    ( u_celd_size / 2.0 <= mod_pos.x && mod_pos.x <= u_celd_size && 
     mod_pos.y <= u_celd_size/2.0) ||
    (u_celd_size / 2.0 <= mod_pos.y && mod_pos.y <= u_celd_size && 
     mod_pos.x <= u_celd_size/2.0)
   ){
     color = vec4(u_colors[0],1.0);
   }

  if(
    (mod_pos.x <= u_line_width) || 
    (mod_pos.y <= u_line_width)||
    (u_dim.x - u_line_width*2.0 <= pos.x && pos.x <= u_dim.x)||
    (u_dim.y - u_line_width <= pos.y && pos.y <= u_dim.y)
  ){
    color = vec4(1,1,1,1);
  }

  gl_FragColor = color;
}`;

const vertexShader = `
void main() {
 gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

export const GridPlane = ({
  celdSize,
  gridDim,
}: {
  celdSize: number;
  gridDim: [number, number];
}) => {
  const { size } = useThree();
  const { scale } = useMouse();
  const location = useDrag();

  const matRef = useRef<ShaderMaterial>(null);
  const width = gridDim[0] * celdSize;
  const height = gridDim[1] * celdSize;

  const data = useMemo(
    () => ({
      uniforms: {
        u_color: { value: new Vector4(0, 0, 0, 0) },
        u_celd_size: { value: celdSize },
        u_dim: { value: [width, height] },
        u_offset: {
          value: [
            size.width / 2 - gridDim[0] * celdSize * scale,
            size.height / 2 - gridDim[1] * celdSize * scale,
          ],
        },
        u_colors: {
          value: [0.5, 0.5, 0.5, 0.1, 0.1, 0.1],
        },
        u_line_width: {
          value: 1.5,
        },
      },
      fragmentShader,
      vertexShader,
    }),
    []
  );

  useEffect(() => {
    if (matRef.current) {
      const width = gridDim[0] * celdSize;
      const height = gridDim[1] * celdSize;
      const uniforms = {
        u_celd_size: { value: celdSize * scale },
        u_offset: {
          value: [
            size.width / 2 - (width / 2) * scale + location.x,
            size.height / 2 - (height / 2) * scale + location.y,
          ],
        },
        u_dim: { value: [width * scale, height * scale] },
      };

      Object.assign(matRef.current.uniforms, uniforms);
    }
  }, [scale, location, gridDim]);

  const celds = [];
  for (let i = 0; i < gridDim[0] * gridDim[1]; i++) {
    celds.push(
      <mesh>
        <planeGeometry args={[celdSize, celdSize]}></planeGeometry>
      </mesh>
    );
  }

  return (
    <mesh position={[location.x, location.y, 0]}>
      {/*  <planeGeometry args={[width * scale, height * scale]} />
      <shaderMaterial attach="material" ref={matRef} {...data} /> */}
    </mesh>
  );
};
