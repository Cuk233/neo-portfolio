"use client";

import { useState, useCallback } from 'react';

export const useMagneticEffect = (magneticStrength: number = 0.5) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();

    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    setPosition({ 
      x: x * magneticStrength, 
      y: y * magneticStrength 
    });
  }, [magneticStrength]);

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return {
    handleMouseMove,
    handleMouseLeave,
    style: {
      transform: `translate(${position.x}px, ${position.y}px)`,
      transition: position.x === 0 && position.y === 0 ? 'all 0.5s ease' : 'none'
    }
  };
}; 