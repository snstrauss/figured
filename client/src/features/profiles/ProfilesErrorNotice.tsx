import { Button } from "../../shared/Button";
import { Translated } from "../../shared/Text";
import { profileErrorKey } from "./profilesApi";

type ProfilesErrorNoticeProps = { error: Error; onRetry: () => void };

export function ProfilesErrorNotice({
  error,
  onRetry,
}: ProfilesErrorNoticeProps) {
  return (
    <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 p-5">
      <p role="alert" className="text-rose-700">
        <Translated i18nKey={profileErrorKey(error)} />
      </p>
      <Button variant="secondary" className="mt-3" onClick={onRetry}>
        <Translated i18nKey="common.retry" />
      </Button>
    </div>
  );
}
