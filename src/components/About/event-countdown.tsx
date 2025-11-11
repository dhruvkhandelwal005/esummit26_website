import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function EventCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Set event date: March 2026 (example)
    const eventDate = new Date("2026-03-15T09:00:00").getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = eventDate - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="flex gap-4 md:gap-6 justify-center items-center flex-wrap"
    >
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
          className="text-center"
        >
          <div className="bg-[#1a1f3a]/80 backdrop-blur-sm border border-[#2a2f4a] rounded-lg px-6 py-4 min-w-[80px] md:min-w-[100px]">
            <motion.div
              key={unit.value}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-3xl md:text-4xl font-bold text-[#d81e5b] mb-1"
            >
              {String(unit.value).padStart(2, "0")}
            </motion.div>
            <div className="text-xs md:text-sm text-[#b8b4a8] uppercase tracking-wider">
              {unit.label}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

