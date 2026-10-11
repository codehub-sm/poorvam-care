# Print the FAQPage Q&As from a live page's JSON-LD: python3 migration/faqs.py /path
import sys, re, json, urllib.request
h = urllib.request.urlopen('https://poorvamcare.in' + sys.argv[1]).read().decode()
for m in re.findall(r'<script type="application/ld\+json">(.*?)</script>', h, re.S):
    try: d = json.loads(m)
    except Exception: continue
    nodes = d.get('@graph', [d]) if isinstance(d, dict) else d
    for n in nodes:
        if n.get('@type') == 'FAQPage':
            for q in n['mainEntity']:
                print('Q:', q['name']); print('A:', q['acceptedAnswer']['text']); print()
