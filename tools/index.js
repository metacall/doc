import path from "path";
import { TARGET } from "./config/targets.js";
import { crawlDeepWiki } from "./scraper/crawl.js";
import { combineMarkdownPages } from "./writers/combine.js";

async function main() {
  const startUrl = TARGET.baseUrl + TARGET.path;

  const pagesDir = path.join("data", "pages");
  const outCombined = path.join(
    "data",
    "combined",
    "deepwiki-metacall-core.md",
  );

  const saved = await crawlDeepWiki({
    startUrl,
    baseUrl: TARGET.baseUrl,
    outDir: pagesDir,
    limit: 60,
  });

  console.log(`Saved ${saved.length} pages.`);

  const merged = combineMarkdownPages({
    pagesDir,
    outFile: outCombined,
  });

  console.log("Combined:", merged);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
