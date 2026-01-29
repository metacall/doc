import { fetchHtml } from "./fetch.js";
import { discoverLinks, extractTitleAndMarkdown } from "./parse.js";
import { saveMarkdownPage } from "../writers/savePage.js";

export async function crawlDeepWiki({ startUrl, baseUrl, outDir, limit = 50 }) {
  const queue = [startUrl];
  const visited = new Set();
  const saved = [];

  while (queue.length > 0 && visited.size < limit) {
    const url = queue.shift();
    if (visited.has(url)) continue;

    visited.add(url);
    console.log("Scraping:", url);

    let html;
    try {
      html = await fetchHtml(url);
    } catch (err) {
      console.log("Failed:", url, err.message);
      continue;
    }

    const { title, markdown } = extractTitleAndMarkdown(html);
    const filePath = saveMarkdownPage({ outDir, title, url, markdown });
    saved.push({ url, title, filePath });

    const links = discoverLinks(html, baseUrl);
    for (const link of links) {
      if (!visited.has(link) && !queue.includes(link)) queue.push(link);
    }
  }

  return saved;
}
