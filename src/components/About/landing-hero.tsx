import { motion, useScroll, useTransform } from "framer-motion"
import { HoverText } from "./hover-text"
import { useRef, useEffect, useState } from "react"

export function LandingHero() {
  const ref = useRef(null)
  const { scrollY } = useScroll()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const yTransform = useTransform(scrollY, [0, 500], [0, -150])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url(/torii-background.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <motion.div className="absolute inset-0 bg-[#0a0e27]/30 pointer-events-none" />

      {/* Primary glow orb - parallax effect */}
      <motion.div
        style={{ y: useTransform(scrollY, [0, 800], [0, -400]), x: useTransform(scrollY, [0, 800], [0, 150]) }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d81e5b] rounded-full filter blur-3xl opacity-10 pointer-events-none"
      />

      {/* Secondary glow orb - parallax effect */}
      <motion.div
        style={{ y: useTransform(scrollY, [0, 800], [0, 250]), x: useTransform(scrollY, [0, 800], [0, -200]) }}
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#c19a6b] rounded-full filter blur-3xl opacity-8 pointer-events-none"
      />

      {/* Tertiary accent glow */}
      <motion.div
        style={{ y: useTransform(scrollY, [0, 800], [0, -200]), x: useTransform(scrollY, [0, 800], [0, 100]) }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
        className="absolute top-1/3 right-1/3 w-72 h-72 bg-[#ff6b9d] rounded-full filter blur-3xl opacity-12 pointer-events-none"
      />

      {/* Animated gradient lines with parallax */}
      <motion.div
        style={{ y: useTransform(scrollY, [0, 800], [0, -350]) }}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/3 w-1 h-48 bg-gradient-to-b from-[#c19a6b] to-transparent opacity-20 rotate-45" />
        <div className="absolute bottom-1/4 right-1/4 w-1 h-64 bg-gradient-to-b from-[#d81e5b] to-transparent opacity-15 rotate-12" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: yTransform }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="relative z-10 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, type: "spring", delay: 1.2 }}
          className="mb-6"
        >
          <div className="text-6xl font-bold mb-4">
            <HoverText className="text-[#d81e5b]">ESUMMIT</HoverText>
            <span className="text-[#c19a6b] ml-4">2026</span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-2xl text-[#c19a6b] mb-8 tracking-widest"
        >
          Sacred Gateway to Innovation
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.7 }}
          className="text-lg text-[#b8b4a8] mb-12 max-w-2xl mx-auto"
        >
          Where ancient wisdom meets modern innovation. IIIT Nagpur presents Esummit - a journey through
          entrepreneurship and technology.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="text-[#c19a6b] text-sm tracking-widest"
        >
          <p>SCROLL TO DISCOVER</p>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="mt-2 text-2xl"
          >
            ↓
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
