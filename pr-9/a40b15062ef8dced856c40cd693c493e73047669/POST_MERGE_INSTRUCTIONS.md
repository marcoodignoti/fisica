# Post-Merge Instructions

## ⚠️ IMPORTANT: Complete These Steps After Merging

After this PR is merged to the `main` branch, you need to enable GitHub Pages in the repository settings.

### Step-by-Step Guide:

#### 1. Enable GitHub Pages
1. Go to your repository on GitHub: https://github.com/marcoodignoti/fisica
2. Click on **Settings** (top navigation bar)
3. Scroll down and click on **Pages** in the left sidebar
4. Under **Build and deployment**:
   - **Source**: Select `GitHub Actions`
   - Click **Save** if prompted

#### 2. Wait for Deployment
1. Go to the **Actions** tab
2. You should see the "Deploy to GitHub Pages" workflow running
3. Wait for it to complete (usually 1-2 minutes)
4. A green checkmark ✅ indicates successful deployment

#### 3. Access Your Website
Once deployment is complete, visit:
- **https://marcoodignoti.github.io/fisica/**

#### 4. Verify Everything Works
- [ ] Landing page loads correctly
- [ ] Can navigate to index page
- [ ] All 4 lessons are accessible
- [ ] Dark/light mode toggle works
- [ ] Math formulas render properly
- [ ] Navigation between lessons works

### Troubleshooting

**If the website shows 404:**
- Wait a few minutes for DNS propagation
- Clear your browser cache
- Verify GitHub Pages is enabled in Settings → Pages

**If deployment fails:**
- Check the Actions tab for error logs
- Ensure the repository is public (or Pages is enabled for private repos)
- Verify the workflow file exists at `.github/workflows/deploy.yml`

**If formulas don't render:**
- This is normal - KaTeX is loaded from CDN
- The CDN resources should load fine in production

### Future Updates

After the initial setup, any push to the `main` branch will automatically:
1. Trigger the GitHub Actions workflow
2. Build and deploy the updated website
3. Make changes live at the URL above

No additional configuration needed! 🎉

### Getting Help

If you encounter any issues:
1. Check `DEPLOYMENT.md` for detailed troubleshooting
2. Review the Actions tab for deployment logs
3. Ensure Settings → Pages → Source is set to "GitHub Actions"

---

**Note**: You only need to enable GitHub Pages once. After that, everything is automatic! 🚀
