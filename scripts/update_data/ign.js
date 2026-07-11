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
const ignLinksPath = path.join(repoRoot, '_data', 'links', 'ign.yml');
const externalArticlesDir = path.join(repoRoot, 'assets', 'images', 'gen', 'external_articles');

const ignBaseUrl = 'https://de.ign.com';
const ignAuthorName = 'Oliver Jessner';
const defaultAuthorSlug = 'oliver_jessner';
const maxProfilePages = 25;

const requestHeaders = {
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'de-AT,de;q=0.9,en;q=0.8',
    'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124 Safari/537.36',
};

const categoryMap = new Map([
    ['accessibility', 'UX'],
    ['barrierefreiheit', 'UX'],
    ['datenschutz', 'Privacy'],
    ['gesellschaft und politik', 'Gesellschaft'],
    ['gesellschaft', 'Gesellschaft'],
    ['gaming', 'gaming'],
    ['kunstliche intelligenz', 'KI'],
    ['kuenstliche intelligenz', 'KI'],
    ['politik', 'Politik'],
    ['security', 'Security'],
    ['sicherheit', 'Security'],
    ['wirtschaft', 'Wirtschaft'],
]);

async function main() {
    const partner = await getIgnPartner();
    console.log(`Partner: ${partner.title}`);
    console.log(`Quelle: ${partner.url}`);

    const profileArticles = await fetchIgnAuthorArticles(partner.url);
    const linksContent = await fs.readFile(ignLinksPath, 'utf8');
    const existingLinks = new Set(getYamlValues(linksContent, 'link'));
    const newProfileArticles = profileArticles.filter(article => !existingLinks.has(article.link));

    console.log(`IGN-Treffer von ${ignAuthorName}: ${profileArticles.length}`);

    if (newProfileArticles.length === 0) {
        console.log('Alle gefundenen Artikel sind bereits in _data/links/ign.yml vorhanden. Keine Aenderung.');
        return;
    }

    console.log(`Neue Artikel: ${newProfileArticles.length}`);

    let nextId = getNextId(linksContent);
    let uniquenessContent = linksContent;
    const articles = [];

    for (const profileArticle of [...newProfileArticles].reverse()) {
        const article = await fetchArticleMetadata(profileArticle);

        console.log(`Verarbeite: ${article.title}`);
        console.log(`URL: ${article.link}`);

        article.id = nextId;
        article.slug = makeUniqueSlug(slugify(article.title), uniquenessContent, article.id);
        article.image = `/assets/images/gen/external_articles/${article.slug}/header.webp`;
        article.thumbnail = `/assets/images/gen/external_articles/${article.slug}/header_thumbnail.webp`;

        await downloadAndConvertImages(article.imageUrl, article.slug);

        nextId += 1;
        uniquenessContent = `${formatYamlEntry(article)}${uniquenessContent}`;
        articles.push(article);

        console.log(`Bilder: assets/images/gen/external_articles/${article.slug}/`);
    }

    await writeIgnLinks(articles, linksContent);

    console.log(`Eingetragen: ${path.relative(repoRoot, ignLinksPath)}`);
    for (const article of articles) {
        console.log(`- ${article.title}`);
    }
}

async function getIgnPartner() {
    const partners = JSON.parse(await fs.readFile(partnersPath, 'utf8'));
    const partner = partners.find(item => item.title === 'IGN' && item.type === 'media_outlet');

    if (!partner?.url) {
        throw new Error('Kein media_outlet-Partner mit title "IGN" und url gefunden.');
    }

    return partner;
}

