import { chromium } from "playwright";

export async function fetchHtml(url) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "domcontentloaded" });

  // title
  await page.waitForSelector("h1", { timeout: 15000 });

  // wait until "Loading..." disappears
  await page
    .waitForFunction(() => !document.body.innerText.includes("Loading..."), {
      timeout: 15000,
    })
    .catch(() => {});

  const html = await page.content();

  await browser.close();
  return html;
}
