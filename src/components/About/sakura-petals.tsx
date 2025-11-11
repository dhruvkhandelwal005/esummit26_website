import { motion, useScroll, useTransform, useMotionValue } from "framer-motion"
import { useMemo, useState, useEffect, useRef } from "react"

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()
  
  // Increase petal count based on scroll (more petals as you scroll down)
  const petalCount = useTransform(scrollYProgress, [0, 1], [150, 400])
  const [currentPetalCount, setCurrentPetalCount] = useState(150)
  const basePetals = useMemo<Petal[]>(() => {
    // Create base set of 400 petals (max we'll need) - increased for more density
    return Array.from({ length: 400 }, (_, i) => ({
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

  useEffect(() => {
    const unsubscribe = petalCount.on("change", (latest) => {
      setCurrentPetalCount(Math.floor(latest))
    })
    return () => unsubscribe()
  }, [petalCount])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Slice to show only current count
  const petals = basePetals.slice(0, currentPetalCount)

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-20 overflow-hidden">
      {petals.map((petal) => (
        <Petal key={petal.id} {...petal} mousePosition={mousePosition} />
      ))}
    </div>
  )
}

function Petal({ 
  startX, 
  startY, 
  delay, 
  duration, 
  size, 
  depth, 
  rotation,
  mousePosition 
}: Petal & { mousePosition: { x: number; y: number } }) {
  const pushX = useMotionValue(0)
  const pushY = useMotionValue(0)
  const petalRef = useRef<HTMLDivElement>(null)

  // Calculate distance from cursor and push petals away with better deflection
  useEffect(() => {
    const updatePosition = () => {
      if (!petalRef.current) return

      const rect = petalRef.current.getBoundingClientRect()
      const petalCenterX = rect.left + rect.width / 2
      const petalCenterY = rect.top + rect.height / 2

      const dx = mousePosition.x - petalCenterX
      const dy = mousePosition.y - petalCenterY
      const distance = Math.sqrt(dx * dx + dy * dy)
      const pushRadius = 100 // pixels - interaction radius

      if (distance < pushRadius && distance > 0) {
        // Stronger push when closer to cursor
        const pushStrength = Math.pow(1 - distance / pushRadius, 1.5)
        const angle = Math.atan2(dy, dx)
        
        // Calculate deflection - push perpendicular to cursor movement direction
        const deflectionX = Math.cos(angle) * pushStrength * 80
        const deflectionY = Math.sin(angle) * pushStrength * 80

        // Add some rotation effect for more natural movement
        const rotationEffect = pushStrength * 15

        pushX.set(deflectionX)
        pushY.set(deflectionY)
      } else {
        // Smooth return to original position
        const currentX = pushX.get()
        const currentY = pushY.get()
        pushX.set(currentX * 0.9)
        pushY.set(currentY * 0.9)
      }
    }

    // Use requestAnimationFrame for smoother updates
    let animationFrame: number
    const update = () => {
      updatePosition()
      animationFrame = requestAnimationFrame(update)
    }
    animationFrame = requestAnimationFrame(update)
    
    return () => cancelAnimationFrame(animationFrame)
  }, [mousePosition, pushX, pushY])

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
      y: [`${startY}vh`, "30vh", "70vh", "200vh"],
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
      ref={petalRef}
      className="absolute"
      data-petal-id={`${startX}-${startY}`}
      variants={pathVariants}
      initial="initial"
      animate="animate"
      transition={{
        duration,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{
        x: pushX,
        y: pushY,
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

