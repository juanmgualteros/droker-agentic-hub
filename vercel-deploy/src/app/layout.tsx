import { comfortaa } from '@/lib/fonts';
import '@/styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agentic Hub',
  description: 'Access administrator controls and manage your organization',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${comfortaa.variable}`}>
      <body className={`font-comfortaa font-light antialiased`}>
        {children}
      </body>
    </html>
  );
} 