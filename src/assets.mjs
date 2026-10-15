/**
 * Render-critical files: fingerprinted stylesheets and scripts, and the
 * self-hosted fonts.
 *
 * asset('assets/css/site.css') returns /assets/v/site.<hash>.css and records
 * the file; build.mjs writes every recorded file with emitAssets(). The name
 * changes whenever the content does, so customHttp.yml can cache /assets/v/
 * and /assets/fonts/ for a year without a deploy ever serving stale CSS.
 */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FONTS = JSON.parse(readFileSync(path.join(root, 'src/fonts.json'), 'utf8'));

/** Comments and layout whitespace only; never touches spaces inside selectors or values. */
function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

const emitted = new Map();

export function asset(rel) {
  const hit = emitted.get(rel);
  if (hit) return hit.url;
  const ext = path.extname(rel);
  let body = readFileSync(path.join(root, rel), 'utf8');
  if (ext === '.css') body = minifyCss(body);
  const hash = createHash('sha256').update(body).digest('hex').slice(0, 10);
  const url = `/assets/v/${path.basename(rel, ext)}.${hash}${ext}`;
  emitted.set(rel, { url, body });
  return url;
}

export const isEmitted = (url) => [...emitted.values()].some((e) => e.url === url);

export async function emitAssets(out) {
  await mkdir(path.join(out, 'assets/v'), { recursive: true });
  for (const { url, body } of emitted.values()) await writeFile(path.join(out, url), body);
  return [...emitted.values()].map((e) => e.url);
}

/**
 * Inline @font-face for one shell, plus a preload for the latin file of each
 * family in `preload` (the faces above the fold). latin-ext loads only if a
 * page uses one of its characters (₹ is one).
 */
export function fontHead(set, preload) {
  const faces = FONTS[set];
  if (!faces) throw new Error(`no font set "${set}" in src/fonts.json; run tools/fonts.mjs`);
  for (const f of faces) if (!existsSync(path.join(root, 'assets/fonts', f.file))) throw new Error(`missing assets/fonts/${f.file}; run tools/fonts.mjs`);
  for (const fam of preload) if (!faces.some((f) => f.family === fam)) throw new Error(`font set "${set}" has no ${fam}`);
  const links = faces
    .filter((f) => f.subset === 'latin' && preload.includes(f.family))
    .map((f) => `<link rel="preload" href="/assets/fonts/${f.file}" as="font" type="font/woff2" crossorigin>`);
  const css = faces
    .map((f) => `@font-face{font-family:'${f.family}';font-style:${f.style};font-weight:${f.weight};font-display:swap;src:url(/assets/fonts/${f.file}) format('woff2');unicode-range:${f.range}}`)
    .join('');
  return `${links.join('\n')}\n<style>${css}</style>`;
}
