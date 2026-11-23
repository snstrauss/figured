# 06: Archive, restore, and permanently delete entries

**What to build:** Let the user set entries aside in an archive subtree, restore them to their existing category and position, or permanently delete archived entries after confirmation.

**Blocked by:** 04: Move, reorder, and sort entries; 05: Add entries and manage categories.

**Status:** ready-for-agent

- [ ] Archiving changes only an entry's archive flag. Retain its category reference, position, names, descriptions, personal experience, and impact rating.
- [ ] Remove archived entries from the active category view without removing them from the underlying ordered category sequence.
- [ ] When archived entries exist, show a subdued archive folder at the bottom of the tree. Hide this folder when no entries are archived.
- [ ] Expanding the archive shows only categories with archived entries and their archived entries. Preserve category colors and readable text; use the same category and entry records rather than copied archive data.
- [ ] Restoring clears the archive flag and reveals the entry in its existing category and position. Archiving and restoring alone must not reorder entries.
- [ ] Explicit sort or movement can still change the shared underlying order. Verify that sorting includes archived entries and that restoration then respects the resulting sequence.
- [ ] Archived entries offer restore and permanent deletion. Require confirmation before permanent deletion, then remove the entry and its category ordering reference together.
- [ ] Block category deletion when it contains only archived entries. After all its entries are permanently deleted or restored and moved elsewhere, normal empty-category deletion becomes available.
- [ ] Persist all archive operations through the existing profile save boundary, including error feedback and profile isolation.
- [ ] Browser checks archive entries from multiple categories, inspect the subset tree, restore original ordering, sort with archived entries, confirm/cancel permanent deletion, and exercise category deletion protection.
- [ ] Verify saved archive state across server restart. Add focused boundary checks for shared ordering and invalid archive/category references where browser tests do not provide sufficient coverage.

## Comments

- Source: the approved Figured spec and project glossary. Ticket 04 supplies ordering behavior; ticket 05 supplies category management and its deletion restriction.
- Documentation only until Guy explicitly authorizes coding.