async function fetchIgnAuthorArticles(profileUrl) {
    const pendingUrls = [new URL(profileUrl, ignBaseUrl).href];
    const visitedUrls = new Set();
    const articlesByLink = new Map();

    while (pendingUrls.length > 0 && visitedUrls.size < maxProfilePages) {
        const currentUrl = pendingUrls.shift();

        if (visitedUrls.has(currentUrl)) {
            continue;
        }

        visitedUrls.add(currentUrl);
        const html = await fetchText(currentUrl);
        const pageArticles = parseIgnProfileArticles(html, currentUrl);
        let hasNewArticle = false;

        for (const article of pageArticles) {
            if (!articlesByLink.has(article.link)) {
                articlesByLink.set(article.link, article);
                hasNewArticle = true;
            }
        }

        const nextUrl = getIgnProfileNextUrl(html, currentUrl);
        if (nextUrl && !visitedUrls.has(nextUrl) && (hasNewArticle || articlesByLink.size === 0)) {
            pendingUrls.push(nextUrl);
        }
    }

    if (articlesByLink.size === 0) {
        throw new Error(`Keine Artikel im IGN-Autorenprofil gefunden: ${profileUrl}`);
    }

    return [...articlesByLink.values()];
}

function parseIgnProfileArticles(html, pageUrl) {
    const articles = [];
    const anchorMatches = html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi);

    for (const match of anchorMatches) {
        const attributes = parseHtmlAttributes(match[1]);
        const content = match[2];
        const href = attributes.href;

        if (!href || !isIgnArticleUrl(href, pageUrl)) {
            continue;
        }

        const title = extractFirstTagText(content, ['h2', 'h3']);
        const imageUrl = extractImageUrl(content);

        if (!title || !imageUrl) {
            continue;
        }

        articles.push({
            title,
            description: extractProfileDescription(content),
            imageUrl: absolutizeUrl(imageUrl, pageUrl),
            link: absolutizeUrl(href, pageUrl),
        });
    }

    return uniqueByLink(articles);
}

