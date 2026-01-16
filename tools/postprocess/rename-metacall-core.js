const fs = require("fs");
const path = require("path");

const DIR = path.join(__dirname, "..", "docs", "metacall-core", "core");

function cleanName(name) {
  // remove .md
  let base = name.replace(/\.md$/, "");

  // pattern: foo-3-2-foo -> foo
  base = base.replace(/^(.+?)-\d+(?:-\d+)?-\1$/, "$1");

  // if still has trailing duplicate like foo-foo
  base = base.replace(/^(.+?)-\1$/, "$1");

  // collapse weird multiple dashes
  base = base.replace(/-+/g, "-").trim();

  return base + ".md";
}

const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".md"));

for (const file of files) {
  const newFile = cleanName(file);
  if (newFile !== file) {
    const from = path.join(DIR, file);
    const to = path.join(DIR, newFile);

    if (fs.existsSync(to)) {
      console.log(`⚠️ Skip rename (target exists): ${file} -> ${newFile}`);
      continue;
    }

    fs.renameSync(from, to);
    console.log(`✅ Renamed: ${file} -> ${newFile}`);
  }
}

console.log("\n🎉 Rename done!");
