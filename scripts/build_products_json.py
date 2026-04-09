from __future__ import annotations

import json
import pathlib
import re


ROOT = pathlib.Path(__file__).resolve().parents[1]
IMPORT_PATH = ROOT / "data" / "catalog-import.json"
OUTPUT_PATH = ROOT / "data" / "products.json"
BRAND_NAME = "APEX LASER GROUP"


BASE_PRODUCTS = [
    ("p-001", "001", "Laser Light 5W 01", "Laser Light", 69, 119),
    ("p-002", "002", "Laser Light 5W 002", "Laser Light", 99, 129),
    ("p-003", "003", "Laser Igniter 40W 003", "Laser Igniter", 149, None),
    ("p-004", "004", "Laser Igniter 80W 004", "Laser Igniter", 199, 249),
    ("p-005", "005", "Laser Igniter 100W 005", "Laser Igniter", 249, 299),
    ("p-006", "006", "Laser Igniter 100W 006", "Laser Igniter", 299, 309),
    ("p-007", "007", "Laser Igniter 120W 007", "Laser Igniter", 309, 379),
    ("p-008", "008", "Laser Igniter 120W 008", "Laser Igniter", 349, 399),
    ("p-009", "009", "Laser Igniter 150W 009", "Laser Igniter", 449, 499),
    ("p-010", "010", "Laser Igniter 260W 010", "Laser Igniter", 499, 599),
    ("p-011", "011", "Laser Igniter 260W 011", "Laser Igniter", 699, 799),
    ("p-012", "012", "Laser Igniter 400W 012", "Laser Igniter", 899, 999),
    ("p-013", "013", "Laser Igniter 500W 013", "Laser Igniter", 1049, 1199),
    ("p-014", "014", "Laser Igniter 660W 014", "Laser Igniter", 1299, 1499),
    ("p-015", "015", "Laser Igniter 660W 015", "Laser Igniter", 1999, 2499),
    ("p-016", "016", "Laser Igniter 750W 016", "Laser Igniter", 3499, 4999),
    ("p-017", "017", "Laser Machine 750W 017", "Laser Machine", 9499, 9999),
    ("p-018", "018", "Laser Machine 1000W 018", "Laser Machine", 19999, 24999),
    ("p-019", "019", "Laser Machine 1200W 019", "Laser Machine", 39999, 45999),
    ("p-020", "020", "Laser Machine 2000W 020", "Laser Machine", 498000, 500000),
]

OFFICIAL_PRICE_LIST = {
    "001": {"usd": 60, "eur": 56},
    "002": {"usd": 80, "eur": 75},
    "003": {"usd": 120, "eur": 112},
    "004": {"usd": 150, "eur": 140},
    "005": {"usd": 210, "eur": 196},
    "006": {"usd": 250, "eur": 233},
    "007": {"usd": 300, "eur": 280},
    "008": {"usd": 300, "eur": 299},
    "009": {"usd": 410, "eur": 383},
    "010": {"usd": 450, "eur": 419},
    "011": {"usd": 520, "eur": 484},
    "012": {"usd": 700, "eur": 651},
    "013": {"usd": 850, "eur": 790},
    "014": {"usd": 1100, "eur": 1022},
    "015": {"usd": 1500, "eur": 1022},
    "016": {"usd": 2600, "eur": 2415},
    "017": {"usd": 5400, "eur": 5016},
    "019": {"usd": 24900, "eur": 23120},
}

FALLBACK_IMAGES = {
    "Laser Light": [
        "/images/products/laser-light-1.svg",
        "/images/products/laser-light-2.svg",
        "/images/products/laser-light-3.svg",
        "/images/products/laser-light-4.svg",
    ],
    "Laser Igniter": [
        "/images/products/laser-igniter-1.svg",
        "/images/products/laser-igniter-2.svg",
        "/images/products/laser-igniter-3.svg",
        "/images/products/laser-igniter-4.svg",
    ],
    "Laser Machine": [
        "/images/products/laser-machine-1.svg",
        "/images/products/laser-machine-2.svg",
        "/images/products/laser-machine-3.svg",
        "/images/products/laser-machine-4.svg",
    ],
}

