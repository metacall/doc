# MetaCall Documentation

A documentation website for the MetaCall project, built with **Docusaurus v3**.
This repository contains the full documentation source, components, custom MDX, UI enhancements, and CI/CD workflows for automatic preview deployments.

---

## 📦 Installation

This project requires **Node.js ≥ 20** (CI uses Node 22).

```bash
npm install
```

Or with CI-friendly clean install:

```bash
npm ci
```

---

## 🧞 Scripts

### Development

```bash
npm run dev       # Start Docusaurus dev server
npm start         # Alias for dev
npm run build     # Build static site
npm run serve     # Serve build locally
```

### Maintenance

```bash
npm run lint          # Lint code with ESLint
npm run lint:fix      # Lint + fix
npm run format        # Check formatting with Prettier
npm run format:fix    # Auto-format
npm run clear         # Clear Docusaurus cache
npm run swizzle       # Swizzle theme components
npm run write-translations
npm run write-heading-ids
```

---

## 🧭 Deployment & CI

This repository uses a GitHub Actions workflow with three jobs:

### **1. Build**
- Runs on every push to `master` and every PR.
- Installs dependencies, lints, formats, injects correct `baseUrl`, and builds the site.
- Stores the build as an artifact.

### **2. Deploy Preview**
- For PRs, a preview is automatically deployed to GitHub Pages under:

```
https://<owner>.github.io/<repo>/pr-<PR_NUMBER>/
```

- A sticky PR comment is automatically added with the preview URL.

### **3. Cleanup**
- When a PR is closed, its preview directory is removed from the `gh-pages` branch.

---

## 🤝 Contributing

We welcome contributions from both **internal maintainers** and **external contributors**.
Because of GitHub permissions limitations, the preview workflow differs slightly depending on who you are.

### 🟢 If you are an existing contributor with write access

You can contribute normally:

1. Fork or create a branch directly in the main repo.
2. Open a Pull Request to `master`.
3. A **preview deployment** will automatically appear in your PR.

No additional actions required.

### 🔵 If you are an external contributor

You can still get PR preview deployments, but you must use this workflow:

1. **Fork** the repository.
2. Make your changes in your fork.
3. Create a **Pull Request inside your own fork** (fork → fork).
   This PR will generate **its own PR preview site**.
4. Then create a **new Pull Request to the main repository** (fork → upstream).
5. In that PR, **include a link** to the PR in your fork.

This allows maintainers to:

- View your exact changes
- Access your preview deployment
- Safely review contributions without requiring additional permissions

---

## 🧪 Local Development Tips

- Use `npm run dev` for instant hot reload.
- If docs are not updating, try:

```bash
npm run clear
```

- Follow ESLint + Prettier rules (CI enforces them).

---

## 📄 License


This project is licensed under the Apache License 2.0. You can find the full license text here:
➡️ [LICENSE](LICENSE)

