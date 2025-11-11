import { motion } from "framer-motion"
import { Twitter, Instagram, Linkedin, Youtube, Facebook } from "lucide-react"

interface SocialLink {
  icon: React.ReactNode
  href: string
  label: string
}

const socialLinks: SocialLink[] = [
  { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
  { icon: <Instagram className="w-5 h-5" />, href: "#", label: "Instagram" },
  { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
  { icon: <Youtube className="w-5 h-5" />, href: "#", label: "YouTube" },
  { icon: <Facebook className="w-5 h-5" />, href: "#", label: "Facebook" },
]

export function SocialLinks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex gap-4 justify-center items-center"
    >
      {socialLinks.map((link, index) => (
        <motion.a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.2, y: -5 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 bg-[#1a1f3a]/60 backdrop-blur-sm border border-[#2a2f4a] rounded-full text-[#b8b4a8] hover:text-[#d81e5b] hover:border-[#d81e5b] transition-all duration-300"
          aria-label={link.label}
        >
          {link.icon}
        </motion.a>
      ))}
    </motion.div>
  )
}

