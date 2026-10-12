#!/usr/bin/env python3
"""يجمع لعبة واحدة في ملف HTML واحد يعمل بلا مجلدات.
الاستعمال:  python3 tools/bundle.py auction   ->  dist/auction.html
يقرأ games/<id>/index.html ويدمج وسوم <link rel=stylesheet> و <script src> المحلية فقط
(بالترتيب نفسه)، ويترك روابط CDN كما هي."""
import re, sys, pathlib

root = pathlib.Path(__file__).resolve().parent.parent
game = sys.argv[1] if len(sys.argv) > 1 else 'auction'
gdir = root / 'games' / game
src = (gdir / 'index.html').read_text(encoding='utf-8')

def local(path):
    return not re.match(r'^(https?:)?//', path)

def css(m):
    tag = m.group(0)
    h = re.search(r'href="([^"]+)"', tag)
    if not h or 'stylesheet' not in tag or not local(h.group(1)):
        return tag
    return '<style>\n' + (gdir / h.group(1)).resolve().read_text(encoding='utf-8') + '\n</style>'

def js(m):
    tag = m.group(0)
    s = re.search(r'src="([^"]+)"', tag)
    if not s or not local(s.group(1)):
        return tag
    code = (gdir / s.group(1)).resolve().read_text(encoding='utf-8').replace('</script', '<\\/script')
    return '<script>\n' + code + '\n</script>'

out = re.sub(r'<link\b[^>]*>', css, src)
out = re.sub(r'<script\b[^>]*\bsrc="[^"]+"[^>]*></script>', js, out)
# رابط العودة إلى المينيو لا معنى له في الملف المنفرد
out = out.replace('../../index.html', '#')
dist = root / 'dist'; dist.mkdir(exist_ok=True)
(dist / f'{game}.html').write_text(out, encoding='utf-8')
print(f'dist/{game}.html', len(out) // 1024, 'KB')
