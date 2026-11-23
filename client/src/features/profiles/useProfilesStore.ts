import { create } from "zustand";
import type { Profile, ProfileSummary } from "../../shared/profile";
import { profilesApi } from "./profilesApi";

type ProfilesState = {
  profiles: ProfileSummary[];
  selectedProfile: Profile | null;
  loading: boolean;
  openingId: string | null;
  error: Error | null;
};

type ProfilesActions = {
  loadProfiles: () => Promise<void>;
  openProfile: (id: string) => Promise<void>;
  selectProfile: (profile: Profile) => void;
};

export const useProfilesStore = create<ProfilesState & ProfilesActions>()(
  (set) => ({
    profiles: [],
    selectedProfile: null,
    loading: true,
    openingId: null,
    error: null,

    async loadProfiles() {
      set({ selectedProfile: null, loading: true, error: null });
      try {
        const { profiles } = await profilesApi.list();
        set({ profiles, loading: false });
      } catch (error) {
        set({ error: error as Error, loading: false });
      }
    },

    async openProfile(id) {
      set({ openingId: id, error: null });
      try {
        const selectedProfile = await profilesApi.load(id);
        set({ selectedProfile, openingId: null });
      } catch (error) {
        set({ error: error as Error, openingId: null });
      }
    },

    selectProfile: (profile) => set({ selectedProfile: profile }),
  }),
);
