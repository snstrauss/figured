# 07: Search the active list and archive

**What to build:** Let the user locate entries with one simple search field that filters both the active category tree and archive while keeping their saved organization intact.

**Blocked by:** 06: Archive, restore, and permanently delete entries.

**Status:** ready-for-agent

- [ ] Search Hebrew and English names, general descriptions, and personal experience, case-insensitively, without adding a separate rating-status filter.
- [ ] Filter active and archived entries from their shared underlying state. Show only matching entries and relevant category branches, opening matching branches and the archive when needed.
- [ ] Clearing search restores normal expansion rather than leaving the tree permanently rearranged by a query. Searching never changes saved order, category membership, or archive state.
- [ ] Disable drag/reorder controls and sorting while filtered so hidden entries cannot make positional changes ambiguous. Restore normal movement controls when the query is cleared.
- [ ] Keep entry editing and rating changes available for results, using the established popover and save behavior; recalculate matches after saved edits.
- [ ] Show a clear no-results state, and preserve Hebrew RTL presentation, readable English names, keyboard access, and category colors in filtered views.
- [ ] Search is limited to the selected profile; logging out clears the query and does not expose results from another profile.
- [ ] Browser checks cover matches in each field, English case differences, Hebrew text, active and archived matches, matching-branch expansion, no results, expansion restoration, and movement restrictions while filtered.
- [ ] Verify searching alone leaves profile files, other profiles, the base, and Markdown originals unchanged, while edits made through results persist normally.

## Comments

- Source: the approved Figured spec and project glossary. The archive dependency makes this slice verifiable across the complete active/archive tree.
- Documentation only until Guy explicitly authorizes coding.
