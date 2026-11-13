import { parseDocument, DomUtils } from 'htmlparser2';

export const MAX_SOURCE_BYTES = 4 * 1024 * 1024;
export const SOURCE_TIMEOUT_MS = 20_000;
const MIN_ARTICLE_CHARACTERS = 200;
const OMITTED_ELEMENTS = new Set(['script', 'style', 'nav', 'aside', 'footer', 'header', 'form', 'noscript', 'template', 'button', 'svg']);
const BLOCK_ELEMENTS = new Set(['article', 'main', 'section', 'div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'ul', 'ol', 'blockquote', 'pre', 'tr', 'figure', 'figcaption']);
const OMITTED_ROLES = new Set(['navigation', 'banner', 'contentinfo', 'complementary', 'dialog']);
const OMITTED_CLASSES = /(?:^|[\s_-])(?:ads?|advert(?:isement)?|cookie|consent|related|share|social|newsletter|comments?|recommendations?|byline)(?:$|[\s_-])/i;

function httpUrl(value) {
    let parsed;
    try {
        parsed = new URL(value);
    } catch {
        throw new Error('Article source requires a complete HTTP(S) URL.');
    }
    if (!['http:', 'https:'].includes(parsed.protocol) || parsed.username || parsed.password) {
        throw new Error('Article source URL must use HTTP(S) without embedded credentials.');
    }
    return parsed.href;
}

function normalizeText(value) {
    return String(value)
        .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f\u200b\ufeff]/gu, '')
        .replace(/[\t \r\u00a0]+/gu, ' ')
        .replace(/ *\n */gu, '\n')
        .replace(/\n{3,}/gu, '\n\n')
        .trim();
}

function omitted(node) {
    const attributes = node.attribs || {};
    return OMITTED_ELEMENTS.has(node.name)
        || Object.hasOwn(attributes, 'hidden')
        || attributes['aria-hidden']?.toLowerCase() === 'true'
        || /(?:display\s*:\s*none|visibility\s*:\s*hidden)/i.test(attributes.style || '')
        || OMITTED_ROLES.has(attributes.role?.toLowerCase())
        || OMITTED_CLASSES.test(`${attributes.id || ''} ${attributes.class || ''}`);
}

// Keep paragraph boundaries without recursively traversing publisher-controlled
// nesting. Markup, navigation and executable content never enter the prompt.
function articleText(root) {
    const pieces = [];
    const pending = [root];
    while (pending.length) {
        const node = pending.pop();
        if (typeof node === 'string') {
            pieces.push(node);
        } else if (node.type === 'text') {
            pieces.push(node.data);
        } else if (node.type !== 'comment' && !omitted(node)) {
            if (node.name === 'br') {
                pieces.push('\n');
                continue;
            }
            const block = BLOCK_ELEMENTS.has(node.name);
            if (block) {
                pieces.push('\n\n');
                pending.push('\n\n');
            } else if (['td', 'th'].includes(node.name)) {
                pieces.push(' ');
                pending.push(' ');
            }
            for (let index = (node.children?.length || 0) - 1; index >= 0; index--) {
                pending.push(node.children[index]);
            }
        }
    }
    return normalizeText(pieces.join(''));
}

function plausibleArticle(text) {
    return text.length >= MIN_ARTICLE_CHARACTERS && text.split(/\s+/u).length >= 20;
}

function challenge(title, text) {
    return /^(?:just a moment|access denied|attention required|checking your browser|verify (?:that )?you are human|security verification|zugriff verweigert|sicherheitsüberprüfung)(?:[\s.!:|…-]|$)/i.test(title.trim())
        || /^(?:please (?:enable javascript|verify (?:that )?you are human)|checking your browser before|verify (?:that )?you are human|performing security verification)/i.test(text.trim());
}

