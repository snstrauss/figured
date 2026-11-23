import { profileErrorKey } from "./features/profiles/profilesApi";
import { Text } from "./shared/Text";
import { Orbit } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useProfilesStore } from "./features/profiles/useProfilesStore";
import { ProfileChooser } from "./features/profiles/ProfileChooser";
import { NewProfileDialog } from "./features/profiles/NewProfileDialog";
import { ProfileWorkspace } from "./features/profiles/ProfileWorkspace";
import { Button } from "./shared/Button";

export function App() {
  const {
    profiles,
    selectedProfile,
    loading,
    openingId,
    error,
    loadProfiles,
    openProfile,
    selectProfile,
  } = useProfilesStore();
  const [creating, setCreating] = useState(false);
  const main = useRef<HTMLElement>(null);
  useEffect(() => {
    void loadProfiles();
  }, [loadProfiles]);
  useEffect(() => {
    if (!loading) main.current!.focus();
  }, [selectedProfile, loading]);
  return (
    <>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex min-h-20 max-w-6xl items-center justify-between gap-5 px-5 py-4 sm:px-8">
          <div
            dir="ltr"
            className="flex items-center gap-2.5 text-2xl font-semibold tracking-tight text-teal-900"
          >
            <Orbit size={30} aria-hidden="true" />
            <Text as="span" i18nKey="app.name" />
          </div>
          {selectedProfile ? (
            <Button variant="secondary" onClick={() => void loadProfiles()}>
              <Text i18nKey="app.logout" />
            </Button>
          ) : (
            <Text
              as="span"
              className="hidden text-sm text-slate-500 sm:inline"
              i18nKey="app.tagline"
            />
          )}
        </div>
      </header>
      <main
        ref={main}
        tabIndex={-1}
        aria-busy={loading}
        className="mx-auto max-w-5xl px-5 py-9 focus:outline-none sm:px-8 sm:pt-16 sm:pb-14"
      >
        {error && (
          <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 p-5">
            <p role="alert" className="text-rose-700">
              <Text i18nKey={profileErrorKey(error)} />
            </p>
            <Button
              variant="secondary"
              className="mt-3"
              onClick={() => void loadProfiles()}
            >
              <Text i18nKey="common.retry" />
            </Button>
          </div>
        )}
        {loading ? (
          <Text as="p" role="status" i18nKey="app.loading" />
        ) : selectedProfile ? (
          <ProfileWorkspace profile={selectedProfile} />
        ) : (
          <ProfileChooser
            profiles={profiles}
            openingId={openingId}
            onOpen={(id) => void openProfile(id)}
            onCreate={() => setCreating(true)}
          />
        )}
      </main>
      {creating && (
        <NewProfileDialog
          onClose={() => setCreating(false)}
          onCreated={(profile) => {
            setCreating(false);
            selectProfile(profile);
          }}
        />
      )}
    </>
  );
}
