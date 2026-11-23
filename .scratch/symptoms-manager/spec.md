# Figured

Status: ready-for-agent

## Problem Statement

The existing list contains 100 symptom entries across nine categories, but static Markdown is awkward for assessing personal relevance, reorganizing entries, writing personal examples, and setting duplicates aside. Guy needs a small, readable local tool that makes these actions practical without turning them into another large platform project.

Different profiles must work independently from the same original list, without modifying that base or one another's work.

## Solution

A locally hosted Hebrew RTL interface with a profile chooser and an interactive category tree. Each profile starts as an independent copy of a structured base list and saves to its own local JSON file. Within a profile, users can rate, edit, organize, search, and archive entries. Entry editing takes place in a popover that blocks the underlying interface and saves before closing.

## User Stories

1. As a user, I want to see available profiles when opening the app, so that I can choose the workspace I intend to use.
2. As a user, I want to create a named profile from the base list, so that I can begin with all 100 entries and nine categories.
3. As a user, I want new profiles to start unrated with empty personal notes, so that another profile's assessments never become my defaults.
4. As a user, I want all edits to belong exclusively to the selected profile, so that different workspaces can evolve independently.
5. As a user, I want to reopen a profile after restarting the app, so that my saved work remains available.
6. As a user, I want to log out to the profile chooser, so that I can choose another profile.
7. As a user, I want the original base list preserved, so that personal edits do not destroy the starting material.
8. As a user, I want Hebrew RTL navigation with readable English names, so that the interface matches the list's language.
9. As a user, I want collapsible category folders and compact entry rows, so that I can keep the list manageable on screen.
10. As a user, I want each category and its entries to share a color, so that membership is easy to recognize.
11. As a user, I want to drag entries between categories, so that I can organize the list according to my understanding.
12. As a user, I want moved entries to inherit their destination category's color, so that the visual grouping stays accurate.
13. As a user, I want to reorder entries within a category, so that their saved order can express my priorities.
14. As a user, I want keyboard-accessible alternatives to dragging, so that moving entries does not depend on precise pointer use.
15. As a user, I want an impact rating from 1 to 5, so that I can record how strongly an entry affects me.
16. As a user, I want not rated to be distinct from 1, so that an unassessed entry is not mistaken for a non-issue.
17. As a user, I want to clear a rating, so that I can return an entry to not rated.
18. As a user, I want to sort each category by descending impact rating, so that stronger issues appear first.
19. As a user, I want unrated entries last and equal ratings ordered alphabetically in Hebrew, so that sorting is predictable.
20. As a user, I want to drag entries after sorting without recovering an older order, so that sorting remains a simple rearrangement.
21. As a user, I want to open an entry in an editing popover, so that I can focus on its details without leaving the list.
22. As a user, I want separate general description and personal experience fields, so that explanation and my own examples remain distinct.
23. As a user, I want to edit entry names and descriptions, so that I can clarify or consolidate overlapping meanings.
24. As a user, I want to add entries, so that the list can include subjects missing from the base.
25. As a user, I want Submit and Cmd+Enter to save and close the editor, so that I can finish editing efficiently.
26. As a user, I want closing the editor to save my current text, so that closing it does not silently discard work.
27. As a user, I want the underlying interface, including Log out, unavailable while editing, so that I cannot leave around an unfinished editor.
28. As a user, I want save errors to retain my text and keep the editor open, so that a failed save cannot look like a successful one.
29. As a user, I want to create and rename categories, so that the grouping can evolve with my understanding.
30. As a user, I want a small category color palette, so that changing a color requires no complex picker.
31. As a user, I want to delete truly empty categories, so that unused groups do not clutter the list.
32. As a user, I want to archive entries without losing their information or position, so that I can set them aside reversibly.
33. As a user, I want an archive folder at the bottom containing archived entries under their categories, so that it mirrors the relevant part of the original tree.
34. As a user, I want restoring an entry to reveal it in its existing category and position, so that archiving does not become a hidden move operation.
35. As a user, I want to permanently delete an archived entry after confirmation, so that I can remove unwanted items deliberately.
36. As a user, I want simple search over names and descriptions, so that I can locate an entry without opening every category.
37. As a user, I want changes saved in normal local files, so that my work does not depend on browser storage and can be copied or backed up.

