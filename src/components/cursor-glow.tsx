import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import gsap from "gsap";

interface CursorGlowProps {
  containerRef: RefObject<HTMLDivElement>;
  radiusPx?: number;
  intensity?: number; // 0..1 opacity of inner glow
}

export function CursorGlow({ containerRef, radiusPx = 500, intensity = 0.12 }: CursorGlowProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !overlayRef.current) return;

    const el = overlayRef.current;
    const setGX = gsap.quickTo(el, "--gx", 0.35, { ease: "power3.out", units: "px" });
    const setGY = gsap.quickTo(el, "--gy", 0.35, { ease: "power3.out", units: "px" });

    function handleMove(e: MouseEvent) {
      const rect = containerRef.current!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setGX(x);
      setGY(y);
    }

    const container = containerRef.current;
    container.addEventListener("mousemove", handleMove);

    // Initialize to center
    const rect = container.getBoundingClientRect();
    setGX(rect.width / 2);
    setGY(rect.height / 2);

    return () => {
      container.removeEventListener("mousemove", handleMove);
    };
  }, [containerRef]);

  return (
    <div
      ref={overlayRef}
      className="absolute inset-0 pointer-events-none"
      style={{
        // CSS custom properties to position the gradient center
        // @ts-ignore - custom properties
        "--gx": "50%",
        // @ts-ignore
        "--gy": "50%",
        background: `radial-gradient(${radiusPx}px circle at var(--gx) var(--gy), rgba(255,255,255,${intensity}), transparent 60%)`,
        mixBlendMode: "soft-light",
      } as React.CSSProperties}
    />
  );
}


