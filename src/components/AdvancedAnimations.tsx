import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'motion/react';

// Scroll-triggered Image Zoom
export function ZoomImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-3xl"
      style={{ opacity }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ scale }}
      />
    </motion.div>
  );
}

// Liquid Morph Transition
export function LiquidMorph({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ 
        clipPath: 'polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)',
        filter: 'blur(20px)',
      }}
      whileInView={{ 
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        filter: 'blur(0px)',
      }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{
        duration: 1.5,
        delay,
        ease: [0.76, 0, 0.24, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// Ripple Effect on Hover
export function RippleCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      whileHover="hover"
      initial="rest"
    >
      {children}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        variants={{
          rest: { scale: 0, opacity: 0 },
          hover: { scale: 2, opacity: [0, 0.3, 0] },
        }}
        transition={{ duration: 0.6 }}
        style={{
          background: 'radial-gradient(circle, rgba(220,38,38,0.3) 0%, transparent 70%)',
        }}
      />
    </motion.div>
  );
}

// Parallax Layer
export function ParallaxLayer({ 
  children, 
  speed = 0.5,
  className = '',
}: { 
  children: React.ReactNode; 
  speed?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 500]);

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}

// Rotating 3D Card
export function Card3D({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={ref}
      className={`transition-transform duration-300 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}

// Stagger Reveal
export function StaggerReveal({ 
  children,
  staggerDelay = 0.1,
}: { 
  children: React.ReactNode[];
  staggerDelay?: number;
}) {
  return (
    <>
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            duration: 0.8,
            delay: i * staggerDelay,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </>
  );
}

// Text Wave Animation
export function TextWave({ text, className = '' }: { text: string; className?: string }) {
  const letters = text.split('');

  return (
    <span className={className}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: 0 }}
          whileHover={{ y: -10 }}
          transition={{
            duration: 0.3,
            delay: i * 0.03,
            type: 'spring',
            stiffness: 300,
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  );
}

// Infinity Scroll Marquee
export function InfiniteMarquee({ 
  items, 
  speed = 50,
}: { 
  items: React.ReactNode[];
  speed?: number;
}) {
  return (
    <div className="relative overflow-hidden py-8">
      <motion.div
        className="flex gap-8"
        animate={{
          x: ['0%', '-100%'],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex-shrink-0">
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// Morphing SVG Background
export function MorphingSVG() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 1000 1000">
      <motion.path
        d="M 100 300 Q 250 100 400 300 T 700 300 Q 850 100 1000 300 L 1000 1000 L 100 1000 Z"
        fill="url(#gradient)"
        animate={{
          d: [
            "M 100 300 Q 250 100 400 300 T 700 300 Q 850 100 1000 300 L 1000 1000 L 100 1000 Z",
            "M 100 400 Q 250 200 400 400 T 700 400 Q 850 200 1000 400 L 1000 1000 L 100 1000 Z",
            "M 100 350 Q 250 150 400 350 T 700 350 Q 850 150 1000 350 L 1000 1000 L 100 1000 Z",
            "M 100 300 Q 250 100 400 300 T 700 300 Q 850 100 1000 300 L 1000 1000 L 100 1000 Z",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(220,38,38,0.3)" />
          <stop offset="100%" stopColor="rgba(236,72,153,0.3)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Spotlight Effect
export function SpotlightCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ref.current.style.setProperty('--mouse-x', `${x}px`);
    ref.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
    >
      {children}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(220,38,38,0.15), transparent 40%)',
        }}
      />
    </div>
  );
}

// Number Counter
export function CountUp({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const count = useSpring(0, { stiffness: 50, damping: 30 });

  if (isInView) {
    count.set(end);
  } else {
    count.set(0);
  }

  return (
    <motion.span ref={ref}>
      {count.get().toFixed(0)}{suffix}
    </motion.span>
  );
}

// Magnetic Element
export function Magnetic({ children, strength = 0.3 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) * strength;
    const y = (e.clientY - centerY) * strength;

    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0px, 0px)';
  };

  return (
    <div
      ref={ref}
      className="transition-transform duration-300 ease-out"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

// Perspective Scroll
export function PerspectiveScroll({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [45, 0, -45]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX,
        scale,
        opacity,
        transformPerspective: 1200,
      }}
    >
      {children}
    </motion.div>
  );
}

// Aurora Background
export function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-1/2 left-0 w-full h-full"
        style={{
          background: 'linear-gradient(90deg, rgba(220,38,38,0.3) 0%, rgba(236,72,153,0.3) 50%, rgba(139,92,246,0.3) 100%)',
          filter: 'blur(100px)',
        }}
        animate={{
          x: ['-50%', '50%', '-50%'],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}

// Typewriter Effect
export function Typewriter({ text, speed = 50 }: { text: string; speed?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  return (
    <span ref={ref}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: i * (speed / 1000), duration: 0 }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

// Beam of Light
export function LightBeam({ angle = 45 }: { angle?: number }) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.5, 0] }}
      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
    >
      <motion.div
        className="absolute h-full w-2"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.8), transparent)',
          transform: `rotate(${angle}deg)`,
          transformOrigin: 'top left',
        }}
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
}
