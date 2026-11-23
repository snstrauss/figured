# 01: Generate the JSON base list

**What to build:** Convert the formatted symptom list into the structured JSON base that Figured will use to create independent profiles. This task covers only the base data, without building the app, server, or profile persistence.

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

**Completion:** Implemented, validated, and reviewed; left uncommitted for Guy.

- [x] Use `../adhd-reddit-symptoms-list-formatted.md` as the source and retain both Markdown lists unchanged temporarily until locale files preserve the original names.
- [x] Produce `data/symptoms-base.json` with `categories` and `entries` arrays, containing exactly 100 symptom entries across nine categories. Omit base and format version fields.
- [x] Assign stable entry IDs tied to the original entry numbers and stable category IDs. Represent membership and position through each category's ordered `entryIds`, with every entry referenced exactly once.
- [x] Store `name` translation paths on entries and categories, such as `symptoms.symptom-001.name` and `categories.category-01.name`. Do not add language-specific name fields or locale files in this task. Original names remain available in the Markdown lists and map to paths through the original numbering.
- [x] Preserve Hebrew general descriptions and original category membership and ordering. Include preset category `colorKey` values; initialize `impactRating` to `null`, `personalExperience` to `""`, and `archived` to `false`.
- [x] Use one-time checks to verify JSON validity, counts, unique IDs and translation paths, resolved membership references, defaults, and exact description/order preservation. Add no retained tests or importer.
- [x] Keep this task limited to generating and validating the JSON base; profile creation, locale resolution, and runtime loading belong to task 02.

## Comments

- Source: the approved Figured spec and project glossary. Extracted from the original create/open-profiles ticket.
- Guy explicitly authorized implementation of this task. Base versioning was removed, names became future i18n references, and both Markdown lists are retained temporarily. Profile format versioning and save revisions remain separate concerns.
- Leave all changes uncommitted; committing and pushing belong to Guy unless explicitly requested.

## Validation evidence

- One-time Node validation passed: 100 entries, nine categories, unique stable IDs and translation paths, exactly one category membership per entry, exact source descriptions and ordering, expected colors, and empty personal defaults.
- SHA-256 comparisons confirmed both Markdown lists were unchanged. Local README links resolve. No retained tests, importer, dependencies, app code, or locale files were added.
- Standards review: zero findings. Spec review: zero implementation findings. Review baseline: `20d5e4e`, including the generated JSON and scoped working changes.
- No browser verification applies to this data-only task.
