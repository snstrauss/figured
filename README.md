# Figured

A small, local tool for making sense of symptoms and everyday patterns.

Figured is designed to turn a static list into a personal workspace: explore what resonates, rate its impact, write down your own experiences, and organize entries in a way that makes sense to you.

The first app slice is available: create independent profiles, browse the category tree, and reopen saved work. Editing, ratings, ordering, archive, and search are planned next.

## Run locally

Use Node.js 22.12 or newer. The client and server are independent projects, each with its own package manifest, lockfile, dependencies, and tests. Start each in its own terminal; there is no root startup command.

**Server** — API on [127.0.0.1:3001](http://127.0.0.1:3001):

```bash
cd server
npm install
npm start
```

`npm run dev` starts the API with Node's watch mode. The server uses built-in Node modules and has no package dependencies.

**Client** — UI on [127.0.0.1:3000](http://127.0.0.1:3000):

```bash
cd client
npm install
npm start
```

The client runs Vite and proxies `/api` to the server. Both listen on loopback only. Stop each with Ctrl+C in its terminal.

Server `PORT` and client `API_PORT` default to `3001`; set both if you change the API port. Server `FIGURED_PROFILES_DIR` selects an alternate profile directory.

Profiles remain in the repository's `data/profiles/`, ignored by Git. Copy that directory to back up your work. Each file includes independent entries, categories, and name dictionaries.

## Checks and tests

Run from `client/`:

```bash
npm run check
npm run build
npm test
```

The client has TypeScript checks, Vite builds, and Vitest/React Testing Library tests using simulated HTTP responses in memory. `npm run format` formats its source and configuration. Tests don't start the API or open a browser.

Run from `server/`:

```bash
npm run check
npm test
```

Server tests use Node's test runner with temporary profile storage and temporary loopback servers. Run them when you want HTTP/file integration checks. UI appearance and browser behavior are checked manually.

## Planned features

- **A shared starting point:** 100 entries across nine categories, stored as a JSON base list.
- **Independent profiles:** each profile starts fresh and keeps its own assessments, notes, and organization.
- **Hebrew RTL interface:** compact category trees with readable English entry names.
- **Personal reflection:** impact ratings from 1–5, editable descriptions, and separate personal experience notes.
- **Flexible organization:** move and reorder entries, manage categories and colors, and sort by impact.
- **Archive and search:** set entries aside, restore them later, and search both active and archived entries.
- **Local file storage:** profile data saved as JSON files that can be copied or backed up.

The frontend uses React, TypeScript, Vite, and Tailwind CSS. The Node.js API uses built-in modules for local JSON persistence. React state handles the current UI; no global state library is needed yet.

Frontend code lives in `client/src/`: `App.tsx` owns the layout, `features/profiles/` contains the chooser, dialog, workspace, request methods, and profile hook, and `shared/` contains profile types and the shared button. `npm run format` formats the frontend source and configuration.

## Project docs

- [Specification](.scratch/symptoms-manager/spec.md)
- [Implementation tasks](.scratch/symptoms-manager/issues/)
- [Domain glossary](GLOSSARY.md)
- [Base JSON data](data/symptoms-base.json)
- [Starting symptom list](.scratch/symptoms-manager/adhd-reddit-symptoms-list-formatted.md)

The base JSON defines categories and their ordered symptom IDs. Symptom names and descriptions use translation keys derived from those IDs; the text lives in [locales/he.json](locales/he.json) and [locales/en.json](locales/en.json). The original Markdown lists remain as reference material.

## Logo

Figured uses the [Orbit icon from Lucide](https://lucide.dev/icons/orbit).
See [third-party notices](THIRD_PARTY_NOTICES.md) for its license.

## License

[MIT](LICENSE).
