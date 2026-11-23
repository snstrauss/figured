import { Translated } from "../../../shared/Text";

export function ProfileChooserIntroduction() {
  return (
    <section className="mb-8 max-w-2xl sm:mb-11">
      <Translated as="p" className="eyebrow" i18nKey="profiles.eyebrow" />
      <Translated
        as="h1"
        className="text-3xl sm:text-5xl font-semibold leading-tight tracking-tight"
        i18nKey="profiles.title"
      />
      <Translated
        as="p"
        className="mt-4 max-w-lg text-lg text-slate-500"
        i18nKey="profiles.description"
      />
    </section>
  );
}
