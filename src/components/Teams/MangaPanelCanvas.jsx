// MangaPanelCanvas.jsx
// Small per-card R3F Canvas that draws a plane using InkShaderMaterial.
// It wires GSAP ScrollTrigger (DOM-triggered) to the shader uniform uProgress.
// If WebGL is forced off (window.__FORCE_CSS_FALLBACK), this component returns null.

import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { TextureLoader, ColorManagement, SRGBColorSpace } from "three";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "../components/InkShaderMaterial"; // ensure extend has registered the material

gsap.registerPlugin(ScrollTrigger);

function PanelMesh({ image, mask, triggerRef, direction = [0, 1] }) {
  const matRef = useRef();
  const tex = useLoader(TextureLoader, image);
  const maskTex = useLoader(TextureLoader, mask);

  // texture setup
  tex.colorSpace = SRGBColorSpace;
  ColorManagement.enabled = true;
  tex.flipY = false;
  maskTex.flipY = false;

  useEffect(() => {
    const mat = matRef.current;
    if (!mat) return;

    mat.uniforms.uTexture.value = tex;
    mat.uniforms.uMask.value = maskTex;
    mat.uniforms.uProgress.value = 0;
    mat.uniforms.uDirection.value.set(direction[0], direction[1]);

    if (triggerRef && triggerRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 85%",
          end: "top 25%",
          scrub: true,
          // once: true,
        },
      });
      // animate the uniform value object (uniforms are plain JS objects)
      tl.to(mat.uniforms.uProgress, { value: 1, ease: "none" });
      return () => {
        tl.kill();
      };
    }
  }, [tex, maskTex, triggerRef, direction]);

  useFrame((state, delta) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[1.8, 1.0, 1, 1]} />
      <inkShaderMaterial ref={matRef} />
    </mesh>
  );
}

export default function MangaPanelCanvas({ image, mask = "/textures/brush_mask.png", triggerRef, direction }) {
  // if user forced CSS fallback, skip WebGL
  if (typeof window !== "undefined" && window.__FORCE_CSS_FALLBACK) return null;

  // small controlled Canvas - orthographic for crisp 2D mapping
  return (
    <div style={{ width: "100%", height: "100%", pointerEvents: "none" }}>
      <Canvas orthographic camera={{ zoom: 140, position: [0, 0, 5] }}>
        <ambientLight intensity={0.6} />
        <PanelMesh image={image} mask={mask} triggerRef={triggerRef} direction={direction || [0, 1]} />
      </Canvas>
    </div>
  );
}
