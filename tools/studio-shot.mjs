#!/usr/bin/env node
/** Screenshots /studio at 360px light, 360px dark and 1440px light, and fails on sideways scroll. Needs dist on PORT (8092). */
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';
const out = process.argv[2] || '/tmp/studio-shots';
mkdirSync(out, { recursive: true });
const port = process.env.PORT || 8092;
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
let bad = 0;
for (const [name, width, dark] of [['m', 360, false], ['m-dark', 360, true], ['d', 1440, false]]) {
  const p = await b.newPage();
  const errs = [];
  p.on('pageerror', (e) => errs.push(e.message));
  await p.setViewport({ width, height: 800, isMobile: width < 500, hasTouch: width < 500 });
  await p.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: dark ? 'dark' : 'light' }]);
  await p.goto(`http://localhost:${port}/studio/`, { waitUntil: 'networkidle0' });
  const over = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  if (over > 0 || errs.length) { bad++; console.log(`${name}: overflow ${over}px ${errs.join('; ')}`); }
  await p.screenshot({ path: `${out}/studio-${name}.png`, fullPage: true });
  await p.close();
}
await b.close();
console.log(bad ? 'PROBLEMS' : 'ok: no overflow, no JS errors');
process.exit(bad ? 1 : 0);
