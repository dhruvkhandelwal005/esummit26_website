import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Zap } from 'lucide-react';

export default function JapaneseGameIntro({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 100),      // Gates slide in
      setTimeout(() => setStage(2), 800),      // Gates start opening
      setTimeout(() => setStage(3), 1800),     // Rush forward begins
      setTimeout(() => setStage(4), 2400),     // Smooth flash transition
      setTimeout(() => setStage(5), 2800),     // Logo appears
      setTimeout(() => setStage(6), 3600),     // Japanese text
      setTimeout(() => setStage(7), 4500),     // Final glow
      setTimeout(() => setStage(8), 4900),     // Fade to white
      setTimeout(() => onComplete(), 5000),
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        willChange: 'opacity',
        backfaceVisibility: 'hidden',
        perspective: 1000,
      }}
    >
      {/* Dynamic Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundColor: 
            stage === 0 ? '#000000' :
            stage === 1 ? '#000000' :
            stage === 2 ? '#000000' :
            stage === 3 ? '#050000' :
            stage === 4 ? '#0a0000' :
            stage === 5 ? '#000000' :
            stage === 6 ? '#050000' :
            stage === 7 ? '#0a0000' :
            stage >= 8 ? '#ffffff' : '#000000',
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        style={{
          willChange: 'background-color',
        }}
      />

      {/* Opening Gates - Japanese Temple Style */}
      <AnimatePresence mode="wait">
        {stage >= 1 && stage < 4 && (
          <>
            {/* Left Gate */}
            <motion.div
              className="absolute inset-y-0 left-0 w-1/2"
              style={{
                background: 'linear-gradient(to right, #000000 0%, #450a0a 50%, #000000 100%)',
                boxShadow: 'inset -40px 0 60px rgba(220,38,38,0.3)',
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
              }}
              initial={{ x: '-100%' }}
              animate={{ 
                x: stage >= 2 ? 0 : '-100%',
              }}
              exit={{ 
                x: '-100%',
                opacity: 0,
              }}
              transition={{ 
                x: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.5, ease: 'easeInOut' },
              }}
            >
              {/* Gate Pattern - Simplified */}
              <div className="absolute inset-0 opacity-40">
                <div className="w-full h-full" style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 100px, rgba(220,38,38,0.2) 100px, rgba(220,38,38,0.2) 102px)',
                }} />
              </div>

              {/* Japanese Characters on Left Gate */}
              <motion.div
                className="absolute top-1/2 right-20 -translate-y-1/2 text-white/90"
                initial={{ opacity: 0, y: 30 }}
                animate={{ 
                  opacity: stage >= 2 ? 1 : 0,
                  y: stage >= 2 ? 0 : 30,
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{
                  fontSize: 'clamp(3rem, 8vw, 8rem)',
                  fontWeight: 900,
                  writingMode: 'vertical-rl',
                  textOrientation: 'upright',
                  letterSpacing: '0.5em',
                  textShadow: '0 0 30px rgba(220,38,38,1), 0 0 50px rgba(220,38,38,0.5)',
                  willChange: 'transform, opacity',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)',
                }}
              >
                革新
              </motion.div>

              {/* Red Glow Edge */}
              <div 
                className="absolute inset-y-0 right-0 w-24"
                style={{
                  background: 'linear-gradient(to right, transparent, rgba(220,38,38,0.4))',
                  filter: 'blur(15px)',
                  willChange: 'opacity',
                }}
              />
            </motion.div>

            {/* Right Gate */}
            <motion.div
              className="absolute inset-y-0 right-0 w-1/2"
              style={{
                background: 'linear-gradient(to left, #000000 0%, #450a0a 50%, #000000 100%)',
                boxShadow: 'inset 40px 0 60px rgba(220,38,38,0.3)',
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
              }}
              initial={{ x: '100%' }}
              animate={{ 
                x: stage >= 2 ? 0 : '100%',
              }}
              exit={{ 
                x: '100%',
                opacity: 0,
              }}
              transition={{ 
                x: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.5, ease: 'easeInOut' },
              }}
            >
              {/* Gate Pattern - Simplified */}
              <div className="absolute inset-0 opacity-40">
                <div className="w-full h-full" style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 100px, rgba(220,38,38,0.2) 100px, rgba(220,38,38,0.2) 102px)',
                }} />
              </div>

              {/* Japanese Characters on Right Gate */}
              <motion.div
                className="absolute top-1/2 left-20 -translate-y-1/2 text-white/90"
                initial={{ opacity: 0, y: 30 }}
                animate={{ 
                  opacity: stage >= 2 ? 1 : 0,
                  y: stage >= 2 ? 0 : 30,
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{
                  fontSize: 'clamp(3rem, 8vw, 8rem)',
                  fontWeight: 900,
                  writingMode: 'vertical-rl',
                  textOrientation: 'upright',
                  letterSpacing: '0.5em',
                  textShadow: '0 0 30px rgba(220,38,38,1), 0 0 50px rgba(220,38,38,0.5)',
                  willChange: 'transform, opacity',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)',
                }}
              >
                伝統
              </motion.div>

              {/* Red Glow Edge */}
              <div 
                className="absolute inset-y-0 left-0 w-24"
                style={{
                  background: 'linear-gradient(to left, transparent, rgba(220,38,38,0.4))',
                  filter: 'blur(15px)',
                  willChange: 'opacity',
                }}
              />
            </motion.div>




          </>
        )}
      </AnimatePresence>

      {/* Rush Forward Tunnel Effect - Optimized */}
      <AnimatePresence mode="wait">
        {stage >= 3 && stage < 5 && (
          <>
            {/* Perspective Grid Lines - Reduced Count */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              style={{
                willChange: 'opacity',
              }}
            >
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
                {Array.from({ length: 12 }).map((_, i) => {
                  const progress = i / 12;
                  const size = 150 + progress * 850;
                  
                  return (
                    <motion.rect
                      key={i}
                      x={(1000 - size) / 2}
                      y={(1000 - size) / 2}
                      width={size}
                      height={size}
                      fill="none"
                      stroke="rgba(220,38,38,0.6)"
                      strokeWidth={2}
                      initial={{ opacity: 0, scale: 3 }}
                      animate={{ 
                        opacity: [0, 0.8, 0],
                        scale: [3, 0.3],
                      }}
                      transition={{ 
                        duration: 0.6,
                        delay: i * 0.03,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      style={{
                        willChange: 'transform, opacity',
                      }}
                    />
                  );
                })}
              </svg>
            </motion.div>

            {/* Speed Lines - Optimized */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.6] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              style={{
                willChange: 'opacity',
              }}
            >
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000">
                {Array.from({ length: 24 }).map((_, i) => {
                  const angle = (i / 24) * 360;
                  const x1 = 500 + Math.cos((angle * Math.PI) / 180) * 100;
                  const y1 = 500 + Math.sin((angle * Math.PI) / 180) * 100;
                  const x2 = 500 + Math.cos((angle * Math.PI) / 180) * 1200;
                  const y2 = 500 + Math.sin((angle * Math.PI) / 180) * 1200;
                  
                  return (
                    <motion.line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={i % 3 === 0 ? '#dc2626' : i % 3 === 1 ? '#f97316' : '#ffffff'}
                      strokeWidth={2}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: 1,
                        opacity: [0, 0.8, 0.4],
                      }}
                      transition={{ 
                        duration: 0.5,
                        delay: i * 0.012,
                        ease: 'easeOut',
                      }}
                      style={{
                        willChange: 'opacity',
                      }}
                    />
                  );
                })}
              </svg>
            </motion.div>

            {/* Center Energy Build */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.5, 2],
                opacity: [0, 1, 0.6],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{
                willChange: 'transform, opacity',
              }}
            >
              <div 
                className="w-[400px] h-[400px] rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(220,38,38,0.6) 30%, transparent 70%)',
                  filter: 'blur(30px)',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)',
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Smooth Flash Transition */}
      <AnimatePresence mode="wait">
        {stage >= 4 && stage < 5 && (
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0.2, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{
              willChange: 'opacity',
            }}
          />
        )}
      </AnimatePresence>

      {/* Film Grain Overlay - Lighter */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Scanlines - Subtle */}
      <AnimatePresence mode="wait">
        {stage >= 1 && stage < 8 && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.08 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              willChange: 'opacity',
            }}
          >
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.03) 3px, rgba(255,255,255,0.03) 4px)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Radial Energy Waves - Reduced */}
      <AnimatePresence mode="wait">
        {stage >= 4 && stage < 8 && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.4, 0] }}
                transition={{ duration: 1.5, delay: i * 0.3, ease: 'easeOut' }}
                style={{
                  willChange: 'opacity',
                }}
              >
                <motion.div
                  className="border-2 rounded-full"
                  style={{
                    borderColor: i % 2 === 0 ? 'rgba(220,38,38,0.4)' : 'rgba(251,191,36,0.4)',
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                  }}
                  initial={{ width: 0, height: 0 }}
                  animate={{ width: 700 + i * 150, height: 700 + i * 150 }}
                  transition={{ duration: 1.5, delay: i * 0.3, ease: 'easeOut' }}
                />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Particle Burst - Optimized */}
      <AnimatePresence mode="wait">
        {stage >= 4 && stage < 8 && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 60 }).map((_, i) => {
              const angle = (i / 60) * 360;
              const distance = 50 + Math.random() * 500;
              const endX = Math.cos((angle * Math.PI) / 180) * distance;
              const endY = Math.sin((angle * Math.PI) / 180) * distance;
              const size = 2 + Math.random() * 3;
              
              return (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 rounded-full"
                  style={{
                    width: size,
                    height: size,
                    background: i % 4 === 0 ? '#dc2626' : i % 4 === 1 ? '#f97316' : i % 4 === 2 ? '#fbbf24' : '#ffffff',
                    boxShadow: `0 0 ${size * 2}px currentColor`,
                    willChange: 'transform, opacity',
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                  }}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                  animate={{ 
                    x: endX, 
                    y: endY, 
                    opacity: [0, 1, 0.8, 0],
                    scale: [0, 1.2, 1, 0],
                  }}
                  transition={{ 
                    duration: 1.5,
                    delay: i * 0.008,
                    ease: 'easeOut',
                  }}
                />
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Lens Flares - Optimized */}
      <AnimatePresence mode="wait">
        {stage >= 5 && stage < 8 && (
          <>
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 60 + i * 50,
                  height: 60 + i * 50,
                  background: `radial-gradient(circle, rgba(255,255,255,${0.5 - i * 0.08}) 0%, transparent 60%)`,
                  left: `${30 + i * 10}%`,
                  top: `${40 + i * 6}%`,
                  filter: 'blur(15px)',
                  willChange: 'transform, opacity',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)',
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 0.7, 0.4],
                  scale: [0, 1.2, 1],
                }}
                transition={{ 
                  duration: 1,
                  delay: 0.2 + i * 0.15,
                  ease: 'easeOut',
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Main Logo Container */}
      <div className="relative z-10 text-center px-6 w-full">
        {/* "E-SUMMIT" Logo */}
        <AnimatePresence mode="wait">
          {stage >= 5 && (
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 1.8, y: -80 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
              }}
            >
              {/* Glow Layer */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  willChange: 'opacity',
                }}
              >
                <div
                  className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"
                  style={{
                    fontSize: 'clamp(7rem, 28vw, 24rem)',
                    fontWeight: 900,
                    letterSpacing: '-0.05em',
                    filter: 'blur(25px)',
                  }}
                >
                  E-SUMMIT
                </div>
              </motion.div>

              {/* Main Text */}
              <h1
                className="relative"
                style={{
                  fontSize: 'clamp(7rem, 28vw, 24rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.05em',
                  lineHeight: 0.85,
                }}
              >
                {['E', '-', 'S', 'U', 'M', 'M', 'I', 'T'].map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block relative"
                    initial={{ 
                      opacity: 0, 
                      y: -60,
                      scale: 0.7,
                    }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      scale: 1,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: 0.2 + i * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      color: '#ffffff',
                      textShadow: `
                        0 0 30px rgba(220,38,38,1),
                        0 0 60px rgba(220,38,38,0.6),
                        -4px -4px 0 #dc2626,
                        4px 4px 0 #991b1b,
                        -2px -2px 0 #ef4444,
                        2px 2px 0 #7f1d1d
                      `,
                      WebkitTextStroke: '3px #dc2626',
                      paintOrder: 'stroke fill',
                      willChange: 'transform, opacity',
                      backfaceVisibility: 'hidden',
                      transform: 'translateZ(0)',
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </h1>

              {/* Sparkle Effects - Reduced */}
              <div className="absolute inset-0 overflow-visible pointer-events-none">
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                      willChange: 'transform, opacity',
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 0.8, 0],
                      scale: [0, 1.3, 0],
                      rotate: [0, 180],
                    }}
                    transition={{
                      duration: 1.8,
                      delay: 0.6 + i * 0.2,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: 'easeInOut',
                    }}
                  >
                    {i % 3 === 0 ? (
                      <Sparkles className="w-6 h-6 text-yellow-300" />
                    ) : i % 3 === 1 ? (
                      <Zap className="w-6 h-6 text-orange-400" />
                    ) : (
                      <div className="w-2 h-2 bg-white rounded-full" style={{ boxShadow: '0 0 8px #fff' }} />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Japanese Subtitle */}
        <AnimatePresence mode="wait">
          {stage >= 6 && (
            <motion.div
              className="mt-12 relative"
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
              }}
            >
              {/* Glow background */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  willChange: 'opacity',
                }}
              >
                <div
                  className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400"
                  style={{
                    fontSize: 'clamp(3.5rem, 14vw, 10rem)',
                    fontWeight: 900,
                    letterSpacing: '0.3em',
                    filter: 'blur(20px)',
                  }}
                >
                  Eサミット
                </div>
              </motion.div>

              {/* Main Japanese text */}
              <div className="relative">
                <motion.div
                  style={{
                    fontSize: 'clamp(3.5rem, 14vw, 10rem)',
                    fontWeight: 900,
                    letterSpacing: '0.3em',
                  }}
                >
                  {['E', 'サ', 'ミ', 'ッ', 'ト'].map((char, i) => (
                    <motion.span
                      key={i}
                      className="inline-block"
                      initial={{ 
                        opacity: 0,
                        scale: 0.7,
                      }}
                      animate={{ 
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      style={{
                        color: '#ffffff',
                        textShadow: `
                          0 0 20px rgba(251,191,36,1),
                          0 0 40px rgba(251,191,36,0.5),
                          -2px -2px 0 #f97316,
                          2px 2px 0 #ea580c
                        `,
                        WebkitTextStroke: '2px #f97316',
                        willChange: 'transform, opacity',
                        backfaceVisibility: 'hidden',
                        transform: 'translateZ(0)',
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Animated underline */}
                <motion.div
                  className="absolute bottom-0 left-1/2 h-2 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, transparent, #dc2626, #f97316, #fbbf24, transparent)',
                    boxShadow: '0 0 15px rgba(220,38,38,0.6)',
                    willChange: 'width',
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0) translateX(-50%)',
                  }}
                  initial={{ width: 0, x: '-50%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
                />
              </div>

              {/* Tagline */}
              <motion.div
                className="mt-6 text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                style={{
                  fontSize: 'clamp(1.2rem, 4vw, 2.5rem)',
                  fontWeight: 700,
                  letterSpacing: '0.25em',
                  textShadow: '0 0 15px rgba(0,0,0,0.8), 0 0 25px rgba(220,38,38,0.4)',
                  willChange: 'opacity',
                }}
              >
                革新と伝統の出会い
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Final Glow Effect - Simplified */}
      <AnimatePresence mode="wait">
        {stage >= 7 && stage < 8 && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0.15] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            style={{
              willChange: 'opacity',
            }}
          >
            <div
              className="absolute rounded-full"
              style={{
                width: 600,
                height: 600,
                background: 'radial-gradient(circle, rgba(220,38,38,0.25) 0%, transparent 70%)',
                filter: 'blur(50px)',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final Smooth Fade to White */}
      <AnimatePresence mode="wait">
        {stage >= 8 && (
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              willChange: 'opacity',
            }}
          />
        )}
      </AnimatePresence>

      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, transparent 50%, rgba(0,0,0,0.5) 100%)',
        }}
      />
    </motion.div>
  );
}
