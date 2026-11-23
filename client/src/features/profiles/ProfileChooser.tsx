import { Orbit } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../../shared/Button";
import type { ProfileSummary } from "../../shared/profile";
import { Text } from "../../shared/Text";

type ProfileChooserProps = {
  profiles: ProfileSummary[];
  openingId: string | null;
  onOpen: (id: string) => void;
  onCreate: () => void;
};
type ProfileCardProps = {
  profile: ProfileSummary;
  disabled: boolean;
  onOpen: () => void;
};

function ProfileCard({ profile, disabled, onOpen }: ProfileCardProps) {
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
      <Text
        as="span"
        className="text-sm text-slate-500"
        i18nKey="profiles.continue"
      />
    </button>
  );
}

export function ProfileChooser({
  profiles,
  openingId,
  onOpen,
  onCreate,
}: ProfileChooserProps) {
  return (
    <>
      <section className="mb-8 max-w-2xl sm:mb-11">
        <Text as="p" className="eyebrow" i18nKey="profiles.eyebrow" />
        <Text
          as="h1"
          className="text-3xl sm:text-5xl font-semibold leading-tight tracking-tight"
          i18nKey="profiles.title"
        />
        <Text
          as="p"
          className="mt-4 max-w-lg text-lg text-slate-500"
          i18nKey="profiles.description"
        />
      </section>
      <section aria-labelledby="profiles-title">
        <div className="mb-5 flex items-center justify-between gap-4">
          <Text
            as="h2"
            id="profiles-title"
            className="text-lg font-semibold sm:text-2xl"
            i18nKey="profiles.listTitle"
          />
          <Button onClick={onCreate}>
            <Text i18nKey="profiles.create" />
          </Button>
        </div>
        {profiles.length ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {profiles.map((profile) => (
              <li key={profile.id}>
                <ProfileCard
                  profile={profile}
                  disabled={openingId !== null}
                  onOpen={() => onOpen(profile.id)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-13 text-center">
            <Orbit
              size={44}
              aria-hidden="true"
              className="mx-auto mb-5 text-teal-900 opacity-75"
            />
            <Text
              as="h3"
              className="text-lg font-semibold"
              i18nKey="profiles.emptyTitle"
            />
            <Text
              as="p"
              className="mt-2.5 text-slate-500"
              i18nKey="profiles.emptyDescription"
            />
          </div>
        )}
      </section>
      <Text
        as="p"
        className="mt-6 text-sm text-slate-500"
        i18nKey="profiles.footer"
      />
    </>
  );
}
