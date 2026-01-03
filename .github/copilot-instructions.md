# GitHub Copilot Instructions for Fisica Repository

## Project Overview

This is an interactive physics course application (Corso di Fisica Generale I) built as a Single Page Application (SPA). The project provides educational content in Italian with features including dark mode, mathematical formula rendering, and responsive design.

## Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+ classes)
- **Styling**: Tailwind CSS (via CDN)
- **Math Rendering**: KaTeX for LaTeX formulas
- **No Build System**: Static files served directly, all dependencies via CDN
- **Storage**: LocalStorage for theme preferences

## Code Style Guidelines

### JavaScript

- Use ES6+ modern syntax (classes, arrow functions, template literals)
- Use `const` by default, `let` only when reassignment is needed
- Follow existing class-based patterns:
  - `ThemeManager` for dark mode functionality
  - `Router` for SPA navigation
  - `LessonRenderer` for content display
- Use descriptive variable names
- Add comments in Italian for major sections (e.g., `// GESTIONE TEMA`)

### HTML

- Semantic HTML5 elements preferred
- Use Tailwind CSS utility classes for styling
- Maintain accessibility attributes (ARIA labels, roles)
- Follow dark mode pattern: `class="bg-white dark:bg-gray-800"`

### CSS

- Primarily use Tailwind utilities
- Custom CSS in `styles.css` only for specific overrides
- Support both light and dark themes consistently
- Responsive design: mobile-first approach

## Language Considerations

- **UI Text**: Italian language for all user-facing content
- **Code Comments**: Italian is acceptable, especially for major sections
- **Variable Names**: English preferred for code, Italian acceptable for content
- **Content in lessonsDB**: All lesson content must be in Italian

## Project Structure

```
fisica/
├── index.html          # Main HTML file with inline Tailwind config
├── app.js              # Main JavaScript (ThemeManager, Router, LessonRenderer, lessonsDB)
├── styles.css          # Custom CSS overrides
├── README              # Project documentation (Italian)
└── .github/
    └── copilot-instructions.md  # This file
```

## Key Patterns and Conventions

### Theme Management
- Dark mode uses `dark` class on `<html>` and `<body>`
- LocalStorage key: `'theme'` with values `'light'` or `'dark'`
- Respects system preference if no manual choice made

### Lesson Database
- Lessons stored in `lessonsDB` object with numeric keys
- Each lesson has: `title`, `subtitle`, `date`, `filename`, `description`, `content`
- Content includes HTML with Tailwind classes and LaTeX formulas

### LaTeX Formulas
- Inline formulas: `$formula$`
- Display formulas: `$$formula$$` wrapped in `<div class="formula-block py-2">`
- KaTeX auto-render processes formulas after content loads

### Routing
- Hash-based routing: `#lesson/1`, `#lesson/2`, etc.
- `#home` for homepage
- Router handles navigation without page reloads

## Best Practices for This Project

1. **No Dependencies to Install**: All libraries via CDN, no npm/package.json
2. **Test in Browser**: Changes require manual browser testing (no automated tests)
3. **Preserve Accessibility**: Maintain WCAG AA compliance
4. **Responsive Design**: Test on multiple screen sizes
5. **Dark Mode**: Always implement both light and dark variants
6. **Italian Content**: Keep all educational content in Italian
7. **Math Formulas**: Use proper LaTeX syntax for KaTeX rendering
8. **LocalStorage**: Only for user preferences, not content

## Common Tasks

### Adding a New Lesson
1. Add new entry to `lessonsDB` with incremented numeric key
2. Include all required fields: title, subtitle, date, filename, description, content
3. Format content with proper HTML structure and Tailwind classes
4. Include LaTeX formulas where appropriate
5. Ensure dark mode support in content styles

### Modifying Theme
1. Update `ThemeManager` class in `app.js`
2. Ensure LocalStorage persistence
3. Update CSS with both light and dark variants
4. Test theme toggle functionality

### Adding Navigation Features
1. Update `Router` class in `app.js`
2. Add route handling in `handleRoute()` method
3. Update UI components to use new routes
4. Test browser back/forward buttons

## Accessibility Requirements

- All interactive elements must be keyboard accessible
- Proper heading hierarchy (h1, h2, h3)
- Alt text for images/diagrams (currently SVG diagrams)
- Sufficient color contrast in both themes
- ARIA labels where semantic HTML is insufficient

## Performance Considerations

- Minimize DOM manipulations
- Use event delegation where appropriate
- LocalStorage operations are synchronous but minimal
- KaTeX rendering is async with `defer` loading

## Security Notes

- No backend/API calls (static site)
- No user authentication required
- No sensitive data storage
- CDN resources use SRI hashes where appropriate (consider adding)

## When Suggesting Changes

- Maintain the minimalist, clean design aesthetic
- Keep the physics course focus in mind
- Preserve the Italian language throughout educational content
- Ensure changes work without a build step
- Test dark mode behavior
- Consider mobile/tablet viewports
- Verify mathematical formulas render correctly
