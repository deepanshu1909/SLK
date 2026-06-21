#!/usr/bin/env python3
"""
Universal landing page generator — works for any business website + Instagram.

Usage:
  python generate_lp.py -w https://example.com
  python generate_lp.py -w https://example.com -i https://instagram.com/handle
  python generate_lp.py -w URL -i URL -o output/client.html
"""

from __future__ import annotations

import argparse
import io
import json
import re
import shutil
import sys
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup
from colorthief import ColorThief
from jinja2 import Environment, FileSystemLoader, select_autoescape
from PIL import Image

USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
)
REQUEST_TIMEOUT = 20
MAX_IMAGES = 12
MAX_EXTRA_PAGES = 3
MAX_TEXT_CHARS = 8000

TEMPLATES_DIR = Path(__file__).parent / "templates"
DEFAULT_OUTPUT_DIR = Path(__file__).parent / "output"
PROJECT_ROOT = Path(__file__).resolve().parent.parent
PUBLIC_DIR = PROJECT_ROOT / "public"
MANIFEST_PATH = Path(__file__).parent / "deployed-pages.json"
SITE_ORIGIN = "https://zarklo.com"
RESERVED_SLUGS = frozenset({
    "dashboard", "login", "api", "assets", "src", "dist", "index.html",
})

# ── Universal platform logo selectors (WordPress, Wix, Shopify, Squarespace…) ──
LOGO_SELECTORS = [
    "img.custom-logo",
    ".custom-logo-link img",
    "a.custom-logo-link img",
    ".site-logo img",
    ".site-branding img",
    ".navbar-brand img",
    "#logo img",
    ".logo img",
    ".header-logo img",
    ".brand-logo img",
    "[class*='logo'] img",
    "a[data-testid='linkElement'] img",          # Wix
    "#HEADER img[data-pin-no-hover]",            # Wix header
    ".sqs-block-image img",                      # Squarespace (first in header)
    ".header__heading-link img",                 # Shopify
    ".shop-name img",
    ".w-nav-brand img",                          # Webflow
]

BANNER_KEYWORDS = (
    "banner", "hero", "slide", "slideshow", "cover", "background",
    "header-bg", "interior", "promo", "featured", "masthead",
)

ICON_KEYWORDS = (
    "icon", "sprite", "favicon", "emoji", "arrow", "chevron",
    "close", "menu", "hamburger", "spinner", "loader", "badge",
    "social", "facebook", "twitter", "linkedin", "pinterest",
    "youtube", "tiktok", "whatsapp", "plus", "minus", "check",
    "star-rating", "payment", "visa", "mastercard", "paypal",
)

SKIP_PATH_SEGMENTS = (
    "/themes/", "/plugins/", "/assets/icons/", "/static/icons/",
    "/img/icons/", "/images/icons/", "/fonts/", "/wp-includes/",
)

SUPPLEMENTARY_PAGE_KEYWORDS = (
    "gallery", "portfolio", "work", "photos", "about", "team",
    "services", "lookbook", "projects", "our-work", "galleries",
)

LAZY_SRC_ATTRS = (
    "src", "data-src", "data-lazy-src", "data-original",
    "data-lazy", "data-image", "data-bg", "data-background-image",
)

SERVICE_KEYWORDS = {
    "Hair Color": ("color", "colour", "balayage", "highlights", "bleach", "toner"),
    "Haircuts & Styling": ("cut", "haircut", "style", "blowout", "trim", "barber"),
    "Treatments": ("treatment", "keratin", "deep condition", "olaplex", "repair"),
    "Extensions": ("extension", "weave", "tape-in"),
    "Bridal & Events": ("bridal", "wedding", "event", "updo", "special occasion"),
    "Consultation": ("consult", "personalized", "custom", "tailored"),
}

LOCATION_PATTERNS = [
    r"West Village", r"Upper East Side", r"Upper West Side", r"SoHo", r"Tribeca",
    r"Brooklyn", r"Manhattan", r"Queens", r"NYC", r"New York", r"Los Angeles",
    r"Chicago", r"Miami", r"San Francisco", r"Downtown", r"Midtown",
]

SERVICE_ICONS = ["✦", "◆", "◇", "○", "●", "◈"]


@dataclass
class ScrapedContent:
    business_name: str = "Your Brand"
    tagline: str = ""
    description: str = ""
    category: str = ""
    logo_url: str = ""
    logo_wide: bool = False
    profile_image: str = ""
    hero_image: str = ""
    hero_bg: str = ""
    about_bg: str = ""
    about_image: str = ""
    cta_bg: str = ""
    gallery_images: list[dict[str, str]] = field(default_factory=list)
    about_paragraphs: list[str] = field(default_factory=list)
    services: list[dict[str, str]] = field(default_factory=list)
    locations: list[str] = field(default_factory=list)
    stats: list[dict[str, str]] = field(default_factory=list)
    website_url: str = ""
    instagram_url: str = ""
    instagram_handle: str = ""
    booking_url: str = ""
    canonical_url: str = ""
    source_notes: list[str] = field(default_factory=list)


# ── Network ──────────────────────────────────────────────────────────────────

def fetch_url(url: str) -> tuple[str | None, bytes | None]:
    try:
        resp = requests.get(
            url,
            headers={"User-Agent": USER_AGENT, "Accept-Language": "en-US,en;q=0.9"},
            timeout=REQUEST_TIMEOUT,
            allow_redirects=True,
        )
        resp.raise_for_status()
        return resp.text, resp.content
    except requests.RequestException as exc:
        print(f"  Warning: could not fetch {url}: {exc}", file=sys.stderr)
        return None, None


def fetch_image_bytes(url: str) -> bytes | None:
    _, content = fetch_url(url)
    return content


# ── Text helpers ─────────────────────────────────────────────────────────────

