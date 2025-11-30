import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { slides } from '../data/slides';
import { SlideData } from '../types';

interface StageProps {
  currentSlideIndex: number;
  children: React.ReactNode;
}

const Stage: React.FC<StageProps> = ({ currentSlideIndex, children }) => {
  const currentSlide: SlideData = slides[currentSlideIndex];
  const t = currentSlide.transform;
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      // Base reference size (Slide is 1000x700)
      // We add padding to ensure it doesn't touch edges (e.g., 1200x900 view area)
      const baseWidth = 1200;
      const baseHeight = 900;
      
      const scaleX = window.innerWidth / baseWidth;
      const scaleY = window.innerHeight / baseHeight;
      
      // Use the smaller scale factor to ensure it fits both width and height (contain)
      const newScale = Math.min(scaleX, scaleY);
      setScale(newScale);
    };

    // Initial calc
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Camera Transformation Logic:
  // To view the slide at (tx, ty, tz) with rotation (rx, ry, rz),
  // we move the WORLD by the inverse transformation.
  // We apply the scale LAST in the CSS string (which means it applies to the result of the rotations/translations).
  
  const transformString = `
    scale(${scale})
    rotateZ(${-t.rotateZ}deg)
    rotateY(${-t.rotateY}deg)
    rotateX(${-t.rotateX}deg)
    translate3d(${-t.x}px, ${-t.y}px, ${-t.z}px)
  `;

  return (
    <div className="perspective-container w-full h-full absolute inset-0 overflow-hidden bg-black">
      {/* 
        The Stage container is centered in the screen (left-1/2, top-1/2).
        It has 0 width/height so its top-left corner (the origin) is exactly at screen center.
      */}
      <motion.div
        className="absolute left-1/2 top-1/2 w-0 h-0"
        initial={false}
        animate={{
          transform: transformString
        }}
        transition={{
          duration: 1.5,
          ease: [0.25, 0.1, 0.25, 1.0], // Cubic-bezier for smooth camera feel
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Stage;