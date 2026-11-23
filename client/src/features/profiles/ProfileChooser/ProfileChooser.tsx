import { Translated } from "../../../shared/Text";
import type { ProfileSummary } from "../../../shared/profile";
import { EmptyProfilesListPlaceholder } from "./EmptyProfilesListPlaceholder";
import { ProfileChooserIntroduction } from "./ProfileChooserIntroduction";
import { ProfilesList } from "./ProfilesList";
import { ProfilesListHeader } from "./ProfilesListHeader";

type ProfileChooserProps = {
  profiles: ProfileSummary[];
  openingId: string | null;
  onOpen: (id: string) => void;
  onCreate: () => void;
};
export function ProfileChooser({
  profiles,
  openingId,
  onOpen,
  onCreate,
}: ProfileChooserProps) {
  return (
    <>
      <ProfileChooserIntroduction />
      <section aria-labelledby="profiles-title">
        <ProfilesListHeader onCreate={onCreate} />
        {profiles.length ? (
          <ProfilesList
            profiles={profiles}
            openingId={openingId}
            onOpen={onOpen}
          />
        ) : (
          <EmptyProfilesListPlaceholder />
        )}
      </section>
      <Translated
        as="p"
        className="mt-6 text-sm text-slate-500"
        i18nKey="profiles.footer"
      />
    </>
  );
}
