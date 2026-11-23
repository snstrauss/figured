import { useEffect, useRef, useState } from "react";
import { useProfilesStore } from "./features/profiles/useProfilesStore";
import { AppHeader } from "./AppHeader";
import { ProfilesContent } from "./features/profiles/ProfilesContent";
import { ProfilesErrorNotice } from "./features/profiles/ProfilesErrorNotice";
import { NewProfileDialog } from "./features/profiles/NewProfileDialog/NewProfileDialog";

export function App() {
  const { selectedProfile, loading, error, loadProfiles, selectProfile } =
    useProfilesStore();
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
      <AppHeader
        hasSelectedProfile={selectedProfile !== null}
        onLogout={() => void loadProfiles()}
      />
      <main
        ref={main}
        tabIndex={-1}
        aria-busy={loading}
        className="mx-auto max-w-5xl px-5 py-9 focus:outline-none sm:px-8 sm:pt-16 sm:pb-14"
      >
        {error && (
          <ProfilesErrorNotice
            error={error}
            onRetry={() => void loadProfiles()}
          />
        )}
        <ProfilesContent onCreate={() => setCreating(true)} />
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
