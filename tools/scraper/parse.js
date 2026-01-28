import * as cheerio from "cheerio";
import TurndownService from "turndown";

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
});

export function extractTitleAndMarkdown(html) {
  const $ = cheerio.load(html);

  const title =
    $("h1").first().text().trim() || $("title").text().trim() || "Untitled";

  //use MAIN if present else BODY
  const root = (
    $("main").first().length ? $("main").first() : $("body").first()
  ).clone();

  //remove only scripts/styles (DO NOT remove nav/aside etc yet)
  root.find("script").remove();
  root.find("style").remove();
  root.find("noscript").remove();

  const cleanedHtml = root.html() || "";

  let markdown = turndown.turndown(cleanedHtml);

  // remove obvious useless junk lines
  markdown = markdown
    .split("\n")
    .filter((line) => {
      const t = line.trim();
      if (!t) return true;

      // DeepWiki junk
      if (t === "Loading...") return false;
      if (t.includes("requestAnimationFrame")) return false;
      if (t.includes("$RC(") || t.includes("$RB=") || t.includes("$RV="))
        return false;
      if (t.startsWith('{"@context"')) return false;

      return true;
    })
    .join("\n");

  return { title, markdown };
}

export function discoverLinks(html, baseUrl) {
  const $ = cheerio.load(html);
  const links = new Set();

  $("a").each((_, el) => {
    const href = $(el).attr("href");
    if (!href) return;

    if (href.startsWith("/metacall/core")) {
      links.add(baseUrl + href);
    }
  });

  return [...links];
}
