'use client';

import Image from 'next/image';
import { useState } from 'react';

interface LogoProps {
  src?: string | null;
  fallbackText?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: { width: 32, height: 32 },
  md: { width: 40, height: 40 },
  lg: { width: 48, height: 48 },
};

export function Logo({ src, fallbackText = 'D', size = 'md', className = '' }: LogoProps) {
  const [error, setError] = useState(false);
  const dimensions = sizeMap[size];

  if (!src || error) {
    return (
      <div 
        className={`flex items-center justify-center ${className}`}
        style={dimensions}
      >
        <svg viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M90 60c0-2.21 1.79-4 4-4h50c35.346 0 64 28.654 64 64v16c0 35.346-28.654 64-64 64H94c-2.21 0-4-1.79-4-4V60z" fill="currentColor"/>
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={dimensions}>
      <Image
        src={src}
        alt="Droker Logo"
        fill
        className="object-contain"
        onError={() => setError(true)}
        priority
      />
    </div>
  );
} 