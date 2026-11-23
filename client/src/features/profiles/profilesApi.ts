import type { Profile, ProfileSummary } from "../../shared/profile";

class ProfileApiError extends Error {
  constructor(public code: string) {
    super(code);
  }
}

const errorKeys: Record<string, string> = {
  invalid_name: "errors.invalid_name",
  invalid_profile: "errors.invalid_profile",
  not_found: "errors.not_found",
  storage_error: "errors.storage_error",
};

export function profileErrorKey(error: Error): string {
  return error instanceof ProfileApiError
    ? (errorKeys[error.code] ?? "errors.unknown")
    : "errors.unknown";
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(path, options);
  const data = await response.json();
  if (!response.ok) throw new ProfileApiError(data.error.code);
  return data;
}

export const profilesApi = {
  list: () => request<{ profiles: ProfileSummary[] }>("/api/profiles"),
  load: (id: string) => request<Profile>(`/api/profiles/${id}/state`),
  create: (name: string) =>
    request<Profile>("/api/profiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    }),
};
