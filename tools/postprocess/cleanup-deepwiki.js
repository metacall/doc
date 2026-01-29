const fs = require("fs");
const path = require("path");

/**
 * Folder containing the markdown pages.
 */
const TARGET_DIR = path.join(__dirname, "..", "docs", "metacall-core", "core");

/**
 * Extract title from first H1 in markdown.
 * Example: "# Build Configuration" -> "Build Configuration"
 */
function titleFromContent(content) {
  const match = content.match(/^#\s+(.+)\s*$/m);
  return match ? match[1].trim() : null;
}

/**
 * Fallback title from filename (only used if H1 missing).
 */
function titleFromFilename(file) {
  return file
    .replace(/\.md$/, "")
    .replace(/-\d+(-\d+)?-/g, "-") // remove number chunks like -3-2-
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Remove DeepWiki header metadata:
 * - Source: ...
 * - Last indexed: ...
 * - standalone "---" separator line
 */
function removeDeepWikiHeader(content) {
  // Remove "Source: ..." line
  content = content.replace(/^Source:\s.*\n+/im, "");

  // Remove "Last indexed: ..." line
  content = content.replace(/^Last indexed:\s.*\n+/im, "");

  // Remove a single markdown separator line if it appears alone
  // (DeepWiki uses "---" between metadata blocks)
  content = content.replace(/^\s*---\s*\n+/m, "");

  return content.trimStart();
}

/**
 * Fix "Relevant source files" into a proper heading.
 * This improves readability and Docusaurus formatting.
 */
function normalizeHeadings(content) {
  // If it appears right after the H1, turn into H2
  content = content.replace(
    /^#\s+(.+)\n+Relevant source files\s*\n+/m,
    "# $1\n\n## Relevant source files\n\n",
  );

  // If it appears elsewhere as plain text, also turn into H2
  content = content.replace(
    /^Relevant source files\s*$/gm,
    "## Relevant source files",
  );

  return content;
}

/**
 * Remove DeepWiki-style "Sources: [file#line]" lines.
 */
function removeInlineSources(content) {
  return content.replace(/^Sources:\s.*\n+/gim, "");
}

/**
 * Add Docusaurus frontmatter if missing.
 */
function addFrontmatter(content, title) {
  if (content.startsWith("---\n")) return content;

  return `---\ntitle: ${title}\n---\n\n${content}`;
}

/**
 * Process one markdown file.
 */
function processFile(filePath) {
  const file = path.basename(filePath);
  let content = fs.readFileSync(filePath, "utf8");

  // Remove DeepWiki header metadata
  content = removeDeepWikiHeader(content);

  // Title from H1
  const extractedTitle = titleFromContent(content);
  const title = extractedTitle || titleFromFilename(file);

  // Improve headings + cleanup noise
  content = normalizeHeadings(content);
  content = removeInlineSources(content);

  // Add frontmatter
  content = addFrontmatter(content, title);

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Cleaned: ${file}`);
}

/**
 * Walk through folder recursively and process all .md files.
 */
function walk(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      walk(fullPath);
    } else if (item.isFile() && item.name.endsWith(".md")) {
      processFile(fullPath);
    }
  }
}

// Main
if (!fs.existsSync(TARGET_DIR)) {
  console.error("Target folder not found:", TARGET_DIR);
  process.exit(1);
}

walk(TARGET_DIR);
console.log("\nDone cleaning markdown files!");