function getIgnProfileNextUrl(html, pageUrl) {
    const nextMatch = html.match(/<link\b[^>]*\brel=["']next["'][^>]*\bhref=["']([^"']+)["'][^>]*>/i);
    return nextMatch?.[1] ? absolutizeUrl(nextMatch[1], pageUrl) : '';
}

function isIgnArticleUrl(href, pageUrl) {
    const url = new URL(href, pageUrl);

    if (url.hostname !== new URL(ignBaseUrl).hostname) {
        return false;
    }

    return /\/\d+\/(?:article\/)?(?:feature|news|review|preview|video)\//i.test(url.pathname);
}

async function fetchArticleMetadata(profileArticle) {
    const html = await fetchText(profileArticle.link);
    const metas = parseMetaTags(html);
    const articleSchema = findNewsArticleSchema(html);

    if (!hasIgnAuthor(articleSchema, ignAuthorName)) {
        throw new Error(`Autorschaft von ${ignAuthorName} nicht bestaetigt: ${profileArticle.link}`);
    }

    const title = stripIgnSuffix(
        articleSchema?.headline || getMetaContent(metas, ['og:title', 'twitter:title', 'title']) || profileArticle.title,
    );
    const description =
        articleSchema?.description ||
        getMetaContent(metas, ['description', 'og:description', 'twitter:description']) ||
        profileArticle.description ||
        '';
    const imageUrl =
        getJsonLdImage(articleSchema) ||
        getMetaContent(metas, ['og:image', 'twitter:image']) ||
        profileArticle.imageUrl ||
        '';
    const date = formatArticleDate(
        articleSchema?.datePublished || getMetaContent(metas, ['article:published_time', 'date', 'datepublished']),
    );

    if (!title) {
        throw new Error(`Kein Titel gefunden: ${profileArticle.link}`);
    }

    if (!imageUrl) {
        throw new Error(`Kein Artikelbild gefunden: ${profileArticle.link}`);
    }

    if (!date) {
        throw new Error(`Kein Veroeffentlichungsdatum gefunden: ${profileArticle.link}`);
    }

    return {
        title,
        slug: '',
        id: 0,
        image: '',
        thumbnail: '',
        link: profileArticle.link,
        date,
        description: decodeHtmlEntities(description).trim(),
        authors: [defaultAuthorSlug],
        categories: buildCategories(title, description, metas, articleSchema),
        imageUrl: absolutizeUrl(imageUrl, ignBaseUrl),
    };
}

function hasIgnAuthor(articleSchema, authorName) {
    const authors = Array.isArray(articleSchema?.author) ? articleSchema.author : [articleSchema?.author];
    return authors.some(author => normalizeText(author?.name) === normalizeText(authorName));
}

function buildCategories(title, description, metas, articleSchema) {
    const metaTopics = [
        ...getMetaContents(metas, 'article:section'),
        ...getMetaContents(metas, 'article:tag'),
        articleSchema?.about?.name,
    ].filter(Boolean);
    const inferredCategories = inferCategories(`${title} ${description}`);

    return uniqueList([...metaTopics.map(mapCategory), ...inferredCategories].filter(Boolean)).slice(0, 5);
}

function inferCategories(value) {
    const normalized = normalizeText(value);
    const categories = [];

    if (/accessibilit|barrierefrei|bedienbarkeit|ux/.test(normalized)) {
        categories.push('UX');
    }

    if (/gaming|videospiel|spieler/.test(normalized)) {
        categories.push('gaming');
    }

    if (/\bki\b|kunstliche intelligenz|kuenstliche intelligenz|chatbot/.test(normalized)) {
        categories.push('KI');
    }

    if (/datenschutz|privacy/.test(normalized)) {
        categories.push('Privacy');
    }

    return categories;
}

function mapCategory(category) {
    const cleanCategory = decodeHtmlEntities(String(category ?? '')).trim();
    return categoryMap.get(normalizeText(cleanCategory)) ?? cleanCategory;
}

function findNewsArticleSchema(html) {
    const scripts = html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);

    for (const script of scripts) {
        try {
            const parsed = JSON.parse(decodeHtmlEntities(script[1]).trim());
            const candidates = flattenJsonLd(parsed);
            const article = candidates.find(item => {
                const types = Array.isArray(item?.['@type']) ? item['@type'] : [item?.['@type']];
                return types.includes('NewsArticle') || types.includes('Article');
            });

            if (article) {
                return article;
            }
        } catch {
            // Ignore malformed JSON-LD blocks from third party embeds.
        }
    }

    return null;
}

function flattenJsonLd(value) {
    if (Array.isArray(value)) {
        return value.flatMap(flattenJsonLd);
    }

    if (Array.isArray(value?.['@graph'])) {
        return value['@graph'];
    }

    return value ? [value] : [];
}

function getJsonLdImage(articleSchema) {
    if (typeof articleSchema?.image === 'string') {
        return articleSchema.image;
    }

    if (Array.isArray(articleSchema?.image)) {
        const image = articleSchema.image.find(item => typeof item === 'string') ?? articleSchema.image[0];
        return typeof image === 'string' ? image : image?.url ?? '';
    }

    return articleSchema?.image?.url ?? '';
}

function parseHtmlAttributes(value) {
    const attributes = {};
    const matches = value.matchAll(/([a-zA-Z_:.-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g);

    for (const match of matches) {
        attributes[match[1].toLowerCase()] = decodeHtmlEntities(match[2] ?? match[3] ?? '');
    }

    return attributes;
}

function extractFirstTagText(html, tags) {
    for (const tag of tags) {
        const match = html.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));

        if (match?.[1]) {
            return stripHtml(match[1]);
        }
    }

    return '';
}

function extractProfileDescription(html) {
    const deckMatch = html.match(/<h2\b[^>]*\bid=["']id_deck["'][^>]*>([\s\S]*?)<\/h2>/i);
    return deckMatch?.[1] ? stripHtml(deckMatch[1]) : '';
}

function extractImageUrl(html) {
    const imageMatch = html.match(/<img\b([^>]*)>/i);

    if (!imageMatch?.[1]) {
        return '';
    }

    return parseHtmlAttributes(imageMatch[1]).src ?? '';
}

function stripHtml(value) {
    return decodeHtmlEntities(String(value ?? '').replace(/<[^>]+>/g, ''))
        .replace(/\s+/g, ' ')
        .trim();
}

function parseMetaTags(html) {
    const tags = [];
    const matches = html.matchAll(/<meta\s+([^>]*?)>/gi);

    for (const match of matches) {
        tags.push(parseHtmlAttributes(match[1]));
    }

    return tags;
}

function getMetaContent(metas, names) {
    const normalizedNames = names.map(name => name.toLowerCase());
    const meta = metas.find(item => normalizedNames.includes(item.name) || normalizedNames.includes(item.property));
    return meta?.content ?? '';
}

function getMetaContents(metas, name) {
    const normalizedName = name.toLowerCase();
    return metas
        .filter(item => item.name === normalizedName || item.property === normalizedName)
        .map(item => item.content)
        .filter(Boolean);
}

function stripIgnSuffix(title) {
    return decodeHtmlEntities(title ?? '')
        .replace(/\s+-\s+IGN(?:\s+Deutschland)?\s*$/i, '')
        .replace(/\.$/, '')
        .trim();
}

function formatArticleDate(value) {
    if (!value) {
        return '';
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return '';
    }

    return new Intl.DateTimeFormat('en-CA', {
        day: '2-digit',
        month: '2-digit',
        timeZone: 'Europe/Vienna',
        year: 'numeric',
    }).format(date);
}

async function downloadAndConvertImages(imageUrl, slug) {
    await ensureCommand('cwebp');

    const articleImageDir = path.join(externalArticlesDir, slug);
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'ign-link-'));
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
            Referer: ignBaseUrl,
        },
    });

    if (!response.ok) {
        throw new Error(`Bild konnte nicht geladen werden (${response.status}): ${url}`);
    }

    await fs.writeFile(targetPath, Buffer.from(await response.arrayBuffer()));
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
    return sourceWidth ? Math.min(sourceWidth, maxWidth) : maxWidth;
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