def clean_text(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def guess_brand_from_domain(url: str) -> str:
    """Turn onesalonnyc.com → One Salon Nyc, kolorstudionyc.com → Kolor Studio Nyc."""
    slug = urlparse(url).netloc.replace("www.", "").split(".")[0]
    slug = re.sub(r"[-_]+", " ", slug)
    slug = re.sub(r"([a-z])([A-Z])", r"\1 \2", slug)
    slug = re.sub(r"\bnyc\b", "NYC", slug, flags=re.I)
    slug = re.sub(r"\busa\b", "USA", slug, flags=re.I)
    return slug.title().strip()[:40]


def clean_business_name(
    raw: str, description: str = "", url: str = "", instagram_handle: str = ""
) -> str:
    name = raw.split("|")[0].split("–")[0].split(" - ")[0].strip()

    for pattern in (
        r"\bAt\s+([A-Z][A-Za-z0-9\s&']+?),",
        r"\bWelcome to\s+([A-Z][A-Za-z0-9\s&']+?)[\.\!]",
        r"^([A-Z][A-Za-z0-9\s&']{2,30})\s+[—–-]\s+",
    ):
        match = re.search(pattern, description or raw)
        if match:
            candidate = match.group(1).strip()
            if 2 <= len(candidate) <= 35:
                return candidate

    seo_prefixes = ("best ", "top ", "the best", "#1 ", "official ", "award")
    if len(name) > 40 or any(name.lower().startswith(p) for p in seo_prefixes):
        if instagram_handle:
            brand = instagram_handle.replace(".", " ").replace("_", " ")
            brand = re.sub(r"\bnyc\b", "NYC", brand, flags=re.I).title()
            if len(brand) <= 35:
                return brand
        if url:
            guessed = guess_brand_from_domain(url)
            if len(guessed) <= 35:
                return guessed

    return name[:80]


def is_mostly_caps(text: str) -> bool:
    alpha = [c for c in text if c.isalpha()]
    return bool(alpha) and sum(1 for c in alpha if c.isupper()) / len(alpha) > 0.55


def to_sentence_case(text: str) -> str:
    if not text:
        return text
    parts = re.split(r"([.!?]+\s+)", text)
    result = []
    for i, part in enumerate(parts):
        if i % 2 == 0 and part.strip():
            s = part.strip()
            if is_mostly_caps(s):
                s = s.lower().capitalize()
            result.append(s)
        else:
            result.append(part)
    return clean_text("".join(result))


def split_sentences(text: str) -> list[str]:
    return [clean_text(s) for s in re.split(r"(?<=[.!?])\s+", text) if clean_text(s)]


def best_tagline(text: str, business_name: str = "", max_len: int = 200) -> str:
    sentences = split_sentences(to_sentence_case(text))
    if not sentences:
        return to_sentence_case(text[:max_len])

    scored: list[tuple[int, str]] = []
    name_word = business_name.lower().split()[0] if business_name else ""
    for s in sentences:
        score = 0
        lower = s.lower()
        if name_word and name_word in lower:
            score += 3
        if any(w in lower for w in ("we offer", "our ", "welcome", "specializ", "located", "book")):
            score += 2
        if lower.startswith(("all successful", "follow us", "click here", "read more")):
            score -= 5
        if 50 <= len(s) <= max_len:
            score += 2
        elif 30 <= len(s):
            score += 1
        scored.append((score, s))

    scored.sort(key=lambda x: x[0], reverse=True)
    best = scored[0][1]
    return best[:max_len] + ("…" if len(best) > max_len else "")


def build_about_paragraphs(description: str, tagline: str = "", extra_text: str = "") -> list[str]:
    desc = to_sentence_case(description)
    sentences = split_sentences(desc)
    paragraphs: list[str] = []

    for s in sentences:
        if s == tagline or len(s) < 30:
            continue
        paragraphs.append(s)
        if len(paragraphs) >= 3:
            break

    if len(paragraphs) < 2 and sentences:
        combined = " ".join(sentences[1:4]) if len(sentences) > 1 else sentences[0]
        if combined and combined not in paragraphs:
            paragraphs.append(combined)

    if extra_text and len(paragraphs) < 3:
        extra = to_sentence_case(clean_text(extra_text)[:400])
        if extra and extra not in paragraphs and extra != tagline:
            paragraphs.append(extra)

    return paragraphs[:3]


def extract_locations(text: str) -> list[str]:
    found: list[str] = []
    for pattern in LOCATION_PATTERNS:
        for m in re.findall(pattern, text, re.IGNORECASE):
            label = m.strip().title() if m.isupper() or m.islower() else m.strip()
            if label not in found:
                found.append(label)
    return found[:6]


def detect_category(text: str, name: str) -> str:
    lower = (text + " " + name).lower()
    mapping = {
        "salon": "Hair Salon & Studio",
        "hair": "Hair Salon & Studio",
        "beauty": "Beauty Studio",
        "spa": "Spa & Wellness",
        "restaurant": "Restaurant",
        "cafe": "Café & Coffee",
        "coffee": "Café & Coffee",
        "fitness": "Fitness Studio",
        "gym": "Fitness Studio",
        "photography": "Photography Studio",
        "fashion": "Fashion & Style",
        "dental": "Dental Practice",
        "law": "Law Firm",
        "real estate": "Real Estate",
    }
    for keyword, label in mapping.items():
        if keyword in lower:
            return label
    return "Local Business"


def extract_services(text: str) -> list[dict[str, str]]:
    lower = text.lower()
    services: list[dict[str, str]] = []
    for title, keywords in SERVICE_KEYWORDS.items():
        if any(kw in lower for kw in keywords):
            services.append({
                "title": title,
                "description": f"Professional {title.lower()} tailored to your unique style and vision.",
                "icon": SERVICE_ICONS[len(services) % len(SERVICE_ICONS)],
            })
    if not services:
        services = [
            {"title": "Premium Service", "description": "Expert care delivered with attention to every detail.", "icon": "✦"},
            {"title": "Personalized Experience", "description": "Every client receives a tailored experience.", "icon": "◆"},
            {"title": "Expert Team", "description": "Skilled professionals passionate about their craft.", "icon": "◇"},
        ]
    return services[:6]


def build_stats(content: ScrapedContent) -> list[dict[str, str]]:
    stats: list[dict[str, str]] = []
    if content.locations:
        stats.append({"value": str(len(content.locations)), "label": "Locations"})
    if content.gallery_images:
        stats.append({"value": str(len(content.gallery_images)) + "+", "label": "Portfolio"})
    if content.instagram_handle:
        stats.append({"value": "@" + content.instagram_handle, "label": "Instagram"})
    if content.services:
        stats.append({"value": str(len(content.services)), "label": "Services"})
    return stats[:4]


# ── JSON-LD helpers (universal structured data on most sites) ────────────────

def _flatten_json_ld(node: Any) -> list[dict]:
    items: list[dict] = []
    if isinstance(node, dict):
        if "@graph" in node:
            items.extend(_flatten_json_ld(node["@graph"]))
        else:
            items.append(node)
    elif isinstance(node, list):
        for child in node:
            items.extend(_flatten_json_ld(child))
    return items


def extract_json_ld_blocks(soup: BeautifulSoup) -> list[dict]:
    blocks: list[dict] = []
    for script in soup.find_all("script", type="application/ld+json"):
        if not script.string:
            continue
        try:
            blocks.extend(_flatten_json_ld(json.loads(script.string)))
        except (json.JSONDecodeError, TypeError):
            continue
    return blocks


def json_ld_logo(blocks: list[dict], base_url: str) -> str:
    org_types = {"Organization", "LocalBusiness", "HairSalon", "Store", "Restaurant", "ProfessionalService"}
    for block in blocks:
        if block.get("@type") in org_types or block.get("@type") in list(org_types):
            logo = block.get("logo")
            if isinstance(logo, dict):
                logo = logo.get("url") or logo.get("contentUrl")
            if isinstance(logo, str) and logo:
                return upgrade_image_url(urljoin(base_url, logo))
    return ""


def json_ld_images(blocks: list[dict], base_url: str) -> list[str]:
    urls: list[str] = []
    for block in blocks:
        for key in ("image", "photo", "photos"):
            val = block.get(key)
            if isinstance(val, str):
                urls.append(upgrade_image_url(urljoin(base_url, val)))
            elif isinstance(val, dict):
                u = val.get("url") or val.get("contentUrl")
                if u:
                    urls.append(upgrade_image_url(urljoin(base_url, u)))
            elif isinstance(val, list):
                for item in val:
                    if isinstance(item, str):
                        urls.append(upgrade_image_url(urljoin(base_url, item)))
                    elif isinstance(item, dict):
                        u = item.get("url") or item.get("contentUrl")
                        if u:
                            urls.append(upgrade_image_url(urljoin(base_url, u)))
    return urls


def json_ld_business_name(blocks: list[dict]) -> str:
    for block in blocks:
        if block.get("name") and block.get("@type") in {
            "Organization", "LocalBusiness", "HairSalon", "Store", "Restaurant", "WebSite"
        }:
            name = str(block["name"]).strip()
            if len(name) <= 50:
                return name
    return ""


# ── Universal image helpers ──────────────────────────────────────────────────

def upgrade_image_url(url: str) -> str:
    if not url:
        return url
    if "wixstatic.com" in url:
        m = re.match(r"(https://static\.wixstatic\.com/media/[^/]+)", url)
        if m:
            base = m.group(1)
            filename = url.rstrip("/").split("/")[-1].split("?")[0]
            return f"{base}/v1/fit/w_1600,h_2000,al_c,q_90/{filename}"
    if "squarespace-cdn.com" in url or "images.squarespace-cdn.com" in url:
        url = re.sub(r"\?format=\w+", "", url)
        if "?" not in url:
            url += "?format=1500w"
    if "cdn.shopify.com" in url:
        url = re.sub(r"_\d+x\d+\.", ".", url)
        url = re.sub(r"_\d+x\.", ".", url)
    url = re.sub(r"-\d+x\d+(\.(?:jpg|jpeg|png|webp|gif))", r"\1", url, flags=re.I)
    url = re.sub(r"/w_\d+,h_\d+", "/w_1600,h_2000", url)
    url = re.sub(r"[?&](w|width|h|height)=\d+", "", url)
    return url.rstrip("?&")


def is_banner_image(url: str) -> bool:
    lower = url.lower()
    return any(k in lower for k in BANNER_KEYWORDS)


def is_logo_asset(url: str, alt: str = "", classes: str = "") -> bool:
    combined = f"{url} {alt} {classes}".lower()
    if any(k in combined for k in ("client", "photo", "portfolio", "gallery", "team-photo", "staff-photo")):
        return False
    logo_signals = ("logo", "brand", "wordmark", "site-title", "custom-logo", "navbar-brand")
    return any(k in combined for k in logo_signals)


def is_icon_or_decorative(url: str, alt: str = "", width: int = 0, height: int = 0) -> bool:
    combined = (url + " " + alt).lower()
    if not url or url.startswith("data:"):
        return True
    if ".svg" in combined:
        return True
    if any(seg in combined for seg in SKIP_PATH_SEGMENTS):
        return True
    if any(k in combined for k in ICON_KEYWORDS):
        return True
    if "favicon" in combined or "apple-touch-icon" in combined:
        return True
    if is_logo_asset(url, alt):
        return True
    if width and height and width <= 80 and height <= 80:
        return True
    if re.search(r"/\w+-icon[\w-]*\.(png|svg|jpg)", combined):
        return True
    if re.search(r"/\w+-1(-\d+)?\.png$", combined.split("?")[0]):
        return True
    return False


def is_wide_logo(url: str) -> bool:
    lower = url.lower()
    if "favicon" in lower or "icon" in lower.split("/")[-1]:
        return False
    return any(k in lower for k in ("logo", "brand", "wordmark", "mask-group")) or lower.endswith(".png")


def _parse_img_dimensions(img) -> tuple[int, int]:
    try:
        return int(img.get("width") or 0), int(img.get("height") or 0)
    except (TypeError, ValueError):
        return 0, 0


def _img_src(img, base_url: str) -> str | None:
    for attr in LAZY_SRC_ATTRS:
        val = img.get(attr)
        if val and not val.startswith("data:"):
            return urljoin(base_url, val)
    return None


def extract_logo_url(soup: BeautifulSoup, base_url: str, json_ld: list[dict] | None = None) -> str:
    """Universal logo finder — works across WordPress, Wix, Shopify, Squarespace, etc."""

    # 1. JSON-LD Organization logo (most accurate when present)
    if json_ld:
        ld_logo = json_ld_logo(json_ld, base_url)
        if ld_logo:
            return ld_logo

    # 2. Platform-specific + generic CSS selectors
    for selector in LOGO_SELECTORS:
        for img in soup.select(selector):
            src = _img_src(img, base_url)
            if src and not is_icon_or_decorative(src, img.get("alt") or ""):
                return upgrade_image_url(src)

    # 3. Header wordmark: wide + short image
    header = soup.find("header") or soup.find(class_=re.compile(r"header|navbar|site-header|masthead", re.I))
    if header:
        for img in header.find_all("img"):
            src = _img_src(img, base_url)
            if not src or is_icon_or_decorative(src, img.get("alt") or ""):
                continue
            w, h = _parse_img_dimensions(img)
            classes = " ".join(img.get("class") or [])
            alt = (img.get("alt") or "").lower()
            if is_logo_asset(src, alt, classes):
                return upgrade_image_url(src)
            if w and h and w > h * 1.4 and h <= 120:
                return upgrade_image_url(src)

    # 4. Any img explicitly tagged as logo
    for img in soup.find_all("img"):
        src = _img_src(img, base_url)
        if not src:
            continue
        alt = img.get("alt") or ""
        classes = " ".join(img.get("class") or [])
        if is_logo_asset(src, alt, classes) and not is_banner_image(src):
            return upgrade_image_url(src)

    # 5. Apple touch icon (square but usable)
    for rel in ("apple-touch-icon", "apple-touch-icon-precomposed"):
        link = soup.find("link", rel=lambda v: v and rel in str(v).lower())
        if link and link.get("href"):
            return upgrade_image_url(urljoin(base_url, link["href"]))

    # 6. og:image ONLY if small/aspect suggests logo (not hero photo)
    og = meta_content(soup, "og:image", "twitter:image")
    if og and not is_banner_image(og):
        return upgrade_image_url(urljoin(base_url, og))

    return ""


def extract_css_background_images(html: str, base_url: str) -> list[str]:
    urls: list[str] = []
    seen: set[str] = set()
    for match in re.finditer(r'url\(["\']?(https?://[^"\')\s]+|/[^"\')\s]+)["\']?\)', html):
        src = urljoin(base_url, match.group(1))
        if src not in seen and not is_icon_or_decorative(src):
            seen.add(src)
            urls.append(upgrade_image_url(src))
    return urls


def image_quality_score(url: str, width: int = 0, height: int = 0) -> int:
    lower = url.lower()
    if is_logo_asset(url) or is_icon_or_decorative(url, width=width, height=height):
        return -100
    score = 0
    if is_banner_image(url):
        score += 70
    if any(ext in lower for ext in (".jpg", ".jpeg", ".webp")):
        score += 40
    if any(kw in lower for kw in ("photo", "client", "portfolio", "gallery", "slide", "scaled", "uploads")):
        score += 20
    if "wixstatic.com" in lower or "squarespace-cdn.com" in lower or "cdn.shopify.com" in lower:
        score += 15
    w_match = re.search(r"w_(\d+)|/(\d{3,4})w", lower)
    if w_match:
        w = int(next(g for g in w_match.groups() if g))
        score += min(w // 10, 50)
    if width and height:
        score += min((width * height) // 1000, 60)
    return score


def collect_images_from_page(soup: BeautifulSoup, base_url: str, html: str = "", json_ld: list[dict] | None = None) -> list[str]:
    seen: set[str] = set()
    candidates: list[tuple[int, str]] = []

    def add(src: str, alt: str = "", width: int = 0, height: int = 0) -> None:
        if not src or src in seen or src.startswith("data:"):
            return
        if is_icon_or_decorative(src, alt, width, height) or is_logo_asset(src, alt):
            return
        seen.add(src)
        hi = upgrade_image_url(src)
        score = image_quality_score(hi, width, height)
        if score > 0:
            candidates.append((score, hi))

    for img in soup.find_all("img"):
        src = _img_src(img, base_url)
        if src:
            w, h = _parse_img_dimensions(img)
            add(src, img.get("alt") or "", w, h)

    for img in soup.find_all("img", srcset=True):
        parts = [p.strip().split()[0] for p in img["srcset"].split(",") if p.strip()]
        if parts:
            add(urljoin(base_url, parts[-1]), img.get("alt") or "")

    for source in soup.find_all("source", srcset=True):
        parts = [p.strip().split()[0] for p in source["srcset"].split(",") if p.strip()]
        if parts:
            add(urljoin(base_url, parts[-1]))

    for src in extract_css_background_images(html or str(soup), base_url):
        add(src)

    if json_ld:
        for src in json_ld_images(json_ld, base_url):
            add(src)

    candidates.sort(key=lambda x: x[0], reverse=True)
    return [url for _, url in candidates]


def discover_supplementary_pages(soup: BeautifulSoup, base_url: str) -> list[str]:
    host = urlparse(base_url).netloc
    found: list[str] = []
    for a in soup.find_all("a", href=True):
        href = urljoin(base_url, a["href"])
        if urlparse(href).netloc != host:
            continue
        path = urlparse(href).path.lower().rstrip("/")
        if not path or path == urlparse(base_url).path.lower().rstrip("/"):
            continue
        if any(kw in path for kw in SUPPLEMENTARY_PAGE_KEYWORDS):
            clean = href.split("#")[0].split("?")[0]
            if clean not in found:
                found.append(clean)
    return found[:MAX_EXTRA_PAGES]


def crawl_all_images(base_url: str, soup: BeautifulSoup, html: str, json_ld: list[dict]) -> list[str]:
    """Collect images from homepage + gallery/about sub-pages."""
    all_images: list[str] = []
    seen: set[str] = set()

    def merge(urls: list[str]) -> None:
        for u in urls:
            if u not in seen:
                seen.add(u)
                all_images.append(u)

    merge(collect_images_from_page(soup, base_url, html, json_ld))

    og = meta_content(soup, "og:image", "twitter:image")
    if og:
        og_full = upgrade_image_url(urljoin(base_url, og))
        if not is_icon_or_decorative(og_full) and not is_logo_asset(og_full):
            merge([og_full])

    extra_pages = discover_supplementary_pages(soup, base_url)
    for page_url in extra_pages:
        page_html, _ = fetch_url(page_url)
        if not page_html:
            continue
        page_soup = BeautifulSoup(page_html, "lxml")
        page_ld = extract_json_ld_blocks(page_soup)
        merge(collect_images_from_page(page_soup, page_url, page_html, page_ld))

    return all_images[:MAX_IMAGES * 2]


def assign_backgrounds(content: ScrapedContent) -> None:
    photos = [img["url"] for img in content.gallery_images if not is_logo_asset(img["url"])]
    if not photos:
        return
    content.hero_bg = photos[0]
    content.about_image = photos[1] if len(photos) > 1 else photos[0]
    content.about_bg = photos[min(2, len(photos) - 1)]
    content.cta_bg = photos[min(3, len(photos) - 1)] if len(photos) > 3 else photos[-1]


# ── Scrapers ─────────────────────────────────────────────────────────────────

def normalize_instagram_url(url: str) -> str:
    url = url.strip().rstrip("/")
    if not url.startswith("http"):
        url = "https://" + url
    path = urlparse(url).path.strip("/").split("/")
    if path and path[0] not in ("p", "reel", "stories", "tv"):
        return f"https://www.instagram.com/{path[0]}/"
    return url


def instagram_handle(url: str) -> str:
    return urlparse(normalize_instagram_url(url)).path.strip("/").split("/")[0]


def meta_content(soup: BeautifulSoup, *keys: str) -> str:
    for key in keys:
        tag = soup.find("meta", attrs={"property": key}) or soup.find("meta", attrs={"name": key})
        if tag and tag.get("content"):
            return tag["content"].strip()
    return ""


def find_booking_url(soup: BeautifulSoup, base_url: str) -> str:
    for a in soup.find_all("a", href=True):
        href = a["href"].lower()
        text = (a.get_text() or "").lower()
        if any(kw in href or kw in text for kw in ("book", "appointment", "reserve", "schedule")):
            return urljoin(base_url, a["href"])
    return ""


def scrape_instagram_oembed(url: str) -> dict[str, Any]:
    try:
        resp = requests.get(
            "https://api.instagram.com/oembed",
            params={"url": normalize_instagram_url(url)},
            timeout=REQUEST_TIMEOUT,
        )
        if resp.ok:
            return resp.json()
    except requests.RequestException:
        pass
    return {}


def scrape_website(url: str) -> ScrapedContent:
    data = ScrapedContent(website_url=url, canonical_url=url)
    html, _ = fetch_url(url)
    if not html:
        data.source_notes.append(f"Website unreachable: {url}")
        return data

    soup = BeautifulSoup(html, "lxml")
    json_ld = extract_json_ld_blocks(soup)

    raw_name = (
        json_ld_business_name(json_ld)
        or meta_content(soup, "og:site_name")
        or meta_content(soup, "og:title")
        or (soup.title.string.strip() if soup.title and soup.title.string else "")
        or guess_brand_from_domain(url)
    )
    description = meta_content(soup, "og:description", "description", "twitter:description")
    data.business_name = clean_business_name(raw_name, description, url)
    data.description = to_sentence_case(description)
    data.tagline = best_tagline(description, data.business_name)

    data.logo_url = extract_logo_url(soup, url, json_ld)
    data.logo_wide = is_wide_logo(data.logo_url) if data.logo_url else False
    data.profile_image = data.logo_url

    images = crawl_all_images(url, soup, html, json_ld)
    for src in images[:MAX_IMAGES]:
        data.gallery_images.append({"url": src, "alt": f"{data.business_name} — portfolio"})

    data.booking_url = find_booking_url(soup, url)
    data.about_paragraphs = build_about_paragraphs(description, data.tagline)
    data.locations = extract_locations(description)
    data.services = extract_services(description)
    data.category = detect_category(description, data.business_name)

    if not data.locations:
        data.locations = extract_locations(clean_text(soup.get_text(" ", strip=True)[:2000]))

    extra = discover_supplementary_pages(soup, url)
    data.source_notes.append(f"Website scraped: {url}")
    if data.logo_url:
        data.source_notes.append(f"Logo found: {Path(urlparse(data.logo_url).path).name}")
    if extra:
        data.source_notes.append(f"Extra pages crawled: {len(extra)}")
    return data


def scrape_instagram(url: str) -> ScrapedContent:
    url = normalize_instagram_url(url)
    handle = instagram_handle(url)
    data = ScrapedContent(instagram_url=url, instagram_handle=handle)

    oembed = scrape_instagram_oembed(url)
    html, _ = fetch_url(url)
    soup = BeautifulSoup(html, "lxml") if html else None

    title = ""
    description = ""
    image = ""
    if soup:
        title = meta_content(soup, "og:title", "twitter:title")
        description = meta_content(soup, "og:description", "description")
        image = meta_content(soup, "og:image", "twitter:image")

    if oembed:
        title = title or oembed.get("title", "")
        description = description or oembed.get("author_name", "")
        image = image or oembed.get("thumbnail_url", "")

    if not title and not oembed and not html:
        data.business_name = clean_business_name("", "", "", handle)
        data.tagline = f"Follow @{handle} on Instagram for the latest updates."
        data.source_notes.append(f"Instagram limited — using handle @{handle}")
        return data

    name = title.split("(@")[0].strip() if title else handle.replace("_", " ").title()
    data.business_name = clean_business_name(name, description, "", handle)
    data.description = to_sentence_case(description.replace("\\n", ". "))
    data.tagline = best_tagline(data.description or f"Follow {data.business_name} on Instagram.", data.business_name)

    if image:
        data.profile_image = upgrade_image_url(image)
        if not data.logo_url:
            data.logo_url = data.profile_image
            data.logo_wide = False

    data.about_paragraphs = build_about_paragraphs(data.description, data.tagline)
    data.locations = extract_locations(data.description)
    data.services = extract_services(data.description)
    data.category = detect_category(data.description, data.business_name)
    data.source_notes.append(f"Instagram scraped: @{handle}")
    return data


def merge_content(website: ScrapedContent | None, instagram: ScrapedContent | None) -> ScrapedContent:
    if website and not instagram:
        merged = website
    elif instagram and not website:
        merged = instagram
    else:
        assert website and instagram
        merged = ScrapedContent(
            business_name=clean_business_name(
                website.business_name or instagram.business_name,
                website.description or instagram.description,
                website.website_url,
                instagram.instagram_handle,
            ),
            tagline=instagram.tagline if len(instagram.tagline) > 40 else website.tagline or instagram.tagline,
            description=instagram.description or website.description,
            category=website.category or instagram.category,
            logo_url=website.logo_url or instagram.logo_url,
            logo_wide=website.logo_wide or (website.logo_wide if website.logo_url else instagram.logo_wide),
            profile_image=website.logo_url or website.profile_image or instagram.profile_image,
            website_url=website.website_url,
            instagram_url=instagram.instagram_url,
            instagram_handle=instagram.instagram_handle,
            booking_url=website.booking_url,
            canonical_url=website.canonical_url,
            about_paragraphs=website.about_paragraphs or instagram.about_paragraphs,
            services=website.services if website.services else instagram.services,
        )
        seen: set[str] = set()
        for img in website.gallery_images + instagram.gallery_images:
            if img["url"] not in seen:
                seen.add(img["url"])
                merged.gallery_images.append(img)
        merged.gallery_images = merged.gallery_images[:MAX_IMAGES]
        merged.locations = list(dict.fromkeys(website.locations + instagram.locations))
        merged.source_notes = website.source_notes + instagram.source_notes

    if not merged.category:
        merged.category = detect_category(merged.description, merged.business_name)
    if merged.description:
        merged.about_paragraphs = build_about_paragraphs(merged.description, merged.tagline)

    assign_backgrounds(merged)
    merged.stats = build_stats(merged)
    return merged


def apply_brand_styling(content: ScrapedContent) -> dict[str, str]:
    """Logo-driven colors + harmonized background photos."""
    logo = content.logo_url or content.profile_image
    photo_urls = [img["url"] for img in content.gallery_images]
    brand, _, _ = pick_brand_colors(logo, photo_urls)
    reorder_backgrounds_for_brand(content, brand)
    colors = build_brand_theme(logo, photo_urls)
    return colors


# ── Colors (logo-driven theme) ───────────────────────────────────────────────

def rgb_to_hex(rgb: tuple[int, int, int]) -> str:
    return "#{:02x}{:02x}{:02x}".format(*rgb)


def hex_to_rgb(hex_color: str) -> tuple[int, int, int]:
    h = hex_color.lstrip("#")
    return int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)


def relative_luminance(rgb: tuple[int, int, int]) -> float:
    def ch(c: float) -> float:
        c /= 255
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = (ch(c) for c in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def color_saturation(rgb: tuple[int, int, int]) -> float:
    r, g, b = (c / 255 for c in rgb)
    cmax, cmin = max(r, g, b), min(r, g, b)
    return 0.0 if cmax == 0 else (cmax - cmin) / cmax


def is_neutral(rgb: tuple[int, int, int]) -> bool:
    return color_saturation(rgb) < 0.12 or (max(rgb) - min(rgb) < 25)


def mix_rgb(a: tuple[int, int, int], b: tuple[int, int, int], t: float) -> tuple[int, int, int]:
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def darken(rgb: tuple[int, int, int], amount: float = 0.25) -> tuple[int, int, int]:
    return mix_rgb(rgb, (0, 0, 0), amount)


def lighten(rgb: tuple[int, int, int], amount: float = 0.85) -> tuple[int, int, int]:
    return mix_rgb(rgb, (255, 255, 255), amount)


def extract_palette_from_bytes(raw: bytes) -> list[tuple[int, int, int]] | None:
    try:
        img = Image.open(io.BytesIO(raw)).convert("RGB")
        buf = io.BytesIO()
        img.save(buf, format="PNG")
        buf.seek(0)
        return ColorThief(buf).get_palette(6, quality=1)
    except Exception:
        return None


def extract_palette_from_logo(raw: bytes) -> list[tuple[int, int, int]] | None:
    """Extract palette from logo — handles transparency and white backgrounds."""
    try:
        img = Image.open(io.BytesIO(raw)).convert("RGBA")
        bbox = img.getbbox()
        if bbox:
            img = img.crop(bbox)
        # Composite onto neutral gray so white/transparent areas don't dominate
        bg = Image.new("RGBA", img.size, (128, 128, 128, 255))
        bg.paste(img, mask=img.split()[3])
        rgb = bg.convert("RGB")
        buf = io.BytesIO()
        rgb.save(buf, format="PNG")
        buf.seek(0)
        return ColorThief(buf).get_palette(6, quality=1)
    except Exception:
        return extract_palette_from_bytes(raw)


def analyze_logo(raw: bytes) -> dict[str, Any]:
    """Analyze logo — detect white vs dark logos and extract brand colors."""
    result: dict[str, Any] = {
        "palette": [],
        "is_light": False,
        "avg_luminance": 0.5,
        "brand": (28, 28, 28),
        "accent": (184, 151, 106),
    }
    try:
        img = Image.open(io.BytesIO(raw)).convert("RGBA")
        bbox = img.getbbox()
        if bbox:
            img = img.crop(bbox)

        opaque_pixels: list[tuple[int, int, int]] = []
        colored_pixels: list[tuple[int, int, int]] = []
        light_count = 0

        for y in range(img.height):
            for x in range(img.width):
                r, g, b, a = img.getpixel((x, y))
                if a < 80:
                    continue
                rgb = (r, g, b)
                opaque_pixels.append(rgb)
                lum = relative_luminance(rgb)
                if lum > 0.72:
                    light_count += 1
                elif lum < 0.85:
                    colored_pixels.append(rgb)

        if opaque_pixels:
            avg_lum = sum(relative_luminance(p) for p in opaque_pixels) / len(opaque_pixels)
            light_ratio = light_count / len(opaque_pixels)
            result["avg_luminance"] = avg_lum
            # White/light wordmark on transparent → light logo
            result["is_light"] = light_ratio > 0.45 or avg_lum > 0.65

        palette = extract_palette_from_logo(raw) or []
        result["palette"] = palette

        # Brand color from colored (non-white) logo pixels
        brand = None
        for rgb in palette:
            if not is_neutral(rgb) and max(rgb) > 40 and min(rgb) < 220:
                brand = rgb
                break
        if not brand and colored_pixels:
            for rgb in sorted(colored_pixels, key=color_saturation, reverse=True):
                if not is_neutral(rgb):
                    brand = rgb
                    break

        if result["is_light"] and not brand:
            # White logo — use black as brand, gold accent
            result["brand"] = (15, 15, 15)
            result["accent"] = (184, 151, 106)
        elif brand:
            result["brand"] = brand
            for rgb in palette:
                if rgb != brand and not is_neutral(rgb):
                    result["accent"] = rgb
                    break
        elif opaque_pixels:
            result["brand"] = opaque_pixels[len(opaque_pixels) // 2]
    except Exception:
        pass
    return result


def pick_brand_colors(logo_url: str, photo_urls: list[str]) -> tuple[tuple[int, int, int], tuple[int, int, int], bool]:
    """Logo colors first; fall back to photos only if logo unavailable."""
    if logo_url:
        raw = fetch_image_bytes(logo_url)
        if raw:
            info = analyze_logo(raw)
            return info["brand"], info["accent"], info["is_light"]

    for url in photo_urls[:4]:
        raw = fetch_image_bytes(url)
        if not raw:
            continue
        palette = extract_palette_from_bytes(raw)
        if palette:
            for rgb in palette:
                if not is_neutral(rgb):
                    return rgb, palette[1] if len(palette) > 1 else rgb, False
    return (26, 26, 26), (100, 100, 100), False


def color_distance(a: tuple[int, int, int], b: tuple[int, int, int]) -> float:
    return sum((a[i] - b[i]) ** 2 for i in range(3)) ** 0.5


def score_photo_for_brand(url: str, brand: tuple[int, int, int]) -> int:
    raw = fetch_image_bytes(url)
    if not raw:
        return 0
    palette = extract_palette_from_bytes(raw)
    if not palette:
        return 10
    dominant = palette[0]
    dist = color_distance(dominant, brand)
    score = image_quality_score(url)
    if 25 < dist < 140:
        score += 30
    elif dist <= 25:
        score += 10
    return score


def reorder_backgrounds_for_brand(content: ScrapedContent, brand: tuple[int, int, int]) -> None:
    """Pick background photos that harmonize with logo brand colors."""
    photos = [img["url"] for img in content.gallery_images if not is_logo_asset(img["url"])]
    if not photos:
        return
    ranked = sorted(photos, key=lambda u: score_photo_for_brand(u, brand), reverse=True)
    content.gallery_images = [{"url": u, "alt": f"{content.business_name} — portfolio"} for u in ranked[:MAX_IMAGES]]
    content.hero_bg = ranked[0]
    content.about_image = ranked[1] if len(ranked) > 1 else ranked[0]
    content.about_bg = ranked[min(2, len(ranked) - 1)]
    content.cta_bg = ranked[min(3, len(ranked) - 1)] if len(ranked) > 3 else ranked[-1]


def build_brand_theme(logo_url: str, photo_urls: list[str]) -> dict[str, str]:
    """Build page theme from logo — white logos get black badge & dark overlays."""
    brand, accent, logo_is_light = pick_brand_colors(logo_url, photo_urls)

    if logo_is_light:
        # White/light logo → black badge + black hero overlays, light content areas
        primary = (15, 15, 15)
        primary_dark = (0, 0, 0)
        gold = accent if not is_neutral(accent) else (184, 151, 106)
        bg = (250, 248, 245)
        surface = (255, 255, 255)
        text = (26, 26, 26)
        text_muted = (100, 100, 100)
        badge_bg = "#0a0a0a"
        badge_border = rgb_to_hex(gold)
    else:
        if is_neutral(brand):
            brand = (26, 26, 26)
        primary = darken(brand, 0.08)
        primary_dark = darken(brand, 0.38)
        gold = mix_rgb(brand, (212, 175, 55), 0.45) if not is_neutral(brand) else (184, 151, 106)
        bg = lighten(brand, 0.94)
        surface = lighten(brand, 0.97)
        text = (26, 26, 26) if relative_luminance(bg) > 0.5 else (250, 250, 250)
        text_muted = mix_rgb(text, brand, 0.35)
        badge_bg = rgb_to_hex(lighten(brand, 0.96))
        badge_border = rgb_to_hex(mix_rgb(brand, (255, 255, 255), 0.75))

    pd = primary_dark
    hero_overlay = (
        f"linear-gradient(180deg, "
        f"rgba({pd[0]},{pd[1]},{pd[2]},0.82) 0%, "
        f"rgba({primary[0]},{primary[1]},{primary[2]},0.65) 45%, "
        f"rgba({pd[0]},{pd[1]},{pd[2]},0.88) 100%)"
    )
    if logo_is_light:
        about_overlay = f"rgba({bg[0]},{bg[1]},{bg[2]},0.95)"
    else:
        about_overlay = f"rgba({bg[0]},{bg[1]},{bg[2]},0.93)"
    cta_overlay = (
        f"linear-gradient(135deg, "
        f"rgba({primary[0]},{primary[1]},{primary[2]},0.90), "
        f"rgba({pd[0]},{pd[1]},{pd[2]},0.94))"
    )
    header_scrolled_bg = f"rgba({surface[0]},{surface[1]},{surface[2]},0.97)"

    return {
        "primary": rgb_to_hex(primary),
        "primary_dark": rgb_to_hex(primary_dark),
        "accent": rgb_to_hex(accent),
        "gold": rgb_to_hex(gold),
        "background": rgb_to_hex(bg),
        "surface": rgb_to_hex(surface),
        "text": rgb_to_hex(text),
        "text_muted": rgb_to_hex(text_muted),
        "overlay": f"rgba({pd[0]},{pd[1]},{pd[2]},0.70)",
        "hero_overlay": hero_overlay,
        "about_overlay": about_overlay,
        "cta_overlay": cta_overlay,
        "logo_badge_bg": badge_bg,
        "logo_badge_border": badge_border,
        "logo_is_light": logo_is_light,
        "header_scrolled_bg": header_scrolled_bg,
    }


def elegant_palette() -> dict[str, str]:
    base = build_brand_theme("", [])
    return base


# ── Render ───────────────────────────────────────────────────────────────────

def build_structured_data(content: ScrapedContent) -> str:
    page_url = content.canonical_url or content.website_url or content.instagram_url or ""
    base_id = page_url.rstrip("/") + "/#" if page_url else "#"
    schema_type = "HairSalon" if "salon" in content.category.lower() else "LocalBusiness"
    desc = content.tagline or content.description
    logo = content.logo_url or content.profile_image
    hero = content.hero_bg or content.hero_image

    org: dict[str, Any] = {
        "@type": schema_type,
        "@id": f"{base_id}organization",
        "name": content.business_name,
        "description": desc,
        "url": content.website_url or page_url,
        "image": hero,
    }
    if logo:
        org["logo"] = {"@type": "ImageObject", "url": logo, "caption": f"{content.business_name} logo"}
    same_as = [u for u in (content.instagram_url, content.website_url) if u]
    if same_as:
        org["sameAs"] = same_as
    if content.locations:
        org["areaServed"] = [{"@type": "Place", "name": loc} for loc in content.locations]

    webpage: dict[str, Any] = {
        "@type": "WebPage",
        "@id": f"{base_id}webpage",
        "url": page_url,
        "name": f"{content.business_name} | {content.category or 'Official Site'}",
        "description": desc[:160] if desc else "",
        "isPartOf": {"@id": f"{base_id}website"},
        "about": {"@id": f"{base_id}organization"},
        "inLanguage": "en-US",
    }
    if hero:
        webpage["primaryImageOfPage"] = {"@type": "ImageObject", "url": hero}

    schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "@id": f"{base_id}website",
                "url": page_url,
                "name": content.business_name,
                "description": desc,
                "inLanguage": "en-US",
                "publisher": {"@id": f"{base_id}organization"},
            },
            org,
            webpage,
            {
                "@type": "BreadcrumbList",
                "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": page_url}],
            },
        ],
    }
    return json.dumps(schema, indent=2, ensure_ascii=False)


