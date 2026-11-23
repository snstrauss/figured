import { Orbit } from "lucide-react";
import { Translated } from "../../../shared/Text";

export function EmptyProfilesListPlaceholder() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-6 py-13 text-center">
      <Orbit
        size={44}
        aria-hidden="true"
        className="mx-auto mb-5 text-teal-900 opacity-75"
      />
      <Translated
        as="h3"
        className="text-lg font-semibold"
        i18nKey="profiles.emptyTitle"
      />
      <Translated
        as="p"
        className="mt-2.5 text-slate-500"
        i18nKey="profiles.emptyDescription"
      />
    </div>
  );
}
