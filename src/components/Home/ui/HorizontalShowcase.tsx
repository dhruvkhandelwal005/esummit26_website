"use client";
// components/ui/HorizontalShowcase.tsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const panels = [
  { title: "Lantern Night", img: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1600&auto=format&fit=crop" },
  { title: "Sakura Trail", img: "https://images.unsplash.com/photo-1520981825232-39f116591fd9?q=80&w=1600&auto=format&fit=crop" },
  { title: "City Neon", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop" },
  { title: "Festival Glow", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop" },
];

export default function HorizontalShowcase() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(panels.length - 1) * 100}%`]);

  return (
    <section ref={ref} className="relative h-[220vh] bg-[#0b0b12]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ x }} className="flex h-full">
          {panels.map((p) => (
            <div key={p.title} className="relative h-full w-screen flex-shrink-0">
              <img src={p.img} alt={p.title} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-16 left-10 rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-white backdrop-blur-md">
                {p.title}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
