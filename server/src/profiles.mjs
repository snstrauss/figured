import { randomUUID } from 'node:crypto';
import { mkdir, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export class ProfileError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export function createProfileStore(profilesDirectory) {
  async function load(id) {
    let contents;
    try {
      contents = await readFile(join(profilesDirectory, `${id}.json`), 'utf8');
    } catch (error) {
      if (error.code === 'ENOENT') throw new ProfileError(404, 'not_found', 'Profile not found.');
      throw error;
    }
    try {
      const profile = JSON.parse(contents);
      return profile;
    } catch {
      throw new ProfileError(500, 'invalid_profile', `Invalid saved profile: ${id}.json. The file was not changed.`);
    }
  }

  async function list() {
    await mkdir(profilesDirectory, { recursive: true });
    const files = await readdir(profilesDirectory);
    const profiles = await Promise.all(files.filter((name) => name.endsWith('.json')).map((name) => load(name.slice(0, -5))));
    return profiles.map(({ id, name }) => ({ id, name })).sort((a, b) => a.name.localeCompare(b.name, 'he'));
  }

  async function create(name) {
    if (!name.trim()) throw new ProfileError(400, 'invalid_name', 'A profile name is required.');
    const profile = { id: randomUUID(), name: name.trim(), symptoms: {} };
    await save(profile);
    return profile;
  }

  async function save(profile) {
    await mkdir(profilesDirectory, { recursive: true });
    const temporary = join(profilesDirectory, `.${profile.id}.tmp`);
    const target = join(profilesDirectory, `${profile.id}.json`);
    try {
      await writeFile(temporary, `${JSON.stringify(profile, null, 2)}\n`);
      await rename(temporary, target);
    } finally {
      await rm(temporary, { force: true });
    }
  }

  return { load, list, create, save };
}
