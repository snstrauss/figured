import { Translated } from "../../shared/Text";
import { ProfileChooser } from "./ProfileChooser/ProfileChooser";
import { ProfileWorkspace } from "./ProfileWorkspace/ProfileWorkspace";
import { useProfilesStore } from "./useProfilesStore";

type ProfilesContentProps = { onCreate: () => void };

export function ProfilesContent({ onCreate }: ProfilesContentProps) {
  const { loading, selectedProfile, profiles, openingId, openProfile } =
    useProfilesStore();
  if (loading) return <Translated as="p" role="status" i18nKey="app.loading" />;
  if (selectedProfile) return <ProfileWorkspace profile={selectedProfile} />;
  return (
    <ProfileChooser
      profiles={profiles}
      openingId={openingId}
      onOpen={(id) => void openProfile(id)}
      onCreate={onCreate}
    />
  );
}
