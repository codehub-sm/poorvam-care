#!/usr/bin/env node
/** Dry run of the studio booking form with window.open stubbed: weekday, evening, weekend, birthday and the 10 PM guard. Needs dist on PORT (8092). */
import puppeteer from 'puppeteer-core';
const port = process.env.PORT || 8092;
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const p = await b.newPage();
await p.evaluateOnNewDocument(() => { window.__opened = []; window.open = (u) => { window.__opened.push(u); return null; }; });
await p.goto(`http://localhost:${port}/studio/`, { waitUntil: 'networkidle0' });
const set = (o) => p.evaluate((o) => { const f = document.querySelector('[data-studio-form]'); for (const [k, v] of Object.entries(o)) f[k].value = v; f.dispatchEvent(new Event('change', { bubbles: true })); return { total: f.querySelector('[data-total]').textContent, hours: f.hours.value, locked: f.hours.disabled, warn: f.querySelector('[data-warn]').hidden ? '' : f.querySelector('[data-warn]').textContent }; }, o);
const r = {};
r.defaultDate = await p.$eval('[name=date]', (e) => e.value);
r.weekdayDay = await set({ purpose: 'Dance practice', date: '2026-10-14', start: '10:00', hours: 2 });
r.weekdayEve = await set({ start: '18:00', hours: 2 });
r.weekend = await set({ date: '2026-10-17', start: '10:00', hours: 2 });
r.birthdayWeekday = await set({ purpose: 'Birthday party', date: '2026-10-14' });
r.birthdayWeekend = await set({ date: '2026-10-18' });
r.workshopMin = await set({ purpose: 'Workshop / event / shoot', hours: 1, date: '2026-10-14', start: '09:00' });
r.pastTen = await set({ purpose: 'Dance practice', start: '21:00', hours: 3 });
await set({ start: '18:00', hours: 2 });
await p.type('[name=name]', 'TEST Parent');
await p.click('[data-studio-form] [type=submit]');
await new Promise((x) => setTimeout(x, 300));
r.whatsapp = await p.evaluate(() => decodeURIComponent((window.__opened[0] || '').split('?text=')[1] || ''));
r.msgShown = await p.$eval('[data-msg]', (e) => !e.hidden);
r.events = await p.evaluate(() => (window.dataLayer || []).filter((a) => a[0] === 'event').map((a) => [a[1], a[2]]));
console.log(JSON.stringify(r, null, 1));
await b.close();
