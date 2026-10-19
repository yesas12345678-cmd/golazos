import os
import glob
import sys
from PIL import Image, ImageDraw

# Set utf8 stdout
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

artifact_dir = r"C:\Users\yesas\.gemini\antigravity-ide\brain\7c209cba-be6d-4132-95aa-a1190d6033f6"
os.makedirs("public", exist_ok=True)

# 1. Favicon Emblem: Make outside circular border transparent, resize to 512x512
fav_files = glob.glob(os.path.join(artifact_dir, "golazos_favicon_emblem_*.jpg"))
if fav_files:
    fav_path = max(fav_files, key=os.path.getctime)
    im = Image.open(fav_path).convert("RGBA")
    w, h = im.size
    cx, cy = w / 2, h / 2
    r = int(min(cx, cy) * 0.94)
    
    mask = Image.new("L", (w, h), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=255)
    im.putalpha(mask)
    
    im_512 = im.resize((512, 512), Image.Resampling.LANCZOS)
    im_512.save("public/favicon.png", "PNG")
    print("public/favicon.png saved (512x512 transparent circular)")

# 2. Horizontal Logo: Clean transparency from outer background
logo_files = glob.glob(os.path.join(artifact_dir, "golazos_logo_horizontal_*.jpg"))
if logo_files:
    logo_path = max(logo_files, key=os.path.getctime)
    im_logo = Image.open(logo_path).convert("RGBA")
    w, h = im_logo.size
    
    # We can detect background color from corners
    pix = im_logo.load()
    
    # Replace simulated checkerboard (near white / light gray) connected to borders with alpha=0
    # Let's use floodfill from (0,0) and borders on a mask
    mask = Image.new("L", (w, h), 255)
    
    # Breadth-first search / queue flood fill for pixels with r>175, g>175, b>175 and low saturation
    visited = set()
    queue = []
    
    # Add borders
    for x in range(w):
        queue.append((x, 0))
        queue.append((x, h - 1))
        visited.add((x, 0))
        visited.add((x, h - 1))
    for y in range(h):
        queue.append((0, y))
        queue.append((w - 1, y))
        visited.add((0, y))
        visited.add((w - 1, y))
        
    def is_bg(x, y):
        r, g, b, a = pix[x, y]
        return r > 165 and g > 165 and b > 165 and abs(r - g) < 25 and abs(g - b) < 25 and abs(r - b) < 25
        
    mask_pix = mask.load()
    
    while queue:
        x, y = queue.pop()
        if is_bg(x, y):
            mask_pix[x, y] = 0
            for nx, ny in ((x+1, y), (x-1, y), (x, y+1), (x, y-1)):
                if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in visited:
                    visited.add((nx, ny))
                    if is_bg(nx, ny):
                        queue.append((nx, ny))
                        
    im_logo.putalpha(mask)
    bbox = im_logo.getbbox()
    if bbox:
        pad = 20
        bbox = (max(0, bbox[0]-pad), max(0, bbox[1]-pad), min(w, bbox[2]+pad), min(h, bbox[3]+pad))
        im_logo = im_logo.crop(bbox)
        
    im_logo.save("public/logo.png", "PNG")
    print(f"public/logo.png saved (dimension: {im_logo.size})")
