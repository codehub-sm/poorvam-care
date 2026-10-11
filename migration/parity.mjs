#!/usr/bin/env node
/**
 * Parity gate (clinic-site migration-safety §4). For every URL in the live
 * baseline, checks the rebuilt site still serves it and still carries what it
 * ranked on. Prints a FAIL table; exits 1 if any row fails.
 *
 *   node migration/parity.mjs                 check dist/ + deploy/amplify-redirects.json
 *   node migration/parity.mjs https://<host>  check a deployed preview over HTTP
 *
 * Checks per URL: 200 (or one 301 hop to a 200); title still contains the
 * primary query (the old title's text before the first "|" or " - ", or the
 * override below); exactly one H1; canonical is self; no noindex (unless the
 * old page was noindex); schema @types ⊇ old @types (minus ones listed as
 * deliberately retired); every old FAQ question still present (as FAQ schema
 * or visible text); indexed words ≥ 80% of old; inbound internal links ≥ old.
 */
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base = JSON.parse(readFileSync(path.join(root, 'migration/baseline/baseline.json')));
const ORIGIN = process.argv[2]?.replace(/\/$/, '');

/** Primary queries where the old title's head isn't the query people use (from GSC). */
const PRIMARY = {
  '/': 'Early Intervention Centre in Electronic City',
  '/child-development': 'Child Development Cent',
  '/hearing-center': 'Hearing Cent',
  '/about': 'About Poorvam Care',
  '/contact': 'Contact Poorvam Care',
  '/faq': 'FAQ',
  '/blog': 'Blog',
  '/electronic-city-phase-2': 'Electronic City Phase 2',
  '/parent-counselling': 'Parent Counselling',
};

/**
 * Old schema types not carried over, each for a stated reason. Anything else
 * missing is a FAIL.
 */
const RETIRED_TYPES = {
  Offer: 'kept only where the old page offered a service; never with a price',
  OfferCatalog: 'replaced by availableService on each clinic node',
  City: 'areaServed uses Place',
  Organization: 'covered by MedicalBusiness (an Organization subtype)',
  LocalBusiness: 'covered by MedicalClinic + LocalBusiness on the clinic nodes',
};

