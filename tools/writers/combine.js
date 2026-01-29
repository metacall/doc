import fs from "fs";
import path from "path";

export function combineMarkdownPages({ pagesDir, outFile }) {
  const files = fs
    .readdirSync(pagesDir)
    .filter((f) => f.endsWith(".md"))
    .sort();

  let combined = `# DeepWiki dump (metacall/core)

Generated automatically.

---

`;

  for (const f of files) {
    const content = fs.readFileSync(path.join(pagesDir, f), "utf-8");
    combined += `\n\n---\n\n${content}`;
  }

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, combined, "utf-8");

  return { count: files.length, outFile };
}
