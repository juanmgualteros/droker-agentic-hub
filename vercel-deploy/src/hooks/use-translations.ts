import { useTranslations as useNextIntlTranslations } from "next-intl";

export function useTranslations(namespace?: string) {
  const t = useNextIntlTranslations(namespace);

  return {
    t,
    // Helper function to translate with variables
    translate: (key: string, variables?: Record<string, string | number>) => {
      try {
        return t(key, variables);
      } catch (error) {
        console.error(`Translation key not found: ${key}`);
        return key;
      }
    }
  };
} 