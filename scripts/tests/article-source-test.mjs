import assert from 'node:assert/strict';
import test from 'node:test';
import {
    extractArticleSource,
    fetchArticleSource,
    MAX_SOURCE_BYTES,
    SOURCE_TIMEOUT_MS,
} from '../blogposts/article-source.mjs';

const URL = 'https://publisher.example.test/news/article.html';
const FIRST_PARAGRAPH = 'Die neue Desktop-Anwendung verarbeitet Dokumente, Tabellen und Präsentationen. Ihre Entwickler erläutern die unterstützten Betriebssysteme und stellen den Quellcode öffentlich bereit.';
const SECOND_PARAGRAPH = 'Für die Einordnung zählen nachvollziehbare Angaben zu Dateiformaten und Veröffentlichungen. Die Dokumentation beschreibt außerdem, welche Funktionen bereits verfügbar sind und welche Voraussetzungen gelten.';
const ARTICLE_TEXT = `${FIRST_PARAGRAPH}\n\n${SECOND_PARAGRAPH}`;

function articleHtml(content = ARTICLE_TEXT) {
    return `<html><head><title>Dokumente auf dem Desktop</title></head><body><article><p>${content}</p></article></body></html>`;
}

function htmlResponse(html, headers = {}) {
    return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8', ...headers } });
}

test('extracts a WinFuture article container and removes unrelated or hidden content', () => {
    const result = extractArticleSource(`<!doctype html><html><head>
        <title>Seitentitel mit Verlag</title>
        <meta property="og:title" content="Open-Source-Office für den Desktop">
        </head><body><nav>GLOBAL NAVIGATION</nav>
        <h1>Office-Anwendungen auf dem Desktop</h1>
        <div id="news_content">
            <header>AUTHOR HEADER</header>
            <p>${FIRST_PARAGRAPH}</p>
            <aside>ADVERTISEMENT</aside>
            <script>window.secret = 'SCRIPT CONTENT';</script>
            <style>.sample { content: 'STYLE CONTENT'; }</style>
            <p hidden>HIDDEN CONTENT</p>
            <div aria-hidden="true">ARIA HIDDEN CONTENT</div>
            <form>FORM CONTENT</form>
            <p>${SECOND_PARAGRAPH}</p>
            <footer>ARTICLE FOOTER</footer>
        </div><footer>SITE FOOTER</footer></body></html>`, { url: URL });

    assert.equal(result.url, URL);
    assert.equal(result.resolvedUrl, URL);
    assert.ok(result.title.includes('Office'));
    assert.ok(result.text.includes(FIRST_PARAGRAPH));
    assert.ok(result.text.includes(SECOND_PARAGRAPH));
    assert.match(result.text, /\n/);
    for (const unwanted of ['GLOBAL NAVIGATION', 'AUTHOR HEADER', 'ADVERTISEMENT', 'SCRIPT CONTENT',
        'STYLE CONTENT', 'HIDDEN CONTENT', 'ARIA HIDDEN CONTENT', 'FORM CONTENT', 'ARTICLE FOOTER', 'SITE FOOTER']) {
        assert.equal(result.text.includes(unwanted), false, unwanted);
    }
});

test('reads NewsArticle articleBody from a JSON-LD graph without treating scripts as article text', () => {
    const graph = {
        '@context': 'https://schema.org',
        '@graph': [
            { '@type': 'WebSite', name: 'Publisher' },
            { '@type': 'NewsArticle', headline: 'Open-Source-Office', articleBody: ARTICLE_TEXT },
        ],
    };
    const result = extractArticleSource(`<html><head><title>Open-Source-Office</title>
        <script type="application/ld+json">${JSON.stringify(graph)}</script>
        </head><body><nav>MENU ONLY</nav></body></html>`, { url: URL });

    assert.ok(result.text.includes(FIRST_PARAGRAPH));
    assert.ok(result.text.includes(SECOND_PARAGRAPH));
    assert.equal(result.text.includes('@context'), false);
    assert.equal(result.text.includes('MENU ONLY'), false);
});

test('extracts an explicit articleBody item property', () => {
    const result = extractArticleSource(`<html><head><title>Dokumente</title></head><body>
        <div itemprop="articleBody"><p>${FIRST_PARAGRAPH}</p><p>${SECOND_PARAGRAPH}</p></div>
        <aside>RELATED ARTICLES</aside></body></html>`, { url: URL });
    assert.ok(result.text.includes(FIRST_PARAGRAPH));
    assert.ok(result.text.includes(SECOND_PARAGRAPH));
    assert.equal(result.text.includes('RELATED ARTICLES'), false);
});

test('accepts a main article region and keeps the resolved source identity', () => {
    const resolvedUrl = 'https://publisher.example.test/office/desktop/';
    const result = extractArticleSource(`<html><head><title>Desktop-Office</title></head><body>
        <main><h1>Desktop-Office</h1><p>${FIRST_PARAGRAPH}</p><p>${SECOND_PARAGRAPH}</p></main>
        </body></html>`, { url: URL, resolvedUrl });
    assert.equal(result.resolvedUrl, resolvedUrl);
    assert.equal(result.url, URL);
    assert.ok(result.text.includes(SECOND_PARAGRAPH));
});

