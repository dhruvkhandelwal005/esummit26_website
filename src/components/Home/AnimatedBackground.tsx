import { motion } from 'motion/react';

export function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <motion.path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="rgba(220,38,38,0.5)"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

export function MorphingBlob({ color = 'red', delay = 0 }: { color?: string; delay?: number }) {
  return (
    <motion.div
      className="absolute"
      style={{
        width: '40vw',
        height: '40vw',
        background: `radial-gradient(circle, ${color === 'red' ? 'rgba(220,38,38,0.3)' : 'rgba(139,92,246,0.3)'} 0%, transparent 70%)`,
        filter: 'blur(60px)',
      }}
      animate={{
        scale: [1, 1.2, 0.8, 1],
        x: [0, 100, -100, 0],
        y: [0, -100, 100, 0],
        rotate: [0, 90, 180, 270, 360],
      }}
      transition={{
        duration: 20,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

export function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-red-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, -200, -300],
            opacity: [0, 0.8, 0.8, 0],
            scale: [0, 1, 1.5, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

export function AnimatedLines() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.line
          key={i}
          x1="0"
          y1={`${i * 20}%`}
          x2="100%"
          y2={`${i * 20}%`}
          stroke="rgba(220,38,38,0.3)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0] }}
          transition={{
            duration: 3,
            delay: i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </svg>
  );
}
