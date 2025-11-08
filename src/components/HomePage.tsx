import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HomePage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const events = [
    {
      title: "Inauguration Ceremony",
      date: "June 5, 2025",
      desc: "A breathtaking opening with taiko drums and floating lanterns lighting up the night sky.",
    },
    {
      title: "Startup Showcase",
      date: "June 6, 2025",
      desc: "Young innovators unfold ideas like origami — delicate, precise, and powerful.",
    },
    {
      title: "Tech Fusion Talks",
      date: "June 7, 2025",
      desc: "Where creativity meets technology — insights from Japan’s tech visionaries.",
    },
    {
      title: "Cultural Evening",
      date: "June 8, 2025",
      desc: "A festival of lights, cherry blossoms, and entrepreneurial spirit.",
    },
  ];

  return (
    <div
      ref={ref}
      className="relative min-h-[500vh] w-full overflow-x-hidden text-white"
      style={{
        background:
          "radial-gradient(circle at top left, #0a0a0f 0%, #151521 40%, #1a1a2e 80%)",
      }}
    >
      {/* ✨ Background overlay with noise + vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),rgba(0,0,0,0.9))] mix-blend-overlay pointer-events-none"></div>

      {/* 🌸 Floating Sakura Petals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-pink-300 rounded-full opacity-70"
            animate={{
              y: ["-10%", "120%"],
              x: [Math.random() * -100, Math.random() * 100],
              rotate: [0, 360],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(0.5px)",
            }}
          />
        ))}
      </div>

      {/* 🏮 Floating Lanterns */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-around pointer-events-none opacity-80">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-8 h-10 bg-gradient-to-b from-amber-200 via-orange-300 to-red-400 rounded-md shadow-[0_0_25px_rgba(255,183,77,0.8)]"
            animate={{
              y: [0, -100, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 🏯 Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-7xl font-extrabold text-pink-400 drop-shadow-[0_0_25px_rgba(255,182,193,0.8)]"
        >
          E-Summit 2025
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-6 text-xl text-slate-300 max-w-xl leading-relaxed"
        >
          A symphony of innovation and tradition — inspired by Japan’s timeless spirit.
        </motion.p>
        <motion.button
          whileHover={{
            scale: 1.08,
            boxShadow: "0 0 40px rgba(255,105,180,0.7)",
            backgroundColor: "rgba(255,182,193,0.25)",
          }}
          transition={{ type: "spring", stiffness: 200 }}
          className="mt-12 px-10 py-4 border border-pink-400 text-white font-semibold rounded-xl backdrop-blur-md"
        >
          Register Now →
        </motion.button>
      </section>

      {/* 🌅 Participation Section */}
      <section className="h-[90vh] flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#101018] via-[#141420] to-[#1b1b2f] space-y-10">
        <motion.h2
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold text-pink-300"
        >
          Overall Participation
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-wrap justify-center gap-12 text-3xl text-slate-300"
        >
          <div className="hover:scale-110 transition-transform duration-500">
            <span className="text-pink-400 font-semibold">100+</span> Colleges
          </div>
          <div className="hover:scale-110 transition-transform duration-500">
            <span className="text-pink-400 font-semibold">5000+</span> Participants
          </div>
          <div className="hover:scale-110 transition-transform duration-500">
            <span className="text-pink-400 font-semibold">200+</span> Startups
          </div>
        </motion.div>
      </section>

      {/* 🕊️ Animated Timeline */}
      <section className="relative py-40 px-8 bg-gradient-to-b from-[#1a1a2e] via-[#101018] to-[#0b0b12]">
        {/* Glowing line */}
        <motion.div
          className="absolute left-1/2 top-0 w-[3px] bg-gradient-to-b from-pink-400 via-pink-600 to-purple-700 rounded-full shadow-[0_0_25px_rgba(255,105,180,0.9)]"
          style={{ height: lineHeight }}
        />

        <div className="space-y-40 relative z-10 mt-20">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -120 : 120 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className={`relative flex ${
                i % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <motion.div
                whileHover={{
                  scale: 1.3,
                  boxShadow: "0 0 25px rgba(255,182,193,0.9)",
                }}
                className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-pink-400 rounded-full border-4 border-[#0a0a0f]"
              />

              <div
                className={`w-1/2 ${
                  i % 2 === 0 ? "text-right pr-12" : "text-left pl-12"
                }`}
              >
                <motion.h3
                  whileHover={{
                    scale: 1.05,
                    color: "#ff9eb5",
                    textShadow: "0 0 20px rgba(255,182,193,0.8)",
                  }}
                  className="text-2xl font-semibold text-pink-300 mb-2"
                >
                  {event.title}
                </motion.h3>
                <p className="text-sm text-slate-400 italic">{event.date}</p>
                <p className="mt-2 text-slate-300">{event.desc}</p>

                <motion.div
                  className={`absolute top-6 ${
                    i % 2 === 0 ? "right-[50%]" : "left-[50%]"
                  } h-[2px] bg-gradient-to-r from-pink-400 to-transparent`}
                  initial={{ width: 0 }}
                  whileInView={{ width: 96 }}
                  transition={{ duration: 1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🌸 Footer */}
      <footer className="py-16 text-center bg-[#08080c] text-slate-400 text-sm border-t border-pink-800/40">
        <p>© 2025 E-Summit | Crafted with 🌸 in Japanese minimalism</p>
      </footer>
    </div>
  );
}