async function writeIgnLinks(articles, currentContent) {
    await fs.writeFile(ignLinksPath, mergeLinkEntries(articles, currentContent), 'utf8');
}

function mergeLinkEntries(articles, currentContent) {
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

    return `${[...newEntries, ...currentEntries]
        .sort((a, b) => b.date.localeCompare(a.date) || a.index - b.index)
        .map(entry => entry.text)
        .join('\n')}\n`;
}

function splitYamlEntries(content) {
    const starts = [...content.matchAll(/^- title:/gm)].map(match => match.index);

    return starts.map((start, index) => {
        const end = starts[index + 1] ?? content.length;
        return content.slice(start, end).trimEnd();
    });
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
    return Math.max(-1, ...ids) + 1;
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
    return items.length ? `[${items.map(yamlQuote).join(', ')}]` : '[]';
}

function yamlQuote(value) {
    return `'${String(value).replaceAll("'", "''")}'`;
}

function slugify(value) {
    const replacements = new Map([
        ['Ä', 'Ae'],
        ['Ö', 'Oe'],
        ['Ü', 'Ue'],
        ['ß', 'ss'],
        ['ä', 'ae'],
        ['ö', 'oe'],
        ['ü', 'ue'],
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

function uniqueByLink(items) {
    return [...new Map(items.map(item => [item.link, item])).values()];
}

function uniqueList(items) {
    return [...new Set(items)];
}

function normalizeText(value) {
    return decodeHtmlEntities(String(value ?? ''))
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/ß/g, 'ss')
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

async function fetchText(url) {
    const response = await fetch(url, { headers: requestHeaders });

    if (!response.ok) {
        throw new Error(`Request fehlgeschlagen (${response.status}): ${url}`);
    }

    return response.text();
}

main().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
});
