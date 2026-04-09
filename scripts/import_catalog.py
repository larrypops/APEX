from __future__ import annotations

import argparse
import html
import json
import pathlib
import re
import subprocess
import sys
import urllib.parse


PRODUCTS = [
    ("laser-light-5w-01", "https://laserigniter.com/product/laser-light-5w-01/?v=d1e7fd6e6a2a"),
    (
        "laser-light-5w-002",
        "https://laserigniter.com/product/laser-light-strong-blue-light-ignites-cigarettes-can-reach-60-kilometers-002/?v=d1e7fd6e6a2a",
    ),
    ("laser-igniter-40w-003", "https://laserigniter.com/product/laser-igniter-003/?v=d1e7fd6e6a2a"),
    ("laser-igniter-80w-004", "https://laserigniter.com/product/laser-igniter-80w-004/?v=d1e7fd6e6a2a"),
    ("laser-igniter-100w-005", "https://laserigniter.com/product/laser-igniter-100w-005/?v=d1e7fd6e6a2a"),
    ("laser-igniter-100w-006", "https://laserigniter.com/product/laser-igniter-100w-006/?v=d1e7fd6e6a2a"),
    (
        "laser-igniter-120w-007",
        "https://laserigniter.com/product/120w-laser-cannon-ignites-10-meters-feels-super-good-007/?v=d1e7fd6e6a2a",
    ),
    (
        "laser-igniter-120w-008",
        "https://laserigniter.com/product/laser-big-gun-high-power-long-ignition-distance/?v=d1e7fd6e6a2a",
    ),
    ("laser-igniter-150w-009", "https://laserigniter.com/product/laser-igniter-150w/?v=d1e7fd6e6a2a"),
    ("laser-igniter-260w-010", "https://laserigniter.com/product/laser-igniter-260w-010/?v=d1e7fd6e6a2a"),
    ("laser-igniter-260w-011", "https://laserigniter.com/product/laser-igniter-011-2/?v=d1e7fd6e6a2a"),
    ("laser-igniter-400w-012", "https://laserigniter.com/product/laser-igniter-400w-012/?v=d1e7fd6e6a2a"),
    ("laser-igniter-500w-013", "https://laserigniter.com/product/laser-igniter-500w-013/?v=d1e7fd6e6a2a"),
    ("laser-igniter-660w-014", "https://laserigniter.com/product/laser-igniter-014/?v=d1e7fd6e6a2a"),
    ("laser-igniter-660w-015", "https://laserigniter.com/product/laser-igniter-660w-015/?v=d1e7fd6e6a2a"),
    ("laser-igniter-750w-016", "https://laserigniter.com/product/laser-igniter-016-750w/?v=d1e7fd6e6a2a"),
    ("laser-machine-750w-017", "https://laserigniter.com/product/laser-igniter-017/?v=d1e7fd6e6a2a"),
    ("laser-machine-1000w-018", "https://laserigniter.com/product/laser-machine-018/?v=d1e7fd6e6a2a"),
    ("laser-machine-1200w-019", "https://laserigniter.com/product/laser-light-1200w-019/?v=d1e7fd6e6a2a"),
    ("laser-machine-2000w-020", "https://laserigniter.com/product/laser-killing-drone-020/?v=d1e7fd6e6a2a"),
]

UA = "Mozilla/5.0"


def curl_text(url: str) -> str:
    return subprocess.check_output(
        ["curl", "-L", "-A", UA, "--max-time", "35", url],
        text=True,
        stderr=subprocess.DEVNULL,
    )


def strip_html(raw: str) -> str:
    raw = re.sub(r"<br\s*/?>", "\n", raw, flags=re.I)
    raw = re.sub(r"</p\s*>", "\n", raw, flags=re.I)
    raw = re.sub(r"<[^>]+>", "", raw)
    raw = html.unescape(raw)
    lines = [re.sub(r"\s+", " ", line).strip() for line in raw.splitlines()]
    return "\n".join(
        line
        for line in lines
        if line and not line.startswith("Only logged in customers")
    )


def parse_page(page: str) -> dict[str, object]:
    product_match = re.search(
        r'<script type="application/ld\+json">(\{.*?"@type":"Product".*?\})</script>',
        page,
        re.S,
    )
    product_json = json.loads(product_match.group(1)) if product_match else {}
    image_urls = product_json.get("image", [])
    if not isinstance(image_urls, list):
        image_urls = [image_urls] if image_urls else []

    desc_match = re.search(
        r'<div class="woocommerce-Tabs-panel woocommerce-Tabs-panel--description.*?>\s*<h2>Description</h2>(.*?)<div class="host-',
        page,
        re.S,
    )
    if not desc_match:
        desc_match = re.search(
            r'<div class="woocommerce-Tabs-panel woocommerce-Tabs-panel--description.*?>\s*<h2>Description</h2>(.*?)</div>\s*</div>',
            page,
            re.S,
        )

    desc_text = strip_html(desc_match.group(1) if desc_match else "")
    lines = [line for line in desc_text.splitlines() if line]
    short_lines = [line for line in lines if line not in {"Warning:", "Details:"}][:3]
    specs = [line for line in lines if ":" in line and len(line) < 120][:12]

    return {
        "images": image_urls[:4],
        "fullDescription": desc_text,
        "shortDescription": " ".join(short_lines)[:220],
        "specs": specs,
    }


def download_images(slug: str, image_urls: list[str], out_dir: pathlib.Path) -> list[str]:
    out_dir.mkdir(parents=True, exist_ok=True)
    local_paths: list[str] = []

    for index, image_url in enumerate(image_urls, start=1):
        parsed = urllib.parse.urlsplit(image_url)
        ext = pathlib.Path(parsed.path).suffix or ".jpg"
        filename = f"{slug}-{index}{ext}"
        target = out_dir / filename
        subprocess.run(
            ["curl", "-L", "-A", UA, "--max-time", "60", "-o", str(target), image_url],
            check=True,
            stderr=subprocess.DEVNULL,
        )
        local_paths.append(f"/images/products/imported/{filename}")

    return local_paths


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--download-images", action="store_true")
    args = parser.parse_args()

    root = pathlib.Path(__file__).resolve().parents[1]
    output = root / "data" / "catalog-import.json"
    image_dir = root / "public" / "images" / "products" / "imported"

    payload: dict[str, dict[str, object]] = {}
    for slug, url in PRODUCTS:
        page = curl_text(url)
        parsed = parse_page(page)
        parsed["sourceUrl"] = url

        if args.download_images:
          parsed["images"] = download_images(slug, parsed["images"], image_dir)  # type: ignore[arg-type]

        payload[slug] = parsed
        print(f"parsed {slug}", flush=True)

    output.write_text(json.dumps(payload, ensure_ascii=False, indent=2))
    print(f"wrote {output}", flush=True)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
