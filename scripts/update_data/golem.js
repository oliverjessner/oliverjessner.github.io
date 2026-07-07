import { execFile } from 'node:child_process';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..', '..');

const partnersPath = path.join(repoRoot, '_data', 'partners.json');
const golemLinksPath = path.join(repoRoot, '_data', 'links', 'golem.yml');
const externalArticlesDir = path.join(repoRoot, 'assets', 'images', 'gen', 'external_articles');

const golemBaseUrl = 'https://www.golem.de';
const golemConsentCookie = 'golem_consent20=simple|250101';
const golemAuthorName = 'Oliver Jessner';
const defaultAuthorSlug = 'oliver_jessner';

const requestHeaders = {
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,application/json;q=0.8,*/*;q=0.7',
    Cookie: golemConsentCookie,
    'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
};

const categoryMap = new Map([
    ['arbeit', 'Arbeitswelt'],
    ['datenschutz', 'Privacy'],
    ['digitalesouveranitat', 'Politik'],
    ['digitalesouveraenitaet', 'Politik'],
    ['entwicklung', 'software-development'],
    ['entwicklungsumgebung', 'software-development'],
    ['games', 'gaming'],
    ['gaming', 'gaming'],
    ['itjobs', 'Arbeitswelt'],
    ['ki', 'KI'],
    ['kunstliche intelligenz', 'KI'],
    ['kuenstliche intelligenz', 'KI'],
    ['politik', 'Politik'],
    ['politikrecht', 'Politik'],
    ['security', 'Security'],
    ['softwareentwicklung', 'software-development'],
    ['soziales netz', 'Social Media'],
]);

async function main() {
    const partner = await getGolemPartner();
    console.log(`Partner: ${partner.title}`);
    console.log(`Quelle: ${partner.url}`);

    const searchResults = await fetchNewestGolemArticles(partner.url);
    const linksContent = await fs.readFile(golemLinksPath, 'utf8');
    const existingLinks = new Set(getYamlValues(linksContent, 'link'));
    const newSearchResults = searchResults.filter(searchResult => {
        const articleUrl = absolutizeUrl(searchResult.url, golemBaseUrl);
        return !existingLinks.has(articleUrl);
    });

    console.log(`Golem-Treffer von ${golemAuthorName}: ${searchResults.length}`);

    if (newSearchResults.length === 0) {
        console.log('Alle gefundenen Artikel sind bereits in _data/links/golem.yml vorhanden. Keine Aenderung.');
        return;
    }

    console.log(`Neue Artikel: ${newSearchResults.length}`);

    let nextId = getNextId(linksContent);
    let uniquenessContent = linksContent;
    const articlesByLink = new Map();

    for (const searchResult of [...newSearchResults].reverse()) {
        const articleUrl = absolutizeUrl(searchResult.url, golemBaseUrl);
        const articleMetadata = await fetchArticleMetadata(articleUrl, searchResult);
        const article = buildArticleEntry(articleMetadata);

        console.log(`Verarbeite: ${article.title}`);
        console.log(`URL: ${article.link}`);

        article.id = nextId;
        article.slug = makeUniqueSlug(article.slug, uniquenessContent, article.id);
        article.image = `/assets/images/gen/external_articles/${article.slug}/header.webp`;
        article.thumbnail = `/assets/images/gen/external_articles/${article.slug}/header_thumbnail.webp`;

        await downloadAndConvertImages(article.imageUrl, article.slug);

        nextId += 1;
        uniquenessContent = `${formatYamlEntry(article)}${uniquenessContent}`;
        articlesByLink.set(article.link, article);

        console.log(`Bilder: assets/images/gen/external_articles/${article.slug}/`);
    }

    const articles = newSearchResults
        .map(searchResult => articlesByLink.get(absolutizeUrl(searchResult.url, golemBaseUrl)))
        .filter(Boolean);

    await writeGolemLinks(articles, linksContent);

    console.log(`Eingetragen: ${path.relative(repoRoot, golemLinksPath)}`);
    for (const article of articles) {
        console.log(`- ${article.title}`);
    }
}

async function getGolemPartner() {
    const partners = JSON.parse(await fs.readFile(partnersPath, 'utf8'));
    const partner = partners.find(item => item.title === 'golem.de' && item.type === 'media_outlet');

    if (!partner?.url) {
        throw new Error('Kein media_outlet-Partner mit title "golem.de" und url gefunden.');
    }

    return partner;
}

async function fetchNewestGolemArticles(partnerUrl) {
    const sourceUrl = new URL(partnerUrl);
    const query = sourceUrl.searchParams.get('q')?.trim();

    if (!query) {
        throw new Error(`Die Golem-Partner-URL enthaelt keinen q-Parameter: ${partnerUrl}`);
    }

    await fetchText(partnerUrl);

    const apiUrl = new URL('/api/v1/search/', golemBaseUrl);
    apiUrl.searchParams.set('q', query);
    apiUrl.searchParams.set('page', '1');
    apiUrl.searchParams.set('sort', 'date');
    apiUrl.searchParams.set('period', 'all');

    const data = await fetchJson(apiUrl.href, {
        Accept: 'application/json, text/plain, */*',
        Referer: partnerUrl,
    });

    const hits = data?.results?.[0]?.hits ?? [];
    const matchingHits = hits
        .map(hit => hit.document)
        .filter(Boolean)
        .filter(document => isGolemArticleByAuthor(document, golemAuthorName));

    if (matchingHits.length === 0) {
        throw new Error(`Kein Golem-Artikel von ${golemAuthorName} in der Suche gefunden.`);
    }

    return matchingHits;
}

