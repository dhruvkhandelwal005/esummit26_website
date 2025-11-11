import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Sparkles, Users, Lightbulb, Award } from "lucide-react"

interface Highlight {
  icon: React.ReactNode
  title: string
  description: string
}

const highlights: Highlight[] = [
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Innovation Talks",
    description: "Learn from industry leaders and visionaries shaping the future of technology",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Networking",
    description: "Connect with entrepreneurs, investors, and like-minded innovators",
  },
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: "Startup Showcase",
    description: "Discover groundbreaking startups and their innovative solutions",
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Awards & Recognition",
    description: "Celebrate excellence in entrepreneurship and innovation",
  },
]

export function EventHighlights() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="py-20 px-6 md:px-12 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#f5f1e8] mb-4">
            What to Expect
          </h2>
          <p className="text-[#b8b4a8] text-lg max-w-2xl mx-auto">
            Experience a transformative journey through innovation, entrepreneurship, and technology
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-[#d81e5b] to-[#c19a6b] mx-auto mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="p-6 bg-[#1a1f3a]/60 backdrop-blur-sm border border-[#2a2f4a] rounded-lg hover:border-[#d81e5b]/50 transition-all duration-300 group"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1, type: "spring" }}
                className="text-[#d81e5b] mb-4 group-hover:text-[#ff6b9d] transition-colors"
              >
                {highlight.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-[#f5f1e8] mb-3">{highlight.title}</h3>
              <p className="text-[#b8b4a8] text-sm leading-relaxed">{highlight.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