test('does not use the whole body as a fallback for navigation or other unstructured content', () => {
    const html = `<html><head><title>Publisher</title></head><body>
        <nav>${'Anmelden Startseite Nachrichten Kontakt '.repeat(30)}</nav>
        <div>${ARTICLE_TEXT}</div></body></html>`;
    assert.throws(() => extractArticleSource(html, { url: URL }));
});

test('rejects a short article and an HTML challenge page instead of returning boilerplate', () => {
    assert.throws(() => extractArticleSource(articleHtml('Kurze Vorschau ohne Artikeltext.'), { url: URL }));
    const challenge = `<html><head><title>Just a moment...</title></head><body><main>
        <h1>Checking your browser</h1><p>${'Verify you are human before continuing. '.repeat(15)}</p>
        </main></body></html>`;
    assert.throws(() => extractArticleSource(challenge, { url: URL }));
});

test('decodes ISO-8859-1 HTTP responses without corrupting German umlauts', async () => {
    const text = `Änderungen prüfen: Für ältere Geräte stehen öffentliche Pakete bereit. ${ARTICLE_TEXT}`;
    const html = articleHtml(text);
    const result = await fetchArticleSource(URL, {
        fetchImpl: async () => new Response(Buffer.from(html, 'latin1'), {
            headers: { 'content-type': 'text/html; charset=iso-8859-1' },
        }),
    });
    assert.ok(result.text.includes('Änderungen prüfen: Für ältere Geräte stehen öffentliche Pakete bereit.'));
    assert.equal(result.text.includes('\uFFFD'), false);
});

test('uses a declared HTML charset when the HTTP header does not provide one', async () => {
    const html = `<html><head><meta charset="windows-1252"><title>Größe prüfen</title></head>
        <body><article><p>Größe prüfen, Änderungen für ältere Geräte. ${ARTICLE_TEXT}</p></article></body></html>`;
    const result = await fetchArticleSource(URL, {
        fetchImpl: async () => new Response(Buffer.from(html, 'latin1'), { headers: { 'content-type': 'text/html' } }),
    });
    assert.ok(result.title.includes('Größe prüfen'));
    assert.ok(result.text.includes('Änderungen für ältere Geräte'));
    assert.equal(result.text.includes('\uFFFD'), false);
});

test('records a redirected response URL while retaining the selected URL', async () => {
    const response = htmlResponse(articleHtml());
    Object.defineProperty(response, 'url', { value: 'https://publisher.example.test/office/desktop/' });
    const result = await fetchArticleSource(URL, { fetchImpl: async () => response });
    assert.equal(result.url, URL);
    assert.equal(result.resolvedUrl, 'https://publisher.example.test/office/desktop/');
});

test('rejects non-HTTP and credential-bearing source URLs before fetching', async () => {
    for (const value of ['file:///tmp/article.html', 'ftp://publisher.example.test/article',
        'https://user:password@publisher.example.test/article', 'not a URL']) {
        let fetched = false;
        await assert.rejects(fetchArticleSource(value, {
            fetchImpl: async () => { fetched = true; return htmlResponse(articleHtml()); },
        }));
        assert.equal(fetched, false, value);
    }
});

test('reports HTTP errors and unsupported media instead of generating an article from them', async () => {
    await assert.rejects(fetchArticleSource(URL, {
        fetchImpl: async () => new Response('Not found', { status: 404 }),
    }), /404/);
    await assert.rejects(fetchArticleSource(URL, {
        fetchImpl: async () => new Response('binary', { headers: { 'content-type': 'image/jpeg' } }),
    }));
});

test('rejects a declared response over the byte limit before reading it', async () => {
    let cancelled = false;
    const stream = new ReadableStream({ cancel() { cancelled = true; } });
    await assert.rejects(fetchArticleSource(URL, {
        fetchImpl: async () => new Response(stream, {
            headers: { 'content-type': 'text/html', 'content-length': String(MAX_SOURCE_BYTES + 1) },
        }),
    }));
    assert.equal(cancelled, true);
});

test('bounds streamed bytes and cancels an oversized response without silently truncating it', async () => {
    let chunks = 0;
    let cancelled = false;
    const chunk = new Uint8Array(Math.floor(MAX_SOURCE_BYTES / 2) + 1).fill(65);
    const stream = new ReadableStream({
        pull(controller) {
            chunks += 1;
            if (chunks <= 3) controller.enqueue(chunk);
            else controller.close();
        },
        cancel() { cancelled = true; },
    });
    await assert.rejects(fetchArticleSource(URL, {
        fetchImpl: async () => new Response(stream, { headers: { 'content-type': 'text/html' } }),
    }));
    assert.equal(cancelled, true);
});

test('passes a bounded request signal and reports timeout failures', async () => {
    assert.equal(SOURCE_TIMEOUT_MS, 20_000);
    let receivedSignal;
    await assert.rejects(fetchArticleSource(URL, {
        fetchImpl: async (_url, options) => {
            receivedSignal = options.signal;
            throw new DOMException('Source request timed out', 'TimeoutError');
        },
    }), /time|20/i);
    assert.ok(receivedSignal instanceof AbortSignal);
});

test('preserves caller cancellation in the request signal', async () => {
    const controller = new AbortController();
    controller.abort(new DOMException('User cancelled the source request', 'AbortError'));
    await assert.rejects(fetchArticleSource(URL, {
        signal: controller.signal,
        fetchImpl: async (_url, options) => {
            assert.equal(options.signal.aborted, true);
            throw options.signal.reason;
        },
    }), /cancel|abort/i);
});
