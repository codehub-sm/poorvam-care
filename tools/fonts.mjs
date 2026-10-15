#!/usr/bin/env node
/**
 * Self-hosts the web fonts. Fetches Google Fonts CSS once, keeps the latin and
 * latin-ext subsets, saves the woff2 files to assets/fonts/ and writes
 * src/fonts.json, which src/assets.mjs turns into inline @font-face rules and
 * preloads. Run again only to change a family or weight; the build never
 * touches the network.
 *
 * Why: the Google Fonts stylesheet was render-blocking (~900 ms on a mobile
 * Lighthouse run, Oct 2026) and needs two extra origins before first paint.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';

/**
 * One entry per page shell. Variable ranges, so one file covers every weight used.
 * `subsets` are Google's unicode-range files. `text` adds one small file per
 * family holding only those characters: /studio prints ₹ on every price, and
 * ₹ otherwise lives in latin-ext (45 KB more for Bricolage and Manrope).
 */
const SETS = {
  care: { q: 'family=Montserrat:wght@600..700&family=Figtree:wght@400..700', subsets: ['latin', 'latin-ext'] },
  studio: { q: 'family=Bricolage+Grotesque:opsz,wght@12..96,700..800&family=Manrope:wght@400..700&family=IBM+Plex+Mono:wght@500', subsets: ['latin'], text: '₹' },
};

const slug = (family) => family.toLowerCase().replace(/\s+/g, '-');
const prop = (body, k) => body.match(new RegExp(`${k}:\\s*([^;]+);`))?.[1].trim();

async function face(set, subset, body) {
  const family = prop(body, 'font-family').replace(/'/g, '');
  const url = body.match(/url\((https:[^)]+)\) format\('woff2'\)/)?.[1];
  if (!url) throw new Error(`${set}: no woff2 for ${family} ${subset}`);
  const version = url.match(/\/(v\d+)\//)?.[1] ?? url.match(/[?&]v=(v\d+)/)?.[1] ?? 'v0';
  const file = `${slug(family)}-${subset}-${version}-${prop(body, 'font-weight').replace(/\s+/g, '-')}.woff2`;
  const bin = await fetch(url);
  if (!bin.ok) throw new Error(`${set}: ${url} answered ${bin.status}`);
  await writeFile(path.join(root, 'assets/fonts', file), Buffer.from(await bin.arrayBuffer()));
  return { family, subset, style: prop(body, 'font-style'), weight: prop(body, 'font-weight'), range: prop(body, 'unicode-range'), file };
}

async function css(set, q) {
  const res = await fetch(`https://fonts.googleapis.com/css2?${q}&display=swap`, { headers: { 'user-agent': UA } });
  if (!res.ok) throw new Error(`${set}: Google Fonts answered ${res.status}`);
  return res.text();
}

const out = {};
await mkdir(path.join(root, 'assets/fonts'), { recursive: true });
for (const [set, { q, subsets, text }] of Object.entries(SETS)) {
  const faces = [];
  for (const [, subset, body] of (await css(set, q)).matchAll(/\/\* ([\w-]+) \*\/\s*@font-face \{([^}]+)\}/g)) {
    if (subsets.includes(subset)) faces.push(await face(set, subset, body));
  }
  for (const s of subsets) if (!faces.some((f) => f.subset === s)) throw new Error(`${set}: no ${s} subset`);
  if (text) {
    for (const [, body] of (await css(set, `${q}&text=${encodeURIComponent(text)}`)).matchAll(/@font-face \{([^}]+)\}/g)) faces.push(await face(set, 'text', body));
  }
  out[set] = faces;
  console.log(`${set}: ${faces.map((f) => f.file).join(', ')}`);
}
await writeFile(path.join(root, 'src/fonts.json'), JSON.stringify(out, null, 2) + '\n');
