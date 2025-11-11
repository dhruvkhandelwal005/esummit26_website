// components/ui/MagneticButton.tsx
"use client";
import { useMotionValue, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function MagneticButton({ children, className = "", href = "#" }) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const r = useTransform(x, [-40, 40], [-6, 6]);

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: x.set, y: y.set, rotate: r }}
      className={`inline-block rounded-xl border border-pink-400/60 bg-pink-400/15 px-6 py-3 font-semibold text-white backdrop-blur-md hover:bg-pink-400/25 transition-colors ${className}`}
    >
      {children}
    </motion.a>
  );
}
