import { motion, MotionValue, useTransform } from "motion/react";

interface SunlightEffectsProps {
  scrollProgress: MotionValue<number>;
  sunriseProgress: MotionValue<number>;
}

export function SunlightEffects({ scrollProgress, sunriseProgress }: SunlightEffectsProps) {
  // Water reflection brightness increases on scroll
  const waterBrightness = useTransform(scrollProgress, [0, 0.4, 1], [0.3, 0.5, 0.6]);
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Radial glow behind Torii - pulsing */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%]"
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ opacity: sunriseProgress }}
      >
        <div className="w-full h-full bg-gradient-radial from-orange-300/40 via-pink-300/20 to-transparent blur-3xl" />
      </motion.div>

      {/* Sun rays expanding from center */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: [0, 0.4, 0],
          scale: [0.8, 1.2, 1.2],
        }}
        transition={{
          duration: 2,
          delay: 0.5,
          ease: [0.19, 1, 0.22, 1],
        }}
      >
        <div className="w-full h-full bg-gradient-radial from-yellow-200/30 via-orange-200/10 to-transparent" />
      </motion.div>

      {/* Horizontal light rays */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-full origin-center"
            style={{
              rotate: `${i * 45}deg`,
            }}
            animate={{
              opacity: [0, 0.15, 0],
            }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            <div className="w-full h-full bg-gradient-to-b from-transparent via-yellow-100/40 to-transparent blur-sm" />
          </motion.div>
        ))}
      </div>

      {/* Lens bloom shimmer - traveling left to right */}
      <motion.div
        className="absolute top-0 bottom-0 w-1/4 left-0"
        animate={{
          x: ["-100%", "500%"],
          opacity: [0, 0.6, 0.6, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatDelay: 6,
          ease: "easeInOut",
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent blur-2xl rotate-12" />
      </motion.div>

      {/* Water reflection glow - bottom half */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1/2"
        style={{ opacity: waterBrightness }}
      >
        <div className="w-full h-full bg-gradient-to-t from-orange-200/20 via-pink-200/10 to-transparent blur-xl" />
      </motion.div>

      {/* Golden hour atmosphere */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-full h-full bg-gradient-to-b from-orange-400/10 via-transparent to-blue-900/5" />
      </motion.div>

      {/* Soft vignette to enhance depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20" />
    </div>
  );
}
