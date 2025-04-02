import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale = 'en' as const;

export default getRequestConfig(async ({ locale = defaultLocale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default,
  locale,
})); 