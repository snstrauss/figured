import { FormProvider } from "react-hook-form";
import { useEffect, useRef } from "react";
import type { Profile } from "../../../shared/profile";
import { NewProfileForm } from "./NewProfileForm";
import { useNewProfileForm } from "./useNewProfileForm";

type NewProfileDialogProps = {
  onClose: () => void;
  onCreated: (profile: Profile) => void;
};

export function NewProfileDialog({
  onClose,
  onCreated,
}: NewProfileDialogProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const { form, submit } = useNewProfileForm(onCreated);
  const { isSubmitting } = form.formState;
  useEffect(() => {
    const node = dialog.current!;
    node.showModal();
    return () => node.close();
  }, []);
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
      <FormProvider {...form}>
        <NewProfileForm
          onSubmit={form.handleSubmit(submit)}
          onCancel={() => dialog.current!.close()}
        />
      </FormProvider>
    </dialog>
  );
}
