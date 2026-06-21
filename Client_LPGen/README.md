# Client LPGen

**Standalone landing page generator** for SLK / ZarkloAI clients.

Paste a **website URL**, **Instagram URL**, or **both** → get one beautiful, Google-ready HTML landing page with photos, copy, and brand-matched colors pulled automatically from their links.

---

## One command

```bash
cd Client_LPGen
chmod +x create-lp.sh
./create-lp.sh
```

Interactive prompts ask for website and/or Instagram. Output opens in your browser.

Or pass links directly:

```bash
./create-lp.sh -w https://onesalonnyc.com/ -i https://www.instagram.com/onesalon.nyc/
./create-lp.sh -w https://www.kolorstudionyc.com/
./create-lp.sh -i https://www.instagram.com/kolorstudionyc/
```

---

## What you get

| Feature | Details |
|--------|---------|
| **Single premium template** | Same layout for every client — hero, about, services, gallery, CTA, footer |
| **Auto content** | Business name, tagline, about text scraped from site meta + page copy |
| **Auto photos** | Logo, hero, gallery from website (WordPress, Wix, Shopify, Squarespace, etc.) |
| **Brand colors** | Palette extracted from logo + photos — light/dark logo handled automatically |
| **Google SEO** | Title, meta description, canonical, robots, Open Graph, Twitter cards |
| **Structured data** | JSON-LD `@graph`: WebSite, LocalBusiness/HairSalon, WebPage, BreadcrumbList |
| **Mobile** | Responsive nav, gallery lightbox, scroll animations |

Output: `output/{business-name}.html` — send the file or host it anywhere.

---

## Deploy to zarklo.com (one command)

Generate **and** publish to `zarklo.com/{slug}` in one step:

```bash
# From project root
npm run lp -- -w https://onesalonnyc.com/ -i https://instagram.com/onesalon.nyc/ -s one-salon --deploy

# Or from Client_LPGen
./create-lp.sh -w https://onesalonnyc.com/ -s one-salon --deploy
```

This writes:
- `Client_LPGen/output/one-salon.html` (local copy)
- `public/one-salon/index.html` (goes live on deploy)

Then push to git — Vercel auto-deploys:

```bash
git add public/ Client_LPGen/
git commit -m "Add client LP: one-salon"
git push
```

**Live URL:** `https://zarklo.com/one-salon`

### Sync existing output files

Already have HTML in `output/`? Deploy them all:

```bash
npm run lp:sync
git add public/ Client_LPGen/deployed-pages.json && git push
```

Deployed pages are tracked in `Client_LPGen/deployed-pages.json`.

---

## Manual setup (optional)

```bash
cd Client_LPGen
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

python generate_lp.py -w WEBSITE_URL -i INSTAGRAM_URL
python generate_lp.py -w URL -o output/custom-name.html
```

---

## Examples (already generated)

```bash
python generate_lp.py -w https://www.kolorstudionyc.com/ -i https://www.instagram.com/kolorstudionyc/
python generate_lp.py -w https://onesalonnyc.com/ -i https://www.instagram.com/onesalon.nyc/
```

See `output/` for sample pages.

---

## Project structure

```
Client_LPGen/
├── create-lp.sh           ← start here (interactive)
├── generate_lp.py         ← scraper + color engine + SEO
├── templates/
│   └── landing_page.html  ← single design template
├── output/                ← generated HTML files
└── requirements.txt
```

---

## Supported sources

- **Websites:** WordPress, Wix, Shopify, Squarespace, Webflow, any site with images + meta tags
- **Instagram:** Public profile via meta tags + oEmbed (full gallery needs Graph API)

---

## Hosting

Upload `output/your-client.html` to any host, or rename to `index.html` in a folder:

- `yourclient.com` → upload as `index.html`
- Netlify / Vercel / S3 → drag & drop the HTML file

This tool is **separate from the ZarkloAI dashboard** — it lives in its own folder inside the SLK repo.
