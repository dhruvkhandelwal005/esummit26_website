import { ThemeProvider } from "./theme-provider"
import { SplashScreen } from "./splash-screen"
import { SakuraPetals } from "./sakura-petals"
import { AboutSection } from "./about-section"
import { JapaneseBg } from "./japanese-bg"
import { ToriiHero } from "./torii-hero"
import { EventStats } from "./event-stats"
import { EventHighlights } from "./event-highlights"
import { SocialLinks } from "./social-links"
import { ScrollNavbar } from "../Home/ScrollNavbar"

const sections = [
  {
    title: "About Esummit",
    description: "The Summit Experience",
    content: `Esummit is a prestigious annual entrepreneurship summit organized by IIIT Nagpur, bringing together innovators, founders, and visionaries from across the nation. This gathering celebrates the spirit of entrepreneurship and technological excellence, providing a platform for startups to showcase their ideas and connect with mentors, investors, and industry leaders. The summit fosters innovation, encourages bold thinking, and creates an ecosystem where dreams transform into reality.`,
  },
  {
    title: "About Udyam",
    description: "The Innovation Initiative",
    content: `Udyam is the entrepreneurship cell at IIIT Nagpur, dedicated to nurturing startup culture and fostering innovation among students. It serves as the incubation hub where students explore their entrepreneurial aspirations, develop business acumen, and learn the nuances of building successful ventures. Through workshops, mentorship programs, and networking events, Udyam empowers students to become the entrepreneurs and tech leaders of tomorrow.`,
  },
  {
    title: "About IIIT Nagpur",
    description: "Center of Excellence",
    content: `IIIT Nagpur stands as a beacon of technological excellence and innovation in central India. With its commitment to quality education, cutting-edge research, and industry collaboration, the institute has emerged as a leading institution in computer science and engineering. The campus is a vibrant hub of creativity where students and faculty collaborate on groundbreaking projects, contributing to the tech ecosystem and shaping the future of India's IT industry.`,
  },
]

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <main className="bg-background text-foreground">
        <div className="fixed top-0 left-0 right-0 z-50">
          <ScrollNavbar />
        </div>
        <JapaneseBg />
        <SplashScreen />
        <SakuraPetals />

        <ToriiHero />

        <EventHighlights />

        {sections.map((section, index) => (
          <AboutSection key={index} {...section} index={index} />
        ))}

        <EventStats />

        {/* Footer */}
        <footer className="py-16 px-6 text-center border-t border-[#2a2f4a] bg-gradient-to-b from-[#0a0e27] to-[#1a1f3a]/50">
          <div className="max-w-4xl mx-auto">
            <SocialLinks />
            <div className="mt-8 mb-4">
              <p className="text-[#b8b4a8] mb-2 text-lg font-semibold">Esummit 2026 © IIIT Nagpur</p>
              <p className="text-[#8b7d6b] text-sm">Sacred Gateway to Innovation</p>
            </div>
            <div className="mt-6 pt-6 border-t border-[#2a2f4a]">
              <p className="text-[#8b7d6b] text-xs">
                Organized by Udyam - Entrepreneurship Cell, IIIT Nagpur
              </p>
            </div>
          </div>
        </footer>
      </main>
    </ThemeProvider>
  )
}

export default App

