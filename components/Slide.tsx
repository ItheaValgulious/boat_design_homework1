import React from 'react';
import { SlideData } from '../types';

interface SlideProps {
  data: SlideData;
  isActive: boolean;
}

const Slide: React.FC<SlideProps> = ({ data, isActive }) => {
  const { transform, title, subtitle, content, type } = data;

  // The slide is positioned relative to the Stage origin (0,0,0), which is screen center.
  // We use negative margins to center the element itself on that origin.
  const style: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    top: 0,
    marginLeft: '-500px',
    marginTop: '-350px',
    width: '1000px',
    height: '700px',
    // Apply 3D position and rotation
    transform: `translate3d(${transform.x}px, ${transform.y}px, ${transform.z}px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) rotateZ(${transform.rotateZ}deg)`,
    transformStyle: 'preserve-3d',
  };

  return (
    <div style={style} className={`transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-20'}`}>
      <div className={`
        relative w-full h-full p-16 rounded-3xl
        backdrop-blur-md
        ${type === 'end' || type === 'title' ? 'border-none' : 'bg-blue-950/60 border border-cyan-500/30 shadow-[0_0_50px_rgba(0,200,255,0.1)]'}
        flex flex-col justify-center
        overflow-hidden
        backface-hidden
      `}>
        {/* Decorative corner lines for tech feel */}
        {type !== 'title' && type !== 'end' && (
          <>
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-cyan-400 rounded-tl-lg" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-cyan-400 rounded-br-lg" />
          </>
        )}

        {(title || subtitle) && (
          <header className={`mb-10 ${type === 'title' ? 'text-center mb-0' : 'border-b-2 border-cyan-800 pb-6'}`}>
            {title && (
              <h1 className={`font-bold tracking-wide ${type === 'title' || type === 'end' ? 'text-9xl text-cyan-400 drop-shadow-[0_0_15px_rgba(0,200,255,0.8)]' : 'text-6xl text-cyan-300'}`}>
                {title}
              </h1>
            )}
            {subtitle && (
              <h2 className="text-4xl text-cyan-100 mt-6 font-light tracking-wider opacity-80">
                {subtitle}
              </h2>
            )}
          </header>
        )}

        {/* 
            For 'title' type, we remove flex-1 so the content div doesn't expand and push the header up.
            The parent 'justify-center' will then center the header+content block vertically.
            Set base text size to text-2xl.
        */}
        <div className={`${type === 'title' ? 'flex-none' : 'flex-1'} overflow-visible text-gray-100 font-light leading-relaxed text-2xl`}>
          {content}
        </div>
      </div>
    </div>
  );
};

export default Slide;