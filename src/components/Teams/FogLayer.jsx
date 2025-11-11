import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FogLayer() {
  const containerRef = useRef(null);
  const fogLayersRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create fog layers if they don't exist
    const fogCount = 3;
    for (let i = 0; i < fogCount; i++) {
      if (!fogLayersRef.current[i]) {
        const fogLayer = document.createElement("div");
        fogLayer.className = `fog-layer fog-layer-${i + 1}`;
        container.appendChild(fogLayer);
        fogLayersRef.current[i] = fogLayer;
      }
    }

    // Animate fog layers with different speeds for parallax depth
    fogLayersRef.current.forEach((fog, index) => {
      if (!fog) return;

      // Fade in fog layers after a delay to prevent interference with card loading
      gsap.to(fog, {
        opacity: 0.12,
        duration: 2,
        delay: index * 0.5 + 1,
        ease: "power2.out",
      });

      const speedX = index % 2 === 0 ? 150 : -120;
      const speedY = index % 2 === 0 ? -80 : 100;
      const duration = 15 + index * 3;

      // Horizontal drift
      gsap.to(fog, {
        x: `+=${speedX}`,
        ease: "none",
        duration: duration,
        repeat: -1,
        yoyo: true,
        delay: index * 0.5 + 1,
      });

      // Vertical drift
      gsap.to(fog, {
        y: `+=${speedY}`,
        ease: "none",
        duration: duration + 2,
        repeat: -1,
        yoyo: true,
        delay: index * 0.5 + 1,
      });

      // Scroll-based parallax movement - use team-cinematic container
      const triggerElement = document.querySelector(".team-cinematic") || document.querySelector(".chapter-scene");
      if (triggerElement) {
        gsap.to(fog, {
          y: index % 2 === 0 ? -100 : 100,
          x: index % 2 === 0 ? 50 : -50,
          ease: "none",
          scrollTrigger: {
            trigger: triggerElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 2,
          },
        });
      }
    });

    return () => {
      // Cleanup
      fogLayersRef.current.forEach((fog) => {
        if (fog && fog.parentNode) {
          fog.parentNode.removeChild(fog);
        }
      });
      fogLayersRef.current = [];
    };
  }, []);

  return <div ref={containerRef} className="fog-container"></div>;
}
