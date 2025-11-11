import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"
import { HoverText } from "./hover-text"

interface AboutSectionProps {
  title: string
  description: string
  content: string
  index: number
}

export function AboutSection({ title, description, content, index }: AboutSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { scrollY } = useScroll()

  const yParallax = useTransform(scrollY, [index * 800, index * 800 + 800], [100, -100])

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="py-20 px-6 md:px-12 border-b border-[#2a2f4a] relative overflow-hidden"
    >
      {/* Parallax background effect */}
      <motion.div
        style={{ y: yParallax }}
        className="absolute -top-32 -right-32 w-96 h-96 bg-[#d81e5b] rounded-full filter blur-3xl opacity-5 pointer-events-none"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section number */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 + 0.2 }}
          className="mb-4"
        >
          <span className="text-[#c19a6b] text-sm tracking-widest font-semibold">0{index + 1}</span>
        </motion.div>

        {/* Title with hover effect */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#f5f1e8]">
          <HoverText>{title}</HoverText>
        </h2>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
          className="h-1 w-20 bg-gradient-to-r from-[#d81e5b] to-[#c19a6b] mb-6 origin-left"
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 + 0.4 }}
          className="text-lg text-[#c19a6b] mb-6 italic"
        >
          {description}
        </motion.p>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
          className="prose prose-invert max-w-none"
        >
          <p className="text-[#b8b4a8] leading-relaxed text-lg">{content}</p>
        </motion.div>
      </div>
    </motion.section>
  )
}
