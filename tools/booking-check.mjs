#!/usr/bin/env node
/**
 * Dry run of the booking sheet with every lead sink stubbed (nothing is sent):
 * an in-centre booking, the US gate plus an Australian online booking, and the
 * sheet opening from the dock. Needs a built site served on PORT (default 8099).
 */
import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
async function run(url, steps) {
  const pg = await b.newPage();
  await pg.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await pg.evaluateOnNewDocument(() => {
    window.__calls = [];
    window.fetch = (u, o = {}) => { window.__calls.push({ u: String(u), body: o.body ? String(o.body) : '' });
      const json = String(u).includes('/token') ? { formToken: 't.1' } : String(u).includes('web3forms') ? { success: true } : { ok: true };
      return Promise.resolve(new Response(JSON.stringify(json), { status: 200, headers: { 'content-type': 'application/json' } })); };
  });
  pg.on('pageerror', (e) => console.log('PAGEERROR', e.message));
  await pg.goto(url, { waitUntil: 'networkidle0' });
  const r = await steps(pg);
  await pg.close();
  return r;
}
const form = 'main [data-booking]';
// 1. In-centre booking on /book
console.log(await run(`http://localhost:${process.env.PORT || 8099}/book/?service=ot&centre=phase-2`, async (pg) => {
  await pg.click(`${form} [data-step="2"] [data-next]`);
  await pg.type(`${form} [name=name]`, 'TEST Parent');
  await pg.type(`${form} [name=phone]`, '9876543210');
  await pg.click(`${form} [type=submit]`);
  await new Promise((r) => setTimeout(r, 3500));
  const calls = await pg.evaluate(() => window.__calls);
  const done = await pg.$eval(`${form} [data-done]`, (e) => !e.hidden);
  const tf = JSON.parse(calls.find((c) => c.u.endsWith('/enquiry/poorvam')).body);
  const sheet = JSON.parse(calls.find((c) => c.u.includes('script.google')).body);
  return { done, sinks: calls.map((c) => c.u.split('/').slice(2, 3)[0]), tf: { locationId: tf.locationId, mode: tf.preferredMode, phone: tf.phone, age: tf.childAge, concern: tf.concern }, sheet: { form: sheet.form, service: sheet.service, centre: sheet.centre, day: sheet.preferredDay, time: sheet.preferredTime } };
}));
// 2. Online from the US is gated; Australia passes with an intl number
console.log(await run(`http://localhost:${process.env.PORT || 8099}/online/enquiry/`, async (pg) => {
  await pg.click(`${form} [data-step="1"] [data-next]`);
  await pg.select(`${form} [name=country]`, 'United States');
  const gate = await pg.$eval(`${form} [data-gate]`, (e) => !e.hidden);
  await pg.click(`${form} [data-step="2"] [data-next]`);
  const stillStep2 = await pg.$eval(form, (f) => f.getAttribute('data-at'));
  await pg.select(`${form} [name=country]`, 'Australia');
  await pg.click(`${form} [data-step="2"] [data-next]`);
  await pg.type(`${form} [name=name]`, 'TEST Parent');
  await pg.type(`${form} [name=phone]`, '+61 412 345 678');
  await pg.click(`${form} [type=submit]`);
  await new Promise((r) => setTimeout(r, 3500));
  const calls = await pg.evaluate(() => window.__calls);
  const tf = JSON.parse(calls.find((c) => c.u.endsWith('/enquiry/poorvam')).body);
  return { usGateShown: gate, blockedAtStep: stillStep2, done: await pg.$eval(`${form} [data-done]`, (e) => !e.hidden), tf: { mode: tf.preferredMode, locationId: tf.locationId, phone: tf.phone, area: tf.areaText } };
}));
// 3. Sheet from a Book button on home
console.log(await run(`http://localhost:${process.env.PORT || 8099}/`, async (pg) => {
  await pg.click('.dock__book');
  const open = await pg.$eval('#book-sheet', (d) => d.open);
  return { sheetOpens: open };
}));
await b.close();
