import fs from "fs";
import path from "path";

const JUNK_LINE_CONTAINS = [
  "Index your code with",
  "Devin",
  "Edit WikiShare",
  "Dismiss",
  "Refresh this wiki",
  "Enter email to refresh",
  "Open repository",
];

export function cleanMarkdown(raw) {
  let md = raw;

  // remove sidebar block between "Last indexed:" and "Menu"
  md = md.replace(/Last indexed:[\s\S]*?(?=\n# )/gi, (match) => {
    const firstLine = match.split("\n")[0];
    return firstLine + "\n\n";
  });

  // remove "On this page" section at end
  md = md.replace(/### On this page[\s\S]*$/gi, "");

  // remove junk lines
  md = md
    .split("\n")
    .filter((line) => {
      const t = line.trim();
      if (!t) return true;

      for (const bad of JUNK_LINE_CONTAINS) {
        if (t.includes(bad)) return false;
      }

      return true;
    })
    .join("\n");
  // remove duplicate first heading if it appears again
  const lines = md.split("\n");
  if (lines.length > 6 && lines[0].startsWith("# ")) {
    const firstHeading = lines[0].trim();
    let seen = 0;

    md = lines
      .filter((line) => {
        if (line.trim() === firstHeading) {
          seen++;
          return seen === 1; // keep only first occurrence
        }
        return true;
      })
      .join("\n");
  }
  // remove repeated "DeepWiki" link lines like: [DeepWiki](/)
  md = md.replace(/^\[DeepWiki\]\(\/\)\s*$/gim, "");

  // trim extra whitespace
  md = md.replace(/\n{3,}/g, "\n\n").trim();

  return md;
}

export function cleanAllPages({ inDir, outDir }) {
  fs.mkdirSync(outDir, { recursive: true });

  const files = fs.readdirSync(inDir).filter((f) => f.endsWith(".md"));

  for (const file of files) {
    const inPath = path.join(inDir, file);
    const outPath = path.join(outDir, file);

    const raw = fs.readFileSync(inPath, "utf-8");
    const cleaned = cleanMarkdown(raw);

    fs.writeFileSync(outPath, cleaned, "utf-8");
  }

  return files.length;
}
