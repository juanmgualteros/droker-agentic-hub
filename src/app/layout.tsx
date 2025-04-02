import '@/styles/globals.css';
import '@/styles/comfortaa-light.css'; // Direct import of Comfortaa Light
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
    <html lang="en" className="font-light" suppressHydrationWarning>
      <body className="antialiased" style={{ fontWeight: 300, fontFamily: "'Comfortaa', sans-serif" }}>
        <ThemeProvider defaultTheme="light" storageKey="agentic-hub-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
} 