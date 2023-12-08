export const CeldFragmentShader = `
precision mediump float;

uniform vec4 u_color;
uniform vec3 u_background_colors[2];
uniform int u_show_background;

varying  vec2 vUv;

void main() {
  vec4 color = u_color;

  if(
    (( vUv.x <= 0.5 && vUv.y <= 0.5 ) ||
     (0.5 <= vUv.x  && 0.5 <= vUv.y )) 
    && u_color.w == 0.0  && u_show_background == 1
  ){
    color  = vec4(u_background_colors[0],1.0);
  }

  if(
    (( vUv.x <= 0.5 && 0.5 <= vUv.y ) || 
    ( vUv.y <= 0.5 && 0.5 <= vUv.x )) && 
    u_color.w  == 0.0 && u_show_background == 1
  ){
   color  = vec4(u_background_colors[1],1.0);
  }

  gl_FragColor = color;
}`;
export const CeldVertexShader = `
varying  vec2 vUv;
void main() {
 vUv = uv;
 gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;
