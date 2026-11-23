# 02: Create and open independent profiles

**What to build:** A locally hosted Hebrew RTL app where the user can create a named profile from the static base list, browse its category tree, log out, and reopen saved profiles after restarting. Establish the smallest working browser-to-file path while keeping the base and all profiles independent.

**Blocked by:** 01: Generate the JSON base list.

**Status:** ready-for-agent

**Completion:** Implementation and automated checks complete; browser verification pending Guy's review.

- [x] Start the React + TypeScript + Tailwind UI and Node API with a separate `npm start` in each project; Vite serves port 3000 and proxies `/api` to port 3001, both on loopback.
- [x] Use **Figured** as the tool's name and the [Lucide Orbit icon](https://lucide.dev/icons/orbit) as its logo.
- [x] Load the JSON base produced by task 01 when creating profiles; do not parse Markdown at runtime.
- [x] Resolve base name paths through locale data before displaying names; the Markdown lists retain the original names until those locale files exist. Keep profile-specific name edits independent of shared translations.
- [x] On opening the app, display available profiles and a New Profile action. Include a clear empty-list state.
- [x] Creating a profile requires a nonempty display name and copies the complete base into a separate JSON state file with a generated stable profile ID. Do not use the display name as a filesystem path.
- [x] New profiles start with no ratings, personal notes, or archived entries. Include a profile format version and a save revision, and establish ordered category membership as the single source of truth for entry position.
- [x] Selecting a profile displays a collapsible Hebrew RTL category tree with compact entries, readable English names, category colors, and inherited entry colors.
- [x] Log out returns to the chooser without deleting state. Opening another profile and restarting the app load that profile's existing saved data rather than reseeding it.
- [x] Provide profile listing, creation, and state loading through the server. Persist profile creation atomically; show clear errors for failed creation or malformed saved state rather than silently replacing data.
- [ ] Verify the full create/open/logout/restart workflow through a real browser and isolated temporary profile storage. Confirm that creating or opening one profile leaves existing profiles and the base unchanged.
- [x] Include focused profile-boundary checks. Report browser evidence separately from automated tests.

## Comments

- Source: the approved Figured spec and project glossary. Guy explicitly invoked implementation of this ticket.
- Guy requested a small personal app that trusts its fixed base and generated identifiers, without defensive input/output schemas or a generic Markdown importer. Runtime reads JSON only.
- Profile name paths resolve against copied `translations.he` and `translations.en` dictionaries in each saved profile. Future name editing changes only that profile.
- Guy operates the browser himself. No browser automation or browser-verification claim is included.
- Leave staging, committing, and pushing to Guy.

## Validation evidence

- Profile HTTP/file tests pass: create/list/reopen, nonempty profile names, malformed saved JSON without replacement, profile and dictionary isolation across server restart, and failed creation without success or lost files. All use temporary storage.
- `npm run check` passes frontend TypeScript checks and server JavaScript syntax checks. `npm run build` produces the Vite frontend bundle.
- One-time locale comparison confirms all 100 Hebrew/English entry names and nine category names exactly match the formatted source. The base JSON and both Markdown sources are unchanged.
- `npm start` serves the React UI on `127.0.0.1:3000` and the API on `127.0.0.1:3001`; the working server is left running for Guy. No entry editing, rating controls, sorting, archiving, or search were added.
- Review baseline: `a8578aee2b9c172f497fff77a25dca51fdc97aee`. Standards: zero findings. Spec: zero implementation findings; real-browser verification remains outstanding.

## React refactor

- Replaced vanilla DOM rendering with React and TypeScript, styled with Tailwind. Profile state lives in `useProfiles`; dialog drafts and category expansion remain local. Zustand is deferred until needed.
- Added Vite hot reload, a single startup command using concurrently, typechecking/build scripts, a frontend formatter, and an npm lockfile. Backend contracts and profile files are unchanged.
- Six tests pass, including React entry delivery and API proxying against temporary profile storage. This is HTTP integration evidence, not browser rendering proof; Guy handles browser review.

## Client/server separation

- Independent `client/` and `server/` projects now own their package manifests, lockfiles, scripts, and tests. Start each separately; no combined startup process.
- React tests simulate responses in memory. Node HTTP/file tests remain server-owned and are run explicitly. The old Vite/backend probe test was removed.
- Base data, shared locales, and the existing `data/profiles/` storage location are unchanged.
