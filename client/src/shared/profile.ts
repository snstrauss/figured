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

}

export interface NameDictionary {
  categories: Record<string, { name: string }>;
  symptoms: Record<string, { name: string }>;
}

export interface ProfileSummary {
  id: string;
  name: string;
}

export interface SymptomAssessment {
  impactRating: number | null;
  personalExamples: string[];
}

export interface Profile extends ProfileSummary {
  symptoms: Record<string, SymptomAssessment>;
}

export interface Catalog {
  categories: Category[];
  entries: SymptomEntry[];
  translations: Record<Language, NameDictionary>;
}
