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
SECTION_HEADERS = {
    "warning",
    "details",
    "product details",
    "shipping list",
    "product advantages",
    "declaration",
    "basic configuration",
    "function",
}
MARKETING_LINE_BLACKLIST = (
    "minors",
    "under 18",
    "do not irradiate",
    "do not shine",
    "human body",
    "illegal",
    "counterfeit",
    "i purchased",
    "american teacher",
    "refund for counterfeit",
    "do not use",
    "strictly illuminate",
    "shipping list",
    "warranty",
    "protective goggles",
    "glasses",
    "charger*1",
    "* 1",
    "military product",
    "laser weapons",
)


def make_slug(name: str) -> str:
    return re.sub(r"\s+", "-", re.sub(r"[^\w\s-]", "", name).strip().lower())


def clean_text(value: str | None) -> str | None:
    if not value:
        return None
    value = value.strip()
    return value or None


def normalize_text(value: str) -> str:
    value = value.replace("：", ":").replace("×", "x").replace("–", "-").replace("—", "-")
    value = value.replace("trong blue light", "strong blue light")
    value = re.sub(r"\s+", " ", value).strip()
    return value


def clean_short_description(value: str | None) -> str | None:
    if not value:
        return None
    value = re.sub(r"^1\.\s*", "", value.strip())
    value = re.sub(r"^(Warning:|Details:)\s*", "", value, flags=re.I)
    value = normalize_text(value)
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


def spec_value_any(specs: list[str], labels: list[str]) -> str | None:
    for label in labels:
        value = spec_value(specs, label)
        if value:
            return normalize_text(value)
    return None


def summarize_distance(value: str | None) -> str | None:
    if not value:
        return None
    value = re.sub(r"\([^)]*\)", "", normalize_text(value)).strip(" ,;:")
    value = value.replace("meter", "meters") if value.lower().endswith(" meter") else value
    return value.lower() or None


def format_source_type(value: str | None) -> str:
    if not value:
        return "advanced laser source"

    normalized = normalize_text(value)
    lowered = normalized.lower()

    if lowered == "led":
        return "LED light source"
    if lowered == "red light":
        return "red-light laser source"
    if lowered == "green light":
        return "green-light laser source"
    if lowered == "laser source":
        return "high-output laser source"
    if re.fullmatch(r"\d+\s*nm", lowered):
        return f"{lowered} laser wavelength"

    return lowered


def format_material(value: str | None) -> str:
    if not value:
        return "durable metal construction"

    normalized = normalize_text(value).lower()

    if "aluminum alloy" in normalized:
        return "aluminum alloy housing"
    if "pure copper" in normalized or normalized == "copper":
        return "copper housing"
    if "pure metal" in normalized or "all metal" in normalized:
        return "all-metal housing"

    return normalized


def format_protection(value: str | None) -> str | None:
    if not value:
        return None

    normalized = normalize_text(value).lower()
    if normalized in {"yes", "supports", "support"}:
        return "integrated protection support"
    return normalized


def trim_to_length(text: str, limit: int) -> str:
    text = normalize_text(text).rstrip(" .,;:")
    if len(text) <= limit:
        return text + "."
    shortened = text[: limit + 1].rsplit(" ", 1)[0].rstrip(" .,;:")
    shortened = re.sub(r"\b(with|and|for|or|to|of)\Z", "", shortened).rstrip(" ,;:")
    return shortened + "."


def extract_marketing_points(raw_description: str | None) -> list[str]:
    if not raw_description:
        return []

    points: list[str] = []
    saw_section_header = False

    for raw_line in raw_description.splitlines():
        line = normalize_text(raw_line)
        if not line:
            continue

        lowered = line.lower().rstrip(":")
        if lowered in SECTION_HEADERS:
            saw_section_header = True
            continue
        if saw_section_header:
            continue

        line = re.sub(r"^\d+[\.\)]\s*", "", line)
        line = line.strip(" -*•")
        lowered = line.lower()

        if not line or any(token in lowered for token in MARKETING_LINE_BLACKLIST):
            continue

        if ":" in line and len(line.split(":", 1)[0]) <= 24:
            continue

        if len(line.split()) < 5:
            continue

        if line not in points:
            points.append(line.rstrip("."))

    return points[:3]


