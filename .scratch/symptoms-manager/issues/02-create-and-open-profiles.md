# 02: Create and open independent profiles

**What to build:** A locally hosted Hebrew RTL app where the user can create a named profile from the static base list, browse its category tree, log out, and reopen saved profiles after restarting. Establish the smallest working browser-to-file path while keeping the base and all profiles independent.

**Blocked by:** 01: Generate the JSON base list.

**Status:** ready-for-agent

- [ ] Start the dependency-free Node app with `npm start`; serve browser HTML/CSS/JavaScript on loopback only.
- [ ] Use **Figured** as the tool's name and the [Lucide Orbit icon](https://lucide.dev/icons/orbit) as its logo.
- [ ] Load the JSON base produced by task 01 when creating profiles; do not parse Markdown at runtime.
- [ ] Resolve base name paths through locale data before displaying names; the Markdown lists retain the original names until those locale files exist. Keep profile-specific name edits independent of shared translations.
- [ ] On opening the app, display available profiles and a New Profile action. Include a clear empty-list state.
- [ ] Creating a profile requires a nonempty display name and copies the complete base into a separate JSON state file with a generated stable profile ID. Do not use the display name as a filesystem path.
- [ ] New profiles start with no ratings, personal notes, or archived entries. Include a profile format version and a save revision, and establish ordered category membership as the single source of truth for entry position.
- [ ] Selecting a profile displays a collapsible Hebrew RTL category tree with compact entries, readable English names, category colors, and inherited entry colors.
- [ ] Log out returns to the chooser without deleting state. Opening another profile and restarting the app load that profile's existing saved data rather than reseeding it.
- [ ] Provide profile listing, creation, and state loading through the server. Persist profile creation atomically; show clear errors for failed creation or malformed saved state rather than silently replacing data.
- [ ] Verify the full create/open/logout/restart workflow through a real browser and isolated temporary profile storage. Confirm that creating or opening one profile leaves existing profiles and the base unchanged.
- [ ] Include focused profile-boundary checks. Report browser evidence separately from automated tests.

## Comments

- Source: the approved Figured spec and project glossary. Publishing this ticket does not authorize implementation; wait for Guy's explicit instruction to write code.
