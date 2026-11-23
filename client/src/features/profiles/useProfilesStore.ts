import i18n from "../../i18n/i18n";
import { create } from "zustand";
import type { Catalog, Profile, ProfileSummary } from "../../shared/profile";
import { profilesApi } from "./profilesApi";

type ProfilesState = {
  catalog: Catalog | null;
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
    catalog: null,
    profiles: [],
    selectedProfile: null,
    loading: true,
    openingId: null,
    error: null,

    async loadProfiles() {
      set({ selectedProfile: null, loading: true, error: null });
      try {
        const [{ profiles }, catalog] = await Promise.all([
          profilesApi.list(), profilesApi.catalog(),
        ]);
        for (const [language, dictionary] of Object.entries(catalog.translations)) {
          i18n.addResourceBundle(language, "catalog", dictionary);
        }
        set({ profiles, catalog, loading: false });
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
