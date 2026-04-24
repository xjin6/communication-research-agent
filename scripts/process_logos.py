"""Crop transparent borders of logo images. For UM logo, also remove white/near-white
background (make it transparent)."""

import os
from PIL import Image

LOGOS_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "logos")


def trim_transparent(img: Image.Image) -> Image.Image:
    """Crop transparent padding around an RGBA image."""
    img = img.convert("RGBA")
    bbox = img.getbbox()
    if bbox:
        return img.crop(bbox)
    return img


def remove_white_bg(img: Image.Image, threshold: int = 200) -> Image.Image:
    """Replace near-white pixels with transparent pixels."""
    img = img.convert("RGBA")
    pixels = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if r >= threshold and g >= threshold and b >= threshold:
                pixels[x, y] = (r, g, b, 0)
    return img


def process(name: str, ext: str = "png", remove_bg: bool = False):
    raw_path = os.path.join(LOGOS_DIR, f"{name}_raw.{ext}")
    out_path = os.path.join(LOGOS_DIR, f"{name}.png")
    img = Image.open(raw_path)
    if remove_bg:
        img = remove_white_bg(img)
    img = trim_transparent(img)
    img.save(out_path, "PNG", optimize=True)
    print(f"{name}: {img.size} -> {out_path}")


if __name__ == "__main__":
    process("um", ext="jpg", remove_bg=True)
    process("cityu", remove_bg=False)
    process("polyu", remove_bg=False)
    process("tsinghua", remove_bg=True)
