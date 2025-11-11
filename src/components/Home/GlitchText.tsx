import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function GlitchText({ children, className = '' }: { children: string; className?: string }) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <AnimatePresence>
        {isGlitching && (
          <>
            <motion.span
              className="absolute top-0 left-0 text-red-500"
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ 
                x: [-2, 2, -2, 2, 0],
                y: [1, -1, 2, -2, 0],
                opacity: [0.7, 0.5, 0.8, 0.6, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ clipPath: 'inset(0 0 50% 0)' }}
            >
              {children}
            </motion.span>
            <motion.span
              className="absolute top-0 left-0 text-cyan-500"
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ 
                x: [2, -2, 2, -2, 0],
                y: [-1, 1, -2, 2, 0],
                opacity: [0.7, 0.5, 0.8, 0.6, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ clipPath: 'inset(50% 0 0 0)' }}
            >
              {children}
            </motion.span>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ScrambleText({ children, className = '' }: { children: string; className?: string }) {
  const [displayText, setDisplayText] = useState(children);
  const chars = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ0123456789';

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        children
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return children[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= children.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [children]);

  return <span className={className}>{displayText}</span>;
}
