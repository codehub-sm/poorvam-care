#!/usr/bin/env node
/**
 * The parity contract for one old URL: what the live page had that the new one
 * must keep. Usage: node migration/old.mjs /speech-therapy-electronic-city
 * Prints the baseline row (title, H1, H2s, schema types, word count, internal
 * links), every FAQ question AND answer from the live JSON-LD, the visible
 * text of <main>, and the GSC clicks/impressions for the page.
 */
import { readFileSync } from 'node:fs';
const p = process.argv[2];
const base = JSON.parse(readFileSync(new URL('./baseline/baseline.json', import.meta.url)));
const row = base.rows.find((r) => r.path === p);
if (!row) { console.error(`${p} is not in the baseline`); process.exit(1); }
const gsc = readFileSync(new URL('./baseline/gsc/Pages.csv', import.meta.url), 'utf8').split('\n')
  .filter((l) => l.startsWith(`https://poorvamcare.in${p},`) || l.startsWith(`https://poorvamcare.in${p}/,`));
console.log(JSON.stringify({ ...row, internalLinks: row.internalLinks }, null, 1));
console.log('\nGSC (6 months: clicks, impressions, CTR, position):', gsc.length ? gsc.join(' | ') : 'none');
const html = await (await fetch(`https://poorvamcare.in${p}`)).text();
const nodes = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((m) => { try { const d = JSON.parse(m[1]); return d['@graph'] ?? [d]; } catch { return []; } });
console.log('\n--- FAQs (must all be kept, question text verbatim or near-verbatim) ---');
for (const n of nodes) if (n['@type'] === 'FAQPage') for (const q of n.mainEntity) console.log(`Q: ${q.name}\nA: ${q.acceptedAnswer.text}\n`);
const main = (html.match(/<main[\s\S]*?<\/main>/) ?? [html])[0];
console.log('--- visible text of the live page ---');
console.log(main.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, '\n').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/\n\s*\n+/g, '\n').trim());
