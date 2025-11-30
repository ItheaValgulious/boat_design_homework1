import React, { useState, useEffect, useCallback } from 'react';
import { slides } from './data/slides';
import Stage from './components/Stage';
import Slide from './components/Slide';
import Background from './components/Background';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOverview, setIsOverview] = useState(false);

  // Navigation Logic
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, slides.length - 1));
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  // Keyboard listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
        case 'Enter':
          goToNext();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          goToPrev();
          break;
        case 'Home':
          setCurrentIndex(0);
          break;
        case 'End':
          setCurrentIndex(slides.length - 1);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  // Touch/Wheel Logic (Simple scroll throttle)
  useEffect(() => {
    let lastScroll = 0;
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScroll > 1000) { // 1 second throttle
        if (e.deltaY > 0) goToNext();
        else if (e.deltaY < 0) goToPrev();
        lastScroll = now;
      }
    };
    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [goToNext, goToPrev]);

  // Handle global click to advance
  const handleAppClick = (e: React.MouseEvent) => {
    // Only advance if not clicking a button/interactive element
    // (Though buttons stop propagation, so this check is implicitly handled there)
    goToNext();
  };

  return (
    <div 
      className="w-screen h-screen bg-black text-white overflow-hidden font-sans select-none cursor-pointer"
      onClick={handleAppClick}
    >
      <Background />

      <Stage currentSlideIndex={currentIndex}>
        {slides.map((slide, index) => (
          <Slide 
            key={slide.id} 
            data={slide} 
            isActive={index === currentIndex} 
          />
        ))}
      </Stage>

      {/* UI Controls - Made visible by removing opacity classes */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-6 z-50 transition-opacity duration-300">
        <button 
          onClick={(e) => { e.stopPropagation(); goToPrev(); }}
          disabled={currentIndex === 0}
          className="p-4 rounded-full bg-cyan-900/80 hover:bg-cyan-700 hover:scale-110 backdrop-blur border border-cyan-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(0,255,255,0.2)]"
        >
          <ChevronLeft size={32} />
        </button>
        
        <div className="text-cyan-400 font-mono text-xl tracking-widest bg-black/60 px-6 py-3 rounded-full backdrop-blur border border-cyan-900 shadow-lg select-none pointer-events-none">
          {currentIndex + 1} / {slides.length}
        </div>

        <button 
          onClick={(e) => { e.stopPropagation(); goToNext(); }}
          disabled={currentIndex === slides.length - 1}
          className="p-4 rounded-full bg-cyan-900/80 hover:bg-cyan-700 hover:scale-110 backdrop-blur border border-cyan-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(0,255,255,0.2)]"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gray-900 z-50">
        <div 
          className="h-full bg-cyan-500 shadow-[0_0_10px_#06b6d4] transition-all duration-500 ease-out"
          style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
        />
      </div>
      
      {/* Overview Button (Top Right) */}
      <button 
        className="fixed top-6 right-6 p-2 text-cyan-600 hover:text-cyan-400 z-50 transition-colors"
        onClick={(e) => {
            e.stopPropagation();
            document.body.requestFullscreen().catch(console.error);
        }}
      >
        <Maximize2 size={32} />
      </button>

      {/* Watermark/Logo (Top Left) */}
      <div className="fixed top-6 left-6 z-50 flex items-center gap-3 opacity-60 pointer-events-none">
        <div className="w-4 h-4 bg-cyan-500 rounded-full animate-pulse" />
        <span className="text-lg font-mono text-cyan-300 tracking-widest">DEEP SEA SYSTEM</span>
      </div>
    </div>
  );
};

export default App;