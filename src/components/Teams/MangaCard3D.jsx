// src/components/MangaCard3D.jsx
import { useRef, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Html } from "@react-three/drei";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MangaCard3D({ texture, domain, index }) {
  const meshRef = useRef();
  const matRef = useRef();
  const tex = useLoader(TextureLoader, texture);

  useEffect(() => {
    const mat = matRef.current;
    mat.uniforms.uTexture.value = tex;

    // 🌀 Each card animates with staggered scroll
    const startOffset = 200 * index;
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: `${startOffset} top`,
      end: `${startOffset + 800} bottom`,
      scrub: true,
      onUpdate: (self) => {
        mat.uniforms.uProgress.value = Math.min(1, self.progress * 1.5);
      },
    });

    return () => trigger.kill();
  }, [tex, index]);

  // Floating hover motion
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.03;
    meshRef.current.rotation.y = Math.cos(t * 0.4) * 0.03;
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <planeGeometry args={[5, 6.5, 32, 32]} />
        <inkShaderMaterial ref={matRef} />
      </mesh>

      <Html distanceFactor={8} position={[0, -4.5, 0]}>
        <div
          style={{
            background: "rgba(255,255,255,0.9)",
            padding: "12px 20px",
            borderRadius: "10px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
            textAlign: "center",
            width: "220px",
            transform: "translateY(0)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-6px) scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0) scale(1)")}
        >
          <h3 style={{ fontSize: "1.1rem", marginBottom: "6px" }}>
            {domain.name}
          </h3>
          <p>
            <b>Lead:</b> {domain.lead}
            <br />
            <b>Co-Lead:</b> {domain.coLead}
          </p>
          {domain.members && (
            <p style={{ marginTop: "4px", fontSize: "0.9rem" }}>
              <b>Members:</b> {domain.members.join(", ")}
            </p>
          )}
        </div>
      </Html>
    </group>
  );
}
