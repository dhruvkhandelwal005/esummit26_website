import { motion } from "framer-motion"
import { useState } from "react"

interface HoverTextProps {
  children: string
  className?: string
}

export function HoverText({ children, className = "" }: HoverTextProps) {
  const [isHovered, setIsHovered] = useState(false)

  const letters = children.split("")

  return (
    <motion.span
      className={`relative inline-block cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          animate={
            isHovered
              ? {
                  color: "#d81e5b",
                  y: [0, -5, 0],
                  textShadow: [
                    "0 0 0px rgba(216, 30, 91, 0)",
                    "0 0 15px rgba(216, 30, 91, 0.8)",
                    "0 0 0px rgba(216, 30, 91, 0)",
                  ],
                }
              : {
                  color: "inherit",
                  y: 0,
                  textShadow: "0 0 0px rgba(216, 30, 91, 0)",
                }
          }
          transition={{
            duration: 0.6,
            delay: index * 0.05,
          }}
          className="inline-block"
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  )
}
