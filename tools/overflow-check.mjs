#!/usr/bin/env node
/** Every built page at 390px: fails if any scrolls sideways, or logs a JS error. Needs dist served on PORT (8092). */
import puppeteer from 'puppeteer-core';
import { readFileSync } from 'node:fs';
const port = process.env.PORT || 8092;
const paths = [...readFileSync('dist/sitemap.xml', 'utf8').matchAll(/<loc>https:\/\/poorvamcare\.in([^<]*)<\/loc>/g)].map((m) => m[1]).concat(['/book', '/online/enquiry']);
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
let bad = 0;
for (const p of paths) {
  const pg = await b.newPage();
  const errs = [];
  pg.on('pageerror', (e) => errs.push(e.message));
  await pg.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await pg.goto(`http://localhost:${port}${p === '/' ? '/' : `${p}/`}`, { waitUntil: 'networkidle0' });
  const over = await pg.evaluate(() => [document.documentElement.scrollWidth - innerWidth, [...document.querySelectorAll('main *')].filter((e) => e.getBoundingClientRect().right > innerWidth + 1 && getComputedStyle(e).position !== 'fixed').slice(0, 3).map((e) => e.className || e.tagName)]);
  if (over[0] > 0 || errs.length) { bad++; console.log(`${p}: overflow ${over[0]}px ${over[1].join(', ')} ${errs.join('; ')}`); }
  await pg.close();
}
await b.close();
console.log(`${paths.length} pages checked, ${bad} with problems`);
process.exit(bad ? 1 : 0);
