import { useState, useEffect } from "react";
import JapaneseGameIntro from "./components/JapaneseGameIntro";
import { ToriiHero } from "./components/torii-hero";
import HomePage from "./components/HomePage";
import { ScrollNavbar } from "./components/ScrollNavbar";
import Lenis from "@studio-freight/lenis";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      smoothTouch: true,
      wheelMultiplier: 1.2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="relative w-screen min-h-screen overflow-x-hidden bg-[#0a0a0f] text-white">
      {/* 🌸 Scroll Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <ScrollNavbar />
      </div>

      {/* 🎮 Japanese-style Intro */}
      {showIntro && (
        <div className="fixed inset-0 z-50">
          <JapaneseGameIntro onComplete={() => setShowIntro(false)} />
        </div>
      )}

      {/* 🏯 Hero + Homepage in one scrollable view */}
      {!showIntro && (
        <div className="relative z-40">
          {/* Hero Section */}
          <section className="relative h-screen w-full">
            <ToriiHero />
            <div className="absolute bottom-24 w-full flex justify-center">
              <div className="animate-bounce text-pink-300 text-lg tracking-widest">
                ↓ Scroll to explore ↓
              </div>
            </div>
          </section>

          {/* Homepage Sections start right below hero */}
          <HomePage />
        </div>
      )}
    </div>
  );
}
