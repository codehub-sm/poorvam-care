// Push every sitemap URL to IndexNow (Bing and partners) after a deploy.
// Usage: node tools/indexnow.mjs [https://poorvamcare.in]
// Run only once the deploy is live: the engine fetches /<key>.txt to check ownership.
const KEY = '43c468391d9d4208e9d4d14d402c3345';
const site = (process.argv[2] ?? 'https://poorvamcare.in').replace(/\/$/, '');
const host = new URL(site).host;

const keyRes = await fetch(`${site}/${KEY}.txt`);
const keyBody = (await keyRes.text()).trim();
if (!keyRes.ok || keyBody !== KEY) throw new Error(`Key file not live at ${site}/${KEY}.txt (HTTP ${keyRes.status})`);

const xml = await (await fetch(`${site}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urlList.length) throw new Error('Sitemap has no <loc> entries');

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key: KEY, keyLocation: `${site}/${KEY}.txt`, urlList }),
});
if (res.status !== 200 && res.status !== 202) throw new Error(`IndexNow rejected: HTTP ${res.status} ${await res.text()}`);
console.log(`IndexNow accepted ${urlList.length} URLs for ${host} (HTTP ${res.status})`);
