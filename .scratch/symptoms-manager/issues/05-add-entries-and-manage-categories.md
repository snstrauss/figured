# 05: Add entries and manage categories

**What to build:** Let the user expand their profile's list with new entries and categories, rename categories, select simple category colors, and remove genuinely empty categories.

**Blocked by:** 03: Rate and edit symptom entries.

**Status:** ready-for-agent

- [ ] Add a symptom entry to a chosen category through the existing editing popover, with a generated stable ID and explicit saved placement in that category's order.
- [ ] Require a nonempty Hebrew entry name; allow the English name to be omitted. New entries start unrated, unarchived, and with empty personal experience.
- [ ] Closing an untouched blank new-entry draft creates nothing. If a modified draft lacks required information, keep the editor open with a clear error rather than losing it or creating an invalid entry.
- [ ] Allow creating and renaming categories with stable IDs and nonempty names. Use the same blocking modal shell and save-on-close behavior as entry editing.
- [ ] Offer a small fixed palette rather than a full color picker. Changing category color updates its entries' inherited appearance without changing their content or membership.
- [ ] Permit category deletion only when it contains no entries, including archived entries. Enforce this at the save boundary as well as in the UI; archive interactions are demonstrated in ticket 06.
- [ ] Keep category order unchanged except that newly created categories are appended. Category reordering is not part of this ticket.
- [ ] Added entries, new categories, names, and colors survive reopening and restart while other profiles, the base, and Markdown originals remain unchanged.
- [ ] Browser checks cover creation/editing, Cmd+Enter and close-to-save, palette selection, empty categories, invalid names, blocked logout while editing, and prevented nonempty-category deletion.
- [ ] Use the existing profile save and failure handling rather than adding a separate persistence mechanism.

## Comments

- Source: the approved Figured spec and project glossary. This ticket and ticket 04 can proceed independently after ticket 03 is complete.
- Documentation only until Guy explicitly authorizes coding.
