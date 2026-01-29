/**
 * Fix broken "plain text tables" inside docs/metacall-core/core/*.md
 *
 * Broken tables look like:
 *   Platform
 *   Script
 *   Linux/macOS   `tools/metacall-configure.sh`
 *   Windows       `tools/metacall-configure.ps1`
 *   These scripts provide...
 *
 * We convert them to real markdown tables:
 *   | Platform | Script |
 *   | --- | --- |
 *   | Linux/macOS | `tools/metacall-configure.sh` |
 *   | Windows | `tools/metacall-configure.ps1` |
 */

const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.join(process.cwd(), "docs", "metacall-core", "core");

const KNOWN_HEADERS = new Set([
  "Platform",
  "Script",
  "Build Type",
  "Description",
  "Option",
  "Default",
  "CMake Option",
  "Variable",
  "Default Value",
  "Function",
  "Short Form",
  "Type",
  "File Extension",
  "Loader Tag",
  "Command",
  "Syntax",
  "Extension",
  "Language/Loader",
  "Example",
  "Value Type ID",
  "C Type",
  "Purpose",
  "Key Implementation",
  "Operation",
  "Implementation",
  "Creation",
  "MetaCall Type",
  "Example in Implementation",
  "Environment Variable",
  "Default in Runtime Image",
  "Language",
  "Tag",
  "Load from File",
  "Load from Memory",
  "Async",
  "Status",
  "Go Type",
  "Issue",
  "Possible Cause",
  "Solution",
  "Java Type",
  "Java Array Type",
  "Handling Method",
  "Method",
  "Parameters",
  "Return Value",
  "JavaScript Type",
  "Loader",
  "Dependencies",
  "Node.js Type",
  "Conversion Function",
  "File Extensions",
  "Port",
  "Implementation Approach",
  "Binding Method",
  "Python Type",
  "Notes",
  "Component",
  "Ruby Type",
  "Test Category",
  "Error Type",
  "Sanitizer",
  "Linux",
  "macOS",
  "Windows",
  "Type ID",
  "JSON Representation",
  "Function Calls",
  "Classes & Objects",
  "Async/Await",
  "Exception Handling",
  "Value Conversion",
  "Garbage Collection",
  "C Type Representation",
  "Common Usage",
]);

function getAllMarkdownFiles(dir) {
  let out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out = out.concat(getAllMarkdownFiles(full));
    else if (e.isFile() && e.name.endsWith(".md")) out.push(full);
  }
  return out;
}

function norm(line) {
  return line.replace(/\r/g, "").trim();
}

function isMarkdownTableLine(line) {
  const t = norm(line);
  return t.startsWith("|") && t.includes("|");
}

function isKnownHeaderLine(line) {
  const t = norm(line);
  return KNOWN_HEADERS.has(t);
}

function isHardStop(line) {
  const t = norm(line);
  if (!t) return false; // blank lines allowed inside table blocks
  if (t.startsWith("#")) return true;
  if (t.startsWith(">")) return true;
  if (t.startsWith("- ")) return true;
  if (t.startsWith("* ")) return true;
  if (t.startsWith("```")) return true;
  if (isMarkdownTableLine(t)) return true;
  return false;
}

// Paragraph-like sentence stop (prevents eating normal text)
function looksLikeParagraph(line) {
  const t = norm(line);
  if (!t) return false;
  if (t.length >= 80 && (t.endsWith(".") || t.endsWith(":"))) return true;
  return false;
}

function escapeCell(cell) {
  return cell.replace(/\|/g, "\\|").trim();
}

function makeMarkdownTable(headers, rows) {
  const headerLine = `| ${headers.map(escapeCell).join(" | ")} |`;
  const sepLine = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = rows.map((r) => `| ${r.map(escapeCell).join(" | ")} |`);
  return [headerLine, sepLine, ...body].join("\n");
}

// Collect consecutive known headers (allow blank lines between them)
function collectHeaders(lines, start) {
  const headers = [];
  let i = start;

  while (i < lines.length) {
    const t = norm(lines[i]);

    if (!t) {
      i++;
      continue;
    } // skip blanks between header lines

    if (!isKnownHeaderLine(t)) break;
    headers.push(t);
    i++;
  }

  return { headers, nextIndex: i };
}

// Multi-line row collection: each row=N nonempty lines
function collectRowsMultiline(lines, startIndex, colCount) {
  const rows = [];
  let i = startIndex;

  while (i < lines.length) {
    // skip blank lines between rows
    while (i < lines.length && !norm(lines[i])) i++;

    if (i >= lines.length) break;
    if (isHardStop(lines[i])) break;
    if (looksLikeParagraph(lines[i])) break;

    const row = [];
    let j = i;

    while (j < lines.length && row.length < colCount) {
      const t = norm(lines[j]);

      if (!t) {
        j++;
        continue;
      } // skip blanks inside row
      if (isHardStop(lines[j])) break;

      // If we suddenly hit a paragraph mid-row, abort
      if (looksLikeParagraph(lines[j]) && row.length === 0)
        return { rows, nextIndex: i };

      row.push(t);
      j++;
    }

    if (row.length < colCount) break;

    rows.push(row);
    i = j;
  }

  return { rows, nextIndex: i };
}

function fixBrokenTables(content) {
  const lines = content.split("\n");
  const out = [];
  let i = 0;
  let changed = false;

  while (i < lines.length) {
    const t = norm(lines[i]);

    if (isMarkdownTableLine(t)) {
      out.push(lines[i]);
      i++;
      continue;
    }

    // Try header detection
    if (
      isKnownHeaderLine(t) ||
      (t === "" && i + 1 < lines.length && isKnownHeaderLine(lines[i + 1]))
    ) {
      const { headers, nextIndex } = collectHeaders(lines, i);

      if (headers.length >= 2) {
        const { rows, nextIndex: afterRows } = collectRowsMultiline(
          lines,
          nextIndex,
          headers.length,
        );

        if (rows.length > 0) {
          out.push(makeMarkdownTable(headers, rows));
          changed = true;
          i = afterRows;
          continue;
        }
      }
    }

    out.push(lines[i]);
    i++;
  }

  return { content: out.join("\n"), changed };
}

function main() {
  if (!fs.existsSync(ROOT_DIR)) {
    console.error(`Root dir not found: ${ROOT_DIR}`);
    process.exit(1);
  }

  const files = getAllMarkdownFiles(ROOT_DIR);
  console.log(`Found markdown files: ${files.length}`);

  let modified = 0;

  for (const file of files) {
    const original = fs.readFileSync(file, "utf8");
    const { content: fixed, changed } = fixBrokenTables(original);

    if (changed && fixed !== original) {
      fs.writeFileSync(file, fixed, "utf8");
      modified++;
      console.log(`Fixed: ${path.relative(process.cwd(), file)}`);
    }
  }

  console.log(`\nTable fixing done!\nFiles modified: ${modified}`);
}

main();
