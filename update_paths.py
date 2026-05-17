import sys

images = [
    'S__540925955.jpg',
    'S__540925957.jpg',
    'aya.jpeg',
    'azarashi.jpg',
    'group.jpg',
    'logo.png',
    'natan.jpg',
    'nemu.jpg',
    'rika.jpg',
    'wataame.jpg',
    '宿圖.jpg',
    '宿圖2.jpg',
    '宿圖3.jpg'
]

# Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

for img in images:
    html_content = html_content.replace('src="' + img + '"', 'src="素材/' + img + '"')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

# Update script.js
with open('script.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

for img in images:
    js_content = js_content.replace('image: "' + img + '"', 'image: "素材/' + img + '"')

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print('Updated paths successfully!')
