import assert from 'node:assert/strict';
import { mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { createApp } from '../src/http.mjs';
import { createProfileStore } from '../src/profiles.mjs';
import { migrateProfiles } from '../src/migrateProfiles.mjs';

async function start(t, profilesDirectory) {
  const server = createApp({ profilesDirectory });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const url = `http://127.0.0.1:${server.address().port}`;
  const request = (path, options) => fetch(`${url}${path}`, options);
  request.close = () => new Promise((resolve) => server.close(resolve));
  return request;
}

async function storage(t) {
  const directory = await mkdtemp(join(tmpdir(), 'figured-test-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  return directory;
}

function createProfile(request, name) {
  return request('/api/profiles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
}

test('a new profile stores only personal assessments and browses a shared translated catalog', async (t) => {
  const request = await start(t, await storage(t));
  assert.deepEqual(await (await request('/api/profiles')).json(), { profiles: [] });

  const response = await createProfile(request, '  אישי  ');
  assert.equal(response.status, 201);
  const profile = await response.json();
  assert.equal(profile.name, 'אישי');
  assert.match(profile.id, /^[a-f\d-]{36}$/);
  assert.deepEqual(profile.symptoms, {});
  assert.deepEqual(Object.keys(profile).sort(), ['id', 'name', 'symptoms']);
  const catalog = await (await request('/api/catalog')).json();
  assert.equal(catalog.categories.length, 9);
  assert.equal(catalog.entries.length, 100);
  for (const language of ['he', 'en']) {
    for (const entry of [...catalog.categories, ...catalog.entries]) {
      const [group, id] = entry.name.split('.');
      assert.ok(catalog.translations[language][group][id].name);
    }
  }
  assert.ok(catalog.entries.every((entry) => !('impactRating' in entry) && !('personalExperience' in entry)));

  const listing = await (await request('/api/profiles')).json();
  assert.equal(listing.profiles.length, 1);
  assert.equal(listing.profiles[0].id, profile.id);
  assert.equal(listing.profiles[0].name, 'אישי');
  assert.deepEqual(await (await request(`/api/profiles/${profile.id}/state`)).json(), profile);
});

test('blank profile names are rejected without creating files', async (t) => {
  const directory = await storage(t);
  const request = await start(t, directory);
  for (const name of ['', '  ']) {
    const response = await createProfile(request, name);
    assert.equal(response.status, 400);
    assert.equal((await response.json()).error.code, 'invalid_name');
  }
  assert.deepEqual(await readdir(directory), []);
});

test('malformed saved state is reported on list and load without replacing the file', async (t) => {
  const directory = await storage(t);
  const request = await start(t, directory);
  const profile = await (await createProfile(request, 'בדיקה')).json();
  const file = join(directory, `${profile.id}.json`);
  for (const malformed of ['{broken']) {
    await writeFile(file, malformed);
    for (const path of ['/api/profiles', `/api/profiles/${profile.id}/state`]) {
      const response = await request(path);
      assert.equal(response.status, 500);
      assert.equal((await response.json()).error.code, 'invalid_profile');
    }
    assert.equal(await readFile(file, 'utf8'), malformed);
  }
});

test('personal assessments survive restart independently of other profiles and the catalog', async (t) => {
  const directory = await storage(t);
  const baseFiles = ['data/symptoms-base.json', 'locales/he.json', 'locales/en.json'].map(file => new URL(`../../${file}`, import.meta.url));
  const original = await Promise.all(baseFiles.map((file) => readFile(file, 'utf8')));
  const request = await start(t, directory);
  const first = await (await createProfile(request, '../שם פרטי')).json();
  const second = await (await createProfile(request, '../שם פרטי')).json();
  assert.notEqual(first.id, second.id);
  assert.deepEqual((await readdir(directory)).sort(), [`${first.id}.json`, `${second.id}.json`].sort());
  // Seed an already-edited profile on disk; entry editing is a later ticket.
  first.symptoms['symptom-001'] = { impactRating: 4, personalExamples: ['הערה שנשמרה', 'דוגמה נוספת'] };
  await writeFile(join(directory, `${first.id}.json`), JSON.stringify(first));
  await request.close();
  const restarted = await start(t, directory);
  assert.deepEqual(await (await restarted(`/api/profiles/${first.id}/state`)).json(), first);
  assert.deepEqual(await (await restarted(`/api/profiles/${second.id}/state`)).json(), second);
  assert.deepEqual(await Promise.all(baseFiles.map((file) => readFile(file, 'utf8'))), original);
});

test('failed profile creation returns an error without claiming success', async (t) => {
  const directory = await storage(t);
  const blockedDirectory = join(directory, 'file-not-directory');
  await writeFile(blockedDirectory, 'keep');
  const request = await start(t, blockedDirectory);
  assert.equal((await createProfile(request, 'בדיקה')).status, 500);
  assert.equal(await readFile(blockedDirectory, 'utf8'), 'keep');
  assert.deepEqual(await readdir(directory), ['file-not-directory']);
});


test('legacy conversion preserves ratings and examples and backs up the complete original once', async (t) => {
  const directory = await storage(t);
  const legacy = {
    id: 'legacy', name: 'Personal', formatVersion: 1, revision: 3,
    categories: [{ id: 'category-01', entryIds: ['symptom-001'] }],
    entries: [
      { id: 'symptom-001', impactRating: 4, personalExperience: 'My example', archived: true },
      { id: 'symptom-002', impactRating: null, personalExperience: '', archived: false },
    ],
    translations: { he: { symptoms: { 'symptom-001': { name: 'Custom name' } } } },
  };
  const original = JSON.stringify(legacy);
  await writeFile(join(directory, 'legacy.json'), original);
  const store = createProfileStore(directory);
  const fresh = await store.create('Fresh');
  assert.equal(await migrateProfiles(directory), 1);
  assert.equal(await readFile(join(directory, 'legacy.json.bak'), 'utf8'), original);
  assert.deepEqual(await store.load('legacy'), {
    id: 'legacy', name: 'Personal', symptoms: {
      'symptom-001': { impactRating: 4, personalExamples: ['My example'] },
      'symptom-002': { impactRating: null, personalExamples: [] },
    },
  });
  assert.deepEqual(await store.load(fresh.id), fresh);
  assert.equal(await migrateProfiles(directory), 0);
  assert.equal(await readFile(join(directory, 'legacy.json.bak'), 'utf8'), original);
});
