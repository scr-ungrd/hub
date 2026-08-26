#!/usr/bin/env python3
"""Transform a source logo/image into the HUB SCR teal icon style.

Recolors every opaque pixel to a single teal tone (default #087283, the
hub's accent color — see .category-divider-line in css/style.css) on a
transparent background, then crops tightly to the content with a small
transparent margin. Output matches assets/logos/*-teal.png already in the
repo (pn26-teal.png, idrim-teal.png, magma-logo-teal.png,
mapas-comunitarios-teal.png).

Usage:
  python3 transform_icon.py INPUT.png [-o OUTPUT.png] [--mode solid|duotone]
                              [--color 087283] [--bg-tolerance 10] [--pad 0.02]

Modes (see SKILL.md for the decision process — try solid first):
  solid    - keeps the original shape at full opacity (or the flood-filled
             foreground, if the source has an opaque flat background
             instead of real transparency). Use for wordmarks / a single
             cohesive silhouette where the outline alone carries the
             meaning (pn26-teal.png, idrim-teal.png, magma-logo-teal.png).
  duotone  - maps each pixel's luminance to alpha (dark input -> opaque
             teal, light input -> faint/near-transparent teal), so internal
             contrast between adjacent components survives the recolor.
             Use when solid flattening would merge distinct parts (text vs.
             shape, several pictorial elements) into an unreadable blob
             (mapas-comunitarios-teal.png, natech-teal.png).

If the source has an opaque background (e.g. a circular badge on a solid
square) instead of real transparency, the background is detected with a
flood fill from the image border — NOT a global color match — because
foreground shapes are sometimes drawn in the very same color as the
backdrop (e.g. a dark silhouette cut from the same navy as the square
behind it). A global match would erase that silhouette; the flood fill only
removes the region actually connected to the border.
"""
import argparse
from collections import deque
from pathlib import Path

from PIL import Image


def hex_to_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))


def flood_fill_background(im, tolerance):
    """Boolean grid marking pixels connected to the border that share the
    border's color (within tolerance) — the true background region."""
    w, h = im.size
    px = im.load()
    bg_color = px[0, 0][:3]

    def close(p):
        return all(abs(p[i] - bg_color[i]) <= tolerance for i in range(3))

    visited = [[False] * w for _ in range(h)]
    q = deque()
    for x in range(w):
        for y in (0, h - 1):
            if not visited[y][x] and close(px[x, y][:3]):
                visited[y][x] = True
                q.append((x, y))
    for y in range(h):
        for x in (0, w - 1):
            if not visited[y][x] and close(px[x, y][:3]):
                visited[y][x] = True
                q.append((x, y))
    while q:
        x, y = q.popleft()
        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h and not visited[ny][nx]:
                if close(px[nx, ny][:3]):
                    visited[ny][nx] = True
                    q.append((nx, ny))
    return visited


def transform(input_path, output_path, mode, color, bg_tolerance, pad_frac):
    im = Image.open(input_path).convert("RGBA")
    w, h = im.size
    px = im.load()

    corners_transparent = all(px[x, y][3] == 0 for x in (0, w - 1) for y in (0, h - 1))
    background = None if corners_transparent else flood_fill_background(im, bg_tolerance)

    out = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    opx = out.load()
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            if background is not None and background[y][x]:
                continue
            if mode == "solid":
                opx[x, y] = (*color, a)
            else:
                lum = 0.299 * r + 0.587 * g + 0.114 * b
                alpha = max(0, min(255, int(round(255 - lum))))
                opx[x, y] = (*color, alpha)

    bbox = out.getbbox()
    if bbox is None:
        raise SystemExit(
            "No opaque content survived background removal — check --bg-tolerance "
            "(the source's border color may not be a clean flat fill)."
        )
    out = out.crop(bbox)
    pad = max(4, int(pad_frac * max(out.size)))
    padded = Image.new("RGBA", (out.size[0] + 2 * pad, out.size[1] + 2 * pad), (0, 0, 0, 0))
    padded.paste(out, (pad, pad), out)
    padded.save(output_path)
    return padded.size


def main():
    ap = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    ap.add_argument("input")
    ap.add_argument("-o", "--output", help="default: <input-stem>-teal.png next to the input")
    ap.add_argument("--mode", choices=["solid", "duotone"], default="solid")
    ap.add_argument("--color", default="087283", help="hex color, default hub teal #087283")
    ap.add_argument("--bg-tolerance", type=int, default=10)
    ap.add_argument("--pad", type=float, default=0.02, help="fraction of max(width,height)")
    args = ap.parse_args()

    input_path = Path(args.input)
    output_path = (
        Path(args.output) if args.output else input_path.with_name(input_path.stem + "-teal.png")
    )
    color = hex_to_rgb(args.color)
    size = transform(input_path, output_path, args.mode, color, args.bg_tolerance, args.pad)
    print(f"saved {output_path} ({size[0]}x{size[1]})")


if __name__ == "__main__":
    main()
