import { useTranslation } from "react-i18next";
import { Translated } from "../../shared/Text";
import type { Profile } from "../../shared/profile";
import { CategorySection } from "./CategorySection";

type ProfileCategoriesProps = { profile: Profile };

export function ProfileCategories({ profile }: ProfileCategoriesProps) {
  const { t } = useTranslation();
  const entries = new Map(profile.entries.map((entry) => [entry.id, entry]));
  return (
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
        <Translated
          as="p"
          className="rounded-2xl border border-slate-200 bg-white p-10 text-center"
          i18nKey="workspace.empty"
        />
      )}
    </section>
  );
}
