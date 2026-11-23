import type { HTMLAttributes } from "react";
import { useTranslation } from "react-i18next";
import "../i18n/i18n";

type TextProps = Omit<HTMLAttributes<HTMLElement>, "children"> & {
  htmlFor?: string;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "label" | "bdi";
  i18nKey: string;
  namespace?: "translation" | "catalog";
  values?: Record<string, string | number>;
  count?: number;
};

export function Translated({
  as: Tag = "span",
  i18nKey,
  namespace,
  values,
  count,
  ...props
}: TextProps) {
  const { t } = useTranslation(namespace);
  return (
    <Tag {...props} data-i18n-key={i18nKey}>
      {t(i18nKey, { ...values, count })}
    </Tag>
  );
}
