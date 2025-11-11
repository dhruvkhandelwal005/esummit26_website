"use client";
import { motion } from "framer-motion";

export default function ShowcaseHeader() {
  return (
    <section className="relative isolate px-5 py-16 md:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 380px at 15% 10%, rgba(255,105,180,0.07), transparent 60%), radial-gradient(800px 360px at 85% 6%, rgba(99,102,241,0.05), transparent 60%)",
        }}
      />
      <div className="mx-auto max-w-6xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-[28px] font-semibold tracking-wide text-pink-200 md:text-[34px]"
          style={{ fontFamily: "'Sawarabi Mincho', serif" }}
        >
          E‑Summit 2025 — Interactive Showcase
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-300"
        >
          Elegant sections with premium motion and clarity. Scroll to explore a crafted experience.
        </motion.p>
      </div>
    </section>
  );
}
