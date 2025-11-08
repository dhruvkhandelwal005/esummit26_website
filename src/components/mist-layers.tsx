import { motion, MotionValue, useTransform } from "motion/react";

interface MistLayersProps {
  scrollProgress: MotionValue<number>;
  mouseX?: MotionValue<number>;
  mouseY?: MotionValue<number>;
}

export function MistLayers({ scrollProgress, mouseX, mouseY }: MistLayersProps) {
  // Transform mouse position to shift values for mist layers
  // Mouse position is 0-1, we want to shift by -20% to 20% based on cursor
  const cursorShiftX1 = mouseX ? useTransform(mouseX, [0, 1], [-20, 20]) : undefined;
  const cursorShiftY1 = mouseY ? useTransform(mouseY, [0, 1], [-15, 15]) : undefined;
  const cursorShiftX2 = mouseX ? useTransform(mouseX, [0, 1], [15, -15]) : undefined;
  const cursorShiftY2 = mouseY ? useTransform(mouseY, [0, 1], [-10, 10]) : undefined;
  const cursorShiftX3 = mouseX ? useTransform(mouseX, [0, 1], [-25, 25]) : undefined;
  const cursorShiftY3 = mouseY ? useTransform(mouseY, [0, 1], [-20, 20]) : undefined;
  const cursorShiftX4 = mouseX ? useTransform(mouseX, [0, 1], [10, -10]) : undefined;
  const cursorShiftY4 = mouseY ? useTransform(mouseY, [0, 1], [-12, 12]) : undefined;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Mist layer 1 - bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1/3"
        style={{
          x: cursorShiftX1,
          y: cursorShiftY1,
        }}
      >
        <motion.div
          className="w-full h-full"
          animate={{
            x: ["-10%", "10%"],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{
            x: { duration: 8, repeat: Infinity, ease: "linear" },
            opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <div className="w-[200%] h-full bg-gradient-to-t from-white/5 via-white/3 to-transparent blur-2xl" />
        </motion.div>
      </motion.div>

      {/* Mist layer 2 - mid */}
      <motion.div
        className="absolute top-1/3 left-0 right-0 h-1/2"
        style={{
          x: cursorShiftX2,
          y: cursorShiftY2,
        }}
      >
        <motion.div
          className="w-full h-full"
          animate={{
            x: ["10%", "-10%"],
            opacity: [0.04, 0.07, 0.04],
          }}
          transition={{
            x: { duration: 10, repeat: Infinity, ease: "linear" },
            opacity: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 },
          }}
        >
          <div className="w-[200%] h-full bg-gradient-to-b from-transparent via-white/4 to-transparent blur-3xl" />
        </motion.div>
      </motion.div>

      {/* Mist layer 3 - top, drifting */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-2/5"
        style={{
          x: cursorShiftX3,
          y: cursorShiftY3,
        }}
      >
        <motion.div
          className="w-full h-full"
          animate={{
            x: ["-15%", "15%"],
            opacity: [0.02, 0.05, 0.02],
          }}
          transition={{
            x: { duration: 12, repeat: Infinity, ease: "linear" },
            opacity: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 },
          }}
        >
          <div className="w-[200%] h-full bg-gradient-to-b from-white/3 via-white/2 to-transparent blur-2xl" />
        </motion.div>
      </motion.div>

      {/* Horizontal fog bank - moves with scroll and cursor */}
      <motion.div
        className="absolute top-1/2 left-0 right-0 h-1/4 -translate-y-1/2"
        style={{
          x: cursorShiftX4,
          y: cursorShiftY4,
        }}
      >
        <motion.div
          className="w-full h-full"
          animate={{
            x: ["0%", "20%"],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            x: { duration: 15, repeat: Infinity, ease: "linear" },
            opacity: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <div className="w-[250%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent blur-3xl" />
        </motion.div>
      </motion.div>
    </div>
  );
}
