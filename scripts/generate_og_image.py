from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

WIDTH, HEIGHT = 1200, 630
BG = (19, 195, 144)
INK = (18, 35, 58)
CREAM = (245, 255, 250)

img = Image.new("RGB", (WIDTH, HEIGHT), BG)
draw = ImageDraw.Draw(img)

try:
    font_heading = ImageFont.truetype("/System/Library/Fonts/Supplemental/Helvetica.ttc", 96)
    font_body = ImageFont.truetype("/System/Library/Fonts/Supplemental/Helvetica.ttc", 44)
except OSError:
    font_heading = ImageFont.load_default()
    font_body = ImageFont.load_default()

text_blocks = [
    ("Performance Peak", (255, 255, 255), font_heading),
    ("Digital Strategy & AI Consultancy", CREAM, font_body),
    ("Build with intelligence.", INK, font_body),
]

padding_x = 80
padding_y = 80
spacing = 28
current_y = padding_y

for text, color, font in text_blocks:
    draw.text((padding_x, current_y), text, fill=color, font=font)
    _, text_height = draw.textsize(text, font=font)
    current_y += text_height + spacing

output = Path("public/og-image.png")
output.parent.mkdir(parents=True, exist_ok=True)
img.save(output, format="PNG", optimize=True)
print(f"Generated {output} ({output.stat().st_size} bytes)")
