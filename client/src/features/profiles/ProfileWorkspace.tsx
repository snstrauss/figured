import { cva } from "class-variance-authority";
import { useTranslation } from "react-i18next";
import { ProfileText, Text } from "../../shared/Text";
import type {
  Category,
  ColorKey,
  Profile,
  SymptomEntry,
} from "../../shared/profile";

const categoryVariants = cva(
  "group overflow-clip rounded-xl border border-slate-200",
  {
    variants: {
      colorKey: {
        blue: "text-blue-700 bg-blue-50",
        teal: "text-teal-700 bg-teal-50",
        violet: "text-violet-700 bg-violet-50",
        rose: "text-rose-700 bg-rose-50",
        indigo: "text-indigo-700 bg-indigo-50",
        orange: "text-orange-700 bg-orange-50",
        slate: "text-slate-700 bg-slate-50",
        green: "text-green-700 bg-green-50",
        amber: "text-amber-700 bg-amber-50",
      } satisfies Record<ColorKey, string>,
    },
  },
);

type SymptomRowProps = {
  profile: Profile;
  entry: SymptomEntry;
};

function SymptomRow({ profile, entry }: SymptomRowProps) {
  return (
    <li className="flex items-center gap-2.5 border-b border-slate-100 py-3.5 last:border-0 sm:gap-4">
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
      <span className="text-sm whitespace-nowrap text-slate-500">
        <Text
          i18nKey={
            entry.impactRating === null
              ? "workspace.unrated"
              : "workspace.impact"
          }
          values={{ rating: entry.impactRating ?? 0 }}
        />
      </span>
    </li>
  );
}

type CategorySectionProps = {
  profile: Profile;
  category: Category;
  entries: SymptomEntry[];
};

function CategorySection({ profile, category, entries }: CategorySectionProps) {
  return (
    <details className={categoryVariants({ colorKey: category.colorKey })}>
      <summary className="flex cursor-pointer list-none items-center gap-2 p-4 sm:gap-3 sm:px-6 sm:py-4">
        <span
          aria-hidden="true"
          className="h-4 w-2 shrink-0 rounded-sm border-2 border-current"
        />
        <ProfileText
          profile={profile}
          language="he"
          i18nKey={category.name}
          className="flex-1 font-semibold"
        />
        <span className="text-sm whitespace-nowrap">
          <Text i18nKey="workspace.entryCount" count={entries.length} />
        </span>
        <span
          aria-hidden="true"
          className="ms-1.5 size-2 shrink-0 rotate-45 border-e-2 border-b-2 border-current group-open:rotate-225"
        />
      </summary>
      <div className="bg-white px-4 sm:px-6">
        {entries.length ? (
          <ul>
            {entries.map((entry) => (
              <SymptomRow key={entry.id} profile={profile} entry={entry} />
            ))}
          </ul>
        ) : (
          <Text
            as="p"
            className="py-5 text-slate-500"
            i18nKey="workspace.emptyCategory"
          />
        )}
      </div>
    </details>
  );
}

type ProfileWorkspaceProps = {
  profile: Profile;
};

export function ProfileWorkspace({ profile }: ProfileWorkspaceProps) {
  const { t } = useTranslation();
  const entries = new Map(profile.entries.map((entry) => [entry.id, entry]));

  return (
    <>
      <section className="mb-8">
        <Text as="p" className="eyebrow" i18nKey="workspace.eyebrow" />
        <h1 className="text-4xl font-semibold leading-tight tracking-tight wrap-anywhere">
          <bdi dir="auto">{profile.name}</bdi>
        </h1>
        <p className="mt-2.5 text-slate-500">
          <Text
            i18nKey="workspace.summary"
            values={{
              entries: profile.entries.filter((entry) => !entry.archived)
                .length,
              categories: profile.categories.length,
            }}
          />
        </p>
      </section>
      <section
        aria-label={t("workspace.categoriesLabel")}
        data-i18n-aria-label="workspace.categoriesLabel"
        className="grid gap-3"
      >
        {profile.categories.map((category) => (
          <CategorySection
            key={category.id}
            profile={profile}
            category={category}
            entries={category.entryIds
              .map((id) => entries.get(id)!)
              .filter((entry) => !entry.archived)}
          />
        ))}
        {!profile.categories.length && (
          <Text
            as="p"
            className="rounded-2xl border border-slate-200 bg-white p-10 text-center"
            i18nKey="workspace.empty"
          />
        )}
      </section>
    </>
  );
}