def render_landing_page(content: ScrapedContent, colors: dict[str, str]) -> str:
    env = Environment(
        loader=FileSystemLoader(str(TEMPLATES_DIR)),
        autoescape=select_autoescape(["html", "xml"]),
    )
    template = env.get_template("landing_page.html")
    primary_cta_url = content.booking_url or content.website_url or content.instagram_url
    primary_cta_label = "Book Now" if content.booking_url else (
        "Visit Website" if content.website_url else "Follow on Instagram"
    )
    return template.render(
        lang="en",
        seo={
            "title": f"{content.business_name} | {content.category or 'Official Site'}",
            "description": (content.tagline or content.description)[:160],
            "canonical": content.canonical_url or content.website_url,
            "site_name": content.business_name,
        },
        structured_data=build_structured_data(content),
        colors=colors,
        business_name=content.business_name,
        headline=content.business_name,
        tagline=content.tagline or f"Welcome to {content.business_name}.",
        category=content.category,
        logo_url=content.logo_url,
        logo_wide=content.logo_wide,
        profile_image=content.profile_image,
        hero_bg=content.hero_bg,
        about_bg=content.about_bg,
        about_image=content.about_image,
        cta_bg=content.cta_bg,
        about_paragraphs=content.about_paragraphs,
        services=content.services,
        locations=content.locations,
        stats=content.stats,
        gallery_images=content.gallery_images,
        website_url=content.website_url,
        instagram_url=content.instagram_url,
        instagram_handle=content.instagram_handle,
        booking_url=content.booking_url,
        primary_cta_url=primary_cta_url,
        primary_cta_label=primary_cta_label,
        cta_text=content.tagline or f"Experience the difference at {content.business_name}.",
        year=datetime.now(timezone.utc).year,
        logo_is_light=colors.get("logo_is_light", False),
    )


