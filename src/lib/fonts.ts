import { Comfortaa } from 'next/font/google';

// Explicitly load only the light weight (300) of Comfortaa
export const comfortaa = Comfortaa({
  subsets: ['latin'],
  weight: ['300'], // 300 is the light weight
  display: 'swap',
  variable: '--font-comfortaa',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
}); 