# DeepWiki Scraper Tools — Usage Guide

This repository contains a toolchain to **scrape DeepWiki pages** for **MetaCall Core**, save them as **Markdown files**, and generate a **single combined Markdown dump**.

---

## 1) Requirements

Make sure you have:

- **Node.js** (recommended: Node 18+)
- **npm** (comes with Node.js)
- Internet access (to scrape DeepWiki)
- Playwright browser (Chromium) installed

---

## 2) Setup (First Time Only)

Open a terminal in the project root folder:

```bash
cd metacall_doc
```

Install dependencies:

```bash
npm install
```

Install Playwright browser (required for scraping):

```bash
npx playwright install
```

---

## 3) Run the Tools (Scrape + Save Pages + Combine Output)

### Main runnable tool

The **main runnable entry point** is:

- `tools/index.js`

Run it from the project root:

```bash
node tools/index.js
```

---

## 4) Do I need to manually run scraper files?

**No. You do NOT need to manually run any file inside `scraper/`** (like `fetch.js`, `parse.js`, or `crawl.js`).

### Why?

Because `tools/index.js` already runs the full pipeline:

- Calls `crawlDeepWiki()` from `scraper/crawl.js`
- Which internally calls:
  - `fetchHtml()` from `scraper/fetch.js` (downloads HTML using Playwright)
  - `extractTitleAndMarkdown()` + `discoverLinks()` from `scraper/parse.js` (extracts title + converts HTML → Markdown)
  - `saveMarkdownPage()` from `writers/savePage.js` (writes `.md` files)

So running this is enough:

```bash
node tools/index.js
```

---

## 5) What the command does (pipeline summary)

When you run:

```bash
node tools/index.js
```

It automatically performs:

1. Crawling DeepWiki starting from the configured target URL
2. Fetching page HTML using Playwright (`scraper/fetch.js`)
3. Parsing + converting HTML to Markdown (`scraper/parse.js`)
4. Saving each page as a `.md` file (`writers/savePage.js`)
5. Combining all pages into one Markdown file (`writers/combine.js`)

---

## 6) Output Locations

After running `node tools/index.js`, the tool generates:

### Individual Markdown pages

```text
data/pages/
```

Each scraped page is saved as a separate `.md` file.

### Combined Markdown file

```text
data/combined/deepwiki-metacall-core.md
```

This is the final combined Markdown dump containing all scraped pages.

---

## 7) Configuration

The scrape target is configured in:

- `config/targets.js`

Example config:

```js
export const TARGET = {
  name: "metacall-core",
  baseUrl: "https://deepwiki.com",
  path: "/metacall/core",
};
```

The crawler limit is configured inside:

- `tools/index.js`

Example:

```js
limit: 60;
```

---

## 9) Postprocess (Cleanup + Fix Links/Tables + Rename)

After scraping and generating the markdown files, you can run the postprocess scripts to improve formatting and consistency.

### Run postprocess scripts

From the project root:

```bash
node tools/postprocess/cleanup-deepwiki.js
node tools/postprocess/fix-links-metacall-core.js
node tools/postprocess/fix-tables-metacall-core.js
node tools/postprocess/rename-metacall-core.js
```

### What these scripts do (high level)

- `cleanup-deepwiki.js`
  - Removes leftover junk text / unwanted sections
  - Normalizes markdown formatting

- `fix-links-metacall-core.js`
  - Fixes broken or incorrect internal links
  - Makes links consistent across pages

- `fix-tables-metacall-core.js`
  - Fixes markdown table formatting issues
  - Ensures tables render correctly

- `rename-metacall-core.js`
  - Renames pages/files to consistent naming format
  - Improves ordering and readability

> Note: These scripts are meant to be executed **after** the scraping step (`node tools/index.js`).

## 8) Troubleshooting

### Error: Playwright / Chromium not installed

Fix:

```bash
npx playwright install
```

### Want to re-run from scratch?

Delete output folder and run again.

#### Linux / macOS / Git Bash

```bash
rm -rf data
node tools/index.js
```

#### Windows PowerShell

```powershell
Remove-Item -Recurse -Force data
node tools/index.js
```

---
