export type Language = "he" | "en";

export type ColorKey =
  | "blue"
  | "teal"
  | "violet"
  | "rose"
  | "indigo"
  | "orange"
  | "slate"
  | "green"
  | "amber";

export interface Category {
  id: string;
  name: string;
  colorKey: ColorKey;
  entryIds: string[];
}

export interface SymptomEntry {
  id: string;
  name: string;
  generalDescription: string;
  personalExperience: string;
  impactRating: number | null;
  archived: boolean;
}

export interface NameDictionary {
  categories: Record<string, { name: string }>;
  symptoms: Record<string, { name: string }>;
}

export interface ProfileSummary {
  id: string;
  name: string;
}

export interface Profile extends ProfileSummary {
  formatVersion: number;
  revision: number;
  categories: Category[];
  entries: SymptomEntry[];
  translations: Record<Language, NameDictionary>;
}

export function profileName(
  profile: Profile,
  language: Language,
  path: string,
): string {
  const [group, id] = path.split(".");
  return profile.translations[language][group as keyof NameDictionary][id].name;
}
