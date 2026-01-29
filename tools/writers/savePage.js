import fs from "fs";
import path from "path";

export function safeFileName(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function saveMarkdownPage({ outDir, title, url, markdown }) {
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const slugFromUrl = url.split("/").pop() || "page";
  const file = `${safeFileName(title)}-${safeFileName(slugFromUrl)}` || "page";

  const filePath = path.join(outDir, `${file}.md`);

  const content = `# ${title}

Source: ${url}

---

${markdown}
`;

  fs.writeFileSync(filePath, content, "utf-8");
  return filePath;
}
