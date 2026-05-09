# learn.ipexiq.com — SSR mirror of /learn

A tiny [Astro](https://astro.build) site that statically renders the IPEXIQ
learning chapters so social-media crawlers (LinkedIn, X, Facebook, Slack)
see real HTML with proper Open Graph tags.

## How it works

1. The main IPEXIQ Lovable repo publishes a manifest at
   `https://www.ipexiq.com/learn-manifest.json` listing every learning chapter
   (slug, title, description, source URL).
2. At build time, this Astro site:
   - Fetches the manifest.
   - For each chapter, uses **Playwright** to load the live page on
     `www.ipexiq.com`, waits for React to settle, and grabs the rendered HTML
     from the `<main>` element.
   - Wraps that HTML in a clean Astro layout with the correct `<title>`,
     `<meta description>`, Open Graph and Twitter Card tags.
   - Emits a static `.html` file per chapter.
3. Cloudflare Pages builds and serves the result at `learn.ipexiq.com`.
4. `/admin` exposes a "Rebuild now" button that POSTs to the Cloudflare Pages
   **Deploy Hook** URL, kicking off a fresh build in ~30 s.

## One-time setup (≈ 10 minutes)

1. **Create the GitHub repo** — push the contents of this folder to a new repo
   `ipexiq-learn-ssr` (public or private).
2. **Create the Cloudflare Pages project**:
   - Pages → Create → Connect to Git → pick `ipexiq-learn-ssr`.
   - Framework preset: **Astro**.
   - Build command: `npm run build`.
   - Build output: `dist`.
3. **Add the deploy hook**:
   - Pages project → Settings → Builds & deployments → Deploy hooks → Add hook.
   - Name it `manual-rebuild`, branch `main`. Copy the URL.
   - Pages project → Settings → Environment variables → Production:
     - `DEPLOY_HOOK_URL` = the URL you just copied.
     - `ADMIN_TOKEN` = a long random string of your choice.
4. **Add the custom domain**:
   - Pages project → Custom domains → Set up → `learn.ipexiq.com`.
   - In Cloudflare DNS, add: `CNAME learn → <project>.pages.dev`, **proxied**.
5. Visit `https://learn.ipexiq.com/admin`, paste the `ADMIN_TOKEN`, click
   **Rebuild now**.

## Day-to-day workflow

1. Edit `/learn` chapters in the main Lovable app as usual.
2. Push (Lovable auto-syncs to GitHub).
3. Open `https://learn.ipexiq.com/admin` → **Rebuild now**.
4. New build is live in ~30 s with proper SSR HTML and OG tags.

## Local dev

```bash
npm install
npx playwright install chromium
npm run dev      # serves /admin, etc.
npm run build    # full SSG build (slow first time — fetches every chapter)
```