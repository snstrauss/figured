import { copyFile, readdir } from 'node:fs/promises';
import { constants } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createProfileStore } from './profiles.mjs';

export function catalogProfile(legacy) {
  const symptoms = Object.fromEntries(legacy.entries.map((entry) => [entry.id, {
    impactRating: entry.impactRating,
    personalExamples: entry.personalExperience ? [entry.personalExperience] : [],
  }]));
  return { id: legacy.id, name: legacy.name, symptoms };
}

export async function migrateProfiles(directory) {
  const store = createProfileStore(directory);
  const files = await readdir(directory);
  let converted = 0;
  for (const file of files.filter((name) => name.endsWith('.json'))) {
    const profile = await store.load(file.slice(0, -5));
    if (!profile.entries) continue;
    // Keep the entire original, including old names, order and archive flags.
    await copyFile(join(directory, file), join(directory, `${file}.bak`), constants.COPYFILE_EXCL);
    await store.save(catalogProfile(profile));
    converted++;
  }
  return converted;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const directory = process.env.FIGURED_PROFILES_DIR ?? fileURLToPath(new URL('../../data/profiles', import.meta.url));
  console.log(`Converted ${await migrateProfiles(directory)} profiles; originals retained as .json.bak files.`);
}
