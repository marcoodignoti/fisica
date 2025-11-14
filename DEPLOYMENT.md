# Deployment Guide - Fisica Website

## Overview
This repository is configured for automatic deployment to GitHub Pages with preview deployments for pull requests.

## Live Website
- **Production URL**: https://marcoodignoti.github.io/fisica/
- **Status**: Active after merging to main branch

## Deployment Workflows

### 1. Production Deployment (`.github/workflows/deploy.yml`)
When changes are pushed to the `main` branch:
1. GitHub Actions workflow is triggered automatically
2. The workflow checks out the repository
3. Configures GitHub Pages
4. Uploads all files as an artifact
5. Deploys to production GitHub Pages
6. Website is available at the live URL

### 2. Preview Deployment (`.github/workflows/preview.yml`) ✨ NEW
When pull requests are created or updated:
1. GitHub Actions workflow is triggered automatically
2. Creates a preview deployment for the PR
3. Comments the preview URL on the pull request
4. Updates preview on every new commit to the PR
5. Preview is automatically cleaned up when PR is closed

**Benefits of Preview Deployments:**
- ✅ Test changes before merging to main
- ✅ Share preview links with collaborators
- ✅ Catch visual bugs early
- ✅ Independent preview per PR branch

### Manual Deployment
You can also trigger deployment manually:
1. Go to Actions tab in GitHub
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"
4. Select the branch and click "Run workflow" button

## Required GitHub Settings

### Enable GitHub Pages
1. Go to repository **Settings**
2. Navigate to **Pages** section
3. Under **Source**, select: **GitHub Actions**
4. Save the settings

### Permissions
**Production Workflow** (`.github/workflows/deploy.yml`):
- `contents: read` - To read repository files
- `pages: write` - To deploy to Pages
- `id-token: write` - For authentication

**Preview Workflow** (`.github/workflows/preview.yml`):
- `pull-requests: write` - To comment preview URL on PRs
- `contents: write` - To deploy preview pages

## Website Features

✅ **Single Page Application (SPA)**
- Smooth navigation without page reloads
- Client-side routing

✅ **Dark/Light Mode**
- Theme toggle button
- Respects system preferences
- Persists user choice in localStorage

✅ **Mathematical Formulas**
- KaTeX rendering for LaTeX formulas
- Supports inline and display math

✅ **Responsive Design**
- Mobile-friendly
- Tablet-optimized
- Desktop experience

✅ **Accessibility**
- Semantic HTML
- ARIA labels
- Keyboard navigation

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **CSS Framework**: Tailwind CSS (CDN)
- **Math Rendering**: KaTeX
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions

## File Structure

```
fisica/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── lessons/                    # Lesson content directory
│   ├── lessons.json            # Lessons manifest
│   ├── README.md               # Documentation for adding lessons
│   ├── 01_intro.md             # Lesson 1 in Markdown
│   ├── 02_cinematica.md        # Lesson 2 in Markdown
│   ├── 03_dinamica.md          # Lesson 3 in Markdown
│   └── 04_energia.md           # Lesson 4 in Markdown
├── .gitignore                  # Git ignore rules
├── README                      # Documentation
├── index.html                  # Main HTML file
├── app.js                      # JavaScript application
└── styles.css                  # Custom styles
```

## Maintenance

### Adding New Lessons
The content is now **Markdown-based** and dynamically loaded!

1. Create a new `.md` file in `lessons/` directory
2. Add frontmatter metadata (title, date, description)
3. Write content in Markdown (supports LaTeX math with `$...$` and `$$...$$`)
4. Update `lessons/lessons.json` to register the new lesson
5. Commit and push to main
6. Automatic deployment will publish changes

Example lesson file:
```markdown
---
title: "05. New Topic"
subtitle: "Subtitle"
date: "DD/MM/YYYY"
description: "Brief description"
---

# Heading

Your content here with $inline math$ and display math:

$$ E = mc^2 $$
```

For detailed instructions, see `lessons/README.md`.

### Updating Styles
1. Edit `styles.css` for custom styles
2. Or modify Tailwind config in `index.html`
3. Commit and push to main

### Testing Locally
Before pushing changes, test locally:
```bash
python -m http.server 8080
```
Then visit: http://localhost:8080

## Troubleshooting

### Deployment Fails
- Check Actions tab for error logs
- Verify GitHub Pages is enabled
- Ensure workflow permissions are correct

### Website Not Updating
- Clear browser cache
- Check GitHub Actions to see if deployment succeeded
- Verify you pushed to the correct branch (main)

### 404 Error
- Ensure repository is public or Pages is enabled for private repos
- Check that index.html exists in root directory
- Verify the URL is correct

## Support

For issues or questions:
1. Check the Actions tab for deployment logs
2. Review this guide
3. Check GitHub Pages documentation
4. Open an issue in the repository
