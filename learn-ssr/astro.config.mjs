import { defineConfig } from 'astro/config';

// Pure static output. Each chapter becomes a real .html file with proper
// <title>, <meta description>, and Open Graph tags so social-media crawlers
// (LinkedIn, X, Facebook, Slack) get rich previews.
//
// Server-only logic (the deploy-hook trigger behind /admin) lives in
// `functions/api/rebuild.ts`, which Cloudflare Pages picks up automatically
// — no Astro adapter required.
export default defineConfig({
  site: 'https://learn.ipexiq.com',
  output: 'static',
});