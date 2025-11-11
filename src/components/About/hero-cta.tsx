import { motion } from "framer-motion"
import { CTAButton } from "./cta-button"
import { EventCountdown } from "./event-countdown"

export function HeroCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
      className="absolute bottom-20 left-0 right-0 z-40 flex flex-col items-center gap-8"
    >
      <div className="text-center mb-4">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="text-[#c19a6b] text-sm md:text-base uppercase tracking-widest mb-6"
        >
          Event Starts In
        </motion.p>
        <EventCountdown />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 2 }}
        className="flex gap-4 flex-wrap justify-center"
      >
        <CTAButton variant="primary" href="#register">
          Register Now
        </CTAButton>
        <CTAButton variant="outline" href="#about">
          Learn More
        </CTAButton>
      </motion.div>
    </motion.div>
  )
}

