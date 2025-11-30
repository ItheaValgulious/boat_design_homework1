import React, { useMemo } from 'react';
import katex from 'katex';

interface MathDisplayProps {
  latex: string;
  block?: boolean;
  className?: string;
}

const MathDisplay: React.FC<MathDisplayProps> = ({ latex, block = false, className = '' }) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(latex, {
        throwOnError: false,
        displayMode: block,
        output: 'html',
      });
    } catch (e) {
      console.error("KaTeX render error:", e);
      return latex;
    }
  }, [latex, block]);

  return (
    <div 
      className={`${block ? 'my-4 text-center' : 'inline-block'} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MathDisplay;