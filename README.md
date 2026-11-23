# Figured

A small, local tool for making sense of symptoms and everyday patterns.

Figured is designed to turn a static list into a personal workspace: explore what resonates, rate its impact, write down your own experiences, and organize entries in a way that makes sense to you.

> The base JSON data is available. The application is still at the specification stage; setup instructions are to come.

## Planned features

- **A shared starting point:** 100 entries across nine categories, stored as a JSON base list.
- **Independent profiles:** each profile starts fresh and keeps its own assessments, notes, and organization.
- **Hebrew RTL interface:** compact category trees with readable English entry names.
- **Personal reflection:** impact ratings from 1–5, editable descriptions, and separate personal experience notes.
- **Flexible organization:** move and reorder entries, manage categories and colors, and sort by impact.
- **Archive and search:** set entries aside, restore them later, and search both active and archived entries.
- **Local file storage:** profile data saved as JSON files that can be copied or backed up.

The planned app uses a dependency-free Node.js server with browser HTML, CSS, and JavaScript, running on your own machine.

## Project docs

- [Specification](.scratch/symptoms-manager/spec.md)
- [Implementation tasks](.scratch/symptoms-manager/issues/)
- [Domain glossary](GLOSSARY.md)
- [Base JSON data](data/symptoms-base.json)
- [Starting symptom list](.scratch/symptoms-manager/adhd-reddit-symptoms-list-formatted.md)

Base entry and category names reference future i18n paths. The Markdown lists are retained temporarily to preserve the original names until locale files are created.

## Logo

Figured uses the [Orbit icon from Lucide](https://lucide.dev/icons/orbit).

## License

[MIT](LICENSE).
