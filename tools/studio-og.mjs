#!/usr/bin/env node
/** Renders assets/img/studio/og.jpg (1200x630) in the studio sub-brand look. */
import puppeteer from 'puppeteer-core';
const html = `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,800&family=Manrope:wght@600&family=IBM+Plex+Mono:wght@500&display=swap">
<style>body{margin:0;width:1200px;height:630px;overflow:hidden;color:#fff;font-family:Manrope;background:radial-gradient(90% 120% at 100% 0%,#4a3be0 0%,rgb(74 59 224/0) 60%),linear-gradient(160deg,#221d6b 0%,#2c2591 100%);position:relative}
.in{position:absolute;left:80px;top:72px;width:640px}.mark{font:800 34px 'Bricolage Grotesque';display:flex;align-items:center;gap:14px}.mark b{color:#ffb22e}.dot{width:20px;height:20px;background:#ffb22e;border-radius:4px;transform:rotate(45deg)}
.eb{font:500 22px 'IBM Plex Mono';color:#ffb22e;margin:54px 0 16px}h1{font:800 70px/1.02 'Bricolage Grotesque';letter-spacing:-2px;margin:0 0 30px}
.facts{display:flex;gap:28px;font:500 22px 'IBM Plex Mono';color:rgba(255,255,255,.85)}.facts b{color:#ffb22e}
svg{position:absolute;right:70px;top:120px;width:380px}</style></head><body>
<div class="in"><div class="mark"><span class="dot"></span>Poorvam <b>Studio</b></div><p class="eb">Hall for rent · Electronic City Ph 1</p><h1>1,500 sq ft of mirrored floor, by the hour.</h1><div class="facts"><span><b>40</b> guests</span><span><b>6–10</b> daily</span><span>from <b>₹500</b>/hr</span></div></div>
<svg viewBox="0 0 520 340"><rect x="30" y="30" width="460" height="270" rx="6" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.75)" stroke-width="3"/><rect x="30" y="30" width="460" height="10" fill="#b9c7ff"/><path d="M430 300v-40a40 40 0 0 1 40 40" fill="none" stroke="#ffb22e" stroke-width="3" stroke-dasharray="5 4"/><text x="260" y="185" text-anchor="middle" fill="#ffb22e" font-family="Bricolage Grotesque" font-weight="800" font-size="44">1,500 sq ft</text><text x="260" y="66" text-anchor="middle" fill="#fff" opacity=".8" font-family="IBM Plex Mono" font-size="13" letter-spacing="2">MIRROR WALL</text></svg>
</body></html>`;
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const p = await b.newPage();
await p.setViewport({ width: 1200, height: 630 });
await p.setContent(html, { waitUntil: 'networkidle0' });
await p.screenshot({ path: 'assets/img/studio/og.jpg', type: 'jpeg', quality: 86 });
await b.close();
