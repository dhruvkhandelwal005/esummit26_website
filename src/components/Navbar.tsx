import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', jp: 'ホーム', href: '#home' },
    { name: 'About', jp: 'について', href: '#about' },
    { name: 'Events', jp: 'イベント', href: '#events' },
    { name: 'Speakers', jp: 'スピーカー', href: '#speakers' },
    { name: 'Gallery', jp: 'ギャラリー', href: '#gallery' },
    { name: 'Team', jp: 'チーム', href: '#team' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled 
            ? 'bg-black/95 backdrop-blur-xl shadow-2xl border-b border-red-900/20' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
              className="flex items-center gap-3 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-red-600 to-pink-600 rounded-lg flex items-center justify-center shadow-lg"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-white tracking-wider" style={{ fontSize: '1.25rem', fontWeight: 900 }}>
                  Eサミット
                </h1>
                <p className="text-red-400 tracking-widest" style={{ fontSize: '0.7rem', fontWeight: 600 }}>
                  IIITN 2026
                </p>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                  className="group cursor-pointer relative"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <div className="text-center">
                    <p className="text-white/90 group-hover:text-red-400 transition-colors" 
                      style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em' }}>
                      {item.jp}
                    </p>
                    <p className="text-white group-hover:text-red-400 transition-colors" 
                      style={{ fontSize: '0.95rem', fontWeight: 700 }}>
                      {item.name}
                    </p>
                  </div>
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-pink-500"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Register Button */}
            <motion.button
              className="hidden md:block px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-full relative overflow-hidden group"
              style={{ fontSize: '0.95rem', fontWeight: 700, letterSpacing: '0.05em' }}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(220,38,38,0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-600 to-red-600"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Register Now</span>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[90] bg-black/98 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 pt-20">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                  className="text-center cursor-pointer"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ delay: index * 0.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <p className="text-red-400 mb-1" style={{ fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.2em' }}>
                    {item.jp}
                  </p>
                  <p className="text-white" style={{ fontSize: '1.8rem', fontWeight: 900 }}>
                    {item.name}
                  </p>
                </motion.a>
              ))}
              <motion.button
                className="mt-8 px-10 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-full"
                style={{ fontSize: '1.1rem', fontWeight: 700 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ delay: 0.6 }}
                whileTap={{ scale: 0.95 }}
              >
                Register Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