def slugify(name: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    return slug or "landing-page"


def normalize_slug(raw: str) -> str:
    slug = slugify(raw.replace("_", "-"))
    if slug in RESERVED_SLUGS:
        raise SystemExit(f"Slug '{slug}' is reserved — choose another.")
    return slug


def load_manifest() -> list[dict[str, Any]]:
    if not MANIFEST_PATH.exists():
        return []
    try:
        return json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return []


def save_manifest(entries: list[dict[str, Any]]) -> None:
    MANIFEST_PATH.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST_PATH.write_text(json.dumps(entries, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def update_manifest_entry(
    slug: str,
    content: ScrapedContent,
    website: str | None,
    instagram: str | None,
) -> dict[str, Any]:
    entry = {
        "slug": slug,
        "businessName": content.business_name,
        "tagline": (content.tagline or content.description)[:160],
        "category": content.category or "Local Business",
        "websiteUrl": content.website_url or website or "",
        "instagramUrl": content.instagram_url or instagram or "",
        "liveUrl": f"{SITE_ORIGIN}/{slug}",
        "generatedAt": datetime.now(timezone.utc).isoformat(),
    }
    entries = [e for e in load_manifest() if e.get("slug") != slug]
    entries.append(entry)
    entries.sort(key=lambda e: (e.get("businessName") or "").lower())
    save_manifest(entries)
    return entry


def deploy_landing_page(
    html_path: Path,
    slug: str,
    content: ScrapedContent,
    website: str | None,
    instagram: str | None,
) -> dict[str, Any]:
    dest = PUBLIC_DIR / slug / "index.html"
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(html_path, dest)
    entry = update_manifest_entry(slug, content, website, instagram)
    print(f"  Deployed → public/{slug}/index.html")
    print(f"  Live URL → {SITE_ORIGIN}/{slug}")
    print(f"  After git push + Vercel deploy, share that link with your client.")
    return entry


def generate(
    website: str | None,
    instagram: str | None,
    output: Path | None,
    slug: str | None = None,
    deploy: bool = False,
) -> Path:
    if not website and not instagram:
        raise SystemExit("Provide at least one of --website or --instagram")

    print("Scraping sources (universal mode)…")
    website_data = scrape_website(website) if website else None
    instagram_data = scrape_instagram(instagram) if instagram else None
    content = merge_content(website_data, instagram_data)

    print(f"  Business: {content.business_name}")
    for note in content.source_notes:
        print(f"  • {note}")
    if content.logo_url:
        print(f"  Logo: {Path(urlparse(content.logo_url).path).name}")

    colors = apply_brand_styling(content)
    mode = "light logo → black badge" if colors.get("logo_is_light") else "dark logo → light badge"
    print(f"  Theme from logo: {colors['primary']} / accent {colors['gold']} ({mode})")
    print(f"  Gallery: {len(content.gallery_images)} photos (harmonized with brand)")

    html = render_landing_page(content, colors)
    if output is None:
        DEFAULT_OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
        output = DEFAULT_OUTPUT_DIR / f"{slugify(content.business_name)}.html"
    else:
        output.parent.mkdir(parents=True, exist_ok=True)

    output.write_text(html, encoding="utf-8")
    print(f"\n✓ Landing page written to: {output.resolve()}")

    if deploy:
        resolved_slug = normalize_slug(slug or slugify(content.business_name))
        deploy_landing_page(output, resolved_slug, content, website, instagram)

    return output


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Generate a beautiful SEO landing page from any website + Instagram URL."
    )
    parser.add_argument("--website", "-w", help="Business website URL")
    parser.add_argument("--instagram", "-i", help="Instagram profile URL")
    parser.add_argument("--output", "-o", type=Path, help="Output HTML path (default: output/{business-name}.html)")
    parser.add_argument("--slug", "-s", help="URL slug → zarklo.com/{slug} (required with --deploy)")
    parser.add_argument(
        "--deploy",
        "-d",
        action="store_true",
        help="Publish to public/{slug}/ for zarklo.com (git push + Vercel deploy to go live)",
    )
    args = parser.parse_args()
    generate(args.website, args.instagram, args.output, args.slug, args.deploy)


if __name__ == "__main__":
    main()
