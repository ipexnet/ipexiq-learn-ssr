/**
 * Cloudflare Pages Function — POST /api/rebuild
 *
 * Header: x-admin-token: <ADMIN_TOKEN>
 *
 * Forwards a POST to the Cloudflare Pages Deploy Hook URL stored in the
 * DEPLOY_HOOK_URL env var. This kicks off a fresh build of this site.
 *
 * Env vars (set in Pages → Settings → Variables and Secrets):
 *   - ADMIN_TOKEN       (a long random string of your choice)
 *   - DEPLOY_HOOK_URL   (from Pages → Settings → Builds & deployments → Deploy hooks)
 */
interface Env {
  ADMIN_TOKEN?: string;
  DEPLOY_HOOK_URL?: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.ADMIN_TOKEN || !env.DEPLOY_HOOK_URL) {
    return new Response('Server missing ADMIN_TOKEN or DEPLOY_HOOK_URL', { status: 500 });
  }

  const provided = request.headers.get('x-admin-token') || '';
  if (provided !== env.ADMIN_TOKEN) {
    return new Response('Unauthorized', { status: 401 });
  }

  const r = await fetch(env.DEPLOY_HOOK_URL, { method: 'POST' });
  const body = await r.text();
  if (!r.ok) {
    return new Response(`Deploy hook failed: ${r.status} ${body}`, { status: 502 });
  }
  return new Response(`Rebuild triggered. ${body}`, { status: 200 });
};