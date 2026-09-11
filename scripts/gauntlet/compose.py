"""Blind side-by-side compositor for the design gauntlet.

Usage:
  python scripts/gauntlet/compose.py <ours.png> <ref.png> <out.png> <mapping.json> [--max-height 1400] [--width 1100]

Produces a single image with two panels labeled "A" and "B" in RANDOM order, so a judge who only
sees <out.png> cannot know which panel is Meridian. Writes the mapping {"A": "ours"|"ref", "B": ...}
to <mapping.json>. The judge must never read the mapping file; the orchestrator decodes the verdict.
"""
import json
import secrets
import sys

from PIL import Image, ImageDraw, ImageFont


def fit(img: Image.Image, width: int, max_height: int) -> Image.Image:
    img = img.convert("RGB")
    ratio = width / img.width
    new_h = int(img.height * ratio)
    img = img.resize((width, new_h), Image.Resampling.LANCZOS)
    if img.height > max_height:
        img = img.crop((0, 0, width, max_height))
    return img


def main() -> None:
    args = sys.argv[1:]
    if len(args) < 4:
        print(__doc__)
        sys.exit(1)
    ours_path, ref_path, out_path, map_path = args[:4]

    def opt(name: str, default: int) -> int:
        if name in args:
            return int(args[args.index(name) + 1])
        return default

    panel_w = opt("--width", 1100)
    max_h = opt("--max-height", 1400)

    ours = fit(Image.open(ours_path), panel_w, max_h)
    ref = fit(Image.open(ref_path), panel_w, max_h)
    # Equalize heights (top-aligned crop) so neither panel gives away its identity by size.
    h = min(ours.height, ref.height)
    ours = ours.crop((0, 0, panel_w, h))
    ref = ref.crop((0, 0, panel_w, h))

    flip = secrets.randbelow(2) == 1
    left, right = (ref, ours) if flip else (ours, ref)
    mapping = {"A": "ref" if flip else "ours", "B": "ours" if flip else "ref"}

    label_h = 64
    gutter = 48
    canvas = Image.new("RGB", (panel_w * 2 + gutter, h + label_h), (236, 236, 236))
    draw = ImageDraw.Draw(canvas)
    try:
        font = ImageFont.truetype("arial.ttf", 30)
    except OSError:
        font = ImageFont.load_default()
    draw.text((panel_w // 2 - 10, 16), "A", fill=(20, 20, 20), font=font)
    draw.text((panel_w + gutter + panel_w // 2 - 10, 16), "B", fill=(20, 20, 20), font=font)
    canvas.paste(left, (0, label_h))
    canvas.paste(right, (panel_w + gutter, label_h))
    draw.rectangle((panel_w, label_h, panel_w + gutter, label_h + h), fill=(236, 236, 236))
    canvas.save(out_path, optimize=True)
    with open(map_path, "w", encoding="utf8") as f:
        json.dump(mapping, f)
    print(json.dumps({"out": out_path, "mapping_written": map_path, "height": h}))


if __name__ == "__main__":
    main()
