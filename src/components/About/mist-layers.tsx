import { motion, type MotionValue } from "framer-motion"

interface MistLayersProps {
  scrollProgress: MotionValue<number>
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}

export function MistLayers({ scrollProgress, mouseX, mouseY }: MistLayersProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            opacity: 0.1 * (1 + i),
          }}
        >
          <div className="w-full h-full bg-gradient-to-b from-white/5 via-transparent to-transparent" />
        </motion.div>
      ))}
    </div>
  )
}
