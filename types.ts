import React from 'react';

export interface SlideTransform {
  x: number;
  y: number;
  z: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  scale?: number;
}

export interface SlideContent {
  id: string;
  title?: string;
  subtitle?: string;
  bullets?: string[];
  content?: React.ReactNode; // For custom layouts or math
  type: 'title' | 'content' | 'code' | 'end';
}

export interface SlideData extends SlideContent {
  transform: SlideTransform;
}