// Snapshot every live URL's SEO surface so the rebuilt site can be diffed
// against it (clinic-site migration-safety §1). Usage:
//   node migration/baseline.mjs https://poorvamcare.in > migration/baseline/baseline.json
const ORIGIN = process.argv[2] || 'https://poorvamcare.in';
const EXTRA = ['/book', '/online/enquiry'];

const strip = (s) => s.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ').trim();
const one = (re, s) => (s.match(re) || [])[1]?.trim() ?? null;
const attr = (tag, name, s) => {
  for (const m of s.matchAll(new RegExp(`<${tag}\\b[^>]*>`, 'gi'))) {
    if (new RegExp(`(name|property|rel)=["']${name}["']`, 'i').test(m[0])) return one(/(?:content|href)=["']([^"']*)["']/i, m[0]);
  }
  return null;
};

function types(node, out) {
  if (Array.isArray(node)) node.forEach((n) => types(n, out));
  else if (node && typeof node === 'object') {
    const t = node['@type'];
    if (t) [].concat(t).forEach((x) => out.add(x));
    Object.values(node).forEach((v) => types(v, out));
  }
  return out;
}
function faqs(node, out = []) {
  if (Array.isArray(node)) node.forEach((n) => faqs(n, out));
  else if (node && typeof node === 'object') {
    if (node['@type'] === 'Question' && node.name) out.push(node.name);
    Object.values(node).forEach((v) => faqs(v, out));
  }
  return out;
}

async function snap(path) {
  const res = await fetch(ORIGIN + path, { redirect: 'manual' });
  const row = { path, status: res.status };
  if (res.status >= 300 && res.status < 400) { row.location = res.headers.get('location'); return row; }
  const html = await res.text();
  const ld = [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => { try { return JSON.parse(m[1]); } catch { return null; } }).filter(Boolean);
  const main = one(/<main\b[^>]*>([\s\S]*?)<\/main>/i, html) ?? html;
  Object.assign(row, {
    title: one(/<title[^>]*>([\s\S]*?)<\/title>/i, html),
    description: attr('meta', 'description', html),
    canonical: attr('link', 'canonical', html),
    robots: attr('meta', 'robots', html),
    h1: [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => strip(m[1])),
    h2: [...html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) => strip(m[1])),
    schemaTypes: [...types(ld, new Set())].sort(),
    faqQuestions: faqs(ld),
    words: strip(main).split(' ').length,
    internalLinks: [...new Set([...html.matchAll(/href=["'](\/[^"'#?]*)/g)].map((m) => m[1]))].sort(),
  });
  return row;
}

const sitemap = await (await fetch(ORIGIN + '/sitemap.xml')).text();
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const queue = [...new Set([...paths, ...EXTRA])];
const seen = new Set(queue);
const rows = [];
while (queue.length) {
  const p = queue.shift();
  const row = await snap(p);
  rows.push(row);
  for (const l of row.internalLinks ?? []) {
    if (!seen.has(l) && !/\.(png|jpe?g|svg|webp|ico|css|js|pdf|txt|xml|json|webmanifest)$/i.test(l) && !l.startsWith('/assets/')) {
      seen.add(l); queue.push(l);
    }
  }
}
console.log(JSON.stringify({ origin: ORIGIN, capturedAt: new Date().toISOString(), sitemapCount: paths.length, rows }, null, 2));
