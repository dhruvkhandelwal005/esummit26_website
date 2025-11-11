import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface BilingualTitleProps {
  intervalMs?: number
  transitionMs?: number
}

export function BilingualTitle({ intervalMs = 7000, transitionMs = 2000 }: BilingualTitleProps) {
  const [showJapanese, setShowJapanese] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setShowJapanese((prev) => !prev)
    }, intervalMs)

    return () => clearInterval(timer)
  }, [intervalMs])

  return (
    <motion.div
      className="text-center z-20 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <motion.div
        key={showJapanese ? "jp" : "en"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: transitionMs / 1000 }}
        className="space-y-4"
      >
        {showJapanese ? (
          <>
            <h1 className="text-6xl font-bold text-white drop-shadow-lg">ABOUT</h1>
            <p className="text-xl text-pink-200"></p>
          </>
        ) : (
          <>
            <h1 className="text-6xl font-bold text-white drop-shadow-lg">について</h1>
            <p className="text-xl text-pink-200"></p>
          </>
        )}
      </motion.div>
        <>
        <div className="text-lg tracking-widest opacity-80">E-SUMMIT 2026-27</div>
        </>
    </motion.div>
  )
}
