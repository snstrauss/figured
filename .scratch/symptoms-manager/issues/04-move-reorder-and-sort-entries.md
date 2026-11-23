# 04: Move, reorder, and sort entries

**What to build:** Let the user rearrange entries within and between categories and apply a simple impact-based sort, with all changes reflected in the profile's saved order and category colors.

**Blocked by:** 03: Rate and edit symptom entries.

**Status:** ready-for-agent

- [ ] Provide drag handles for within-category reordering and movement between categories. Collapsed category headers remain usable drop targets.
- [ ] Each entry belongs to exactly one category before and after movement, without duplicate references or lost entries. Cross-category movement immediately inherits the destination color.
- [ ] Provide keyboard-accessible reordering and a move-to-category control as alternatives to dragging.
- [ ] Persist ordering and membership immediately using the profile save boundary, retaining entry IDs, text, ratings, and other state.
- [ ] A global sort button rewrites each category's underlying ordered sequence: highest impact first, unrated last, Hebrew alphabetical name breaking ties. Categories themselves remain in place.
- [ ] Keep manual dragging available after sorting. Do not retain a separate previous manual order or introduce a persistent sorted-view mode.
- [ ] Ordering operates on the full category sequence, preserving the single-source-of-truth arrangement needed when archive filtering is added.
- [ ] Failed saves remain visibly unsuccessful and do not silently lose changes or overwrite newer revisions.
- [ ] Verify within-category moves, cross-category moves, collapsed drop targets, inherited colors, keyboard controls, equal-rating alphabetical ties, unrated placement, and subsequent manual movement through real browser workflows.
- [ ] Verify reordered state survives server restart and remains isolated to the selected profile. Add focused boundary tests only for ordering cases not already established end to end.

## Comments

- Source: the approved Figured spec and project glossary. This ticket and ticket 05 can proceed independently after ticket 03 is complete.
- Documentation only until Guy explicitly authorizes coding.
