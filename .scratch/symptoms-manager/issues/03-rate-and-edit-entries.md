# 03: Rate and edit symptom entries

**What to build:** Within a selected profile, let the user assess how strongly an entry affects them and edit its names, general description, and personal experience in a focused popover that saves before closing.

**Blocked by:** 02: Create and open independent profiles.

**Status:** ready-for-agent

- [ ] Expose `impactRating` as 1–5 with the label "מידת השפעה". Keep "טרם דורג" separate from rating 1, and allow clearing an assessment back to not rated.
- [ ] Rating changes save immediately and survive reopening the profile and restarting the app.
- [ ] Opening an entry displays its Hebrew/English names, general description, and separate personal experience field in a modal-style popover.
- [ ] Trap focus and make the background inert, including Log out, while the editor is open.
- [ ] Submit, Cmd+Enter, close button, Escape, and backdrop click all save the current text before closing. Do not provide an entry Cancel/discard action.
- [ ] Require a nonempty Hebrew name. Show validation or save errors without closing the editor or losing its text. Treat user text as text rather than executable markup.
- [ ] Save complete profile state with an expected revision. Validate names, nullable integer ratings, palette colors, IDs, and category/entry references; reject stale revisions without overwriting newer work.
- [ ] Serialize saves and atomically replace the profile file. Do not report a successful save before it succeeds; do not switch profiles while automatic saves remain pending or have failed.
- [ ] Verify edited text and ratings persist after logout/reopen and server restart, while the JSON base, Markdown originals, and another profile remain unchanged.
- [ ] Browser checks cover each editor closing route, keyboard focus, blocked background controls, clearing ratings, and separate general/personal text. Focused profile/HTTP tests cover invalid input, malformed state, stale revisions, and failed writes.

## Comments

- Source: the approved Figured spec and project glossary. No dedicated merge or edit/rating history is included.
- Documentation only until Guy explicitly authorizes coding.
