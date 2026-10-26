/**
 * Builds the knowledge base for "Ask Hafsa's AI" from the site's own pages.
 *
 * The assistant may answer only from this text, so it is generated from source on every
 * dev/build run (see the predev/prebuild scripts) and never edited by hand.
 * Output: src/data/knowledge.json  ->  [{ url, title, text }]
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, basename } from 'node:path';

const PAGES = [
  ['src/pages/index.astro', '/', 'Home'],
  ['src/pages/about.astro', '/about', 'About'],
  ['src/pages/work/index.astro', '/work', 'Work'],
  ...readdirSync('src/pages/work')
    .filter((f) => f.endsWith('.astro') && f !== 'index.astro')
    .map((f) => [join('src/pages/work', f), `/work/${basename(f, '.astro')}`, null]),
];

const decode = (s) =>
  s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;|&rsquo;/g, "'").replace(/&middot;/g, '·').replace(/&copy;/g, '©');

/** Human-readable string literals from the frontmatter (project data, metrics, descriptions). */
function frontmatterStrings(fm) {
  const out = [];
  const re = /(['"`])((?:\\.|(?!\1)[^\\\n])*)\1/g;
  for (const m of fm.matchAll(re)) {
    const v = m[2].replace(/\\'/g, "'").replace(/\\"/g, '"').trim();
    if (v.length < 3 && !/\d/.test(v)) continue; // keep short metric values like "3M" or "36"
    if (/^(\.{0,2}\/|https?:|#|[\w-]+\.(astro|ts|js|css|png|jpe?g|webp|svg|mp4|gif)$)/i.test(v)) continue;
    if (/^[a-z][\w-]*$/.test(v) && !/\s/.test(v)) continue; // ids, class names, keys
    if (/^(M|m)[\d\s.,-]+[A-Za-z]/.test(v) && /\d/.test(v) && v.length > 20 && !/\s[a-z]{3,}\s/.test(v)) continue; // svg paths
    out.push(v);
  }
  return out;
}

/** Visible text of the page template. */
function templateText(tpl) {
  return decode(
    tpl
      .replace(/<style[\s\S]*?<\/style>/g, ' ')
      .replace(/<script[\s\S]*?<\/script>/g, ' ')
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, ' ')
      .replace(/<svg[\s\S]*?<\/svg>/g, ' ')
      .replace(/\{[^{}]*\}/g, ' ')
      .replace(/<[^>]+>/g, ' ')
  ).replace(/\s+/g, ' ').trim();
}

const entries = PAGES.map(([file, url, fallbackTitle]) => {
  const src = readFileSync(file, 'utf8');
  const parts = src.split(/^---\s*$/m);
  const fm = parts.length >= 3 ? parts[1] : '';
  const tpl = parts.length >= 3 ? parts.slice(2).join('---') : src;
  const titleMatch = tpl.match(/title="([^"]+)"/);
  const title = titleMatch ? titleMatch[1] : fallbackTitle ?? url;
  const text = [...frontmatterStrings(fm), templateText(tpl)].join('\n');
  return { url, title, text };
});

// Case-study summaries and key decisions (already drafted from the pages themselves)
const summariesSrc = readFileSync('src/data/caseStudySummaries.ts', 'utf8');
const summaries = JSON.parse(summariesSrc.slice(summariesSrc.indexOf('= {') + 2, summariesSrc.lastIndexOf('};') + 1));
for (const [slug, s] of Object.entries(summaries)) {
  const entry = entries.find((e) => e.url === `/work/${slug}`);
  if (!entry) continue;
  const t = s.tldr;
  entry.text += `\nAt a glance. Problem: ${t.problem} Role: ${t.role} Outcome: ${t.outcome} Timeline: ${t.timeline}`;
  for (const d of s.decisions) {
    entry.text += `\nKey decision: ${d.title}. Chose: ${d.chosen}. Considered: ${d.considered.join('; ')}. Why: ${d.why}`;
  }
}

writeFileSync('src/data/knowledge.json', JSON.stringify(entries, null, 1));
const chars = entries.reduce((n, e) => n + e.text.length, 0);
console.log(`knowledge.json: ${entries.length} pages, ${chars.toLocaleString()} characters`);
