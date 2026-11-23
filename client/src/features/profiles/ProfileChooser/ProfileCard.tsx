import { useTranslation } from "react-i18next";
import type { ProfileSummary } from "../../../shared/profile";
import { Translated } from "../../../shared/Text";

type ProfileCardProps = {
  profile: ProfileSummary;
  disabled: boolean;
  onOpen: () => void;
};

export function ProfileCard({ profile, disabled, onOpen }: ProfileCardProps) {
  const { t } = useTranslation();

  return (
    <button
      onClick={onOpen}
      disabled={disabled}
      aria-label={t("profiles.open", { name: profile.name })}
      data-i18n-aria-label="profiles.open"
      className="flex min-h-32 w-full flex-col items-start gap-2 rounded-2xl border border-slate-200 bg-white p-6 text-start hover:border-teal-400 hover:bg-slate-50"
    >
      <bdi
        dir="auto"
        className="text-xl font-semibold text-slate-800 wrap-anywhere"
      >
        {profile.name}
      </bdi>
      <Translated
        as="span"
        className="text-sm text-slate-500"
        i18nKey="profiles.continue"
      />
    </button>
  );
}
