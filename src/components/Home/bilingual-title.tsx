import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

interface BilingualTitleProps {
  intervalMs?: number; // total time each word stays visible
  transitionMs?: number; // crossfade duration
}

export function BilingualTitle({ intervalMs = 7000, transitionMs = 2000 }: BilingualTitleProps) {
  const texts = ["歓 迎", "Welcome"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return (
    <div className="text-center text-white select-none">
      <div className="text-6xl tracking-wider mb-4 relative inline-block" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={texts[index]}
            initial={{ opacity: 0, filter: "blur(10px)", y: 4, scale: 0.995, letterSpacing: "0.02em" }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0, scale: 1, letterSpacing: "0.04em" }}
            exit={{ opacity: 0, filter: "blur(10px)", y: -4, scale: 1.005, letterSpacing: "0.02em" }}
            transition={{ duration: transitionMs / 1000, ease: [0.25, 1, 0.5, 1] }}
            className="inline-block"
            aria-live="polite"
          >
            {texts[index]}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="text-lg tracking-widest opacity-80">E-SUMMIT 2026-27</div>
    </div>
  );
}


