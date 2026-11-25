import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { once } from 'node:events';
import { RedirectsHandler } from '@netlify/redirects';
import { origin, readGuides, canonicalUrl, redirectAliases, parseHtml } from './helpers/gift-guide-fixtures.mjs';

// This is only HTTP transport and static-file serving. Matching, precedence,
// Location, query forwarding and the 301 Response come from Netlify's own
// RedirectsHandler, reading the generated production _redirects file.
// No build, deployment, Netlify login or application server is started here.
const root = path.resolve(process.argv[2] || '_site');
assert.ok(fs.existsSync(path.join(root, '_redirects')), 'Complete the production build before running HTTP integration tests');
assert.ok(fs.existsSync(path.join(root, 'geschenke/index.html')), 'Gift-guide hub must be built');
const guides = readGuides();
assert.ok(guides.length);

async function staticFile(request) {
  const pathname = decodeURIComponent(new URL(request.url).pathname);
  let file = path.resolve(root, `.${pathname}`);
  if (file !== root && !file.startsWith(`${root}${path.sep}`)) return undefined;
  try {
    if ((await fs.promises.stat(file)).isDirectory()) file = path.join(file, 'index.html');
    if (!(await fs.promises.stat(file)).isFile()) return undefined;
  } catch { return undefined; }
  return async () => new Response(await fs.promises.readFile(file), {
    status: 200,
    headers: { 'content-type': file.endsWith('.html') ? 'text/html; charset=utf-8' : 'application/octet-stream' },
  });
}

let redirectHandler;
let base;
const serverErrors = [];
const server = http.createServer(async (request, response) => {
  try {
    const webRequest = new Request(new URL(request.url, base), { method: request.method, headers: request.headers });
    const match = await redirectHandler.match(webRequest);
    let result = match && await redirectHandler.handle(webRequest, match, staticFile);
    if (!result) result = await (await staticFile(webRequest))?.();
    result ||= new Response('Not found', { status: 404 });
    response.writeHead(result.status, Object.fromEntries(result.headers));
    response.end(request.method === 'HEAD' ? undefined : Buffer.from(await result.arrayBuffer()));
  } catch (error) {
    serverErrors.push(error);
    response.writeHead(500, { 'content-type': 'text/plain' });
    response.end('Integration transport failed');
  }
});

function sameQuery(actual, expected, label) {
  const keys = new Set([...expected.keys()]);
  assert.deepEqual(new Set(actual.keys()), keys, `${label}: same query parameter names`);
  for (const key of keys) assert.deepEqual(actual.getAll(key), expected.getAll(key), `${label}: preserve every value of ${key}`);
}

const queries = [
  '',
  '?utm_source=gift-guide&utm_campaign=weihnachten',
  '?tag=first&tag=second&empty=&flag&utf8=Gr%C3%BC%C3%9Fe%20%E2%9C%93&encoded=a%2Fb%3Fc%3Dd%26e%3Df&plus=a+b',
  '?empty=&empty=&value=%252F&tag=third&tag=fourth&zero=0',
];
let checkedRedirects = 0;
let checkedCanonicalPages = 0;

try {
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  base = `http://127.0.0.1:${server.address().port}`;
  redirectHandler = new RedirectsHandler({
    projectDir: path.resolve('.'),
    publicDir: root,
    configRedirects: [],
    jwtRoleClaim: 'netlify-qa-role',
    jwtSecret: '',
    siteURL: base,
  });
  const get = (url, options = {}) => fetch(new URL(url, base), { ...options, signal: AbortSignal.timeout(15_000) });

  for (const route of ['/geschenke/', ...guides.map(guide => canonicalUrl(guide.data))]) {
    const response = await get(route, { redirect: 'manual' });
    assert.equal(response.status, 200, `${route}: direct HTTP 200`);
    assert.equal(response.headers.get('location'), null, `${route}: no canonical redirect loop`);
    const doc = parseHtml(await response.text());
    const canonical = doc.nodes(node => node.name === 'link' && node.attribs.rel === 'canonical').map(node => node.attribs.href);
    assert.deepEqual(canonical, [`${origin}${route}`]);
    checkedCanonicalPages++;
  }

  for (const guide of guides) {
    const canonical = canonicalUrl(guide.data);
    for (const alias of new Set(redirectAliases(guide))) {
      for (const query of queries) {
        const response = await get(alias + query, { redirect: 'manual' });
        assert.equal(response.status, 301, `${alias}${query}: actual permanent HTTP redirect`);
        const location = response.headers.get('location');
        assert.ok(location, `${alias}: Location header`);
        const target = new URL(location, base);
        assert.equal(target.origin, base, 'No live production requests in a local test');
        assert.equal(target.pathname, canonical, `${alias}: direct canonical destination`);
        sameQuery(target.searchParams, new URL(alias + query, base).searchParams, alias);
        await response.arrayBuffer();
        const destination = await get(target, { redirect: 'manual' });
        assert.equal(destination.status, 200, `${alias}: one hop ends at a real built page`);
        assert.equal(destination.headers.get('location'), null);
        await destination.arrayBuffer();
        checkedRedirects++;
      }
    }
    const alias = redirectAliases(guide)[0];
    const followed = await get(alias + queries[2]);
    assert.equal(followed.status, 200);
    assert.equal(followed.redirected, true);
    assert.equal(new URL(followed.url).pathname, canonical);
    sameQuery(new URL(followed.url).searchParams, new URL(alias + queries[2], base).searchParams, 'Followed response');
    await followed.arrayBuffer();
    const head = await get(alias, { method: 'HEAD', redirect: 'manual' });
    assert.equal(head.status, 301, `${alias}: HEAD retains HTTP redirect semantics`);
    assert.equal(new URL(head.headers.get('location'), base).pathname, canonical);
  }

  const normalPosts = JSON.parse(fs.readFileSync('scripts/tests/fixtures/seo-recovery-baseline.json', 'utf8')).slice(0, 2);
  for (const post of normalPosts) {
    const response = await get(post.url, { redirect: 'manual' });
    assert.equal(response.status, 200, `${post.url}: normal blog regression`);
    assert.equal(response.headers.get('location'), null);
    await response.arrayBuffer();
  }
  const absent = await get('/geschenke/a-definitely-unpublished-guide/', { redirect: 'manual' });
  assert.equal(absent.status, 404, 'No broad rewrite or redirect turns arbitrary guide URLs into duplicate articles');
  await absent.arrayBuffer();
  assert.deepEqual(serverErrors, []);
  console.log(`[gift-guide-http-test] PASS: official Netlify redirect engine over local HTTP; ${checkedCanonicalPages} direct 200s, ${checkedRedirects} direct 301/query/one-hop cases, browser-style follow, HEAD and ordinary blog routes. No live deployment was tested.`);
} finally {
  if (server.listening) {
    const closed = once(server, 'close');
    server.close();
    server.closeAllConnections();
    await closed;
  }
}
