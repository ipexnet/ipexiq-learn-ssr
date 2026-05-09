import type { APIRoute } from 'astro';

export const prerender = false;

/**
 * POST /api/rebuild
 * Header: x-admin-token: <ADMIN_TOKEN>
 *
 * Forwards a POST to the Cloudflare Pages Deploy Hook URL stored in the
 * DEPLOY_HOOK_URL env var. This kicks off a fresh build of this site.
 */
export const POST: APIRoute = async ({ request, locals }) => {
  // Cloudflare bindings live on `locals.runtime.env` when using the adapter.
  const env: Record<string, string | undefined> =
    // @ts-ignore - runtime is added by @astrojs/cloudflare
    (locals as any)?.runtime?.env ?? (import.meta.env as any);

  const expected = env.ADMIN_TOKEN;
  const hook = env.DEPLOY_HOOK_URL;

  if (!expected || !hook) {
    return new Response('Server missing ADMIN_TOKEN or DEPLOY_HOOK_URL', { status: 500 });
  }

  const provided = request.headers.get('x-admin-token') || '';
  if (provided !== expected) {
    return new Response('Unauthorized', { status: 401 });
  }

  const r = await fetch(hook, { method: 'POST' });
  const body = await r.text();
  if (!r.ok) {
    return new Response(`Deploy hook failed: ${r.status} ${body}`, { status: 502 });
  }
  return new Response(`Rebuild triggered. ${body}`, { status: 200 });
};