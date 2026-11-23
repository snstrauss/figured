import { Orbit } from "lucide-react";
import { Button } from "./shared/Button";
import { Translated } from "./shared/Text";

type AppHeaderProps = { hasSelectedProfile: boolean; onLogout: () => void };

export function AppHeader({ hasSelectedProfile, onLogout }: AppHeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex min-h-20 max-w-6xl items-center justify-between gap-5 px-5 py-4 sm:px-8">
        <div
          dir="ltr"
          className="flex items-center gap-2.5 text-2xl font-semibold tracking-tight text-teal-900"
        >
          <Orbit size={30} aria-hidden="true" />
          <Translated as="span" i18nKey="app.name" />
        </div>
        {hasSelectedProfile ? (
          <Button variant="secondary" onClick={onLogout}>
            <Translated i18nKey="app.logout" />
          </Button>
        ) : (
          <Translated
            as="span"
            className="hidden text-sm text-slate-500 sm:inline"
            i18nKey="app.tagline"
          />
        )}
      </div>
    </header>
  );
}
