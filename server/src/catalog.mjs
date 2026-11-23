import { readFile } from 'node:fs/promises';

export async function loadCatalog() {
  const [base, he, en] = await Promise.all([
    readFile(new URL('../../data/symptoms-base.json', import.meta.url), 'utf8').then(JSON.parse),
    readFile(new URL('../../locales/he.json', import.meta.url), 'utf8').then(JSON.parse),
    readFile(new URL('../../locales/en.json', import.meta.url), 'utf8').then(JSON.parse),
  ]);
  return { ...base, translations: { he, en } };
}