const strip = (s) => s.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ').trim();
const norm = (s) => String(s ?? '').toLowerCase().replace(/&amp;/g, '&').replace(/[’']/g, "'").replace(/[^a-z0-9&' ]+/g, ' ').replace(/\s+/g, ' ').trim();
const one = (re, s) => (s.match(re) || [])[1]?.trim() ?? null;

function types(node, out) {
  if (Array.isArray(node)) node.forEach((n) => types(n, out));
  else if (node && typeof node === 'object') { const t = node['@type']; if (t) [].concat(t).forEach((x) => out.add(x)); Object.values(node).forEach((v) => types(v, out)); }
  return out;
}

const redirects = ORIGIN ? [] : JSON.parse(readFileSync(path.join(root, 'deploy/amplify-redirects.json')));
async function load(p) {
  if (ORIGIN) {
    const r1 = await fetch(ORIGIN + p, { redirect: 'manual' });
    if (r1.status >= 300 && r1.status < 400) {
      const loc = new URL(r1.headers.get('location'), ORIGIN + p).pathname;
      const r2 = await fetch(ORIGIN + loc, { redirect: 'manual' });
      return { status: r1.status, final: loc, finalStatus: r2.status, html: r2.status === 200 ? await r2.text() : '' };
    }
    return { status: r1.status, final: p, html: r1.status === 200 ? await r1.text() : '' };
  }
  const rule = redirects.find((r) => r.source === p && r.status === '301');
  const at = rule ? rule.target : p;
  const file = path.join(root, 'dist', at === '/' ? 'index.html' : `${at.slice(1)}/index.html`);
  const html = existsSync(file) ? readFileSync(file, 'utf8') : '';
  return rule ? { status: 301, final: at, finalStatus: html ? 200 : 404, html } : { status: html ? 200 : 404, final: p, html };
}

const pages = new Map();
for (const row of base.rows) pages.set(row.path, await load(row.path));

// Inbound internal links per target, across every page we now serve.
const inbound = new Map();
for (const [, r] of pages) for (const href of new Set([...r.html.matchAll(/href="(\/[^"#?]*)/g)].map((m) => m[1]))) inbound.set(href, (inbound.get(href) ?? 0) + 1);
const oldInbound = new Map();
for (const row of base.rows) for (const href of row.internalLinks ?? []) oldInbound.set(href, (oldInbound.get(href) ?? 0) + 1);

const fails = [];
const rows = [];
for (const row of base.rows) {
  const r = pages.get(row.path);
  const f = (check, detail) => fails.push({ path: row.path, check, detail });
  if (r.status === 301 && r.finalStatus !== 200) f('status', `301 → ${r.final} which is ${r.finalStatus}`);
  if (r.status !== 200 && r.status !== 301) { f('status', `${r.status}`); continue; }
  if (r.status === 301) { rows.push([row.path, `301 → ${r.final}`]); continue; }
  const h = r.html;
  const title = one(/<title>([\s\S]*?)<\/title>/, h);
  const primary = PRIMARY[row.path] ?? row.title.split(/\s[|–—-]\s|\s\|/)[0];
  if (!norm(title).includes(norm(primary))) f('title', `"${title}" lost "${primary}"`);
  const h1 = (h.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) f('h1', `${h1} H1s`);
  const canonical = one(/<link rel="canonical" href="([^"]+)"/, h);
  const want = `https://poorvamcare.in${row.path === '/' ? '/' : row.path}`;
  if (canonical !== want) f('canonical', `${canonical} ≠ ${want}`);
  const robots = one(/<meta name="robots" content="([^"]+)"/, h) ?? '';
  if (/noindex/.test(robots) && !/noindex/.test(row.robots ?? '')) f('robots', `now ${robots}`);
  const ld = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => { try { return JSON.parse(m[1]); } catch { return null; } });
  const now = types(ld, new Set());
  const lost = (row.schemaTypes ?? []).filter((t) => !now.has(t) && !RETIRED_TYPES[t]);
  if (lost.length) f('schema', `lost ${lost.join(', ')}`);
  const text = norm(strip(h));
  const faqNow = new Set(JSON.stringify(ld).match(/"name":"[^"]*"/g)?.map((s) => norm(s.slice(8, -1))) ?? []);
  const missingFaq = (row.faqQuestions ?? []).filter((q) => !faqNow.has(norm(q)) && !text.includes(norm(q)));
  if (missingFaq.length) f('faq', `missing ${missingFaq.length}: ${missingFaq.map((q) => `"${q}"`).join('; ')}`);
  const main = one(/<main[^>]*>([\s\S]*?)<\/main>/, h) ?? '';
  const words = strip(main).split(' ').length;
  if (words < row.words * 0.8) f('words', `${words} < 80% of ${row.words}`);
  const inNow = inbound.get(row.path) ?? 0;
  const inOld = oldInbound.get(row.path) ?? 0;
  if (inNow < inOld) f('inbound', `${inNow} internal links in, was ${inOld}`);
  rows.push([row.path, `200 · ${words}w (was ${row.words}) · ${(row.faqQuestions ?? []).length}→${faqNow.size ? [...ld].flatMap((d) => d['@graph'] ?? [d]).filter((n) => n['@type'] === 'FAQPage').flatMap((n) => n.mainEntity).length : 0} FAQ · in ${inOld}→${inNow}`]);
}

console.log(`Parity vs live baseline (${base.capturedAt.slice(0, 10)}), ${ORIGIN ?? 'local dist/'}\n`);
for (const [p, s] of rows) console.log(`  ${p.padEnd(52)} ${s}`);
if (fails.length) {
  console.log(`\nFAIL (${fails.length}):`);
  for (const x of fails) console.log(`  ${x.path.padEnd(52)} ${x.check.padEnd(9)} ${x.detail}`);
  process.exit(1);
}
console.log('\nPASS: every baseline URL keeps its status, query, H1, canonical, schema, FAQs, words and inbound links.');
