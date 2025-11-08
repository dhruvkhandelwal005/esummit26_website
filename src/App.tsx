import { useState, useEffect } from "react";
import JapaneseGameIntro from "./components/JapaneseGameIntro";
import { ToriiHero } from "./components/torii-hero";
import HomePage from "./components/HomePage";
import Lenis from "@studio-freight/lenis";

type AppState = "intro" | "hero" | "homepage";

export default function App() {
  const [appState, setAppState] = useState<AppState>("intro");

  // Step 1️⃣: Handle intro animation complete → move to hero scene
  const handleIntroComplete = () => {
    setAppState("hero");
  };

  // Step 2️⃣: Optional skip logic (for debugging or skip button)
  const skipToHomepage = () => {
    setAppState("homepage");
  };

  // Step 3️⃣: Smooth scrolling setup when in hero scene
  useEffect(() => {
    if (appState !== "hero") return;

    const lenis = new Lenis({
      lerp: 0.08, // lower = smoother easing
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      // @ts-ignore lenis types may vary slightly
      lenis.destroy?.();
    };
  }, [appState]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-900">
      {/* 1️⃣ Japanese Game Opening Animation */}
      {appState === "intro" && (
        <div className="absolute inset-0 z-50">
          <JapaneseGameIntro onComplete={handleIntroComplete} />
        </div>
      )}

      {/* 2️⃣ Cinematic Torii Hero Scene */}
      {appState === "hero" && (
        <div className="absolute inset-0 z-40 overflow-y-auto">
          <ToriiHero />

          {/* Scrollable content below hero */}
          <div className="relative z-10 bg-gradient-to-b from-transparent via-slate-900/80 to-slate-900 px-8 py-32">
            <div className="max-w-4xl mx-auto text-white space-y-8">
              <h2 className="text-4xl font-semibold">Sacred Gateway</h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                The torii gate marks the transition from the mundane to the
                sacred, standing as a sentinel between worlds at the break of
                dawn.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                As cherry blossoms drift on the morning breeze and mist rises
                from the tranquil waters, Mount Fuji watches over this timeless
                scene.
              </p>
              <button
                onClick={() => setAppState("homepage")}
                className="mt-12 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-all"
              >
                Continue to Homepage →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3️⃣ Main Homepage */}
      {appState === "homepage" && (
        <div className="absolute inset-0 z-30 overflow-y-auto">
          <HomePage />
        </div>
      )}
    </div>
  );
}
