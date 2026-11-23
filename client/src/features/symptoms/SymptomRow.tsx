import { Translated } from "../../shared/Text";
import type { Profile, SymptomEntry } from "../../shared/profile";

type SymptomRowProps = {
  profile: Profile;
  entry: SymptomEntry;
};

export function SymptomRow({ profile, entry }: SymptomRowProps) {
  return (
    <li className="flex items-center gap-2.5 border-b border-slate-100 py-3.5 last:border-0 sm:gap-4">
      <SymptomName entry={entry} />
      <SymptomImpactRating rating={profile.symptoms[entry.id]?.impactRating ?? null} />
    </li>
  );
}

type SymptomNameProps = { entry: SymptomEntry };

function SymptomName({ entry }: SymptomNameProps) {
  return (
    <Translated namespace="catalog" i18nKey={entry.name} className="min-w-0 flex-1 font-medium" />
  );
}

type SymptomImpactRatingProps = { rating: number | null };

function SymptomImpactRating({ rating }: SymptomImpactRatingProps) {
  return (
    <span className="text-sm whitespace-nowrap text-slate-500">
      <Translated
        i18nKey={rating === null ? "workspace.unrated" : "workspace.impact"}
        values={{ rating: rating ?? 0 }}
      />
    </span>
  );
}
