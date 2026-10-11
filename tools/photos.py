#!/usr/bin/env python3
"""Turn generated hero PNGs into the web files the site serves.

    python3 tools/photos.py <dir-of-pngs>
For every <key>.png whose key is in PHOTOS (src/site.mjs) it writes
assets/img/photos/<key>-1200.webp, <key>-720.webp and <key>-1200.jpg,
cropped to 3:2. Originals (~2 MB each) stay out of the repo.
"""
import re, sys, pathlib
from PIL import Image

src = pathlib.Path(sys.argv[1])
root = pathlib.Path(__file__).resolve().parent.parent
keys = re.findall(r"^\s+'?([a-z-]+)'?: '", (root / 'src/site.mjs').read_text().split('export const PHOTOS = {')[1].split('};')[0], re.M)
out = root / 'assets/img/photos'
out.mkdir(parents=True, exist_ok=True)
for key in keys:
    png = src / f'{key}.png'
    if not png.exists():
        print(f'missing {png.name}')
        continue
    im = Image.open(png).convert('RGB')
    w, h = im.size
    th = round(w * 2 / 3)
    if th < h:  # crop to 3:2 around the middle
        top = (h - th) // 2
        im = im.crop((0, top, w, top + th))
    for width in (1200, 720):
        r = im.resize((width, round(width * 2 / 3)), Image.LANCZOS)
        r.save(out / f'{key}-{width}.webp', 'WEBP', quality=78, method=6)
        if width == 1200:
            r.save(out / f'{key}-1200.jpg', 'JPEG', quality=80, optimize=True, progressive=True)
    sizes = ', '.join(f'{p.name} {p.stat().st_size // 1024}KB' for p in sorted(out.glob(f'{key}-*')))
    print(sizes)
