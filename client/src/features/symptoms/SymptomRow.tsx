import { ProfileText, Translated } from "../../shared/Text";
import type { Profile, SymptomEntry } from "../../shared/profile";

type SymptomRowProps = {
  profile: Profile;
  entry: SymptomEntry;
};

export function SymptomRow({ profile, entry }: SymptomRowProps) {
  return (
    <li className="flex items-center gap-2.5 border-b border-slate-100 py-3.5 last:border-0 sm:gap-4">
      <SymptomNames profile={profile} entry={entry} />
      <SymptomImpactRating entry={entry} />
    </li>
  );
}

function SymptomNames({ profile, entry }: SymptomRowProps) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-3">
      <ProfileText
        profile={profile}
        language="he"
        i18nKey={entry.name}
        className="font-medium"
      />
      <ProfileText
        as="bdi"
        profile={profile}
        language="en"
        i18nKey={entry.name}
        dir="ltr"
        className="text-sm text-slate-500"
      />
    </div>
  );
}

type SymptomImpactRatingProps = { entry: SymptomEntry };

function SymptomImpactRating({ entry }: SymptomImpactRatingProps) {
  return (
    <span className="text-sm whitespace-nowrap text-slate-500">
      <Translated
        i18nKey={
          entry.impactRating === null ? "workspace.unrated" : "workspace.impact"
        }
        values={{ rating: entry.impactRating ?? 0 }}
      />
    </span>
  );
}