function isGolemArticleByAuthor(document, authorName) {
    const hasUrl = typeof document.url === 'string' && document.url.startsWith('/news/');
    const authors = Array.isArray(document.authors) ? document.authors : [];
    const hasAuthor = authors.some(author => normalizeText(author.name) === normalizeText(authorName));
    return hasUrl && hasAuthor;
}

async function fetchArticleMetadata(articleUrl, searchDocument) {
    const html = await fetchText(articleUrl);
    const metas = parseMetaTags(html);
    const jsonLd = parseJsonLd(html);

    const metaTitle = stripGolemSuffix(
        getMetaContent(metas, ['title', 'og:title', 'twitter:title']) ?? jsonLd?.headline,
    );
    const title = buildFullTitle(searchDocument.kicker, searchDocument.title) || metaTitle;
    const description =
        searchDocument.teaserText ||
        getMetaContent(metas, ['description', 'og:description', 'twitter:description']) ||
        jsonLd?.description ||
        '';

    const imageUrl =
        pickBestCoverImage(searchDocument.coverImages) ||
        getMetaContent(metas, ['og:image', 'twitter:image']) ||
        getJsonLdImage(jsonLd);

    const date = formatArticleDate(searchDocument.publishedDate || jsonLd?.datePublished || getTimeDatetime(html));
    const categories = buildCategories(searchDocument, metas, jsonLd);

    if (!title) {
        throw new Error(`Kein Titel fuer Artikel gefunden: ${articleUrl}`);
    }

    if (!imageUrl) {
        throw new Error(`Kein Artikelbild gefunden: ${articleUrl}`);
    }

    if (!date) {
        throw new Error(`Kein Publikationsdatum gefunden: ${articleUrl}`);
    }

    return {
        title,
        description: decodeHtmlEntities(description).trim(),
        imageUrl: absolutizeUrl(imageUrl, golemBaseUrl),
        link: articleUrl,
        date,
        categories,
    };
}

function buildArticleEntry(metadata) {
    const slug = slugify(metadata.title);

    return {
        title: metadata.title,
        slug,
        id: 0,
        image: '',
        thumbnail: '',
        link: metadata.link,
        date: metadata.date,
        description: metadata.description,
        authors: [defaultAuthorSlug],
        categories: metadata.categories,
        imageUrl: metadata.imageUrl,
    };
}

function buildFullTitle(kicker, title) {
    const cleanKicker = decodeHtmlEntities(kicker ?? '').trim();
    const cleanTitle = decodeHtmlEntities(title ?? '').trim();

    if (cleanKicker && cleanTitle && !cleanTitle.toLowerCase().startsWith(`${cleanKicker.toLowerCase()}:`)) {
        return `${cleanKicker}: ${cleanTitle}`;
    }

    return cleanTitle || cleanKicker;
}

function buildCategories(searchDocument, metas, jsonLd) {
    const keywords =
        getMetaContent(metas, ['news_keywords'])
            ?.split(',')
            .map(item => item.trim())
            .filter(Boolean) ?? [];

    const apiTopics = Array.isArray(searchDocument.contentTopics)
        ? searchDocument.contentTopics.map(topic => topic.title).filter(Boolean)
        : [];

    const jsonLdTopics = [
        jsonLd?.about?.name,
        ...(Array.isArray(jsonLd?.mentions) ? jsonLd.mentions.map(item => item.name) : []),
    ].filter(Boolean);

    return uniqueList([...keywords, ...apiTopics, ...jsonLdTopics].map(mapCategory).filter(Boolean)).slice(0, 5);
}

function mapCategory(category) {
    const cleanCategory = decodeHtmlEntities(category).trim();
    const normalized = normalizeText(cleanCategory);

    return categoryMap.get(normalized) ?? cleanCategory;
}

