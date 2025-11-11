import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

interface Stat {
  number: string
  label: string
  suffix?: string
}

const stats: Stat[] = [
  { number: "50+", label: "Speakers" },
  { number: "1000+", label: "Attendees" },
  { number: "30+", label: "Startups" },
  { number: "20+", label: "Workshops" },
]

export function EventStats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="py-20 px-6 md:px-12 bg-gradient-to-b from-[#0a0e27] via-[#1a1f3a]/50 to-[#0a0e27] relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d81e5b] rounded-full filter blur-3xl opacity-10" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#c19a6b] rounded-full filter blur-3xl opacity-10" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#f5f1e8] mb-4">
            Event in Numbers
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#d81e5b] to-[#c19a6b] mx-auto" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="text-center p-6 bg-[#1a1f3a]/60 backdrop-blur-sm border border-[#2a2f4a] rounded-lg hover:border-[#d81e5b]/50 transition-all duration-300"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1, type: "spring" }}
                className="text-4xl md:text-5xl font-bold text-[#d81e5b] mb-2"
              >
                {stat.number}
              </motion.div>
              <div className="text-[#b8b4a8] text-sm md:text-base uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

