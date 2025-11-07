<<<<<<< HEAD
import { useState } from 'react';
import JapaneseGameIntro from './components/JapaneseGameIntro';
import HomePage from './components/HomePage';

type AppState = 'game-intro' | 'homepage';

export default function App() {
  const [appState, setAppState] = useState<AppState>('game-intro');

  const handleIntroComplete = () => {
    setAppState('homepage');
  };

  const skipToHomepage = () => {
    setAppState('homepage');
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Japanese Game Opening Animation */}
      {appState === 'game-intro' && (
        <div className="absolute inset-0 z-50">
          <JapaneseGameIntro onComplete={handleIntroComplete} />
        </div>
      )}

      {/* Main Homepage */}
      {appState === 'homepage' && (
        <div className="absolute inset-0 z-30 overflow-y-auto">
          <HomePage />
        </div>
      )}


=======
import { useEffect } from "react";
import { ToriiHero } from "./components/torii-hero";
import Lenis from "@studio-freight/lenis";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08, // lower = smoother/longer easing
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      // @ts-ignore lenis types may vary
      lenis.destroy?.();
    };
  }, []);

  return (
    <div className="min-h-[300vh] bg-slate-900">
      <ToriiHero />
      
      {/* Content below hero for scrolling */}
      <div className="relative z-10 bg-gradient-to-b from-transparent via-slate-900/80 to-slate-900 px-8 py-32">
        <div className="max-w-4xl mx-auto text-white space-y-8">
          <h2 className="text-4xl">Sacred Gateway</h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            The torii gate marks the transition from the mundane to the sacred, 
            standing as a sentinel between worlds at the break of dawn.
          </p>
          <p className="text-lg text-slate-300 leading-relaxed">
            As cherry blossoms drift on the morning breeze and mist rises from 
            the tranquil waters, Mount Fuji watches over this timeless scene.
          </p>
        </div>
      </div>
>>>>>>> 0b24ced (Adding hero section of the esummit page)
    </div>
  );
}
