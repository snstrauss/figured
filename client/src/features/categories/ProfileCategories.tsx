import { useTranslation } from "react-i18next";
import { Translated } from "../../shared/Text";
import type { Catalog, Profile } from "../../shared/profile";
import { CategorySection } from "./CategorySection";

type ProfileCategoriesProps = { profile: Profile; catalog: Catalog };

export function ProfileCategories({
  profile,
  catalog,
}: ProfileCategoriesProps) {
  const { t } = useTranslation();
  return (
    <section
      aria-label={t("workspace.categoriesLabel")}
      data-i18n-aria-label="workspace.categoriesLabel"
      className="grid gap-3"
    >
      {catalog.categories.map((category) => (
        <CategorySection
          key={category.id}
          profile={profile}
          category={category}
        />
      ))}
      {!catalog.categories.length && (
        <Translated
          as="p"
          className="rounded-2xl border border-slate-200 bg-white p-10 text-center"
          i18nKey="workspace.empty"
        />
      )}
    </section>
  );
}