def marketing_sentence(point: str, category: str) -> str | None:
    lowered = point.lower()

    if "water cooling" in lowered:
        return "The product positioning highlights a water-cooling system for longer operating sessions and long-range setup."
    if "you can reorder a small or large lens" in lowered:
        return "This model is presented with lens options that support close-range setup and longer-distance configuration."
    if "lens threads" in lowered or "close range lens" in lowered or "long-range lens" in lowered:
        return "This model is presented with lens options that support close-range setup and longer-distance configuration."
    if "all metal" in lowered:
        return "The body is presented with an all-metal housing for a more solid handheld feel."
    if "lightweight" in lowered:
        return "Its lightweight handheld format is positioned for easier transport and day-to-day handling."
    if "flashlight" in lowered:
        return "The flashlight-style body gives the unit a familiar handheld form factor."
    if "highest quality" in lowered or "sales volume" in lowered or "deeply loved" in lowered:
        return "This version is positioned as a popular compact-body option within the laser igniter range."
    if "high-altitude obstacle" in lowered or "power companies" in lowered or "railway companies" in lowered:
        return "It is positioned for enterprise and infrastructure teams handling high-altitude obstacle-clearing work."
    if "customized product" in lowered or "delivery time" in lowered or "customization time" in lowered:
        return "Lead times may vary because this model is discussed as a custom-order configuration."
    if "laser obstacle clearing device" in lowered or "high-energy laser technology" in lowered:
        return "The system is presented as a non-contact obstacle-clearing solution for long-range field deployment."

    if len(point.split()) >= 6 and len(point) <= 140:
        return point.rstrip(".") + "."

    return None


def describe_source_type(value: str | None) -> str:
    if value and re.fullmatch(r"\d+", value):
        return f"{value}nm laser wavelength"
    return format_source_type(value)


def choose_feature_phrase(category: str, specs: list[str], marketing_points: list[str]) -> str | None:
    marketing_blob = " ".join(marketing_points).lower()
    material = spec_value_any(specs, ["Material", "Shell"])
    distance = spec_value_any(specs, ["Maximum range", "Ignition distance", "Operating distance", "Effective distance"])
    lens = spec_value_any(specs, ["Lens", "Focusing system", "Aiming method", "Preview light"])
    battery = spec_value_any(specs, ["Battery", "Power supply", "Power supply requirement", "Power supply method"])
    protection = spec_value_any(specs, ["Protection level", "Balance protection board"])

    if "water cooling" in marketing_blob:
        return "water-cooling support"
    if "flashlight" in marketing_blob:
        return "flashlight-style handheld body"
    if "lightweight" in marketing_blob:
        return "lightweight handheld design"
    if "lens" in marketing_blob or lens:
        return "adjustable lens support"
    if "highest quality" in marketing_blob or "sales volume" in marketing_blob:
        return "popular compact-body configuration"
    if material:
        return format_material(material)
    if distance and category != "Laser Machine":
        summarized_distance = summarize_distance(distance)
        if summarized_distance:
            return f"{summarized_distance} operating range"
    if battery:
        return f"{battery.lower()} power setup"
    if protection:
        return f"{protection.lower()} protection support"
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


def build_seo_short_description(
    name: str,
    category: str,
    wattage: str,
    specs: list[str],
    marketing_points: list[str],
) -> str:
    feature = choose_feature_phrase(category, specs, marketing_points)
    distance = spec_value_any(specs, ["Maximum range", "Ignition distance", "Operating distance", "Effective distance"])

    if category == "Laser Machine":
        sentence = (
            f"{name} is a {wattage}W industrial laser machine from {BRAND_NAME} for enterprise procurement, "
            "technical review, and obstacle-clearing work"
        )
    elif category == "Laser Light":
        sentence = (
            f"{name} is a {wattage}W laser light from {BRAND_NAME} for demos, alignment work, "
            "and product sourcing"
        )
        if feature:
            sentence += f", with {feature}"
    else:
        sentence = (
            f"{name} is a {wattage}W laser igniter from {BRAND_NAME} for professional sourcing "
            "and technical review"
        )
        if feature:
            sentence += f", with {feature}"
        elif distance:
            sentence += f", with {distance.lower()}"

    return trim_to_length(sentence, 165)


