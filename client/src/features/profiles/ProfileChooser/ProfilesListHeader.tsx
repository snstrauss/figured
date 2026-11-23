import { Button } from "../../../shared/Button";
import { Translated } from "../../../shared/Text";

type ProfilesListHeaderProps = { onCreate: () => void };

export function ProfilesListHeader({ onCreate }: ProfilesListHeaderProps) {
  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <Translated
        as="h2"
        id="profiles-title"
        className="text-lg font-semibold sm:text-2xl"
        i18nKey="profiles.listTitle"
      />
      <Button onClick={onCreate}>
        <Translated i18nKey="profiles.create" />
      </Button>
    </div>
  );
}
