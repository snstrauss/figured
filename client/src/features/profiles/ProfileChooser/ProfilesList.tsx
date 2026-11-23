import type { ProfileSummary } from "../../../shared/profile";
import { ProfileCard } from "./ProfileCard";

type ProfilesListProps = {
  profiles: ProfileSummary[];
  openingId: string | null;
  onOpen: (id: string) => void;
};

export function ProfilesList({
  profiles,
  openingId,
  onOpen,
}: ProfilesListProps) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {profiles.map((profile) => (
        <li key={profile.id}>
          <ProfileCard
            profile={profile}
            disabled={openingId !== null}
            onOpen={() => onOpen(profile.id)}
          />
        </li>
      ))}
    </ul>
  );
}
