import { useTranslation } from "react-i18next";
import { Button } from "../shared/Button";
import { Translated } from "../shared/Text";

export function LanguageSwitch() {
  const { i18n } = useTranslation();
  const nextLanguage = i18n.resolvedLanguage === "he" ? "en" : "he";

  return (
    <Button
      variant="secondary"
      lang={nextLanguage}
      dir="auto"
      onClick={() => void i18n.changeLanguage(nextLanguage)}
    >
      <Translated i18nKey="app.switchLanguage" />
    </Button>
  );
}
