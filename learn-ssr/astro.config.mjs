import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// Hybrid output: most routes are pre-rendered HTML (SSG), but /admin and the
// /api/rebuild endpoint run on Cloudflare Pages Functions so we can keep the
// deploy hook URL server-side.
export default defineConfig({
  site: 'https://learn.ipexiq.com',
  output: 'hybrid',
  adapter: cloudflare(),
});