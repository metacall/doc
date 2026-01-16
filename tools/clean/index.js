import path from "path";
import { cleanAllPages } from "./cleanMd.js";
import { combineMarkdownPages } from "../writers/combine.js";

async function main() {
  const rawPagesDir = path.join("data", "pages");
  const cleanPagesDir = path.join("data", "clean", "pages");
  const cleanCombined = path.join(
    "data",
    "clean",
    "combined",
    "deepwiki-clean.md",
  );

  const count = cleanAllPages({
    inDir: rawPagesDir,
    outDir: cleanPagesDir,
  });

  console.log(`Cleaned ${count} pages.`);

  const merged = combineMarkdownPages({
    pagesDir: cleanPagesDir,
    outFile: cleanCombined,
  });

  console.log("Clean combined:", merged);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
