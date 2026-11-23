import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import { Button } from "../../shared/Button";
import type { Profile } from "../../shared/profile";
import { Text } from "../../shared/Text";
import { profileErrorKey, profilesApi } from "./profilesApi";

type NewProfileDialogProps = {
  onClose: () => void;
  onCreated: (profile: Profile) => void;
};

type NewProfileFormValues = {
  name: string;
};

export function NewProfileDialog({
  onClose,
  onCreated,
}: NewProfileDialogProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<NewProfileFormValues>({ defaultValues: { name: "" } });

  useEffect(() => {
    const node = dialog.current!;
    node.showModal();
    return () => node.close();
  }, []);
  async function submit({ name }: NewProfileFormValues) {
    try {
      onCreated(await profilesApi.create(name));
    } catch (error) {
      setError("root.server", {
        type: "server",
        message: profileErrorKey(error as Error),
      });
    }
  }

  return (
    <dialog
      ref={dialog}
      onCancel={(event) => {
        if (isSubmitting) event.preventDefault();
      }}
      onClose={onClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      className="m-auto w-11/12 max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-slate-800 shadow-2xl backdrop:bg-slate-900/35"
    >
      <form onSubmit={handleSubmit(submit)}>
        <Text as="p" className="eyebrow" i18nKey="newProfile.eyebrow" />
        <Text
          as="h2"
          id="dialog-title"
          className="text-3xl font-semibold"
          i18nKey="newProfile.title"
        />
        <Text
          as="p"
          id="dialog-description"
          className="mt-3 mb-6 text-slate-500"
          i18nKey="newProfile.description"
        />
        <Text
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
        {errors.root?.server && (
          <p role="alert" className="mt-3 text-rose-700">
            <Text i18nKey={errors.root.server.message!} />
          </p>
        )}
        <div className="mt-6 flex gap-2.5">
          <Button type="submit" disabled={isSubmitting}>
            <Text i18nKey="newProfile.submit" />
          </Button>
          <Button
            variant="secondary"
            disabled={isSubmitting}
            onClick={() => dialog.current!.close()}
          >
            <Text i18nKey="common.cancel" />
          </Button>
        </div>
      </form>
    </dialog>
  );
}
