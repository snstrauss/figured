import type { FormEventHandler } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "../../../shared/Button";
import { Translated } from "../../../shared/Text";
import type { NewProfileFormValues } from "./useNewProfileForm";

type NewProfileFormProps = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  onCancel: () => void;
};

export function NewProfileForm({ onSubmit, onCancel }: NewProfileFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <NewProfileHeading />
      <ProfileNameField />
      <NewProfileSubmissionError />
      <NewProfileFormActions onCancel={onCancel} />
    </form>
  );
}

function NewProfileHeading() {
  return (
    <>
      <Translated as="p" className="eyebrow" i18nKey="newProfile.eyebrow" />
      <Translated
        as="h2"
        id="dialog-title"
        className="text-3xl font-semibold"
        i18nKey="newProfile.title"
      />
      <Translated
        as="p"
        id="dialog-description"
        className="mt-3 mb-6 text-slate-500"
        i18nKey="newProfile.description"
      />
    </>
  );
}

function ProfileNameField() {
  const {
    register,
    formState: { isSubmitting },
  } = useFormContext<NewProfileFormValues>();
  return (
    <>
      <Translated
        as="label"
        htmlFor="profile-name"
        className="mb-2 block font-semibold"
        i18nKey="newProfile.name"
      />
      <input
        id="profile-name"
        {...register("name")}
        disabled={isSubmitting}
        dir="auto"
        autoComplete="off"
        required
        className="w-full rounded-lg border border-slate-400 bg-white px-3 py-3"
      />
    </>
  );
}

function NewProfileSubmissionError() {
  const {
    formState: { errors },
  } = useFormContext<NewProfileFormValues>();
  if (!errors.root?.server) return null;
  return (
    <p role="alert" className="mt-3 text-rose-700">
      <Translated i18nKey={errors.root.server.message!} />
    </p>
  );
}

type NewProfileFormActionsProps = { onCancel: () => void };

function NewProfileFormActions({ onCancel }: NewProfileFormActionsProps) {
  const {
    formState: { isSubmitting },
  } = useFormContext<NewProfileFormValues>();
  return (
    <div className="mt-6 flex gap-2.5">
      <Button type="submit" disabled={isSubmitting}>
        <Translated i18nKey="newProfile.submit" />
      </Button>
      <Button variant="secondary" disabled={isSubmitting} onClick={onCancel}>
        <Translated i18nKey="common.cancel" />
      </Button>
    </div>
  );
}
