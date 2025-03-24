import { comfortaa } from '@/lib/fonts';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { notFound } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

const locales = ['en', 'es'] as const;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export const metadata: Metadata = {
  title: 'Agentic Hub',
  description: 'Access administrator controls and manage your organization',
};

export default function RootLayout({ children, params: { locale } }: RootLayoutProps) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Get the messages for the current locale
  const messages = useMessages();

  return (
    <html lang={locale} className={`${comfortaa.variable}`}>
      <body className={`font-comfortaa font-light antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClerkProvider>
            {children}
          </ClerkProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
} 