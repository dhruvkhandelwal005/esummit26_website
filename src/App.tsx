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


    </div>
  );
}
