import { motion } from "framer-motion"
import { useMemo } from "react"

interface Petal {
  id: number
  startX: number
  startY: number
  delay: number
  duration: number
  size: number
  depth: number
  rotation: number
}

export function SakuraPetals() {
  const petals = useMemo<Petal[]>(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      startX: Math.random() * 100,
      startY: -100 - Math.random() * 50,
      delay: Math.random() * 8,
      duration: 12 + Math.random() * 8,
      size: 8 + Math.random() * 16,
      depth: Math.random(),
      rotation: Math.random() * 360,
    }))
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((petal) => (
        <Petal key={petal.id} {...petal} />
      ))}
    </div>
  )
}

function Petal({ startX, startY, delay, duration, size, depth, rotation }: Petal) {
  const pathVariants = {
    initial: {
      x: `${startX}vw`,
      y: `${startY}vh`,
      rotate: rotation,
      opacity: 0,
    },
    animate: {
      x: [
        `${startX}vw`,
        `${startX + (Math.random() - 0.5) * 30}vw`,
        `${startX + (Math.random() - 0.5) * 40}vw`,
        `${startX + (Math.random() - 0.5) * 50}vw`,
      ],
      y: [`${startY}vh`, "30vh", "70vh", "150vh"],
      rotate: [rotation, rotation + 180 + Math.random() * 180],
      opacity: [0, 0.3 + depth * 0.7, 0.3 + depth * 0.7, 0],
    },
  }

  const wobbleVariants = {
    animate: {
      x: ["0%", "10%", "-10%", "0%"],
      transition: {
        duration: 2 + Math.random() * 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <motion.div
      className="absolute"
      variants={pathVariants}
      initial="initial"
      animate="animate"
      transition={{
        duration,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <motion.div variants={wobbleVariants} animate="animate">
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          style={{
            filter: `blur(${(1 - depth) * 1.5}px)`,
          }}
        >
          <path
            d="M12 2C12 2 8 6 8 10C8 12 9.5 14 12 14C14.5 14 16 12 16 10C16 6 12 2 12 2Z"
            fill={`rgba(255, ${150 + depth * 50}, ${180 + depth * 50}, ${0.6 + depth * 0.4})`}
            stroke={`rgba(255, 200, 220, ${0.3 + depth * 0.3})`}
            strokeWidth="0.5"
          />
          <ellipse cx="12" cy="10" rx="2" ry="3" fill={`rgba(255, 230, 240, ${0.4 + depth * 0.3})`} />
        </svg>
      </motion.div>
    </motion.div>
  )
}
