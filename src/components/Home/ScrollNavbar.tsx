import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, User, Info, CalendarDays, Leaf, MessageCircle } from "lucide-react";

export function ScrollNavbar() {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / maxScroll, 1);
      setScrollProgress(progress);
      setVisible(scrollTop > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pinkIntensity = Math.min(scrollProgress * 0.9 + 0.1, 1);
  const darkIntensity = Math.min(1 - scrollProgress * 0.4, 1);

  const bgGradient = `linear-gradient(
    to right,
    rgba(255, 192, 203, ${pinkIntensity * 0.22}),
    rgba(25, 25, 25, ${darkIntensity * 0.95})
  )`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            background: bgGradient,
            boxShadow: `0 6px 40px rgba(255,192,203,${pinkIntensity * 0.25})`,
          }}
          className="fixed top-0 left-0 right-0 z-50 border-b border-[#ffb6c1]/30 backdrop-blur-md"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-3">
            {/* 🌸 Logo Section */}
            <motion.a
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              href="/"
              className="flex flex-col leading-tight cursor-pointer"
            >
              <span className="text-sm text-[#ffb6c1] font-semibold tracking-widest drop-shadow-[0_0_4px_rgba(255,182,193,0.6)]">
                E-SUMMIT
              </span>
              <span className="text-xs text-slate-200/80">2026–27</span>
            </motion.a>

            {/* 🌸 Navigation Links */}
            <div className="flex gap-8 text-sm font-medium">
              {[
                { name: "About", icon: <Info size={15} />, href: "/about" },
                { name: "Sponsors", icon: <Leaf size={15} />, href: "/sponsors" },
                { name: "Schedule", icon: <CalendarDays size={15} />, href: "/schedule" },
                { name: "Teams", icon: <User size={16} />, href: "/teams" },
                { name: "Contact", icon: <Phone size={16} />, href: "/contact" },
              ].map((link, i) => (
                <motion.a
                  key={i}
                  href={`/${link.name.toLowerCase()}`}
                  whileHover={{
                    scale: 1.1,
                    color: "#ffd6e0",
                    textShadow: "0px 0px 8px rgba(255,182,193,0.9)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 12,
                  }}
                  className="relative flex items-center gap-1.5 text-white/90 cursor-pointer group"
                >
                  {link.icon}
                  <span>{link.name}</span>
                  {/* Glowing underline animation */}
                  <motion.span
                    className="absolute left-0 bottom-[-3px] h-[1.5px] w-0 bg-[#ffb6c1]
                    group-hover:w-full transition-all duration-400 origin-left rounded-full"
                  />
                </motion.a>
              ))}
            </div>

            {/* 🌸 Register Button */}
            <motion.button
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(255,182,193,0.25)",
                boxShadow:
                  "0 0 15px rgba(255,182,193,0.6), inset 0 0 12px rgba(255,182,193,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 5px rgba(255,182,193,0.3)",
                  "0 0 15px rgba(255,182,193,0.7)",
                  "0 0 5px rgba(255,182,193,0.3)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative px-6 py-1.5 rounded-full border border-[#ffb6c1]/70 text-[#ffb6c1]
                         hover:text-white font-medium transition-all duration-300 overflow-hidden"
            >
              {/* Shimmer highlight */}
              <span className="relative z-10">Register</span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ffb6c1]/40 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.5,
                }}
              />
              {/* Subtle glowing ring */}
              <motion.span
                className="absolute inset-[-2px] rounded-full border border-[#ffb6c1]/30"
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.03, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.button>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
