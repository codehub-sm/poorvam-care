#!/usr/bin/env node
/**
 * Screenshot built pages at phone (390px) and desktop (1440px) width, cut into
 * readable chunks:
 *   node tools/shot.mjs <outdir> / /online/india …   → <outdir>/online-india-m-0.png …
 * Needs `python3 -m http.server 8092 --directory dist` running (PORT overrides).
 *
 * Full-page capture at a real viewport height, so sections sized in vh (the
 * home story) render as a visitor sees them; a 12000px-tall window does not.
 */
import puppeteer from 'puppeteer-core';
import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';

const [out = '/tmp/pc-shots', ...paths] = process.argv.slice(2);
const port = process.env.PORT || 8092;
mkdirSync(out, { recursive: true });
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
for (const p of paths) {
  const name = p.replace(/^\//, '').replace(/\//g, '-') || 'home';
  for (const [kind, width, height, scale] of [['m', 390, 844, 1], ['d', 1440, 900, 0.5]]) {
    const page = await browser.newPage();
    await page.setViewport({ width, height, deviceScaleFactor: scale, isMobile: kind === 'm', hasTouch: kind === 'm' });
    await page.goto(`http://localhost:${port}${p === '/' ? '/' : `${p}/`}`, { waitUntil: 'networkidle0' });
    // Walk down the page so scroll-triggered graphics reach their final state.
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } window.scrollTo(0, 0); });
    await new Promise((r) => setTimeout(r, 400));
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 0) console.log(`${p} ${kind}: HORIZONTAL OVERFLOW ${overflow}px`);
    await page.screenshot({ path: `${out}/${name}-${kind}.png`, fullPage: true });
    await page.close();
  }
  execFileSync('python3', ['-c', `
import sys
from PIL import Image
out, page = sys.argv[1], sys.argv[2]
for kind, chunk in (('m', 2000), ('d', 1100)):
    im = Image.open(f'{out}/{page}-{kind}.png').convert('RGB')
    w, h = im.size
    n = 0
    for n, top in enumerate(range(0, h, chunk)):
        im.crop((0, top, w, min(h, top + chunk))).save(f'{out}/{page}-{kind}-{n}.png')
    print(page, kind, 'chunks:', n + 1)
`, out, name], { stdio: 'inherit' });
}
await browser.close();
