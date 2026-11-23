import { Translated } from "../../shared/Text";
import type { Profile } from "../../shared/profile";

const symptomTranslationKeys = (symptomId: string) => ({
  name: `symptoms.${symptomId}.name`,
  generalDescription: `symptoms.${symptomId}.generalDescription`,
});

type SymptomRowProps = {
  profile: Profile;
  symptomId: string;
};

export function SymptomRow({ profile, symptomId }: SymptomRowProps) {
  return (
    <li className="flex items-start gap-2.5 border-b border-slate-100 py-3.5 last:border-0 sm:gap-4">
      <SymptomSummary symptomId={symptomId} />
      <SymptomImpactRating
        rating={profile.symptoms[symptomId]?.impactRating ?? null}
      />
    </li>
  );
}

type SymptomSummaryProps = { symptomId: string };

function SymptomSummary({ symptomId }: SymptomSummaryProps) {
  const keys = symptomTranslationKeys(symptomId);
  return (
    <div className="min-w-0 flex-1 space-y-1">
      <Translated
        as="p"
        namespace="catalog"
        i18nKey={keys.name}
        className="font-medium"
      />
      <Translated
        as="p"
        namespace="catalog"
        i18nKey={keys.generalDescription}
        className="text-sm text-slate-500"
      />
    </div>
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
