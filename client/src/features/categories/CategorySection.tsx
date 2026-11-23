import { cva } from "class-variance-authority";
import { Translated } from "../../shared/Text";
import type {
  Category,
  ColorKey,
  Profile,
  SymptomEntry,
} from "../../shared/profile";
import { SymptomRow } from "../symptoms/SymptomRow";

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

type CategorySectionProps = {
  profile: Profile;
  category: Category;
  entries: SymptomEntry[];
};

export function CategorySection({
  profile,
  category,
  entries,
}: CategorySectionProps) {
  return (
    <details className={categoryVariants({ colorKey: category.colorKey })}>
      <CategoryHeading
        category={category}
        count={entries.length}
      />
      <CategoryEntries profile={profile} entries={entries} />
    </details>
  );
}

type CategoryHeadingProps = {
  category: Category;
  count: number;
};

function CategoryHeading({ category, count }: CategoryHeadingProps) {
  return (
    <summary className="flex cursor-pointer list-none items-center gap-2 p-4 sm:gap-3 sm:px-6 sm:py-4">
      <span
        aria-hidden="true"
        className="h-4 w-2 shrink-0 rounded-sm border-2 border-current"
      />
      <Translated
        namespace="catalog"
        i18nKey={category.name}
        className="flex-1 font-semibold"
      />
      <span className="text-sm whitespace-nowrap">
        <Translated i18nKey="workspace.entryCount" count={count} />
      </span>
      <span
        aria-hidden="true"
        className="ms-1.5 size-2 shrink-0 rotate-45 border-e-2 border-b-2 border-current group-open:rotate-225"
      />
    </summary>
  );
}

type CategoryEntriesProps = { profile: Profile; entries: SymptomEntry[] };

function CategoryEntries({ profile, entries }: CategoryEntriesProps) {
  return (
    <div className="bg-white px-4 sm:px-6">
      {entries.length ? (
        <ul>
          {entries.map((entry) => (
            <SymptomRow key={entry.id} profile={profile} entry={entry} />
          ))}
        </ul>
      ) : (
        <Translated
          as="p"
          className="py-5 text-slate-500"
          i18nKey="workspace.emptyCategory"
        />
      )}
    </div>
  );
}
