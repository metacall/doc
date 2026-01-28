const fs = require("fs");
const path = require("path");

const DIR = path.join(__dirname, "..", "docs", "metacall-core", "core");

// Build index of existing md files
const existingFiles = new Set(
  fs.readdirSync(DIR).filter((f) => f.endsWith(".md")),
);

// Normalize deepwiki slug to local filename
function slugToFilename(slug) {
  slug = slug.split("#")[0].trim();

  // remove leading numeric prefix like 1.2- or 5-
  slug = slug.replace(/^\d+(?:\.\d+)*-/, "");

  // normalize weird deepwiki slugs
  slug = slug.toLowerCase();

  // node.js -> node-js
  slug = slug.replace(/node\.js/g, "node-js");

  // replace dots with dashes
  slug = slug.replace(/\./g, "-");

  // collapse multiple dashes
  slug = slug.replace(/-+/g, "-");

  // trim dashes
  slug = slug.replace(/^-+|-+$/g, "");

  return `${slug}.md`;
}

function fixLinks(content, fileName) {
  const broken = [];

  // Replace markdown links like: ](/metacall/core/1.2-supported-languages)
  const updated = content.replace(
    /\]\(\/metacall\/core\/([^)]+)\)/g,
    (match, slug) => {
      const candidate = slugToFilename(slug);

      if (existingFiles.has(candidate)) {
        return `](./${candidate})`;
      }

      // couldn't resolve -> keep original and log
      broken.push(slug);
      return match;
    },
  );

  return { updated, broken };
}

const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".md"));

let totalFixed = 0;
let totalBroken = 0;

for (const file of files) {
  const full = path.join(DIR, file);
  const content = fs.readFileSync(full, "utf8");

  const { updated, broken } = fixLinks(content, file);

  if (updated !== content) {
    fs.writeFileSync(full, updated, "utf8");
    console.log(`Fixed links in: ${file}`);
    totalFixed++;
  }

  if (broken.length > 0) {
    totalBroken += broken.length;
    console.log(`Unresolved links in ${file}:`, broken);
  }
}

console.log("\nLink fixing done!");
console.log(`Files modified: ${totalFixed}`);
console.log(`Unresolved links count: ${totalBroken}`);
