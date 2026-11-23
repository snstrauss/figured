import type { HTMLAttributes } from "react";
import { useTranslation } from "react-i18next";
import "../i18n/i18n";
import { profileName } from "./profile";
import type { Language, Profile } from "./profile";

type TextProps = Omit<HTMLAttributes<HTMLElement>, "children"> & {
  htmlFor?: string;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "label" | "bdi";
  i18nKey: string;
  values?: Record<string, string | number>;
  count?: number;
};

export function Text({
  as: Tag = "span",
  i18nKey,
  values,
  count,
  ...props
}: TextProps) {
  const { t } = useTranslation();
  return (
    <Tag {...props} data-i18n-key={i18nKey}>
      {t(i18nKey, { ...values, count })}
    </Tag>
  );
}

type ProfileTextProps = Omit<TextProps, "values" | "count"> & {
  profile: Profile;
  language: Language;
};

// These names are editable profile content, stored in each profile's dictionary.
export function ProfileText({
  profile,
  language,
  i18nKey,
  as: Tag = "span",
  ...props
}: ProfileTextProps) {
  return (
    <Tag
      {...props}
      lang={language}
      data-i18n-key={i18nKey}
      data-i18n-source="profile"
    >
      {profileName(profile, language, i18nKey)}
    </Tag>
  );
}