SHARED_REVIEWS = [
    {
        "author": "LLKK",
        "date": "June 8, 2025",
        "rating": 5,
        "content": "Compact body, bright output, and easy charging make it a convenient pick for demonstrations and hobby use.",
    },
    {
        "author": "SakowiczJakub",
        "date": "February 15, 2025",
        "rating": 5,
        "content": "Delivery expectations were communicated clearly and the product felt true to the visible listing.",
    },
    {
        "author": "MutaniMisana",
        "date": "January 4, 2024",
        "rating": 5,
        "content": "Solid casing, strong beam, and a polished finish. The product looked exactly like the gallery images.",
    },
]

IGNORED_SPECS = {"Warning:", "Details:", "Product details:", "Shipping List:", "Product advantages:", "Declaration:", "Basic configuration:", "Function:"}


def make_slug(name: str) -> str:
    return re.sub(r"\s+", "-", re.sub(r"[^\w\s-]", "", name).strip().lower())


def clean_text(value: str | None) -> str | None:
    if not value:
        return None
    value = value.strip()
    return value or None


def clean_short_description(value: str | None) -> str | None:
    if not value:
        return None
    value = re.sub(r"^1\.\s*", "", value.strip())
    value = re.sub(r"^(Warning:|Details:)\s*", "", value, flags=re.I)
    value = re.sub(r"\s+", " ", value).strip()
    return value or None


def clean_specs(specs: list[str] | None) -> list[str] | None:
    if not specs:
        return None
    cleaned = [spec.strip() for spec in specs if spec.strip() and spec.strip() not in IGNORED_SPECS]
    return cleaned or None


def spec_value(specs: list[str], label: str) -> str | None:
    for spec in specs:
        if spec.lower().startswith(label.lower() + ":"):
            return spec.split(":", 1)[1].strip()
    return None


def fallback_short(category: str, wattage: str) -> str:
    if category == "Laser Machine":
        return (
            f"{BRAND_NAME} {wattage}W industrial laser machine for enterprise procurement, "
            "project evaluation, and OEM consultation."
        )
    if category == "Laser Light":
        return (
            f"{BRAND_NAME} {wattage}W laser light with compact construction, visible range details, "
            "and inquiry-ready product presentation."
        )
    return (
        f"{BRAND_NAME} {wattage}W laser igniter with precision beam control, metal housing, "
        "and enterprise inquiry support."
    )


def fallback_specs(category: str, wattage: str) -> list[str]:
    return [
        f"Brand: {BRAND_NAME}",
        f"Category: {category}",
        f"Power class: {wattage}W",
        "Enterprise-focused product presentation",
        "Frontend-only inquiry workflow",
        "Global shipping discussion available on request",
        "Custom configuration support available",
    ]


def build_seo_short_description(name: str, category: str, wattage: str, specs: list[str]) -> str:
    material = spec_value(specs, "Material") or spec_value(specs, "Shell")
    distance = spec_value(specs, "Maximum range") or spec_value(specs, "Ignition distance") or spec_value(specs, "Operating distance")
    battery = spec_value(specs, "Battery")

    parts = [f"{BRAND_NAME} {name}"]

    if category == "Laser Machine":
        parts.append(f"{wattage}W industrial laser equipment")
    elif category == "Laser Light":
        parts.append(f"{wattage}W compact laser light")
    else:
        parts.append(f"{wattage}W laser igniter")

    if material:
        parts.append(f"with {material.lower()}")
    if distance:
        parts.append(f"and visible {distance.lower()} performance")
    elif battery:
        parts.append(f"with {battery.lower()}")

    parts.append("for professional inquiry and project evaluation")
    return " ".join(parts)[:220].strip()


