/**
 * Build-time helper: fetch the learn manifest from the live IPEXIQ site and,
 * for each chapter, use Playwright to capture the rendered HTML body.
 *
 * Returns an array of { slug, title, description, sourceUrl, bodyHtml }.
 * Called from src/pages/[...slug].astro at build time only.
 */
import { chromium, type Browser } from 'playwright';

const MANIFEST_URL = 'https://www.ipexiq.com/learn-manifest.json';

export interface Chapter {
  slug: string;
  sourceUrl: string;
  targetUrl: string;
  title: string;
  description: string;
}

export interface RenderedChapter extends Chapter {
  bodyHtml: string;
}

async function captureBody(browser: Browser, url: string): Promise<string> {
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 });
    // Give React Router / Helmet a beat to render.
    await page.waitForTimeout(800);
    // Prefer the <main> element; fall back to <body> if none.
    const html = await page.evaluate(() => {
      const main = document.querySelector('main');
      const root = main ?? document.body;
      // Strip script/style nodes — Astro layout owns those.
      root.querySelectorAll('script, style, noscript').forEach((n) => n.remove());
      // Rewrite internal /learn-style links to the learn subdomain.
      root.querySelectorAll('a[href]').forEach((a) => {
        const href = a.getAttribute('href') || '';
        if (href.startsWith('/')) {
          a.setAttribute('href', `https://www.ipexiq.com${href}`);
        }
      });
      return root.innerHTML;
    });
    return html;
  } finally {
    await page.close();
  }
}

export async function fetchAllChapters(): Promise<RenderedChapter[]> {
  const res = await fetch(MANIFEST_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Manifest fetch failed: ${res.status}`);
  const manifest = (await res.json()) as { chapters: Chapter[] };

  const browser = await chromium.launch();
  try {
    const out: RenderedChapter[] = [];
    for (const c of manifest.chapters) {
      console.log(`[learn-ssr] capturing ${c.sourceUrl}`);
      const bodyHtml = await captureBody(browser, c.sourceUrl);
      out.push({ ...c, bodyHtml });
    }
    return out;
  } finally {
    await browser.close();
  }
}