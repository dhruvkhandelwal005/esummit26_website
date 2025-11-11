import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function InkWashIntro({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<'black' | 'ink-sweep' | 'violent-clash' | 'explosion' | 'white' | 'text'>('black');

  useEffect(() => {
    // Precise timing - total 5 seconds
    const timers = [
      setTimeout(() => setStage('ink-sweep'), 200),        // Rapid ink sweeps start
      setTimeout(() => setStage('violent-clash'), 1200),   // Violent collision begins
      setTimeout(() => setStage('explosion'), 1500),       // Explosive white flash
      setTimeout(() => setStage('white'), 1700),           // Clean white
      setTimeout(() => setStage('text'), 2000),            // Text appears
      setTimeout(() => onComplete(), 5000),                // Complete and transition at 5s
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, [onComplete]);

  const skipIntro = () => {
    onComplete();
  };

  // Generate multiple ink stroke paths for violent effect
  const inkStrokes = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: (i * 30) + (Math.random() * 15 - 7.5),
    delay: Math.random() * 0.3,
    speed: 0.4 + Math.random() * 0.3,
  }));

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      {/* Multiple rapid ink sweeps from all directions */}
      <AnimatePresence>
        {(stage === 'ink-sweep' || stage === 'violent-clash') && (
          <>
            {inkStrokes.map((stroke) => (
              <motion.div
                key={stroke.id}
                className="absolute inset-0 origin-center"
                initial={{ 
                  opacity: 0,
                  scale: 0,
                  rotate: stroke.angle,
                }}
                animate={{ 
                  opacity: [0, 0.95, 0.85, 0.9],
                  scale: [0, 2.5, 2.2],
                  rotate: stroke.angle + (Math.random() * 20 - 10),
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: stroke.speed,
                  delay: stroke.delay,
                  ease: [0.87, 0, 0.13, 1],
                }}
                style={{
                  background: `conic-gradient(from ${stroke.angle}deg, 
                    transparent 0deg, 
                    rgba(255,255,255,0.15) ${10 + Math.random() * 10}deg,
                    rgba(240,240,240,0.3) ${20 + Math.random() * 15}deg,
                    rgba(220,220,220,0.45) ${35 + Math.random() * 20}deg,
                    rgba(200,200,200,0.35) ${55 + Math.random() * 15}deg,
                    rgba(180,180,180,0.2) ${70 + Math.random() * 10}deg,
                    transparent ${85 + Math.random() * 15}deg)`,
                  filter: 'blur(3px)',
                  mixBlendMode: 'screen',
                }}
              >
                <svg className="absolute inset-0 w-full h-full opacity-80">
                  <defs>
                    <filter id={`ink-texture-${stroke.id}`}>
                      <feTurbulence 
                        type="fractalNoise" 
                        baseFrequency={0.015 + Math.random() * 0.01} 
                        numOctaves="6" 
                        seed={stroke.id * 100}
                      />
                      <feDisplacementMap in="SourceGraphic" scale="120" />
                      <feGaussianBlur stdDeviation="0.5" />
                    </filter>
                  </defs>
                  <rect 
                    width="100%" 
                    height="100%" 
                    fill="white" 
                    filter={`url(#ink-texture-${stroke.id})`} 
                    opacity="0.4"
                  />
                </svg>
              </motion.div>
            ))}

            {/* Additional diagonal ink slashes */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={`slash-${i}`}
                className="absolute"
                initial={{ 
                  x: i % 2 === 0 ? '-100%' : '100%',
                  y: i < 2 ? '-100%' : '100%',
                  opacity: 0,
                  scale: 0.5,
                }}
                animate={{ 
                  x: '0%',
                  y: '0%',
                  opacity: [0, 0.9, 0.85],
                  scale: 2,
                }}
                transition={{ 
                  duration: 0.6,
                  delay: 0.1 + i * 0.1,
                  ease: [0.87, 0, 0.13, 1],
                }}
                style={{
                  width: '200%',
                  height: '200%',
                  left: '-50%',
                  top: '-50%',
                  transform: `rotate(${45 + i * 90}deg)`,
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 20%, rgba(240,240,240,0.4) 35%, rgba(220,220,220,0.6) 50%, rgba(240,240,240,0.4) 65%, rgba(255,255,255,0.1) 80%, transparent 100%)',
                  filter: 'blur(2px)',
                  mixBlendMode: 'screen',
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Violent collision at center with multiple layers */}
      <AnimatePresence>
        {(stage === 'violent-clash' || stage === 'explosion') && (
          <>
            {/* Inner explosion */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: stage === 'explosion' ? [1, 4, 5] : [0, 1.5],
                opacity: stage === 'explosion' ? [1, 0.95, 0] : [0, 1],
              }}
              transition={{ 
                duration: stage === 'explosion' ? 0.3 : 0.3,
                ease: stage === 'explosion' ? [0.87, 0, 0.13, 1] : 'easeOut',
              }}
            >
              <div 
                className="w-[200vw] h-[200vh]"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(250,250,250,0.98) 15%, rgba(240,240,240,0.9) 30%, rgba(220,220,220,0.7) 45%, rgba(180,180,180,0.4) 60%, transparent 80%)',
                  filter: 'blur(4px)',
                }}
              >
                <svg className="absolute inset-0 w-full h-full">
                  <defs>
                    <filter id="explosion-texture">
                      <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="8" seed="999" />
                      <feDisplacementMap in="SourceGraphic" scale="150" />
                    </filter>
                  </defs>
                  <rect width="100%" height="100%" fill="white" filter="url(#explosion-texture)" opacity="0.8" />
                </svg>
              </div>
            </motion.div>

            {/* Multiple impact rings */}
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={`ring-${i}`}
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: stage === 'explosion' ? [0.5 + i * 0.2, 3 + i * 0.5] : [0, 1 + i * 0.3],
                  opacity: [0, 0.8, 0],
                }}
                transition={{ 
                  duration: 0.5 + i * 0.08,
                  delay: i * 0.04,
                  ease: 'easeOut',
                }}
              >
                <div 
                  className="w-screen h-screen rounded-full border-white"
                  style={{
                    borderWidth: `${4 + i * 2}px`,
                    filter: 'blur(1px)',
                    opacity: 0.6 - i * 0.1,
                  }}
                />
              </motion.div>
            ))}

            {/* Splatter particles */}
            {Array.from({ length: 30 }).map((_, i) => {
              const angle = (i / 30) * Math.PI * 2;
              const distance = 30 + Math.random() * 40;
              return (
                <motion.div
                  key={`splatter-${i}`}
                  className="absolute left-1/2 top-1/2 bg-white rounded-full"
                  initial={{ 
                    x: 0,
                    y: 0,
                    scale: 0,
                    opacity: 0,
                  }}
                  animate={{ 
                    x: Math.cos(angle) * distance + 'vw',
                    y: Math.sin(angle) * distance + 'vh',
                    scale: [0, 1, 0.8, 0],
                    opacity: [0, 0.9, 0.7, 0],
                  }}
                  transition={{ 
                    duration: 0.6,
                    delay: 0.2 + Math.random() * 0.15,
                    ease: 'easeOut',
                  }}
                  style={{
                    width: `${10 + Math.random() * 30}px`,
                    height: `${10 + Math.random() * 30}px`,
                    filter: 'blur(1px)',
                  }}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* White flash background */}
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: stage === 'explosion' ? 1 : 
                   stage === 'white' || stage === 'text' ? 1 : 0 
        }}
        transition={{ 
          duration: stage === 'explosion' ? 0.1 : 0.3,
          ease: 'easeOut',
        }}
      />

      {/* Residual ink splatter on white */}
      <AnimatePresence>
        {stage === 'white' && (
          <>
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`residual-${i}`}
                className="absolute"
                initial={{ opacity: 0.6, scale: 1 }}
                animate={{ opacity: 0, scale: 1.2 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                  width: `${50 + Math.random() * 150}px`,
                  height: `${50 + Math.random() * 150}px`,
                }}
              >
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <defs>
                    <filter id={`splatter-filter-${i}`}>
                      <feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="4" seed={i * 50} />
                      <feDisplacementMap in="SourceGraphic" scale="20" />
                    </filter>
                  </defs>
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="black" 
                    opacity="0.2"
                    filter={`url(#splatter-filter-${i})`}
                  />
                </svg>
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Text emergence */}
      <AnimatePresence>
        {stage === 'text' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              {/* Ink brush stroke behind text */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 0.08 }}
                transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
              >
                <div 
                  className="w-[80%] h-32 bg-black rounded-full"
                  style={{ filter: 'blur(20px)' }}
                />
              </motion.div>

              {/* Main title with ink emergence effect */}
              <motion.h1
                className="text-black mb-6 relative"
                initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.43, 0.13, 0.23, 0.96],
                }}
                style={{
                  fontSize: 'clamp(3.5rem, 12vw, 10rem)',
                  fontWeight: 900,
                  letterSpacing: '0.02em',
                  lineHeight: 0.9,
                  filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.15))',
                }}
              >
                Eサミット
              </motion.h1>

              {/* Subtitle with brush stroke effect */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -100, rotate: -5 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  rotate: [0, 2, -1, 0],
                }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.4 },
                  x: { duration: 0.6, delay: 0.4, ease: [0.43, 0.13, 0.23, 0.96] },
                  rotate: { 
                    duration: 0.6, 
                    delay: 0.7,
                    ease: 'easeInOut',
                  },
                }}
              >
                {/* Underline brush stroke */}
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-black"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.9, ease: 'easeInOut' }}
                  style={{
                    transformOrigin: 'left',
                    filter: 'blur(0.5px)',
                    opacity: 0.3,
                  }}
                />
                
                <p
                  className="text-black relative"
                  style={{
                    fontSize: 'clamp(1.8rem, 5vw, 4rem)',
                    fontWeight: 600,
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                  }}
                >
                  IIITN
                </p>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Skip button */}
      <motion.button
        onClick={skipIntro}
        className="absolute bottom-8 right-8 px-6 py-3 rounded transition-all duration-300 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          fontSize: '1rem',
          fontWeight: 600,
          letterSpacing: '0.05em',
          backgroundColor: stage === 'white' || stage === 'text' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
          color: stage === 'white' || stage === 'text' ? 'black' : 'white',
          backdropFilter: 'blur(10px)',
        }}
      >
        Skip Intro
      </motion.button>
    </div>
  );
}
