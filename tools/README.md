# Tools

This folder contains scripts used to scrape and normalize DeepWiki-exported documentation for MetaCall.

## What this is for

These scripts help regenerate and clean documentation pages when the DeepWiki source content changes.

## Typical workflow

1. Scrape / collect DeepWiki pages (raw content)
2. Clean and normalize the markdown output
3. Apply post-processing fixes (tables, links, naming)
4. Copy the final `.md` files into `docs/`

## Scripts included

- **Scraping / parsing**: fetch and parse DeepWiki pages into markdown
- **Cleaning**: remove unwanted UI artifacts and normalize formatting
- **Post-processing**:
  - Fix broken tables (convert plain text tables into Markdown tables)
  - Fix/normalize internal links
  - Rename/move files to match the docs structure
