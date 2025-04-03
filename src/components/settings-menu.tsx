"use client";

import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel,
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Settings, Moon, Sun, Globe, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface SettingsMenuProps {
  locale: string;
}

export function SettingsMenu({ locale }: SettingsMenuProps) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    document.cookie = "isAuthenticated=false; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.replace(`/${locale}/login`);
  };

  // Available languages
  const languages = [
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
    { code: "fr", label: "Français" },
  ];

  // Get the current path without the locale
  const getPathWithoutLocale = () => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const pathWithoutLocale = path.replace(/^\/[a-z]{2}(?:\/|$)/, "/");
      return pathWithoutLocale;
    }
    return "/";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-accent hover:text-accent-foreground">
          <Settings className="h-4 w-4 text-foreground transition-colors" />
          <span className="sr-only">Settings menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background border-border">
        <DropdownMenuLabel className="font-light text-foreground">Appearance</DropdownMenuLabel>
        <DropdownMenuItem 
          onClick={() => setTheme("light")} 
          className={cn(
            "font-light cursor-pointer text-foreground hover:bg-accent hover:text-accent-foreground",
            "py-2 px-3"
          )}
        >
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")} 
          className={cn(
            "font-light cursor-pointer text-foreground hover:bg-accent hover:text-accent-foreground",
            "py-2 px-3"
          )}
        >
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")} 
          className={cn(
            "font-light cursor-pointer text-foreground hover:bg-accent hover:text-accent-foreground",
            "py-2 px-3"
          )}
        >
          <span className="mr-2 h-4 w-4 flex items-center justify-center">
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-foreground" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-foreground" />
          </span>
          <span>System</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-border" />
        
        <DropdownMenuLabel className="font-light text-foreground">Language</DropdownMenuLabel>
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className={cn(
              "font-light cursor-pointer text-foreground hover:bg-accent hover:text-accent-foreground",
              locale === lang.code ? 'bg-muted' : '',
              "py-2 px-3"
            )}
          >
            <Link 
              href={`/${lang.code}${getPathWithoutLocale()}`} 
              className="flex items-center w-full"
            >
              <Globe className="mr-2 h-4 w-4" />
              <span>{lang.label}</span>
              {locale === lang.code && (
                <span className="ml-auto text-xs text-muted-foreground">✓</span>
              )}
            </Link>
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator className="bg-border" />
        
        <DropdownMenuItem 
          onClick={handleLogout} 
          className={cn(
            "font-light cursor-pointer text-destructive hover:bg-destructive/10",
            "py-2 px-3"
          )}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
