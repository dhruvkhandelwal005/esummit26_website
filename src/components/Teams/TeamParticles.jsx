// TeamParticles.jsx
// Lightweight particle layer (canvas) rendering drifting sakura petals.
// Low overhead, runs behind cards. Enhanced with scroll-following motion and warm dusk colors.

import React, { useRef, useEffect } from "react";
import "../styles/teamSection.css";

export default function TeamParticles() {
  const canvasRef = useRef();
  const scrollYRef = useRef(0);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let width = canvas.width = canvas.clientWidth;
    let height = canvas.height = canvas.clientHeight;
    const ctx = canvas.getContext("2d");
    let raf;
    const items = [];

    const count = Math.max(8, Math.floor(width * 0.0009 * height * 0.0009 * 1500));
    for (let i = 0; i < count; i++) {
      items.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 6 + Math.random() * 10,
        vx: -0.3 + Math.random() * 0.6,
        vy: 0.1 + Math.random() * 0.6,
        rot: Math.random() * Math.PI * 2,
        speed: 0.002 + Math.random() * 0.006,
        baseY: Math.random() * height
      });
    }

    // Track scroll direction
    const handleScroll = () => {
      lastScrollYRef.current = scrollYRef.current;
      scrollYRef.current = window.scrollY || window.pageYOffset;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    function draw(t) {
      ctx.clearRect(0, 0, width, height);
      const scrollDelta = scrollYRef.current - lastScrollYRef.current;
      const scrollDirection = scrollDelta > 0 ? 1 : scrollDelta < 0 ? -1 : 0;
      
      for (let p of items) {
        // Natural drift
        p.x += p.vx;
        p.y += p.vy + Math.sin((t + p.x) * p.speed) * 0.6;
        
        // Scroll-following motion - subtle parallax effect
        if (scrollDirection !== 0) {
          p.y += scrollDirection * 0.15;
        }
        
        p.rot += 0.01;

        if (p.x < -50) p.x = width + 50;
        if (p.x > width + 50) p.x = -50;
        if (p.y > height + 80) p.y = -80;
        if (p.y < -80) p.y = height + 80;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        // Warm dusk sakura colors - soft pink with gold tint
        ctx.globalAlpha = 0.4;
        ctx.fillStyle = "rgba(255, 200, 180, 0.25)";
        ctx.strokeStyle = "rgba(255, 220, 200, 0.15)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r * 0.6, p.r, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    function onResize() {
      width = canvas.width = canvas.clientWidth;
      height = canvas.height = canvas.clientHeight;
    }
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <canvas className="team-particles" ref={canvasRef} />;
}
