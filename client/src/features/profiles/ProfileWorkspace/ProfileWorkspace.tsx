import type { Profile } from "../../../shared/profile";
import { Translated } from "../../../shared/Text";
import { ProfileCategories } from "../../categories/ProfileCategories";

type ProfileWorkspaceProps = { profile: Profile };

function ProfileWorkspaceHeader({ profile }: ProfileWorkspaceProps) {
  return (
    <section className="mb-8">
      <Translated as="p" className="eyebrow" i18nKey="workspace.eyebrow" />
      <h1 className="text-4xl font-semibold leading-tight tracking-tight wrap-anywhere">
        <bdi dir="auto">{profile.name}</bdi>
      </h1>
      <p className="mt-2.5 text-slate-500">
        <Translated
          i18nKey="workspace.summary"
          values={{
            entries: profile.entries.filter((entry) => !entry.archived).length,
            categories: profile.categories.length,
          }}
        />
      </p>
    </section>
  );
}

export function ProfileWorkspace({ profile }: ProfileWorkspaceProps) {
  return (
    <>
      <ProfileWorkspaceHeader profile={profile} />
      <ProfileCategories profile={profile} />
    </>
  );
}