def build_seo_full_description(
    name: str,
    category: str,
    wattage: str,
    specs: list[str],
    marketing_points: list[str],
) -> str:
    material = spec_value_any(specs, ["Material", "Shell"]) or "durable metal construction"
    distance = spec_value_any(specs, ["Maximum range", "Ignition distance", "Operating distance", "Effective distance"])
    battery = spec_value_any(specs, ["Battery", "Power supply", "Power supply requirement", "Power supply method"])
    charger = spec_value_any(specs, ["Charger"])
    size = spec_value_any(specs, ["Size", "Equipment dimensions", "Total weight of equipment"])
    source_type = describe_source_type(
        spec_value_any(specs, ["Light source type", "Light bulb", "Center wavelength"])
    )
    lens = spec_value_any(specs, ["Lens", "Focusing system", "Aiming method", "Preview light"])
    protection = format_protection(spec_value_any(specs, ["Protection level", "Balance protection board"]))
    control = spec_value_any(specs, ["Control methods", "PTZ", "Power adjustment"])
    feature = choose_feature_phrase(category, specs, marketing_points)
    material_phrase = format_material(material)
    distance_phrase = summarize_distance(distance)

    if category == "Laser Machine":
        sentence_one = (
            f"{BRAND_NAME} presents {name} as a {wattage}W industrial laser machine for enterprise procurement, "
            "infrastructure maintenance teams, and advanced technical review."
        )
        sentence_two = (
            f"This platform combines {source_type}, {material_phrase}, and a configuration focused on "
            "stable operation, site deployment, and long-range obstacle-clearing discussions."
        )
    elif category == "Laser Light":
        sentence_one = (
            f"{BRAND_NAME} offers {name} as a {wattage}W laser light for demonstrations, alignment tasks, "
            "presentation visibility, and distributor evaluation."
        )
        sentence_two = (
            f"It combines {source_type}, {material_phrase}, and a compact format that is easy to "
            "carry, present, and compare during sourcing conversations."
        )
    else:
        sentence_one = (
            f"{BRAND_NAME} positions {name} as a {wattage}W laser igniter for buyers evaluating handheld "
            "high-output laser equipment with clear specifications and order-request support."
        )
        sentence_two = (
            f"This model highlights {source_type}, {material_phrase}, and a build intended for "
            "durability, focused beam performance, and professional product review."
        )

    details = []
    if marketing_points:
        for point in marketing_points:
            sentence = marketing_sentence(point, category)
            if sentence and sentence not in details:
                details.append(sentence)
    elif feature:
        details.append(f"Key product positioning includes {feature}.")
    if distance_phrase:
        details.append(f"Published operating distance details include {distance_phrase}.")
    if lens:
        details.append(f"The configuration also references {lens.lower()}.")
    if battery:
        details.append(f"Power delivery details mention {battery.lower()}.")
    if protection:
        details.append(f"Protection and stability notes include {protection.lower()}.")
    if control:
        details.append(f"Control and adjustment details include {control.lower()}.")
    if charger:
        details.append(f"Package and support information also references {charger.lower()}.")
    if size:
        details.append(f"Published size or handling data includes {size.lower()}.")

    closing = (
        f"Contact {BRAND_NAME} for pricing, lead times, configuration review, OEM discussions, "
        "and project-specific order support."
    )

    return " ".join([sentence_one, sentence_two, *details[:4], closing]).strip()


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
        marketing_points = extract_marketing_points(imported_entry.get("fullDescription"))
        product["shortDescription"] = build_seo_short_description(
            name, category, wattage, product["specs"], marketing_points
        )
        product["fullDescription"] = build_seo_full_description(
            name, category, wattage, product["specs"], marketing_points
        )
        output.append(product)

    OUTPUT_PATH.write_text(json.dumps(output, ensure_ascii=False, indent=2))
    print(f"wrote {OUTPUT_PATH}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
