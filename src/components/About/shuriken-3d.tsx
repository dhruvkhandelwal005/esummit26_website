import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function Shuriken3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  const scale = useTransform(scrollY, [0, 2000], [0.3, 3])
  const opacity = useTransform(scrollY, [0, 1000, 3000], [0, 1, 0.6])
  const z = useTransform(scrollY, [0, 500], [-100, 100])
  const rotate = useTransform(scrollY, [0, 3000], [0, 360 * 4])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none flex items-center justify-center z-40">
      <motion.div
        className="relative w-40 h-40"
        style={{
          scale,
          opacity,
          rotate,
          z,
        }}
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-2xl"
          style={{
            filter: "drop-shadow(0 0 40px rgba(180, 80, 30, 0.8))",
          }}
        >
          <defs>
            <linearGradient id="shuriken-metal-primary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#f5f5f5", stopOpacity: 1 }} />
              <stop offset="15%" style={{ stopColor: "#e2e2e2", stopOpacity: 1 }} />
              <stop offset="35%" style={{ stopColor: "#c8c8c8", stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: "#a8a8a8", stopOpacity: 1 }} />
              <stop offset="65%" style={{ stopColor: "#8a8a8a", stopOpacity: 1 }} />
              <stop offset="85%" style={{ stopColor: "#6a6a6a", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#4a4a4a", stopOpacity: 1 }} />
            </linearGradient>

            {/* Deep edge shadowing for blade thickness and depth */}
            <linearGradient id="shuriken-edge-shadow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "rgba(0,0,0,0.2)", stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: "rgba(0,0,0,0.5)", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "rgba(0,0,0,0.8)", stopOpacity: 1 }} />
            </linearGradient>

            {/* Roughness texture variation */}
            <pattern id="metal-texture" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
              <rect width="4" height="4" fill="rgba(255,255,255,0.02)" />
              <line x1="0" y1="0" x2="4" y2="4" stroke="rgba(0,0,0,0.03)" strokeWidth="0.5" />
            </pattern>
          </defs>

          <g transform="translate(100, 100)">
            {/* Four-point blade design with professional geometry */}
            {Array.from({ length: 4 }).map((_, i) => {
              const angle = i * 90
              const cos = Math.cos((angle * Math.PI) / 180)
              const sin = Math.sin((angle * Math.PI) / 180)

              return (
                <g key={`blade-${i}`}>
                  {/* Main blade - primary metallic surface */}
                  <path
                    d={`M 0,0 L ${cos * 68},${sin * 68} L ${cos * 75 - sin * 14},${sin * 75 + cos * 14} L ${cos * 8},${sin * 8} Z`}
                    fill="url(#shuriken-metal-primary)"
                    stroke="#3a3a3a"
                    strokeWidth="1.8"
                    opacity="0.98"
                  />

                  {/* Blade thickness edge - beveled appearance */}
                  <path
                    d={`M ${cos * 68},${sin * 68} L ${cos * 75 - sin * 14},${sin * 75 + cos * 14} L ${cos * 73 - sin * 14},${sin * 73 + cos * 14} L ${cos * 66},${sin * 66} Z`}
                    fill="url(#shuriken-edge-shadow)"
                    opacity="0.4"
                  />

                  {/* Sharp point highlight */}
                  <path
                    d={`M ${cos * 72},${sin * 72} L ${cos * 75 - sin * 12},${sin * 75 + cos * 12} L ${cos * 73 - sin * 13},${sin * 73 + cos * 13} Z`}
                    fill="rgba(255,255,255,0.3)"
                    opacity="0.5"
                  />

                  {/* Blade detail texture */}
                  <path
                    d={`M 0,0 L ${cos * 68},${sin * 68} L ${cos * 75 - sin * 14},${sin * 75 + cos * 14} L ${cos * 8},${sin * 8} Z`}
                    fill="url(#metal-texture)"
                  />
                </g>
              )
            })}

            {/* Central hub - large detailed center piece */}
            <circle cx="0" cy="0" r="20" fill="url(#shuriken-metal-primary)" stroke="#2a2a2a" strokeWidth="2.2" />

            {/* Hub depth ring */}
            <circle cx="0" cy="0" r="20" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1" opacity="0.6" />

            {/* Hub highlight */}
            <circle cx="0" cy="0" r="16" fill="rgba(255,255,255,0.2)" opacity="0.4" />

            {/* Central hole */}
            <circle cx="0" cy="0" r="8" fill="#3a3a3a" stroke="#1a1a1a" strokeWidth="1.5" />

            {/* Inner hole shadow */}
            <circle cx="0" cy="0" r="6" fill="rgba(0,0,0,0.6)" opacity="0.7" />

            {/* Handmade vintage imperfections and wear marks */}
            <circle cx="-3" cy="4" r="2" fill="rgba(0,0,0,0.35)" opacity="0.7" />
            <circle cx="5" cy="-2" r="1.5" fill="rgba(255,255,255,0.25)" opacity="0.5" />
            <circle cx="2" cy="6" r="1" fill="rgba(0,0,0,0.4)" opacity="0.6" />
            <circle cx="-6" cy="-1" r="1.2" fill="rgba(255,255,255,0.15)" opacity="0.4" />

            {/* Subtle scratches for authenticity */}
            <line x1="-8" y1="0" x2="8" y2="0" stroke="rgba(0,0,0,0.15)" strokeWidth="0.3" opacity="0.5" />
            <line x1="0" y1="-8" x2="0" y2="8" stroke="rgba(0,0,0,0.15)" strokeWidth="0.3" opacity="0.5" />
          </g>
        </svg>

        {/* Dynamic glow effect - premium metallic appearance */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              "0 0 30px rgba(200, 100, 40, 0.4)",
              "0 0 60px rgba(200, 100, 40, 0.7)",
              "0 0 30px rgba(200, 100, 40, 0.4)",
              "0 0 40px rgba(150, 70, 30, 0.5)",
              "0 0 30px rgba(200, 100, 40, 0.4)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      </motion.div>
    </div>
  )
}
