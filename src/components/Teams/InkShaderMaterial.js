// InkShaderMaterial.js
// Custom ink-stroke shader for R3F. Registers via extend().
// Tunable uniforms: uContrast, uSpread, uDirection, uProgress, uTime, uPaper.

import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

const InkShaderMaterial = shaderMaterial(
  {
    uTexture: null,
    uMask: null,
    uProgress: 0.0,
    uTime: 0.0,
    uContrast: 1.25,
    uSpread: 0.12,
    uDirection: new THREE.Vector2(0.0, 1.0),
    uPaper: new THREE.Color(0.96, 0.94, 0.89),
  },
  // vertex
  `
  varying vec2 vUv;
  void main() {
  vec4 tex = texture2D(uTexture, vUv);
  vec4 mask = texture2D(uMask, vUv);

  float m = mask.r * uContrast;

  float directionOffset = dot(vUv - 0.5, uDirection);
  float n = noise(vUv * 180.0 + uTime * 0.2) * 0.12;

  float threshLow = (uProgress - uSpread) + n + directionOffset * 0.1;
  float threshHigh = (uProgress + uSpread) + n + directionOffset * 0.1;
  float reveal = smoothstep(threshLow, threshHigh, m);

  // Ink reveal logic: fade from paper -> ink -> full image
  vec3 inkColor = mix(uPaper, vec3(0.0), reveal * 0.9);  // blackish ink edges
  vec3 color = mix(inkColor, tex.rgb, reveal);

  gl_FragColor = vec4(color, 1.0);
}

  `,
  // fragment
  `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform sampler2D uMask;
  uniform float uProgress;
  uniform float uTime;
  uniform float uContrast;
  uniform float uSpread;
  uniform vec2 uDirection;
  uniform vec3 uPaper;

  // simple hash / noise
  float hash(vec2 p) {
    return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);
  }
  float noise(vec2 p){
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0,0.0));
    float c = hash(i + vec2(0.0,1.0));
    float d = hash(i + vec2(1.0,1.0));
    vec2 u = f*f*(3.0-2.0*f);
    return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
  }

  void main() {
    vec4 tex = texture2D(uTexture, vUv);
    vec4 mask = texture2D(uMask, vUv);

    // Boost the mask so even faint masks become visible
    float m = mask.r * uContrast;

    // Add a directional bias to mask via uDirection to simulate brush orientation
    // shift uv slightly along direction with time to simulate dragging
    float directionOffset = dot(vUv - 0.5, uDirection);
    float animatedOffset = directionOffset * 0.12 * (1.0 - uProgress);
    float n = noise(vUv * 180.0 + uTime * 0.2) * 0.12;

    float threshLow = (uProgress - uSpread) + n + animatedOffset;
    float threshHigh = (uProgress + uSpread * 0.6) + n + animatedOffset;
    float reveal = smoothstep(threshLow, threshHigh, m);

    // diffusion for softer edge
    float diffusion = smoothstep(uProgress - uSpread * 1.4, uProgress + uSpread * 0.8, m);

    vec3 inkColor = mix(uPaper, vec3(0.0), reveal * 0.9);
vec3 color = mix(inkColor, tex.rgb, reveal);
gl_FragColor = vec4(color, 1.0);

    // slight edge darkening to simulate ink ringing
    float edge = 1.0 - diffusion;
    color -= edge * 0.045;
  }
  `
);

extend({ InkShaderMaterial });

export default InkShaderMaterial;
