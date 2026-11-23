# Figured

A small, local tool for making sense of symptoms and everyday patterns.

Figured is designed to turn a static list into a personal workspace: explore what resonates, rate its impact, write down your own experiences, and organize entries in a way that makes sense to you.

The first app slice is available: create independent profiles, browse the category tree, and reopen saved work. Editing, ratings, ordering, archive, and search are planned next.

## Run locally

With Node.js 22 or newer:

```bash
npm start
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000). There are no dependencies to install. The server listens on loopback only.

Profiles are stored as individual JSON files in `data/profiles/`, which is ignored by Git. Copy that directory to back up your work. Each file includes its own entries, categories, and name dictionaries; changes to the base or shared locale files do not change existing profiles.

`PORT` changes the local port. `FIGURED_PROFILES_DIR` selects a different profile directory, useful for isolated checks.

```bash
npm run check
npm test
```

The checks validate JavaScript syntax; the tests exercise real HTTP requests and temporary profile files. Browser verification is recorded separately in the implementation ticket.

## Planned features

- **A shared starting point:** 100 entries across nine categories, stored as a JSON base list.
- **Independent profiles:** each profile starts fresh and keeps its own assessments, notes, and organization.
- **Hebrew RTL interface:** compact category trees with readable English entry names.
- **Personal reflection:** impact ratings from 1–5, editable descriptions, and separate personal experience notes.
- **Flexible organization:** move and reorder entries, manage categories and colors, and sort by impact.
- **Archive and search:** set entries aside, restore them later, and search both active and archived entries.
- **Local file storage:** profile data saved as JSON files that can be copied or backed up.

The app uses a dependency-free Node.js server with browser HTML, CSS, and JavaScript, running on your own machine.

## Project docs

- [Specification](.scratch/symptoms-manager/spec.md)
- [Implementation tasks](.scratch/symptoms-manager/issues/)
- [Domain glossary](GLOSSARY.md)
- [Base JSON data](data/symptoms-base.json)
- [Starting symptom list](.scratch/symptoms-manager/adhd-reddit-symptoms-list-formatted.md)

Base entry and category names reference the name dictionaries in [locales/he.json](locales/he.json) and [locales/en.json](locales/en.json). The original Markdown lists remain as reference material.

## Logo

Figured uses the [Orbit icon from Lucide](https://lucide.dev/icons/orbit).
See [third-party notices](THIRD_PARTY_NOTICES.md) for its license.

## License

[MIT](LICENSE).
