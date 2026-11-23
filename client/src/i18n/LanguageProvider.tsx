import type { ReactNode } from "react";
import { useEffect } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "./i18n";

type LanguageProviderProps = { children: ReactNode };

export function LanguageProvider({ children }: LanguageProviderProps) {
  const { i18n: translations } = useTranslation(undefined, { i18n });
  const language = translations.resolvedLanguage;

  useEffect(() => {
    document.documentElement.lang = language!;
    document.documentElement.dir = translations.dir();
  }, [language, translations]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
