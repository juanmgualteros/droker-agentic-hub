"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { GlobeAltIcon } from "@heroicons/react/24/outline";

interface LanguageSelectorProps {
  locale: string;
}

export function LanguageSelector({ locale }: LanguageSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
  ];

  const handleLanguageChange = (newLocale: string) => {
    const currentPath = pathname.replace(`/${locale}`, "");
    router.push(`/${newLocale}${currentPath}`);
  };

  const currentLanguage = languages.find(lang => lang.code === locale)?.name;

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <GlobeAltIcon className="h-4 w-4" />
      <div className="flex items-center gap-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`px-2 py-1 rounded-md transition-colors ${
              locale === lang.code 
                ? "text-white bg-black" 
                : "text-gray-600 hover:text-black"
            }`}
          >
            {lang.code.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
} 