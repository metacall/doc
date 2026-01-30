import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_DIR = path.resolve(
  __dirname,
  "../../docs/metacall-core"
);

function cleanMarkdown(content) {
  const lines = content.split("\n");
  const output = [];

  let inRelevantSection = false;

  for (const line of lines) {
    const trimmed = line.trim();

    // Enter "Relevant source files" section
    if (trimmed === "## Relevant source files") {
      inRelevantSection = true;
      continue; // remove the heading
    }

    // Exit section when another heading starts
    if (inRelevantSection && trimmed.startsWith("## ")) {
      inRelevantSection = false;
    }

    // Skip only list items INSIDE the section
    if (inRelevantSection && trimmed.startsWith("- [")) {
      continue;
    }

    // Skip empty lines directly after the heading
    if (inRelevantSection && trimmed === "") {
      continue;
    }

    output.push(line);
  }

  return output.join("\n");
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      const original = fs.readFileSync(fullPath, "utf8");
      const cleaned = cleanMarkdown(original);

      if (original !== cleaned) {
        fs.writeFileSync(fullPath, cleaned, "utf8");
        console.log(`cleaned: ${fullPath}`);//file per confirmation
      }
    }
  }
}

walk(TARGET_DIR);
console.log("Done");//overall confirmation

