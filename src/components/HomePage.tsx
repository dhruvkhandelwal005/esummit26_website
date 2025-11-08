import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import Navbar from './Navbar';
import AnimatedCursor from './AnimatedCursor';
import { AnimatedGrid, MorphingBlob, FloatingParticles, AnimatedLines } from './AnimatedBackground';
import { GlitchText, ScrambleText } from './GlitchText';
import { 
  LiquidMorph, 
  RippleCard, 
  ParallaxLayer,
  Card3D,
  StaggerReveal,
  TextWave,
  InfiniteMarquee,
  MorphingSVG,
  SpotlightCard,
  CountUp,
  Magnetic,
  PerspectiveScroll,
  AuroraBackground,
  Typewriter,
  LightBeam,
  ZoomImage,
} from './AdvancedAnimations';
import { 
  ChevronDown, Calendar, Users, Award, MapPin, Sparkles, Zap, 
  Target, TrendingUp, Lightbulb, Rocket, Clock, Mail, Phone, 
  Instagram, Linkedin, Twitter, ArrowRight, Star
} from 'lucide-react';

// Advanced Text Reveal Component
function TextReveal({ children, className = '' }: { children: string; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const words = children.split(' ');

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 50, filter: 'blur(10px)', rotateX: -90 }}
          animate={isInView ? { 
            opacity: 1, 
            y: 0,
            filter: 'blur(0px)',
            rotateX: 0,
          } : { 
            opacity: 0, 
            y: 50,
            filter: 'blur(10px)',
            rotateX: -90,
          }}
          transition={{
            duration: 0.8,
            delay: i * 0.1,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// Character-by-character reveal
function CharReveal({ children, className = '' }: { children: string; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.8 });
  const chars = children.split('');

  return (
    <span ref={ref} className={className}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20, scale: 0.5 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.5 }}
          transition={{
            duration: 0.5,
            delay: i * 0.03,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

// Floating sakura petal
function SakuraPetal({ delay, duration, startX }: { delay: number; duration: number; startX: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{ 
        x: `${startX}vw`,
        y: -50,
        rotate: 0,
        opacity: 0,
      }}
      animate={{ 
        x: `${startX + (Math.random() * 20 - 10)}vw`,
        y: '110vh',
        rotate: 360 * 3,
        opacity: [0, 0.6, 0.6, 0],
      }}
      transition={{ 
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 0C8 0 5 5 8 8C11 5 8 0 8 0Z" fill="#ffb6c1" opacity="0.8" />
        <path d="M8 16C8 16 5 11 8 8C11 11 8 16 8 16Z" fill="#ffc0cb" opacity="0.8" />
      </svg>
    </motion.div>
  );
}

// Apple-style Scroll Card
function ScrollCard({ 
  title, 
  description, 
  image, 
  index 
}: { 
  title: string; 
  description: string; 
  image: string; 
  index: number;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, y }}
      className="sticky top-32 mx-auto max-w-6xl mb-20"
    >
      <Card3D>
        <motion.div 
          className="bg-white/5 backdrop-blur-xl rounded-[3rem] overflow-hidden shadow-2xl border border-white/10"
          style={{ rotate }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-16 flex flex-col justify-center relative">
              <LightBeam angle={135} />
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.8 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <GlitchText>
                  <h3 className="text-white mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900 }}>
                    {title}
                  </h3>
                </GlitchText>
                <p className="text-white/80" style={{ fontSize: '1.2rem', lineHeight: 1.9 }}>
                  <Typewriter text={description} speed={30} />
                </p>
              </motion.div>
            </div>
            <motion.div 
              className="relative h-[500px] md:h-auto overflow-hidden"
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
            >
              <ZoomImage src={image} alt={title} />
            </motion.div>
          </div>
        </motion.div>
      </Card3D>
    </motion.div>
  );
}

// 3D Event Card with Advanced Effects
function EventCard3D({ 
  title, 
  jp, 
  description, 
  icon: Icon, 
  color,
  index 
}: { 
  title: string; 
  jp: string;
  description: string; 
  icon: any; 
  color: string;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <LiquidMorph delay={index * 0.1}>
      <SpotlightCard>
        <RippleCard className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 h-full">
          <motion.div
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Icon with 3D effect */}
            <Magnetic strength={0.2}>
              <motion.div
                className={`inline-flex p-6 bg-gradient-to-br ${color} rounded-2xl mb-6 shadow-2xl`}
                animate={{ 
                  scale: isHovered ? 1.15 : 1,
                  rotate: isHovered ? [0, -5, 5, -5, 0] : 0,
                }}
                transition={{ duration: 0.6 }}
              >
                <Icon className="w-10 h-10 text-white" />
              </motion.div>
            </Magnetic>

            {/* Content */}
            <motion.p 
              className="text-white/70 text-sm mb-2 font-semibold"
              animate={{ x: isHovered ? 5 : 0 }}
            >
              {jp}
            </motion.p>
            <h3 className="text-white mb-4" style={{ fontSize: '1.7rem', fontWeight: 900 }}>
              <TextWave text={title} />
            </h3>
            <p className="text-white/70 mb-6" style={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
              {description}
            </p>

            {/* Arrow with magnetic effect */}
            <motion.div
              className="flex items-center gap-2 text-red-400 font-bold"
              animate={{ x: isHovered ? 8 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <span>Learn More</span>
              <motion.div
                animate={{ x: isHovered ? [0, 5, 0] : 0 }}
                transition={{ duration: 0.8, repeat: isHovered ? Infinity : 0 }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.div>
          </motion.div>
        </RippleCard>
      </SpotlightCard>
    </LiquidMorph>
  );
}

// Magnetic Button Component
function MagneticButton({ children, className = '', onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <Magnetic strength={0.4}>
      <motion.button
        className={className}
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        {children}
      </motion.button>
    </Magnetic>
  );
}

export default function HomePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.8]);
  const heroY = useTransform(smoothProgress, [0, 0.2], [0, -100]);

  const backgroundColor = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ['#000000', '#0a0000', '#000a0a', '#0a000a', '#000000']
  );

  const events = [
    {
      title: 'Startup Pitch Battle',
      jp: 'スタートアップピッチ',
      description: 'Present your ideas to top investors and win seed funding for your startup journey.',
      icon: Rocket,
      color: 'from-red-500 to-orange-500',
    },
    {
      title: 'Innovation Workshop',
      jp: 'イノベーション',
      description: 'Learn from industry experts in hands-on sessions covering latest technologies.',
      icon: Lightbulb,
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Keynote Sessions',
      jp: '基調講演',
      description: 'Inspiring talks from successful entrepreneurs who have built unicorns.',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Hackathon',
      jp: 'ハッカソン',
      description: '48-hour coding marathon with exciting prizes and mentorship opportunities.',
      icon: Zap,
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const scrollCards = [
    {
      title: 'Learn from the Best',
      description: 'Connect with industry leaders, successful entrepreneurs, and investors who have built billion-dollar companies.',
      image: 'https://images.unsplash.com/photo-1652731775419-ccf6104e3aa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3JpaSUyMGdhdGUlMjBzdW5zZXR8ZW58MXx8fHwxNzYyNDI4Mjc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'Build Your Network',
      description: 'Meet 1000+ like-minded individuals, potential co-founders, and create lasting professional relationships.',
      image: 'https://images.unsplash.com/photo-1722058003893-141e36097e0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGdhcmRlbiUyMHplbnxlbnwxfHx8fDE3NjIzOTA5MTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'Win Big Prizes',
      description: 'Compete in various events and competitions with a total prize pool of over ₹10 lakhs to kickstart your venture.',
      image: 'https://images.unsplash.com/photo-1583915223588-7d88ebf23414?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMHNreWxpbmUlMjBuaWdodHxlbnwxfHx8fDE3NjI0Mjg3NDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const sponsors = [
    { name: 'Sponsor 1', logo: '🚀' },
    { name: 'Sponsor 2', logo: '⚡' },
    { name: 'Sponsor 3', logo: '💡' },
    { name: 'Sponsor 4', logo: '🎯' },
    { name: 'Sponsor 5', logo: '🌟' },
  ];

  return (
    <motion.div 
      ref={containerRef}
      className="w-full min-h-screen overflow-x-hidden relative"
      style={{ backgroundColor }}
    >
      <AnimatedCursor />
      <Navbar />

      {/* Global Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <AuroraBackground />
        <MorphingBlob color="red" delay={0} />
        <MorphingBlob color="purple" delay={5} />
        <FloatingParticles />
        <AnimatedGrid />
        <MorphingSVG />
      </div>

      {/* Floating Sakura Petals */}
      <div className="fixed inset-0 pointer-events-none z-40">
        {Array.from({ length: 30 }).map((_, i) => (
          <SakuraPetal
            key={i}
            delay={i * 0.8}
            duration={15 + Math.random() * 10}
            startX={Math.random() * 100}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatedLines />

        {/* Parallax background */}
        <ParallaxLayer speed={0.3} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black z-10" />
          <motion.div
            style={{
              scale: useTransform(scrollYProgress, [0, 0.5], [1, 1.3]),
            }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1713374565634-e093f0b5d787?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudCUyMGZ1amklMjBjaGVycnklMjBibG9zc29tfGVufDF8fHx8MTc2MjQyODc0Mnww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Mount Fuji"
              className="w-full h-screen object-cover opacity-40"
            />
          </motion.div>
        </ParallaxLayer>

        {/* Content */}
        <motion.div
          className="relative z-20 text-center px-6 max-w-7xl mx-auto"
          style={{ 
            opacity: heroOpacity,
            scale: heroScale,
            y: heroY,
          }}
        >
          {/* Badge */}
          <LiquidMorph delay={0.3}>
            <motion.div
              className="mb-12"
              whileHover={{ scale: 1.1 }}
            >
              <div className="inline-flex items-center gap-3 px-10 py-5 bg-white/5 backdrop-blur-2xl rounded-full border border-white/10 shadow-2xl">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-6 h-6 text-red-400" />
                </motion.div>
                <span className="text-white/90" style={{ fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.2em' }}>
                  JANUARY 15-17, 2026
                </span>
              </div>
            </motion.div>
          </LiquidMorph>

          {/* Title */}
          <div className="mb-8">
            <motion.h1
              className="text-white mb-6"
              style={{
                fontSize: 'clamp(5rem, 20vw, 16rem)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 0.85,
                textShadow: '0 0 100px rgba(220,38,38,0.6)',
              }}
            >
              <CharReveal>E-SUMMIT</CharReveal>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 1.5 }}
            >
              <GlitchText className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-400 to-purple-400" 
                style={{
                  fontSize: 'clamp(3rem, 10vw, 7rem)',
                  fontWeight: 900,
                  letterSpacing: '0.3em',
                }}>
                Eサミット
              </GlitchText>
            </motion.div>
          </div>

          {/* Subtitle */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, filter: 'blur(20px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 2, delay: 2 }}
          >
            <p className="text-white/80 max-w-4xl mx-auto" style={{ fontSize: 'clamp(1.3rem, 3.5vw, 2.5rem)', fontWeight: 300, lineHeight: 1.6 }}>
              <ScrambleText>Where Innovation Meets Tradition</ScrambleText>
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-8 justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.5 }}
          >
            <MagneticButton
              className="relative px-14 py-7 bg-gradient-to-r from-red-600 via-pink-600 to-red-600 text-white rounded-full overflow-hidden group shadow-2xl"
              style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '0.05em' }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white via-white to-white"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.8 }}
                style={{ opacity: 0.2 }}
              />
              <span className="relative z-10 flex items-center gap-3">
                Register Now
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </MagneticButton>

            <MagneticButton
              className="px-14 py-7 bg-white/5 backdrop-blur-xl text-white rounded-full border-2 border-white/20 shadow-2xl"
              style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '0.05em' }}
            >
              View Schedule
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-3"
          >
            <p className="text-white/50 text-xs tracking-[0.4em] uppercase">Scroll</p>
            <ChevronDown className="w-8 h-8 text-white/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* Cinematic Text Section */}
      <section className="relative py-32 px-6">
        <PerspectiveScroll>
          <div className="max-w-7xl mx-auto text-center">
            <motion.h2
              className="text-white"
              style={{
                fontSize: 'clamp(3rem, 10vw, 9rem)',
                fontWeight: 900,
                lineHeight: 1.15,
              }}
            >
              <TextReveal>
                The future belongs to those who create it
              </TextReveal>
            </motion.h2>
          </div>
        </PerspectiveScroll>
      </section>

      {/* Scroll Cards */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-white mb-6" style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)', fontWeight: 900 }}>
              <GlitchText>Why Attend?</GlitchText>
            </h2>
            <p className="text-white/60" style={{ fontSize: 'clamp(1.3rem, 3vw, 2.2rem)', fontWeight: 400, letterSpacing: '0.2em' }}>
              なぜ参加するのか
            </p>
          </motion.div>

          {scrollCards.map((card, index) => (
            <ScrollCard
              key={index}
              title={card.title}
              description={card.description}
              image={card.image}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <StaggerReveal staggerDelay={0.15}>
            {[
              { value: 1000, suffix: '+', label: 'Participants', jp: '参加者' },
              { value: 30, suffix: '+', label: 'Events', jp: 'イベント' },
              { value: 20, suffix: '+', label: 'Speakers', jp: 'スピーカー' },
              { value: 10, suffix: 'L+', label: 'Prizes', jp: '賞金' },
            ].map((stat, i) => (
              <div key={i} className="text-center mb-16">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 mb-4" 
                    style={{ fontSize: 'clamp(4rem, 12vw, 8rem)', fontWeight: 900 }}>
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </h3>
                  <p className="text-red-400 mb-2" style={{ fontSize: '1rem', fontWeight: 600, letterSpacing: '0.25em' }}>
                    {stat.jp}
                  </p>
                  <p className="text-white/80" style={{ fontSize: '1.4rem', fontWeight: 700, letterSpacing: '0.15em' }}>
                    {stat.label}
                  </p>
                </motion.div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-white mb-6" style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)', fontWeight: 900 }}>
              <GlitchText>Featured Events</GlitchText>
            </h2>
            <p className="text-red-400" style={{ fontSize: 'clamp(1.3rem, 3vw, 2.2rem)', fontWeight: 600, letterSpacing: '0.25em' }}>
              主要イベント
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {events.map((event, index) => (
              <EventCard3D
                key={index}
                title={event.title}
                jp={event.jp}
                description={event.description}
                icon={event.icon}
                color={event.color}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors Marquee */}
      <section className="relative py-20">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-white mb-4" style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 900 }}>
            <GlitchText>Our Partners</GlitchText>
          </h2>
        </motion.div>

        <InfiniteMarquee items={sponsors.map((sponsor, i) => (
          <motion.div
            key={i}
            className="flex items-center justify-center w-64 h-32 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10"
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
          >
            <span style={{ fontSize: '4rem' }}>{sponsor.logo}</span>
          </motion.div>
        ))} speed={60} />
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-white mb-6" style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)', fontWeight: 900 }}>
              <GlitchText>Gallery</GlitchText>
            </h2>
            <p className="text-red-400" style={{ fontSize: 'clamp(1.3rem, 3vw, 2.2rem)', fontWeight: 600, letterSpacing: '0.25em' }}>
              ギャラリー
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              "https://images.unsplash.com/photo-1583915223588-7d88ebf23414?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMHNreWxpbmUlMjBuaWdodHxlbnwxfHx8fDE3NjI0Mjg3NDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
              "https://images.unsplash.com/photo-1718621460033-c89dfec8dd1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW1ib28lMjBmb3Jlc3QlMjBqYXBhbnxlbnwxfHx8fDE3NjI0MjgyODB8MA&ixlib=rb-4.1.0&q=80&w=1080",
              "https://images.unsplash.com/photo-1631607663132-6f628d24284e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGxhbnRlcm5zJTIwbmlnaHR8ZW58MXx8fHwxNzYyNDI4Mjc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
              "https://images.unsplash.com/photo-1557409518-691ebcd96038?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVycnklMjBibG9zc29tJTIwamFwYW58ZW58MXx8fHwxNzYyNDIzMTc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
              "https://images.unsplash.com/photo-1707317418066-cfaea52000e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGFyY2hpdGVjdHVyZSUyMG1vZGVybnxlbnwxfHx8fDE3NjIzNDQwNzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
              "https://images.unsplash.com/flagged/photo-1565080636132-56952ee2861c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHRlYSUyMGNlcmVtb255fGVufDF8fHx8MTc2MjQwNTI0NXww&ixlib=rb-4.1.0&q=80&w=1080",
            ].map((src, index) => (
              <LiquidMorph key={index} delay={index * 0.15}>
                <SpotlightCard>
                  <motion.div
                    className="relative aspect-square rounded-3xl overflow-hidden group"
                    whileHover={{ scale: 1.05, zIndex: 10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ZoomImage src={src} alt={`Gallery ${index + 1}`} />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </SpotlightCard>
              </LiquidMorph>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0">
          {Array.from({ length: 150 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-red-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 2, 0],
                y: [0, -150, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                delay: Math.random() * 4,
                repeat: Infinity,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <PerspectiveScroll>
            <motion.h2
              className="text-white mb-16"
              style={{
                fontSize: 'clamp(3.5rem, 12vw, 10rem)',
                fontWeight: 900,
                lineHeight: 1.05,
                textShadow: '0 0 120px rgba(220,38,38,1)',
              }}
            >
              <GlitchText>Begin Your Journey</GlitchText>
            </motion.h2>

            <motion.p
              className="text-white/80 mb-20 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{ fontSize: 'clamp(1.3rem, 3vw, 2.2rem)', lineHeight: 1.8 }}
            >
              あなたの旅を始めよう • Join 1000+ innovators
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 1 }}
            >
              <MagneticButton
                className="px-24 py-10 bg-white text-black rounded-full shadow-2xl relative overflow-hidden group"
                style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: 900,
                  boxShadow: '0 0 150px rgba(255,255,255,1)',
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-600 via-pink-600 to-purple-600"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 2.5, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                />
                <span className="relative z-10 group-hover:text-white transition-colors flex items-center gap-4">
                  Register for E-Summit 2026
                  <motion.span
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </MagneticButton>
            </motion.div>
          </PerspectiveScroll>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-24 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-16 mb-16">
            <div className="md:col-span-2">
              <motion.h3 
                className="mb-6 text-white" 
                style={{ fontSize: '2.5rem', fontWeight: 900 }}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
              >
                <GlitchText>Eサミット IIITN</GlitchText>
              </motion.h3>
              <p className="text-white/60 mb-8" style={{ fontSize: '1.1rem', lineHeight: 1.9 }}>
                Where Innovation Meets Tradition
              </p>
              <div className="flex gap-5">
                {[Instagram, Linkedin, Twitter, Mail].map((Icon, i) => (
                  <Magnetic key={i} strength={0.3}>
                    <motion.a
                      href="#"
                      className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors border border-white/10"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.a>
                  </Magnetic>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-6 text-white" style={{ fontSize: '1.3rem', fontWeight: 700 }}>Quick Links</h4>
              <ul className="space-y-3">
                {['About', 'Events', 'Speakers', 'Gallery'].map((item, i) => (
                  <motion.li 
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <a href={`#${item.toLowerCase()}`} className="text-white/60 hover:text-red-400 transition-colors text-lg">
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-6 text-white" style={{ fontSize: '1.3rem', fontWeight: 700 }}>Contact</h4>
              <ul className="space-y-4 text-white/60">
                <li className="text-base">esummit@iiitn.ac.in</li>
                <li className="text-base">+91 XXXXX XXXXX</li>
                <li className="text-base">IIITN Campus</li>
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-white/10 text-center text-white/40">
            <p>© 2026 E-Summit IIITN. All rights reserved. • 令和8年</p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
