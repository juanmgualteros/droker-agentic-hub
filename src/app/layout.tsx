import { comfortaa } from '@/lib/fonts';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';

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
    <html lang="en" className={`${comfortaa.variable}`} suppressHydrationWarning>
      <body className={`font-comfortaa font-light antialiased`}>
        <ThemeProvider defaultTheme="light" storageKey="agentic-hub-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
} 