function structuredArticles(elements) {
    const articles = [];
    for (const element of elements) {
        if (element.name !== 'script' || !/^application\/ld\+json(?:\s*;|$)/i.test(element.attribs?.type || '')) continue;
        let value;
        try {
            value = JSON.parse(DomUtils.textContent(element));
        } catch {
            continue;
        }
        const pending = [{ value, depth: 0 }];
        while (pending.length) {
            const entry = pending.pop();
            if (!entry.value || typeof entry.value !== 'object' || entry.depth > 40) continue;
            const types = [entry.value['@type']].flat().filter(type => typeof type === 'string');
            if (types.some(type => ['Article', 'NewsArticle', 'BlogPosting'].includes(type.split(/[/:#]/u).at(-1)))
                && typeof entry.value.articleBody === 'string') {
                articles.push({
                    title: typeof entry.value.headline === 'string' ? entry.value.headline : '',
                    text: articleText(parseDocument(entry.value.articleBody, { decodeEntities: true })),
                });
            }
            for (const nested of Object.values(entry.value)) {
                if (nested && typeof nested === 'object') pending.push({ value: nested, depth: entry.depth + 1 });
            }
        }
    }
    return articles;
}

export function extractArticleSource(html, { url = 'https://example.test/article', resolvedUrl = url } = {}) {
    url = httpUrl(url);
    resolvedUrl = httpUrl(resolvedUrl);
    const document = parseDocument(String(html), { decodeEntities: true });
    const elements = DomUtils.findAll(() => true, document.children);
    const structured = structuredArticles(elements);
    const h1 = elements.find(element => element.name === 'h1');
    const ogTitle = elements.find(element => element.name === 'meta' && element.attribs?.property?.toLowerCase() === 'og:title');
    const titleElement = elements.find(element => element.name === 'title');
    const title = normalizeText((h1 && articleText(h1)) || ogTitle?.attribs?.content || structured.find(article => article.title)?.title
        || (titleElement && DomUtils.textContent(titleElement)) || '');
    if (challenge(title, '')) throw new Error(`Article source returned a verification or access-denied page: ${resolvedUrl}`);
    const candidates = [
        ...structured.map(article => article.text),
        ...elements.filter(element => (element.attribs?.itemprop || '').split(/\s+/u).includes('articleBody')).map(articleText),
        ...elements.filter(element => element.attribs?.id === 'news_content').map(articleText),
        ...elements.filter(element => element.name === 'article').map(articleText),
        ...elements.filter(element => element.name === 'main' || element.attribs?.role === 'main').map(articleText),
    ];
    const text = candidates.find(candidate => plausibleArticle(candidate) && !challenge(title, candidate));
    if (!text) throw new Error(`Could not extract a substantial article body from ${resolvedUrl}; the page may require browser verification or contain no readable article.`);
    return { url, resolvedUrl, title, text };
}

function charsetFrom(bytes, contentType) {
    if (bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf) return 'utf-8';
    if (bytes[0] === 0xff && bytes[1] === 0xfe) return 'utf-16le';
    if (bytes[0] === 0xfe && bytes[1] === 0xff) return 'utf-16be';
    const fromHeader = contentType.match(/charset\s*=\s*["']?\s*([^\s;"']+)/i)?.[1];
    if (fromHeader) return fromHeader;
    const prefix = new TextDecoder('windows-1252').decode(bytes.subarray(0, 4096));
    return prefix.match(/<meta\b[^>]*\bcharset\s*=\s*["']?\s*([^\s;"'/>]+)/i)?.[1] || 'utf-8';
}

async function boundedBody(response, signal) {
    const contentLength = response.headers.get('content-length');
    if (contentLength && /^\d+$/u.test(contentLength) && Number(contentLength) > MAX_SOURCE_BYTES) {
        await response.body?.cancel();
        throw new Error(`Article source exceeds the ${MAX_SOURCE_BYTES}-byte limit; no partial text was saved.`);
    }
    if (!response.body?.getReader) throw new Error('Article source returned an empty response body.');
    const reader = response.body.getReader();
    const chunks = [];
    let length = 0;
    try {
        while (true) {
            signal.throwIfAborted();
            const { done, value } = await reader.read();
            if (done) break;
            length += value.byteLength;
            if (length > MAX_SOURCE_BYTES) throw new Error(`Article source exceeds the ${MAX_SOURCE_BYTES}-byte limit; no partial text was saved.`);
            chunks.push(value);
        }
    } catch (error) {
        await reader.cancel().catch(() => {});
        throw error;
    } finally {
        reader.releaseLock();
    }
    const bytes = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) {
        bytes.set(chunk, offset);
        offset += chunk.byteLength;
    }
    return bytes;
}

export async function fetchArticleSource(value, { fetchImpl = fetch, signal } = {}) {
    const url = httpUrl(value);
    const timeout = AbortSignal.timeout(SOURCE_TIMEOUT_MS);
    const requestSignal = signal ? AbortSignal.any([signal, timeout]) : timeout;
    try {
        requestSignal.throwIfAborted();
        const response = await fetchImpl(url, {
            signal: requestSignal,
            headers: { Accept: 'text/html, application/xhtml+xml, text/plain;q=0.9' },
        });
        if (!response.ok) {
            await response.body?.cancel();
            throw new Error(`Article source returned HTTP ${response.status}: ${url}`);
        }
        const resolvedUrl = httpUrl(response.url || url);
        const contentType = response.headers.get('content-type') || '';
        const mediaType = contentType.split(';', 1)[0].trim().toLowerCase();
        if (mediaType && !['text/html', 'application/xhtml+xml', 'text/plain'].includes(mediaType)) {
            await response.body?.cancel();
            throw new Error(`Article source has unsupported content type ${mediaType}: ${resolvedUrl}`);
        }
        const bytes = await boundedBody(response, requestSignal);
        let decoded;
        try {
            decoded = new TextDecoder(charsetFrom(bytes, contentType)).decode(bytes);
        } catch (error) {
            throw new Error(`Article source declares an unsupported character encoding: ${resolvedUrl}`, { cause: error });
        }
        if (mediaType === 'text/plain' && !/<(?:!doctype|html|article|main|head|body)\b/i.test(decoded)) {
            const text = normalizeText(decoded);
            const firstLine = text.split('\n', 1)[0];
            const title = firstLine.length <= 160 ? firstLine : '';
            if (!plausibleArticle(text) || challenge(title, text)) throw new Error(`Article source contains no substantial readable text: ${resolvedUrl}`);
            return { url, resolvedUrl, title, text };
        }
        return extractArticleSource(decoded, { url, resolvedUrl });
    } catch (error) {
        if (signal?.aborted) throw signal.reason || error;
        if (timeout.aborted || error?.name === 'TimeoutError') {
            throw new Error(`Fetching article source timed out after ${SOURCE_TIMEOUT_MS / 1000} seconds: ${url}`, { cause: error });
        }
        throw error;
    }
}
