import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const strokes: Array<{
      startX: number
      startY: number
      endX: number
      endY: number
      progress: number
      maxProgress: number
      width: number
      opacity: number
      trailParticles: Array<{ x: number; y: number; life: number; size: number }>
    }> = []

    // Create katana slash strokes
    const createSlash = (centerX: number, centerY: number, angle: number, length: number, delay: number) => {
      setTimeout(() => {
        const startX = centerX - Math.cos(angle) * length * 0.5
        const startY = centerY - Math.sin(angle) * length * 0.5
        const endX = centerX + Math.cos(angle) * length * 0.5
        const endY = centerY + Math.sin(angle) * length * 0.5

        strokes.push({
          startX,
          startY,
          endX,
          endY,
          progress: 0,
          maxProgress: 0.5,
          width: 12,
          opacity: 1,
          trailParticles: [],
        })
      }, delay)
    }

    // Generate multiple crossing slashes for samurai effect
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    createSlash(centerX, centerY, Math.PI / 4, 500, 400)
    createSlash(centerX, centerY, -Math.PI / 4, 500, 600)
    createSlash(centerX, centerY, Math.PI / 6, 450, 800)
    createSlash(centerX, centerY, -Math.PI / 3, 480, 1000)

    let animationTime = 0

    const animate = () => {
      if (animationTime > 3500) return

      ctx.fillStyle = "rgba(10, 14, 39, 0.12)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationTime += 16

      strokes.forEach((stroke, index) => {
        stroke.progress += 0.016 / stroke.maxProgress

        if (stroke.progress > 1) {
          strokes.splice(index, 1)
          return
        }

        // Draw the slash stroke
        const currentX = stroke.startX + (stroke.endX - stroke.startX) * stroke.progress
        const currentY = stroke.startY + (stroke.endY - stroke.startY) * stroke.progress

        const opacity = Math.max(0, 1 - (stroke.progress - 0.7) * 3)
        const glowOpacity = Math.max(0, 1 - stroke.progress)

        ctx.strokeStyle = `rgba(216, 30, 91, ${glowOpacity * 0.4})`
        ctx.lineWidth = stroke.width + 15
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        ctx.globalAlpha = 0.5
        ctx.beginPath()
        ctx.moveTo(stroke.startX, stroke.startY)
        ctx.lineTo(currentX, currentY)
        ctx.stroke()

        ctx.strokeStyle = `rgba(255, 107, 157, ${opacity})`
        ctx.lineWidth = stroke.width
        ctx.globalAlpha = 1
        ctx.beginPath()
        ctx.moveTo(stroke.startX, stroke.startY)
        ctx.lineTo(currentX, currentY)
        ctx.stroke()

        if (Math.random() > 0.6) {
          const particleX = stroke.startX + (stroke.endX - stroke.startX) * (stroke.progress - 0.1)
          const particleY = stroke.startY + (stroke.endY - stroke.startY) * (stroke.progress - 0.1)
          const offsetAngle = Math.atan2(stroke.endY - stroke.startY, stroke.endX - stroke.startX)

          stroke.trailParticles.push({
            x: particleX + (Math.random() - 0.5) * 40,
            y: particleY + (Math.random() - 0.5) * 40,
            life: 1,
            size: Math.random() * 4 + 1,
          })
        }

        // Draw trail particles
        stroke.trailParticles.forEach((particle, pIndex) => {
          particle.life -= 0.04
          if (particle.life <= 0) {
            stroke.trailParticles.splice(pIndex, 1)
            return
          }

          const particleOpacity = particle.life * 0.6
          ctx.fillStyle = `rgba(216, 30, 91, ${particleOpacity})`
          ctx.globalAlpha = particleOpacity
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
        })
      })

      const loaderTime = (animationTime % 2000) / 2000
      const ringSize = 100 + Math.sin(loaderTime * Math.PI * 2) * 20

      ctx.strokeStyle = "rgba(193, 154, 107, 0.6)"
      ctx.lineWidth = 3
      ctx.globalAlpha = 1
      ctx.beginPath()
      ctx.arc(centerX, centerY, ringSize, 0, Math.PI * 2)
      ctx.stroke()

      // Rotating accent line on loader
      ctx.strokeStyle = "rgba(216, 30, 91, 0.8)"
      ctx.lineWidth = 4
      ctx.beginPath()
      const angleOffset = (animationTime / 3000) * Math.PI * 2
      ctx.arc(centerX, centerY, ringSize, angleOffset, angleOffset + Math.PI * 0.5)
      ctx.stroke()

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 3 }}
      className="fixed top-0 left-0 w-full h-full bg-[#0a0e27] z-50"
    >
      <canvas ref={canvasRef} className="w-full h-full" />

      {/* Samurai Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2, type: "spring" }}
          className="text-center"
        >
          <div className="text-7xl font-bold tracking-widest mb-2">
            <motion.span
              className="text-[#ff6b9d] inline-block"
              animate={{
                textShadow: [
                  "0 0 20px rgba(255,107,157,0.3)",
                  "0 0 40px rgba(255,107,157,0.8)",
                  "0 0 20px rgba(255,107,157,0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              侍
            </motion.span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="text-5xl font-bold text-[#c19a6b] tracking-wider mt-4"
          >
            About Esummit 2026
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="text-xl text-[#ff6b9d] mt-2"
          >
            2026
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
