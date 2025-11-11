import { motion, useScroll, useTransform } from "framer-motion"

export function JapaneseBg() {
  const { scrollY } = useScroll()

  const y1 = useTransform(scrollY, [0, 1000], [0, -80])
  const y2 = useTransform(scrollY, [0, 1000], [0, -150])
  const y3 = useTransform(scrollY, [0, 1000], [0, -40])

  return (
    <>
      {/* Layer 1: Mountain silhouettes */}
      <motion.div style={{ y: y1 }} className="fixed top-0 left-0 w-full h-screen pointer-events-none z-0">
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <defs>
            <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#1a1f3a", stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: "#0a0e27", stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path d="M 0 500 Q 300 300 600 450 T 1200 500 L 1200 800 L 0 800" fill="url(#mountainGrad)" />
          <path d="M 0 600 Q 400 400 800 550 T 1200 650 L 1200 800 L 0 800" fill="#0f1428" opacity="0.6" />
        </svg>
      </motion.div>

      {/* Layer 2: Subtle gradient orbs for depth */}
      <motion.div
        style={{ y: useTransform(scrollY, [0, 1000], [0, -120]) }}
        className="fixed top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-[#d81e5b] to-transparent rounded-full filter blur-3xl opacity-8 pointer-events-none z-0"
      />

      <motion.div
        style={{ y: useTransform(scrollY, [0, 1000], [0, -200]) }}
        className="fixed top-1/2 left-1/3 w-80 h-80 bg-gradient-to-br from-[#c19a6b] to-transparent rounded-full filter blur-3xl opacity-6 pointer-events-none z-0"
      />

      {/* Layer 3: Bamboo forest silhouettes */}
      <motion.div style={{ y: y3 }} className="fixed bottom-0 left-0 w-full h-96 pointer-events-none z-0">
        <svg className="w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="bambooGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#1a2a4a", stopOpacity: 0.4 }} />
              <stop offset="100%" style={{ stopColor: "#0f1824", stopOpacity: 0.8 }} />
            </linearGradient>
          </defs>
          {/* Bamboo stalks */}
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={i}>
              <line
                x1={150 * i + 75}
                y1="0"
                x2={150 * i + 75}
                y2="400"
                stroke="url(#bambooGrad)"
                strokeWidth="12"
                opacity="0.5"
              />
              <circle cx={150 * i + 75} cy="80" r="5" fill="#2a3a5a" opacity="0.6" />
              <circle cx={150 * i + 75} cy="160" r="5" fill="#2a3a5a" opacity="0.6" />
              <circle cx={150 * i + 75} cy="240" r="5" fill="#2a3a5a" opacity="0.6" />
              <circle cx={150 * i + 75} cy="320" r="5" fill="#2a3a5a" opacity="0.6" />
            </g>
          ))}
        </svg>
      </motion.div>

      {/* Layer 4: Floating mist effect with wave animation */}
      <motion.div
        style={{ y: useTransform(scrollY, [0, 1000], [0, -100]) }}
        className="fixed top-1/2 left-0 w-full h-80 pointer-events-none z-0"
      >
        <svg className="w-full h-full" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="mistGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#1a2545", stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: "#0a0e27", stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          <path d="M 0 150 Q 300 120 600 150 T 1200 150 L 1200 300 L 0 300" fill="url(#mistGrad)" />
        </svg>
      </motion.div>

      {/* Layer 5: Animated accent lines for visual interest */}
      <motion.div
        style={{ y: useTransform(scrollY, [0, 1000], [0, -180]) }}
        className="fixed top-1/4 left-0 w-full pointer-events-none z-0"
      >
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <line x1="0" y1="200" x2="1200" y2="250" stroke="#c19a6b" strokeWidth="1" opacity="0.15" />
          <line x1="0" y1="400" x2="1200" y2="380" stroke="#d81e5b" strokeWidth="1" opacity="0.1" />
        </svg>
      </motion.div>
    </>
  )
}
