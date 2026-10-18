import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { brotliCompressSync, constants } from 'node:zlib';

const root = path.resolve('_site');
if (!fs.existsSync(path.join(root, 'index.html'))) throw new Error('Build the website before running browser tests.');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.xml': 'application/xml', '.wasm': 'application/wasm', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.woff': 'font/woff' };
const server = http.createServer(async (request, response) => {
  try {
    let file = path.resolve(root, `.${decodeURIComponent(new URL(request.url, 'http://localhost').pathname)}`);
    if (file !== root && !file.startsWith(`${root}${path.sep}`)) throw new Error('Invalid path');
    if ((await fs.promises.stat(file)).isDirectory()) file = path.join(file, 'index.html');
    let content = await fs.promises.readFile(file);
    const type = types[path.extname(file)] || 'application/octet-stream';
    const headers = { 'content-type': type, 'cache-control': 'public,max-age=0,must-revalidate', vary: 'Accept-Encoding' };
    // Netlify serves text assets with Brotli. Match that transfer behavior in
    // local Lighthouse runs without changing production caching or assets.
    if (request.headers['accept-encoding']?.includes('br') && /^(text\/|application\/(json|xml|wasm)|image\/svg)/.test(type)) {
      content = brotliCompressSync(content, { params: { [constants.BROTLI_PARAM_QUALITY]: 5 } });
      headers['content-encoding'] = 'br';
    }
    response.writeHead(200, headers);
    response.end(content);
  } catch {
    response.writeHead(404, { 'content-type': 'text/plain' });
    response.end('Not found');
  }
});
server.listen(4192, '127.0.0.1', () => console.log('Built website: http://127.0.0.1:4192'));
for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => server.close(() => process.exit(0)));
