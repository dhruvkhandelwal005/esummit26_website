import { motion, type MotionValue, useTransform } from "framer-motion"

interface SunlightEffectsProps {
  scrollProgress: MotionValue<number>
  sunriseProgress: MotionValue<number>
}

export function SunlightEffects({ scrollProgress, sunriseProgress }: SunlightEffectsProps) {
  const waterBrightness = useTransform(scrollProgress, [0, 0.4, 1], [0.3, 0.5, 0.6])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Radial glow behind Torii */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%]"
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{ opacity: sunriseProgress }}
      >
        <div className="w-full h-full bg-gradient-radial from-orange-300/40 via-pink-300/20 to-transparent blur-3xl" />
      </motion.div>

      {/* Sun rays */}
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

      {/* Water reflection */}
      <motion.div className="absolute bottom-0 left-0 right-0 h-1/2" style={{ opacity: waterBrightness }}>
        <div className="w-full h-full bg-gradient-to-t from-orange-200/20 via-pink-200/10 to-transparent blur-xl" />
      </motion.div>
    </div>
  )
}