function pickBestCoverImage(images) {
    if (!Array.isArray(images) || images.length === 0) {
        return '';
    }

    const sortedImages = [...images].sort((a, b) => (b.width ?? 0) - (a.width ?? 0));
    return sortedImages[0]?.src ?? '';
}

function parseMetaTags(html) {
    const tags = [];
    const metaMatches = html.matchAll(/<meta\s+([^>]*?)>/gi);

    for (const match of metaMatches) {
        const attrs = {};
        const attrMatches = match[1].matchAll(/([a-zA-Z_:.-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g);

        for (const attrMatch of attrMatches) {
            attrs[attrMatch[1].toLowerCase()] = decodeHtmlEntities(attrMatch[2] ?? attrMatch[3] ?? '');
        }

        tags.push(attrs);
    }

    return tags;
}

function getMetaContent(metas, names) {
    const normalizedNames = names.map(name => name.toLowerCase());
    const meta = metas.find(item => normalizedNames.includes(item.name) || normalizedNames.includes(item.property));
    return meta?.content ?? '';
}

function parseJsonLd(html) {
    const scripts = html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);

    for (const script of scripts) {
        try {
            const parsed = JSON.parse(decodeHtmlEntities(script[1]).trim());
            if (parsed?.['@type'] === 'NewsArticle') {
                return parsed;
            }
        } catch {
            // Ignore malformed JSON-LD blocks from third party embeds.
        }
    }

    return null;
}

function getJsonLdImage(jsonLd) {
    if (typeof jsonLd?.image === 'string') {
        return jsonLd.image;
    }

    if (Array.isArray(jsonLd?.image)) {
        return jsonLd.image.find(item => typeof item === 'string') ?? jsonLd.image.find(item => item?.url)?.url ?? '';
    }

    return jsonLd?.image?.url ?? '';
}

function getTimeDatetime(html) {
    return html.match(/<time[^>]+datetime=["']([^"']+)["']/i)?.[1] ?? '';
}

function stripGolemSuffix(title) {
    return decodeHtmlEntities(title ?? '')
        .replace(/\s+-\s+Golem\.de\s*$/i, '')
        .trim();
}

function formatArticleDate(value) {
    if (!value) {
        return '';
    }

    const date = typeof value === 'number' ? new Date(value) : new Date(value);

    if (Number.isNaN(date.getTime())) {
        return '';
    }

    return new Intl.DateTimeFormat('en-CA', {
        day: '2-digit',
        month: '2-digit',
        timeZone: 'Europe/Berlin',
        year: 'numeric',
    }).format(date);
}

async function downloadAndConvertImages(imageUrl, slug) {
    await ensureCommand('cwebp');

    const articleImageDir = path.join(externalArticlesDir, slug);
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'golem-link-'));
    const sourcePath = path.join(tmpDir, `source${getImageExtension(imageUrl)}`);

    try {
        await fs.mkdir(articleImageDir, { recursive: true });
        await downloadFile(imageUrl, sourcePath);

        const sourceWidth = await getImageWidth(sourcePath);
        await convertToWebp(sourcePath, path.join(articleImageDir, 'header.webp'), targetWidth(sourceWidth, 1200));
        await convertToWebp(
            sourcePath,
            path.join(articleImageDir, 'header_thumbnail.webp'),
            targetWidth(sourceWidth, 500),
        );
    } finally {
        await fs.rm(tmpDir, { force: true, recursive: true });
    }
}

