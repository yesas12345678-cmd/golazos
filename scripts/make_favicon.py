from PIL import Image, ImageDraw

src_path = r'C:\Users\yesas\.gemini\antigravity-ide\brain\7c209cba-be6d-4132-95aa-a1190d6033f6\golazos_favicon_direct_1792443637580.jpg'
im = Image.open(src_path).convert('RGBA')

# Find the bounding box of the squircle
# Check along the diagonal from top-left (0,0) to see where non-white starts
diag_start = 0
for i in range(300):
    r, g, b, _ = im.getpixel((i, i))
    if r < 240 or g < 240 or b < 240:
        diag_start = i
        break

print(f"Squircle starts around diagonal pixel: {diag_start}")

# Create a high-res mask for the rounded rectangle
# Bounding box of squircle is roughly [0, 0, 1024, 1024] with corner radius
# Let's inspect edges: left edge at y=512, top edge at x=512
left_edge = 0
for x in range(100):
    r, g, b, _ = im.getpixel((x, 512))
    if r < 240 or g < 240 or b < 240:
        left_edge = x
        break

top_edge = 0
for y in range(100):
    r, g, b, _ = im.getpixel((512, y))
    if r < 240 or g < 240 or b < 240:
        top_edge = y
        break

print(f"Edges: left={left_edge}, top={top_edge}")

# Create antialiased mask at 1024x1024
# The squircle extends from (0,0) to (1024,1024) with radius ~ 220
mask = Image.new('L', (1024, 1024), 0)
draw = ImageDraw.Draw(mask)
# Radius is approximately 220 px
draw.rounded_rectangle([0, 0, 1023, 1023], radius=225, fill=255)

# Apply mask
output_1024 = Image.new('RGBA', (1024, 1024), (0, 0, 0, 0))
output_1024.paste(im, (0, 0), mask=mask)

# Resize to standard WordPress 512x512 with high-quality Lanczos resampling
output_512 = output_1024.resize((512, 512), Image.Resampling.LANCZOS)
output_512.save(r'c:\PROYECTOS\golazos\public\favicon_512.png', format='PNG')

# Also generate 32x32 and 16x16 to inspect legibility
out_32 = output_1024.resize((32, 32), Image.Resampling.LANCZOS)
out_32.save(r'c:\PROYECTOS\golazos\public\favicon_32.png', format='PNG')
out_16 = output_1024.resize((16, 16), Image.Resampling.LANCZOS)
out_16.save(r'c:\PROYECTOS\golazos\public\favicon_16.png', format='PNG')

print("Favicon files saved in public/")
