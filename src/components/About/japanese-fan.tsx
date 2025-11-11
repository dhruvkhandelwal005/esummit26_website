import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function JapaneseFan() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  // Rotates 360 degrees and moves up/down with parallax effect
  const rotation = useTransform(scrollY, [0, 2000], [0, 360])
  const yOffset = useTransform(scrollY, [0, 2000], [0, 200])
  const xOffset = useTransform(scrollY, [0, 2000], [0, 30])

  return (
    <div ref={ref} className="fixed right-0 top-1/4 pointer-events-none z-20 hidden lg:block">
      <motion.div
        style={{
          rotate: rotation,
          y: yOffset,
          x: xOffset,
        }}
        className="relative"
      >
        {/* Japanese fan SVG illustration - elegant folded fan design */}
        <svg viewBox="0 0 200 300" className="w-40 h-56 drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Fan handle */}
          <rect x="85" y="180" width="30" height="100" fill="#8b4513" rx="3" />
          <rect x="88" y="200" width="24" height="70" fill="#a0522d" opacity="0.6" />

          {/* Main fan disc */}
          <circle cx="100" cy="100" r="90" fill="#d81e5b" opacity="0.85" />
          <circle cx="100" cy="100" r="88" fill="#e91e63" opacity="0.9" />

          {/* Decorative gold border */}
          <circle cx="100" cy="100" r="90" fill="none" stroke="#c19a6b" strokeWidth="2" />

          {/* Radiating lines from center */}
          {[0, 20, 40, 60, 80, 100, 120, 140, 160].map((angle) => (
            <line
              key={angle}
              x1="100"
              y1="100"
              x2={100 + 85 * Math.cos((angle * Math.PI) / 180 - Math.PI / 2)}
              y2={100 + 85 * Math.sin((angle * Math.PI) / 180 - Math.PI / 2)}
              stroke="#c19a6b"
              strokeWidth="1.5"
              opacity="0.6"
            />
          ))}

          {/* Japanese character (sensu/fan) in center */}
          <text x="100" y="110" textAnchor="middle" fill="#f5f1e8" fontSize="36" fontWeight="bold" opacity="0.8">
            扇
          </text>

          {/* Decorative sakura flower pattern */}
          <g opacity="0.6">
            <circle cx="70" cy="60" r="8" fill="#f5f1e8" />
            <circle cx="75" cy="50" r="6" fill="#f5f1e8" />
            <circle cx="85" cy="52" r="6" fill="#f5f1e8" />
            <circle cx="85" cy="65" r="6" fill="#f5f1e8" />
            <circle cx="75" cy="70" r="6" fill="#f5f1e8" />
            <circle cx="130" cy="130" r="7" fill="#f5f1e8" opacity="0.5" />
            <circle cx="135" cy="120" r="5" fill="#f5f1e8" opacity="0.5" />
          </g>

          {/* Shimmer/shine effect */}
          <ellipse cx="75" cy="70" rx="20" ry="30" fill="#f5f1e8" opacity="0.1" />
        </svg>

        {/* Glow effect */}
        <div className="absolute inset-0 w-40 h-56 bg-gradient-to-br from-[#d81e5b] to-transparent rounded-full filter blur-3xl opacity-30 -z-10" />
      </motion.div>
    </div>
  )
}
