import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Event Card Component with image and hover text overlay
function EventCard({ event, index }: { event: any; index: number }) {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: 50,
        scale: 0.95,
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        scale: 1,
      }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ 
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
      }}
      className={`relative group ${index === 4 ? "lg:col-start-2" : ""}`}
    >
      {/* Card Container */}
      <div className="relative h-[400px] rounded-3xl overflow-hidden cursor-pointer">
        {/* Image Background */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: event.gradient,
          }}
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
          }}
        >
          {/* Placeholder gradient image - you can replace with actual images */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-pink-600/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-8xl opacity-30"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {event.icon}
            </motion.div>
          </div>
        </motion.div>

        {/* Dark Overlay - appears on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />

        {/* Text Content - appears on hover */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 z-10">
          {/* Title */}
          <h3 className="text-3xl font-bold mb-3 text-white transform translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 ease-out">
            {event.title}
          </h3>

          {/* Date */}
          <div className="flex items-center gap-2 mb-2 text-pink-200 text-sm transform translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150 ease-out">
            <span>📅</span>
            <span>{event.date}</span>
          </div>

          {/* Time */}
          <div className="flex items-center gap-2 mb-2 text-pink-200 text-sm transform translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200 ease-out">
            <span>🕐</span>
            <span>{event.time}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 mb-4 text-pink-200 text-sm transform translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-250 ease-out">
            <span>📍</span>
            <span>{event.location}</span>
          </div>

          {/* Description */}
          <p className="text-slate-200 text-sm leading-relaxed mb-6 transform translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-300 ease-out">
            {event.description}
          </p>

          {/* CTA Button */}
          <motion.button
            className="w-full py-3 px-6 rounded-xl font-semibold text-white relative overflow-hidden transform translate-y-5 opacity-0 scale-90 group-hover:translate-y-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 delay-350 ease-out"
            style={{
              background: `linear-gradient(135deg, rgba(255,105,180,0.9), rgba(147,51,234,0.9))`,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Learn More →</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>
        </div>

        {/* Subtle Border Glow on Hover */}
        <motion.div
          className="absolute inset-0 rounded-3xl border-2 border-pink-400/50 opacity-0 group-hover:opacity-100 pointer-events-none"
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
}

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

      {/* 🎪 Events Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient Orbs */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full blur-3xl opacity-20"
              style={{
                width: `${300 + i * 200}px`,
                height: `${300 + i * 200}px`,
                background: `radial-gradient(circle, rgba(255,${105 + i * 20},180,0.6) 0%, transparent 70%)`,
                left: `${20 + i * 30}%`,
                top: `${10 + i * 20}%`,
              }}
              animate={{
                x: [0, 100, -100, 0],
                y: [0, -100, 100, 0],
                scale: [1, 1.2, 0.8, 1],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
          
          {/* Animated Grid Pattern */}
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(255,182,193,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,182,193,0.1) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
            animate={{
              x: [0, 50],
              y: [0, 50],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-20 relative z-10"
        >
          <motion.h2
            className="text-6xl md:text-7xl font-extrabold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
                fontSize: "10rem",
                lineHeight: "1",
              }}
            >
              Events
            </motion.span>
          </motion.h2>
          
          {/* Animated Underline */}
          <motion.div
            className="h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: "200px" }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </motion.div>

        {/* Events Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 events-grid">
          {[
            {
              title: "Tech Innovation Summit",
              date: "March 15, 2025",
              time: "10:00 AM - 6:00 PM",
              location: "Main Auditorium",
              description: "Join industry leaders and innovators for a day of cutting-edge technology discussions, startup pitches, and networking opportunities.",
              icon: "🚀",
              gradient: "linear-gradient(135deg, #ec4899 0%, #a855f7 50%, #db2777 100%)",
            },
            {
              title: "Startup Pitch Competition",
              date: "March 16, 2025",
              time: "2:00 PM - 8:00 PM",
              location: "Conference Hall",
              description: "Watch emerging startups compete for funding and recognition. Witness the next generation of entrepreneurs pitch their revolutionary ideas.",
              icon: "💡",
              gradient: "linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #ef4444 100%)",
            },
            {
              title: "Networking Gala",
              date: "March 17, 2025",
              time: "7:00 PM - 11:00 PM",
              location: "Grand Ballroom",
              description: "An elegant evening of networking with investors, entrepreneurs, and industry experts. Connect and build lasting relationships.",
              icon: "🌟",
              gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #a855f7 100%)",
            },
            {
              title: "Workshop Series",
              date: "March 18, 2025",
              time: "9:00 AM - 5:00 PM",
              location: "Workshop Rooms",
              description: "Hands-on workshops covering topics from AI/ML to business strategy. Learn practical skills from industry experts.",
              icon: "📚",
              gradient: "linear-gradient(135deg, #f97316 0%, #ec4899 50%, #a855f7 100%)",
            },
            {
              title: "Closing Ceremony",
              date: "March 19, 2025",
              time: "6:00 PM - 9:00 PM",
              location: "Main Stage",
              description: "Celebrate the conclusion of E-Summit 2025 with awards, performances, and a grand finale that you won't forget.",
              icon: "🎉",
              gradient: "linear-gradient(135deg, #eab308 0%, #ec4899 50%, #a855f7 100%)",
            },
          ].map((event, index) => (
            <EventCard key={index} event={event} index={index} />
          ))}
        </div>
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