def build_seo_full_description(name: str, category: str, wattage: str, specs: list[str]) -> str:
    material = spec_value(specs, "Material") or spec_value(specs, "Shell") or "durable metal construction"
    distance = spec_value(specs, "Maximum range") or spec_value(specs, "Ignition distance") or spec_value(specs, "Operating distance")
    battery = spec_value(specs, "Battery")
    charger = spec_value(specs, "Charger")
    size = spec_value(specs, "Size") or spec_value(specs, "Equipment dimensions")
    source_type = spec_value(specs, "Light source type") or spec_value(specs, "Light bulb") or "laser source"

    if category == "Laser Machine":
        sentence_one = (
            f"{BRAND_NAME} presents {name} as a {wattage}W industrial laser machine designed for "
            "enterprise procurement, technical review, and custom project discussions."
        )
        sentence_two = (
            f"This model highlights {source_type.lower()}, {material.lower()}, and a configuration focused on "
            "stable operation, installation planning, and professional deployment."
        )
    elif category == "Laser Light":
        sentence_one = (
            f"{BRAND_NAME} offers {name} as a {wattage}W laser light for demonstration, alignment, "
            "presentation, and other professional visibility use cases."
        )
        sentence_two = (
            f"The product listing emphasizes {source_type.lower()}, {material.lower()}, and a compact format that "
            "is easy to carry, present, and evaluate for distribution."
        )
    else:
        sentence_one = (
            f"{BRAND_NAME} positions {name} as a {wattage}W laser igniter for professional buyers seeking "
            "high-output laser equipment with clear product specifications and direct sales support."
        )
        sentence_two = (
            f"The visible specification set highlights {source_type.lower()}, {material.lower()}, and a build "
            "focused on precision, durability, and consultation-led purchasing."
        )

    details = []
    if distance:
        details.append(f"Published performance details include {distance.lower()}.")
    if battery:
        details.append(f"Power information references {battery.lower()}.")
    if charger:
        details.append(f"The package information also mentions {charger.lower()}.")
    if size:
        details.append(f"Listed dimensions include {size.lower()}.")

    closing = (
        f"Contact {BRAND_NAME} for pricing clarification, project matching, lead times, OEM discussions, "
        "and product configuration support."
    )

    return " ".join([sentence_one, sentence_two, *details, closing]).strip()


def convert_old_price(old_price_usd: int | None, current_usd: int, current_eur: int) -> int | None:
    if old_price_usd is None:
        return None
    if current_usd <= 0:
        return None
    return round(old_price_usd * (current_eur / current_usd))


def main() -> int:
    imported = json.loads(IMPORT_PATH.read_text()) if IMPORT_PATH.exists() else {}
    output = []

    for index, (product_id, model, name, category, current_price, old_price) in enumerate(BASE_PRODUCTS):
        slug = make_slug(name)
        wattage_match = re.search(r"(\d+)W", name)
        wattage = wattage_match.group(1) if wattage_match else "5"
        imported_entry = imported.get(slug, {})
        official_price = OFFICIAL_PRICE_LIST.get(model, {"usd": current_price, "eur": round(current_price * 0.93)})
        current_usd = official_price["usd"]
        current_eur = official_price["eur"]
        old_eur = convert_old_price(old_price, current_usd, current_eur)

        reviews = SHARED_REVIEWS if index == 0 else SHARED_REVIEWS[:2]

        product = {
            "id": product_id,
            "model": model,
            "slug": slug,
            "name": name,
            "category": category,
            "priceUSD": current_usd,
            "priceEUR": current_eur,
            "oldPriceUSD": old_price,
            "oldPriceEUR": old_eur,
            "images": imported_entry.get("images") or FALLBACK_IMAGES[category],
            "specs": clean_specs(imported_entry.get("specs")) or fallback_specs(category, wattage),
            "rating": 5 if index == 0 else 4.8,
            "reviewCount": len(reviews),
            "reviews": reviews,
            "relatedProductSlugs": [
                make_slug(other_name)
                for _, _, other_name, other_category, _, _ in BASE_PRODUCTS
                if other_name != name and other_category == category
            ][:4],
            "sourceUrl": imported_entry.get("sourceUrl"),
        }
        product["shortDescription"] = build_seo_short_description(name, category, wattage, product["specs"])
        product["fullDescription"] = build_seo_full_description(name, category, wattage, product["specs"])
        output.append(product)

    OUTPUT_PATH.write_text(json.dumps(output, ensure_ascii=False, indent=2))
    print(f"wrote {OUTPUT_PATH}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
