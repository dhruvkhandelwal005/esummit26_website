import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SakuraLayer() {
  const scrollYRef = useRef(0);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    // Track scroll for direction
    const handleScroll = () => {
      lastScrollYRef.current = scrollYRef.current;
      scrollYRef.current = window.scrollY || window.pageYOffset;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const petals = Array.from({ length: 12 }).map(() => {
      const el = document.createElement("div");
      el.className = "petal";
      el.style.left = `${Math.random() * 100}vw`;
      el.style.top = `${Math.random() * 50}vh`;
      // Warm dusk sakura color
      el.style.background = "rgba(255, 200, 180, 0.3)";
      el.style.boxShadow = "0 0 8px rgba(255, 220, 200, 0.2)";
      document.body.appendChild(el);
      
      // Base floating animation
      const baseAnim = gsap.to(el, {
        y: "100vh",
        x: "+=200",
        duration: 25 + Math.random() * 15,
        repeat: -1,
        ease: "none",
        delay: Math.random() * 10,
      });

      // Scroll-following parallax effect
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const scrollDelta = scrollYRef.current - lastScrollYRef.current;
          if (scrollDelta !== 0) {
            gsap.to(el, {
              y: `+=${scrollDelta * 0.2}`,
              duration: 0.3,
              ease: "power1.out",
            });
          }
        },
      });

      return el;
    });
    
    return () => {
      petals.forEach((p) => p.remove());
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
}
