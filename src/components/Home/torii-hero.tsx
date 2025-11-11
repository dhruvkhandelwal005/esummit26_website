import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "motion/react";
import toriiImage from "../../assets/hero.jpg";
import { SakuraPetals } from "./sakura-petals";
import { MistLayers } from "./mist-layers";
import { SunlightEffects } from "./sunlight-effects";
import { BilingualTitle } from "./bilingual-title";
import { CursorGlow } from "./cursor-glow";

export function ToriiHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Mouse parallax
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  // Removed scene tilt so the window does not move with the pointer
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  // Parallax layers with different speeds
  const petalParallax = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const toriiParallax = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const mountainParallax = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const mistParallax = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]); // Counter-parallax
  const waterShift = useTransform(scrollYProgress, [0, 1], [0, 3]);
  const titleParallax = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  
  // Camera zoom (push-in effect)
  const zoomScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.04, 1.04]);
  
  // Lighting progression
  const sunriseProgress = useTransform(scrollYProgress, [0, 0.4, 1], [0.6, 1, 1]);
  const contrast = useTransform(scrollYProgress, [0, 0.4, 1], [1, 1.1, 1.15]);
  const warmth = useTransform(scrollYProgress, [0, 0.4, 1], [1, 1.08, 1.12]);
  
  // Initial fade-in on load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  // Mouse movement tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    mouseX.set(x);
    mouseY.set(y);
  };
  
  return (
    <div 
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
    >
      {/* Initial fade-in overlay */}
      <motion.div
        className="absolute inset-0 bg-black z-50 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
      />
      
      {/* Main scene container with zoom only */}
      <motion.div
        className="absolute inset-0 origin-center"
        style={{
          scale: zoomScale,
          filter: `contrast(${contrast}) saturate(${warmth})`,
        }}
      >
        {/* Background: Sky, Mountain, Water (slowest parallax) */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ y: mountainParallax }}
        >
          <img
            src={toriiImage}
            alt="Torii Gate at Dawn"
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Sunrise gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-orange-400/20 via-pink-400/10 to-transparent"
            style={{ opacity: sunriseProgress }}
          />
          
          {/* Water reflection shift */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-blue-900/10 to-transparent"
            style={{ y: waterShift }}
          />
        </motion.div>
        
        {/* Mist layers (counter-parallax) */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ x: mistParallax }}
        >
          <MistLayers scrollProgress={scrollYProgress} mouseX={mouseX} mouseY={mouseY} />
        </motion.div>
        
        {/* Torii gate (mid-ground parallax) */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ y: toriiParallax }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Subtle vignette to focus on center */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30" />
          </div>
        </motion.div>
        
        {/* Sunlight effects (overlay) */}
        <SunlightEffects scrollProgress={scrollYProgress} sunriseProgress={sunriseProgress} />
        
        {/* Sakura petals (foreground, fastest parallax) */}
        <motion.div
          className="absolute inset-0 will-change-transform pointer-events-none"
          style={{ y: petalParallax }}
        >
          <SakuraPetals />
        </motion.div>
      </motion.div>
      
      {/* Title overlay (optional, non-parallax) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 2, delay: 1, ease: [0.19, 1, 0.22, 1] }}
        style={{ y: titleParallax }}
      >
        <BilingualTitle intervalMs={7000} transitionMs={2000} />
      </motion.div>

      {/* Cursor-following light glow using GSAP quickTo */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <CursorGlow containerRef={containerRef} radiusPx={520} intensity={0.14} />
      </div>
    </div>
  );
}