async function downloadFile(url, targetPath) {
    const response = await fetch(url, {
        headers: {
            ...requestHeaders,
            Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
            Referer: golemBaseUrl,
        },
    });

    if (!response.ok) {
        throw new Error(`Bild konnte nicht geladen werden (${response.status}): ${url}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    await fs.writeFile(targetPath, buffer);
}

async function getImageWidth(filePath) {
    try {
        const { stdout } = await execFileAsync('sips', ['-g', 'pixelWidth', filePath]);
        const width = Number(stdout.match(/pixelWidth:\s*(\d+)/)?.[1]);
        return Number.isFinite(width) ? width : 0;
    } catch {
        return 0;
    }
}

function targetWidth(sourceWidth, maxWidth) {
    if (!sourceWidth) {
        return maxWidth;
    }

    return Math.min(sourceWidth, maxWidth);
}

async function convertToWebp(sourcePath, targetPath, width) {
    await execFileAsync('cwebp', ['-quiet', '-q', '82', '-resize', String(width), '0', sourcePath, '-o', targetPath]);
}

async function ensureCommand(command) {
    try {
        await execFileAsync('which', [command]);
    } catch {
        throw new Error(`Benoetigtes Kommando nicht gefunden: ${command}`);
    }
}

function getImageExtension(url) {
    const extension = path.extname(new URL(url).pathname);
    return extension && extension.length <= 6 ? extension : '.img';
}

async function writeGolemLinks(articles, currentContent) {
    const mergedContent = mergeGolemLinkEntries(articles, currentContent);
    await fs.writeFile(golemLinksPath, mergedContent, 'utf8');
}

function mergeGolemLinkEntries(articles, currentContent) {
    const newEntries = articles.map((article, index) => ({
        date: article.date,
        index,
        text: formatYamlEntry(article).trimEnd(),
    }));

    const currentEntries = splitYamlEntries(currentContent).map((text, index) => ({
        date: getYamlScalarValue(text, 'date'),
        index: newEntries.length + index,
        text,
    }));

    const mergedEntries = [...newEntries, ...currentEntries].sort(compareGolemLinkEntries);
    return `${mergedEntries.map(entry => entry.text).join('\n')}\n`;
}

function splitYamlEntries(content) {
    const starts = [...content.matchAll(/^- title:/gm)].map(match => match.index);

    if (starts.length === 0) {
        return [];
    }

    return starts.map((start, index) => {
        const end = starts[index + 1] ?? content.length;
        return content.slice(start, end).trimEnd();
    });
}

function compareGolemLinkEntries(a, b) {
    const byDate = b.date.localeCompare(a.date);
    return byDate || a.index - b.index;
}

function getYamlScalarValue(content, key) {
    const pattern = new RegExp(`^\\s*${key}:\\s*['"]([^'"]+)['"]\\s*$`, 'm');
    return content.match(pattern)?.[1] ?? '';
}

function formatYamlEntry(article) {
    return [
        `- title: ${yamlQuote(article.title)}`,
        `  slug: ${yamlQuote(article.slug)}`,
        `  id: ${article.id}`,
        `  image: ${yamlQuote(article.image)}`,
        `  thumbnail: ${yamlQuote(article.thumbnail)}`,
        `  link: ${yamlQuote(article.link)}`,
        `  date: ${yamlQuote(article.date)}`,
        `  description: ${yamlQuote(article.description)}`,
        `  authors: ${formatYamlArray(article.authors)}`,
        `  categories: ${formatYamlArray(article.categories)}`,
        '',
    ].join('\n');
}

function getNextId(content) {
    const ids = [...content.matchAll(/^\s*id:\s*(\d+)\s*$/gm)].map(match => Number(match[1]));
    return Math.max(0, ...ids) + 1;
}

function makeUniqueSlug(slug, content, id) {
    const existingSlugs = getYamlValues(content, 'slug');
    return existingSlugs.includes(slug) ? `${slug}_${id}` : slug;
}

function getYamlValues(content, key) {
    const pattern = new RegExp(`^\\s*${key}:\\s*['"]([^'"]+)['"]\\s*$`, 'gm');
    return [...content.matchAll(pattern)].map(match => match[1]);
}

function formatYamlArray(items) {
    if (!items.length) {
        return '[]';
    }

    return `[${items.map(yamlQuote).join(', ')}]`;
}

function yamlQuote(value) {
    return `'${String(value).replaceAll("'", "''")}'`;
}

function slugify(value) {
    const replacements = new Map([
        ['\u00c4', 'Ae'],
        ['\u00d6', 'Oe'],
        ['\u00dc', 'Ue'],
        ['\u00df', 'ss'],
        ['\u00e4', 'ae'],
        ['\u00f6', 'oe'],
        ['\u00fc', 'ue'],
    ]);

    const replaced = [...value].map(char => replacements.get(char) ?? char).join('');

    return replaced
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '')
        .replace(/_+/g, '_')
        .toLowerCase();
}

function uniqueList(items) {
    return [...new Set(items)];
}

function normalizeText(value) {
    return decodeHtmlEntities(String(value ?? ''))
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\u00df/g, 'ss')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();
}

function decodeHtmlEntities(value) {
    return String(value ?? '')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&apos;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
        .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(Number.parseInt(code, 16)));
}

function absolutizeUrl(url, baseUrl) {
    return new URL(url, baseUrl).href;
}

async function fetchJson(url, extraHeaders = {}) {
    const text = await fetchText(url, extraHeaders);
    return JSON.parse(text);
}

async function fetchText(url, extraHeaders = {}) {
    const response = await fetch(url, {
        headers: {
            ...requestHeaders,
            ...extraHeaders,
        },
    });

    if (!response.ok) {
        throw new Error(`Request fehlgeschlagen (${response.status}): ${url}`);
    }

    return response.text();
}

main().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
});
