# Lessons Directory

This directory contains all lesson content in Markdown format.

## Structure

- `lessons.json` - Manifest file listing all available lessons
- `*.md` - Individual lesson files in Markdown format

## Adding a New Lesson

1. Create a new Markdown file in this directory (e.g., `05_nuova_lezione.md`)
2. Add frontmatter at the top of the file:

```markdown
---
title: "05. Titolo Lezione"
subtitle: "Sottotitolo"
date: "DD/MM/YYYY"
description: "Breve descrizione della lezione"
---

# Contenuto della Lezione

Il tuo contenuto qui...
```

3. Update `lessons.json` to include the new lesson:

```json
{
  "id": 5,
  "filename": "05_nuova_lezione.md",
  "title": "05. Titolo Lezione",
  "subtitle": "Sottotitolo",
  "date": "DD/MM/YYYY",
  "description": "Breve descrizione della lezione"
}
```

## Markdown Features

- **Headers**: Use `#`, `##`, `###` for different heading levels
- **Math**: Use `$...$` for inline math, `$$ ... $$` for display math
- **HTML**: You can include HTML for complex layouts (like SVG diagrams)
- **Lists**: Use `-` or `1.` for bullet and numbered lists
- **Code**: Use backticks for inline code or triple backticks for code blocks

## Example

See existing lesson files for examples of proper formatting.
