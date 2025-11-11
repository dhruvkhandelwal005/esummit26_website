import { motion } from "framer-motion"
import { ReactNode } from "react"

interface CTAButtonProps {
  children: ReactNode
  variant?: "primary" | "secondary" | "outline"
  onClick?: () => void
  href?: string
  className?: string
}

export function CTAButton({
  children,
  variant = "primary",
  onClick,
  href,
  className = "",
}: CTAButtonProps) {
  const baseClasses = "px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 relative overflow-hidden group"
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-[#d81e5b] to-[#ff6b9d] text-white hover:shadow-lg hover:shadow-[#d81e5b]/50 hover:scale-105",
    secondary: "bg-[#c19a6b] text-[#0a0e27] hover:bg-[#d4b18a] hover:scale-105",
    outline: "border-2 border-[#d81e5b] text-[#d81e5b] hover:bg-[#d81e5b] hover:text-white hover:scale-105",
  }

  const content = (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
      {variant === "primary" && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#ff6b9d] to-[#d81e5b] opacity-0 group-hover:opacity-100 transition-opacity"
          initial={false}
        />
      )}
    </motion.button>
  )

  if (href) {
    return (
      <a href={href} className="inline-block">
        {content}
      </a>
    )
  }

  return content
}