## Implementation Decisions

- Use the name **Figured** and the [Lucide Orbit icon](https://lucide.dev/icons/orbit) as the tool's logo.
- Build a small, dependency-free Node HTTP server with browser HTML, CSS, and JavaScript. Use a single local startup command, `npm start`, and bind to loopback only. Keep this application independent of the broader personal-growth platform.
- Use `data/symptoms-base.json` as the structured base list, with `categories` and `entries` arrays and no base or format version fields. Preserve descriptions, category membership, and ordering, with stable IDs tied to the original entry numbers. Each category and entry has a `name` translation path, such as `categories.category-01.name` or `symptoms.symptom-001.name`, rather than language-specific name fields. Retain both Markdown lists unchanged temporarily to preserve the original Hebrew and English names until locale files are created. Runtime profile creation reads JSON rather than parsing Markdown; resolving name paths requires the future locale files.
- Creating a profile copies the complete base into a separately saved JSON document. Profiles do not use overlays or live inheritance. Subsequent base changes affect new profiles only. All category and entry changes are profile-specific.
- A profile contains a stable generated ID, a nonempty display name, a format version, a save revision, categories, entries, and its own Hebrew/English name dictionaries copied from `locales/`. Entry and category `name` paths resolve against those profile-local dictionaries, allowing later name edits without changing shared translations. Profile names are metadata rather than filesystem paths. New profiles have no ratings, personal notes, or archived entries.
- Base categories contain `id`, `name` (a translation path), `colorKey`, and ordered `entryIds`. Base entries contain `id`, `name` (a translation path), `generalDescription` (source Hebrew text), `personalExperience`, nullable integer `impactRating`, and `archived`. Profile-specific name editing remains supported and must not alter shared translations. An entry occurs in exactly one category's sequence. Membership and position have one source of truth, including for archived entries.
- Provide profile listing and creation, plus profile-specific state loading and saving: `GET /api/profiles`, `POST /api/profiles`, and `GET`/`PUT /api/profiles/:id/state`. A save submits a complete profile state with its expected revision; the response returns the accepted state and next revision. Reject stale revisions rather than overwriting newer work.
- Validate profile IDs, nonempty names, ratings, palette colors, and category/entry references. Serialize writes and replace saved JSON atomically. Invalid existing files produce a visible error, never silent reseeding. Loading or saving one profile must not overwrite another profile or the base.
- Begin at the profile chooser. New Profile requests a name and creates a workspace; selecting an existing profile loads it. Log out returns to the chooser after pending automatic saves complete. This is workspace selection, not authentication.
- Render Hebrew RTL with isolated English names. Compact rows show names, impact rating, an editor-opening control, and a drag handle. Category headers remain drop targets when collapsed. Provide move-to-category and keyboard-reordering controls as alternatives to dragging.
- Use the Hebrew impact label "מידת השפעה" and not-rated label "טרם דורג". Ratings range from 1, not an issue, to 5, very strong. Rating changes and movement save immediately; clearing a rating restores not rated.
- The global sort action rewrites each category's underlying entry sequence by descending impact rating, unrated last, then Hebrew alphabetical name. This includes archived entries in the shared sequence. Categories stay in place. There is no persistent sorted-view mode or separately retained previous arrangement; manual moves remain available afterward.
- Entry editing uses a modal-style popover with trapped focus and an inert background. Submit, Cmd+Enter, close button, Escape, and backdrop click share one save-and-close operation. There is no entry Cancel/discard action. Closing waits for save success; validation or save errors leave the editor open with its text and a clear error. Logout cannot be used while the editor is open. Use the same editing shell for categories.
- Require a nonempty Hebrew entry name; the English name is optional for added entries. New entries start unrated with empty personal experience. Closing an untouched, blank new-entry draft creates nothing; an edited draft with missing required information stays open for correction.
- Archiving changes only the archive flag. The active tree and archive are filtered views of the same category sequences. Restoring clears the flag without moving the entry. Explicit sorting or dragging can change the underlying arrangement independently of archive operations.
- Show the archive only when archived entries exist, as a subdued folder at the bottom. Expanding it reveals only categories containing archived entries and those entries. Preserve category colors and readable contrast. Archived entries offer restore and confirmed permanent deletion.
- Use a fixed, small palette for category colors. Deleting a category is allowed only when it has neither active nor archived entries. Changing its color updates all its entries.
- Search Hebrew and English names, general descriptions, and personal experience, case-insensitively, across active and archived entries. Show matching branches expanded; clearing the query restores normal expansion. Disable reordering while filtered to avoid ambiguous positions. Include clear empty-profile, empty-category, and no-results states.

## Testing Decisions

- Reuse the boundaries already included in the design Guy confirmed: real browser workflows through the local server to saved files, plus focused Node tests for persistence and failure cases. There is no existing application or testing prior art in this project.
- Prefer the browser-to-file workflow as the highest integration boundary. Assert visible outcomes and persisted data rather than private functions, DOM implementation details, or snapshots that mirror the implementation. Use isolated temporary profile storage, never personal working profiles.
- Verify the base import contains exactly 100 entries in nine categories with original descriptions and order, and stable name paths mapped to the source names by original numbering. Verify the Markdown references and JSON base remain unchanged by all profile operations.
- Create two profiles, modify one, restart the app, and verify its changes survive while the other profile and base remain unchanged. Cover profile chooser, selection, new-profile creation, and logout.
- Cover not rated versus rating 1, ratings 1–5, clearing ratings, quick saves, separate general and personal text, added entries, and reopening saved edits.
- Exercise Submit, Cmd+Enter, close button, Escape, and backdrop close. Each must persist edits before closing; background controls must be inaccessible; failed saves must preserve the open editor and draft. Cover untouched blank new-entry drafts and invalid required names.
- Cover within-category movement, cross-category movement and inherited color, collapsed drop targets, keyboard alternatives, rating sorting, alphabetical ties, unrated placement, and manual dragging after sorting.
- Archive entries from multiple categories and verify the subset tree, hidden active entries, retained text/rating/order, restoration, confirmed permanent deletion, and prevention of deleting categories with archived entries. Archiving then restoring without another ordering operation must reproduce the prior order exactly.
- Cover search across both names and both text fields, active and archived results, expansion restoration, filtered reordering restrictions, category creation/editing/color presets, and empty states. Inspect RTL reading order, English isolation, focus behavior, and color contrast in a real browser.
- Use focused Node tests at the profile service/HTTP boundary for malformed saved state, invalid memberships and ratings, stale revisions, failed writes, and profile isolation. Include shared ordering semantics for archive/restore. Avoid redundant internal tests for behavior already established end to end.
- Report automated and browser evidence separately. Do not describe static inspection or Node tests as browser proof.

## Out of Scope

- App implementation is not authorized by this spec publication; wait for Guy's explicit instruction to write code.
- Hosted deployment, accounts, passwords, access isolation between profiles, cloud synchronization, or broader platform integration.
- Profile renaming, deletion, duplication, comparison, or automatic propagation of base changes into existing profiles.
- Dedicated entry merging, edit history, rating history, nested categories, category reordering, extra rating filters, full color pickers, or theme customization.
- Automatic clinical interpretation, diagnosis, treatment recommendations, or reclassification of the source list.
- Editing or cleaning the source Markdown documents, or activating the Markdown cleanup skill.

## Further Notes

Use the domain glossary's terms: base list, profile, symptom entry, category, impact rating, personal experience, archive, and Log out. Keep the interface practical rather than expanding the personal-growth platform architecture.

The project directory is `figured`. The specification, tickets, and two source lists are under `.scratch/symptoms-manager/`. Task 02 adds the local Node application, shared name dictionaries, and profile storage; later tickets cover editing and organization.

The local Markdown issue tracker is the publication destination. The status indicates the specification is ready for agent work; it does not override the user's separate requirement to authorize coding.

## Comments

- During grill-with-docs, Guy confirmed the category tree, ratings, ordering, archive model, profile independence, file storage, and popover save behavior.
- Earlier pending-confirmation notes are superseded: Guy stated the design was fine and explicitly requested to-spec.
- During spec publication, Guy instructed: "do not write any code until i say so." Publication is documentation only.
