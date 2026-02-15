"use client";

import * as React from "react";
import { Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/config/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define your supported languages with their native names
const LANGUAGES = [
  { code: "en", nativeName: "English" },
  { code: "bn", nativeName: "বাংলা" },
  { code: "hi", nativeName: "हिन्दी" },
  { code: "es", nativeName: "Español" },
];

export function LanguageSwitcher() {
  const [mounted, setMounted] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("LanguageSwitcher");

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const onSelectLanguage = (newLocale: string) => {
    // This function replaces the pathname with the new locale
    router.replace(pathname, { locale: newLocale });
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Languages className="h-5 w-5 text-slate-400" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t("label")}>
          <Languages className="h-5 w-5 text-slate-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => onSelectLanguage(lang.code)}
            // Optionally, highlight the current language
            className={locale === lang.code ? "font-bold" : ""}
          >
            {lang.nativeName}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
