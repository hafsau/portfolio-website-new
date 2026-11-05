#!/usr/bin/env node
/**
 * Accessibility audit: runs axe-core (WCAG 2.0/2.1/2.2, A and AA) on every page at desktop and
 * phone width, and checks reflow at 320px (WCAG 1.4.10). Drives a headless Chrome over the
 * DevTools protocol, so the only dependency is axe-core.
 *
 *   npm run dev                      # in another terminal
 *   npm run audit:a11y               # or: node scripts/a11y-audit.mjs https://hafsausmani.com
 *
 * Automated checks catch roughly a third of WCAG issues. Contrast over gradients, focus order
 * and screen reader output still need a hand pass.
 */
import { spawn } from 'node:child_process';
import { readdirSync, readFileSync, mkdtempSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const BASE = (process.argv[2] || 'http://localhost:4321').replace(/\/$/, '');
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9300 + Math.floor(Math.random() * 500);
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900, mobile: false },
  { name: 'phone', width: 390, height: 844, mobile: true },
];

const axeSource = readFileSync(createRequire(import.meta.url).resolve('axe-core/axe.min.js'), 'utf8');

// Every page route, read from src/pages (skips dynamic routes and the API).
function routes() {
  const out = [];
  const walk = (dir, prefix) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (entry.name !== 'api') walk(join(dir, entry.name), `${prefix}/${entry.name}`);
      } else if (entry.name.endsWith('.astro') && !entry.name.includes('[') && entry.name !== '404.astro') {
        const name = entry.name.replace('.astro', '');
        out.push(name === 'index' ? prefix || '/' : `${prefix}/${name}`);
      }
    }
  };
  walk(new URL('../src/pages', import.meta.url).pathname, '');
  return out.sort();
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function connect() {
  for (let i = 0; i < 80; i++) {
    try {
      const tabs = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json();
      const page = tabs.find((t) => t.type === 'page');
      if (page) return new WebSocket(page.webSocketDebuggerUrl);
    } catch {}
    await sleep(200);
  }
  throw new Error('Chrome did not start. Set CHROME_PATH if it is installed elsewhere.');
}

const chrome = spawn(CHROME, [
  '--headless=new',
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${mkdtempSync(join(tmpdir(), 'a11y-'))}`,
  'about:blank',
], { stdio: 'ignore' });

let ws;
let id = 0;
const pending = new Map();
const send = (method, params = {}) => new Promise((resolve) => {
  pending.set(++id, resolve);
  ws.send(JSON.stringify({ id, method, params }));
});
const evaluate = async (expression) =>
  (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result?.value;

async function load(url, viewport) {
  await send('Emulation.setDeviceMetricsOverride', { width: viewport.width, height: viewport.height, deviceScaleFactor: 1, mobile: viewport.mobile });
  await send('Page.navigate', { url });
  await sleep(3000);
  // Scroll through once so scroll-triggered reveals settle before checking.
  await evaluate(`(async () => { for (let y = 0; y < document.body.scrollHeight; y += innerHeight) { scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } scrollTo(0, 0); })()`);
  await sleep(500);
}

try {
  ws = await connect();
  await new Promise((r) => ws.addEventListener('open', r, { once: true }));
  ws.addEventListener('message', (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg.result || {}); pending.delete(msg.id); }
  });
  await send('Page.enable');
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });

  const pages = routes();
  const violations = [];
  const reflow = [];

  for (const path of pages) {
    for (const viewport of VIEWPORTS) {
      await load(BASE + path, viewport);
      await evaluate(axeSource);
      const result = await evaluate(`axe.run(document, { runOnly: { type: 'tag', values: ${JSON.stringify(TAGS)} } }).then(r => r.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.length })))`);
      for (const v of result || []) violations.push({ path, viewport: viewport.name, ...v });
    }
    await load(BASE + path, { name: 'reflow', width: 320, height: 640, mobile: true });
    const overflow = await evaluate('document.documentElement.scrollWidth - document.documentElement.clientWidth');
    if (overflow > 0) reflow.push({ path, overflow });
  }

  console.log(`Audited ${pages.length} pages at ${VIEWPORTS.map((v) => v.width).join(' and ')}px, plus reflow at 320px (${BASE})`);
  console.log(`axe (${TAGS.join(', ')}): ${violations.length} violation${violations.length === 1 ? '' : 's'}`);
  for (const v of violations) console.log(`  ${v.path} [${v.viewport}] ${v.id} (${v.impact}, ${v.nodes} node${v.nodes === 1 ? '' : 's'})`);
  console.log(`Reflow at 320px: ${reflow.length ? `${reflow.length} page(s) scroll sideways` : 'every page fits'}`);
  for (const r of reflow) console.log(`  ${r.path} overflows by ${r.overflow}px`);
  process.exitCode = violations.length || reflow.length ? 1 : 0;
} finally {
  ws?.close();
  chrome.kill();
}
