import { Calendar, Home, Info, Users, Feather } from "lucide-react";
import { motion } from "framer-motion";

interface NavbarProps {
  isVisible: boolean;
}

export default function Navbar({ isVisible }: NavbarProps) {
  const navItems = [
    { name: "Home", icon: <Home size={16} />, href: "#" },
    { name: "About", icon: <Info size={16} />, href: "#" },
    { name: "Events", icon: <Users size={16} />, href: "#" },
    { name: "Schedule", icon: <Calendar size={16} />, href: "#" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 mx-auto flex w-full items-center justify-between px-8 py-4 
                 backdrop-blur-md bg-white/5 border-b border-white/10 shadow-lg"
    >
      {/* Left Logo */}
      <div className="flex items-center gap-2 text-white font-light tracking-wide">
        <Feather size={18} />
        <div className="leading-tight">
          <p className="text-[12px] uppercase">E-Summit</p>
          <p className="text-sm font-semibold">2026–27</p>
        </div>
      </div>

      {/* Center Links */}
      <div className="flex gap-8 text-sm font-light text-gray-200">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="flex items-center gap-1 hover:text-white transition-all duration-300 hover:scale-105"
          >
            {item.icon}
            {item.name}
          </a>
        ))}
      </div>

      {/* Right Register Button */}
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href="#register"
        className="rounded-full border border-gray-400/40 px-4 py-1.5 text-sm text-gray-100 hover:bg-white/10 
                   transition-all duration-300 backdrop-blur-md"
      >
        Register
      </motion.a>
    </motion.nav>
  );
}
