import { useForm } from "react-hook-form";
import type { Profile } from "../../../shared/profile";
import { profileErrorKey, profilesApi } from "../profilesApi";

export type NewProfileFormValues = { name: string };

export function useNewProfileForm(onCreated: (profile: Profile) => void) {
  const form = useForm<NewProfileFormValues>({ defaultValues: { name: "" } });
  const { setError } = form;
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

  return { form, submit };
}
