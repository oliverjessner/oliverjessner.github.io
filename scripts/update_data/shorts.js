import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..', '..');

const youtubeShortsUrl = 'https://www.youtube.com/@oliverjessner/shorts';
const youtubeBaseUrl = 'https://www.youtube.com';
const youtubeShortformPath = path.join(repoRoot, '_data', 'videos', 'youtube_shortform.json');
const externalShortDir = path.join(repoRoot, 'assets', 'images', 'gen', 'external_short');

// Absichtlich fest: Der erste Lauf soll nur Shorts ab dem 14.09.2026 laden.
// Bei späteren Läufen werden dadurch auch dann alle neuen Shorts nachgeholt,
// wenn das Skript nicht jeden Tag ausgeführt wurde.
const defaultStartDate = '2026-09-14';
const sinceArgument = process.argv.find(argument => argument.startsWith('--since='));
const startDate = sinceArgument?.slice('--since='.length) || process.env.SHORTS_START_DATE || defaultStartDate;
const forceImages = process.argv.includes('--force-images');
const dryRun = process.argv.includes('--dry-run');

const requestHeaders = {
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,application/json;q=0.8,*/*;q=0.7',
    'Accept-Language': 'de-DE,de;q=0.9,en;q=0.8',
    'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
};

const imageHeaders = {
    Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
    Referer: youtubeBaseUrl,
    'User-Agent': requestHeaders['User-Agent'],
};

const categoryRules = [
    {
        categories: ['gaming'],
        terms: ['8bitdo', 'ayn', 'controller', 'gamecube', 'gaming', 'handheld', 'nintendo', 'playstation', 'pokemon', 'ps2', 'razer', 'switch', 'xbox'],
    },
    { categories: ['nintendo'], terms: ['3ds', '4ds', 'gamecube', 'nintendo', 'pokemon', 'switch'] },
    { categories: ['DS'], terms: ['3ds', '4ds', 'nintendo ds'] },
    { categories: ['ps2'], terms: ['playstation 2', 'ps2'] },
    { categories: ['emulation'], terms: ['emulation', 'emulator', 'recomp'] },
    { categories: ['reviews'], terms: ['akkutest', 'haertetest', 'lohnt sich', 'review', 'test', 'unboxing'] },
    { categories: ['macos'], terms: ['homebrew', 'macos', 'mac os', 'mdfind', 'pbcopy', 'pmset', 'sips'] },
    { categories: ['terminal'], terms: ['bash', 'terminal', 'zsh'] },
    { categories: ['git'], terms: ['git', 'github'] },
    { categories: ['javascript'], terms: ['javascript', 'node.js', 'nodejs'] },
    { categories: ['css'], terms: ['css'] },
    { categories: ['web-development'], terms: ['frontend', 'html', 'web development', 'webentwicklung'] },
    { categories: ['software-development'], terms: ['coding', 'entwickler', 'programmieren', 'software', 'vibe coding'] },
    { categories: ['KI'], terms: ['agent', 'ai', 'chatgpt', 'copilot', 'gemini', 'ki', 'kuenstliche intelligenz'] },
    { categories: ['vibecoding'], terms: ['vibe coding', 'vibecoding'] },
    { categories: ['Social Media'], terms: ['content creator', 'instagram', 'social media', 'tiktok'] },
    { categories: ['UX'], terms: ['design', 'figma', 'ux', 'user experience'] },
    { categories: ['Startups'], terms: ['saas', 'startup'] },
    { categories: ['vc'], terms: ['fundraising', 'venture capital', 'vc'] },
    { categories: ['Privacy'], terms: ['datenschutz', 'privacy', 'privatsphare', 'security', 'sicherheit'] },
    { categories: ['Gesellschaft'], terms: ['auto', 'bargeld', 'freiheit', 'gesellschaft', 'politik'] },
    { categories: ['Wirtschaft'], terms: ['aktie', 'bargeld', 'e-auto', 'wirtschaft'] },
    { categories: ['computer-stuff'], terms: ['dyson', 'galaxy', 'hardware', 'logitech', 'razer', 'samsung', 'technik', 'usb'] },
];

async function main() {
    validateDate(startDate);
    await fs.mkdir(path.dirname(youtubeShortformPath), { recursive: true });
    await fs.mkdir(externalShortDir, { recursive: true });

    const existingContent = await readFileIfExists(youtubeShortformPath);
    const existingEntries = existingContent ? JSON.parse(existingContent) : [];
    if (!Array.isArray(existingEntries)) {
        throw new Error(`${path.relative(repoRoot, youtubeShortformPath)} muss ein JSON-Array enthalten.`);
    }

    const existingVideoIds = new Set(existingEntries.map(entry => getVideoIdFromUrl(entry.link)).filter(Boolean));
    const usedSlugs = new Set(existingEntries.map(entry => entry.slug).filter(Boolean));
    const channelShorts = await fetchChannelShorts();
    const unseenShorts = channelShorts.filter(short => !existingVideoIds.has(short.videoId));

    console.log(`Quelle: ${youtubeShortsUrl}`);
    console.log(`Startdatum: ${startDate}`);
    console.log(`Shorts auf der Kanalseite: ${channelShorts.length}; unbekannt: ${unseenShorts.length}`);

    const eligible = [];
    for (const [index, short] of unseenShorts.entries()) {
        const metadata = await fetchVideoMetadata(short);
        if (metadata.date < startDate) {
            console.log(`Uebersprungen (${metadata.date}): ${metadata.title}`);
            // Der Shorts-Tab ist absteigend nach Veroeffentlichung sortiert.
            // Nach dem ersten zu alten Eintrag koennen wir den Backfill beenden.
            break;
        }
        eligible.push({ ...metadata, channelOrder: index });
    }

    eligible.sort((left, right) => right.date.localeCompare(left.date) || left.channelOrder - right.channelOrder);

    let nextId = Math.max(-1, ...existingEntries.map(entry => Number(entry.id)).filter(Number.isFinite)) + 1;
    const newEntriesOldestFirst = [];
    for (const metadata of [...eligible].reverse()) {
        const slug = makeUniqueSlug(slugify(metadata.title), usedSlugs, nextId);
        usedSlugs.add(slug);
        const categories = inferCategories(metadata);
        const entry = {
            title: metadata.title,
            slug,
            related_topics: inferRelatedTopics(metadata, categories),
            image: `/assets/images/gen/external_short/${slug}/header.webp`,
            thumbnail: `/assets/images/gen/external_short/${slug}/header_thumbnail.webp`,
            id: nextId,
            link: `${youtubeBaseUrl}/watch?v=${metadata.videoId}`,
            categories,
            date: metadata.date,
            platform: 'youtube',
        };

        if (!dryRun) {
            await downloadAndConvertImages(metadata.thumbnailCandidates, slug);
        }

        newEntriesOldestFirst.push(entry);
        nextId += 1;
    }

    const newEntries = newEntriesOldestFirst.reverse();
    if (!newEntries.length) {
        console.log('Keine neuen Shorts seit dem Startdatum gefunden. JSON bleibt unveraendert.');
        return;
    }

    if (dryRun) {
        console.log(JSON.stringify(newEntries, null, 4));
        console.log(`Dry Run: ${newEntries.length} neue Shorts, keine Dateien geaendert.`);
        return;
    }

    const nextContent = `${JSON.stringify([...newEntries, ...existingEntries], null, 4)}\n`;
    const temporaryPath = `${youtubeShortformPath}.tmp`;
    await fs.writeFile(temporaryPath, nextContent, 'utf8');
    await fs.rename(temporaryPath, youtubeShortformPath);

    console.log(`Neu eingetragen: ${newEntries.length}`);
    console.log(`Gespeichert: ${path.relative(repoRoot, youtubeShortformPath)}`);
    console.log(`Bilder: ${path.relative(repoRoot, externalShortDir)}/`);
}

async function fetchChannelShorts() {
    const html = await fetchText(youtubeShortsUrl);
    const initialData = JSON.parse(extractJsonAfter(html, 'ytInitialData'));
    const shorts = [];

    walkObject(initialData, value => {
        const renderer = value?.reelItemRenderer || value?.shortsLockupViewModel || value?.lockupViewModel || value?.videoRenderer;
        if (!renderer) return;
        const videoId = findVideoId(renderer);
        if (!videoId) return;
        shorts.push({ videoId, title: findRendererTitle(renderer) || videoId });
    });

    return uniqueVideos(shorts);
}

function findRendererTitle(renderer) {
    const values = [
        getText(renderer.headline),
        getText(renderer.title),
        renderer.overlayMetadata?.primaryText?.content,
        renderer.metadata?.lockupMetadataViewModel?.title?.content,
        renderer.accessibilityText,
    ];
    return decodeHtmlEntities(values.find(Boolean) || '').replace(/\s+-\s+play Short.*$/i, '').trim();
}

async function fetchVideoMetadata(short) {
    const link = `${youtubeBaseUrl}/watch?v=${short.videoId}`;
    const html = await fetchText(link);
    const metas = parseMetaTags(html);
    const title = getMetaContent(metas, ['og:title', 'twitter:title', 'title']) || short.title;
    const date =
        formatVideoDate(getMetaContent(metas, ['datePublished', 'uploadDate'])) ||
        formatVideoDate(html.match(/"publishDate":"([^"]+)"/)?.[1]) ||
        formatVideoDate(html.match(/"uploadDate":"([^"]+)"/)?.[1]);
    const description = getMetaContent(metas, ['description', 'og:description', 'twitter:description']);
    const keywords = getMetaContent(metas, ['keywords']).split(',').map(value => value.trim()).filter(Boolean);
    const thumbnailUrl = getMetaContent(metas, ['og:image', 'twitter:image']);

    if (!title || !date) {
        throw new Error(`Unvollstaendige Metadaten fuer YouTube-Short: ${link}`);
    }

    return {
        videoId: short.videoId,
        title: decodeHtmlEntities(title).replace(/\s+-\s+YouTube$/i, '').trim(),
        date,
        description: decodeHtmlEntities(description),
        keywords,
        thumbnailCandidates: uniqueList([
            thumbnailUrl,
            `https://i.ytimg.com/vi/${short.videoId}/maxresdefault.jpg`,
            `https://i.ytimg.com/vi/${short.videoId}/sddefault.jpg`,
            `https://i.ytimg.com/vi/${short.videoId}/hqdefault.jpg`,
        ]),
    };
}

async function downloadAndConvertImages(urls, slug) {
    const targetDir = path.join(externalShortDir, slug);
    const headerPath = path.join(targetDir, 'header.webp');
    const thumbnailPath = path.join(targetDir, 'header_thumbnail.webp');

    if (!forceImages && (await fileExists(headerPath)) && (await fileExists(thumbnailPath))) return;

    const source = await downloadFirstAvailableImage(urls);
    await fs.mkdir(targetDir, { recursive: true });
    await sharp(source).resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 82 }).toFile(headerPath);
    await sharp(source).resize({ width: 500, withoutEnlargement: true }).webp({ quality: 82 }).toFile(thumbnailPath);
}

async function downloadFirstAvailableImage(urls) {
    const failures = [];
    for (const url of urls) {
        try {
            const response = await fetch(url, { headers: imageHeaders });
            const contentType = response.headers.get('content-type') || '';
            if (!response.ok || !contentType.startsWith('image/')) {
                failures.push(`${response.status} ${url}`);
                continue;
            }
            return Buffer.from(await response.arrayBuffer());
        } catch (error) {
            failures.push(`${error.message} ${url}`);
        }
    }
    throw new Error(`Kein YouTube-Thumbnail konnte geladen werden: ${failures.join('; ')}`);
}

function inferCategories(metadata) {
    const titleAndDescription = normalizeSearchText([metadata.title, metadata.description].join(' '));
    const fullMetadata = normalizeSearchText([metadata.title, metadata.description, ...metadata.keywords].join(' '));
    const categories = [];
    for (const rule of categoryRules) {
        const haystack = rule.categories.includes('Social Media') ? titleAndDescription : fullMetadata;
        if (rule.terms.some(term => termMatches(haystack, term))) categories.push(...rule.categories);
    }
    if (!categories.length) categories.push('computer-stuff');
    if (!categories.includes('computer-stuff') && categories.length < 3) categories.push('computer-stuff');
    return uniqueList(categories).slice(0, 5);
}

function inferRelatedTopics(metadata, categories) {
    const titleAndDescription = normalizeSearchText([metadata.title, metadata.description].join(' '));
    const fullMetadata = normalizeSearchText([metadata.title, metadata.description, ...metadata.keywords].join(' '));
    const matchedTerms = categoryRules.flatMap(rule => {
        const haystack = rule.categories.includes('Social Media') ? titleAndDescription : fullMetadata;
        return rule.terms.filter(term => termMatches(haystack, term));
    });
    return uniqueList([...matchedTerms, ...categories]).slice(0, 8);
}

function termMatches(haystack, term) {
    const normalizedTerm = normalizeSearchText(term);
    const escaped = escapeRegExp(normalizedTerm).replace(/\s+/g, '\\s+');
    return new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`).test(haystack);
}

function findVideoId(value) {
    return findFirstMatchingValue(value, item => {
        if (item?.reelWatchEndpoint?.videoId) return item.reelWatchEndpoint.videoId;
        if (item?.watchEndpoint?.videoId) return item.watchEndpoint.videoId;
        if (item?.videoId && /^[a-zA-Z0-9_-]{11}$/.test(item.videoId)) return item.videoId;
        if (item?.commandMetadata?.webCommandMetadata?.url) return getVideoIdFromUrl(item.commandMetadata.webCommandMetadata.url);
        if (typeof item === 'string') return getVideoIdFromUrl(item);
        return '';
    });
}

function getVideoIdFromUrl(value) {
    return String(value || '').match(/(?:[?&]v=|\/shorts\/)([a-zA-Z0-9_-]{11})/)?.[1] || '';
}

function findFirstMatchingValue(value, picker) {
    const picked = picker(value);
    if (picked) return picked;
    if (!value || typeof value !== 'object') return '';
    for (const child of Object.values(value)) {
        const found = findFirstMatchingValue(child, picker);
        if (found) return found;
    }
    return '';
}

function walkObject(value, visitor) {
    if (!value || typeof value !== 'object') return;
    visitor(value);
    for (const child of Object.values(value)) walkObject(child, visitor);
}

function uniqueVideos(videos) {
    const seen = new Set();
    return videos.filter(video => {
        if (seen.has(video.videoId)) return false;
        seen.add(video.videoId);
        return true;
    });
}

function getText(value) {
    if (!value) return '';
    if (typeof value.simpleText === 'string') return value.simpleText;
    if (Array.isArray(value.runs)) return value.runs.map(run => run.text).join('');
    if (typeof value.content === 'string') return value.content;
    return '';
}

function parseMetaTags(html) {
    const tags = [];
    for (const match of html.matchAll(/<meta\s+([^>]*?)>/gi)) {
        const attrs = {};
        for (const attribute of match[1].matchAll(/([a-zA-Z_:.-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) {
            attrs[attribute[1].toLowerCase()] = decodeHtmlEntities(attribute[2] ?? attribute[3] ?? '');
        }
        tags.push(attrs);
    }
    return tags;
}

function getMetaContent(metas, names) {
    const wanted = names.map(name => name.toLowerCase());
    const meta = metas.find(item => wanted.includes(item.name?.toLowerCase()) || wanted.includes(item.property?.toLowerCase()) || wanted.includes(item.itemprop?.toLowerCase()));
    return meta?.content || '';
}

function extractJsonAfter(html, marker) {
    const markerIndex = html.indexOf(marker);
    if (markerIndex < 0) throw new Error(`YouTube-Datenblock nicht gefunden: ${marker}`);
    const startIndex = html.indexOf('{', markerIndex + marker.length);
    if (startIndex < 0) throw new Error(`YouTube-Datenblock hat keinen JSON-Start: ${marker}`);

    let depth = 0;
    let inString = false;
    let escaping = false;
    for (let index = startIndex; index < html.length; index += 1) {
        const char = html[index];
        if (inString) {
            if (escaping) escaping = false;
            else if (char === '\\') escaping = true;
            else if (char === '"') inString = false;
            continue;
        }
        if (char === '"') inString = true;
        else if (char === '{') depth += 1;
        else if (char === '}' && --depth === 0) return html.slice(startIndex, index + 1);
    }
    throw new Error(`YouTube-Datenblock ist unvollstaendig: ${marker}`);
}

function formatVideoDate(value) {
    if (!value) return '';
    const isoDate = String(value).match(/^(\d{4}-\d{2}-\d{2})/)?.[1];
    if (isoDate) return isoDate;
    const date = new Date(value);
    if (Number.isNaN(date.valueOf())) return '';
    return new Intl.DateTimeFormat('en-CA', { day: '2-digit', month: '2-digit', timeZone: 'Europe/Vienna', year: 'numeric' }).format(date);
}

function validateDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(new Date(`${value}T00:00:00Z`).valueOf())) {
        throw new Error(`Ungueltiges Startdatum: ${value}. Erwartet wird YYYY-MM-DD.`);
    }
}

function makeUniqueSlug(slug, usedSlugs, id) {
    const base = slug || `youtube_short_${id}`;
    return usedSlugs.has(base) ? `${base}_${id}` : base;
}

function slugify(value) {
    const replacements = new Map([['Ä', 'Ae'], ['Ö', 'Oe'], ['Ü', 'Ue'], ['ß', 'ss'], ['ä', 'ae'], ['ö', 'oe'], ['ü', 'ue']]);
    return [...String(value)].map(char => replacements.get(char) || char).join('').normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_+|_+$/g, '').replace(/_+/g, '_').toLowerCase();
}

function normalizeSearchText(value) {
    return String(value || '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/ß/g, 'ss').replace(/\s+/g, ' ').trim().toLowerCase();
}

function decodeHtmlEntities(value) {
    return String(value || '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
        .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
        .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
        .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)));
}

function escapeRegExp(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function uniqueList(items) {
    return [...new Set(items.filter(Boolean))];
}

async function fetchText(url) {
    const response = await fetch(url, { headers: requestHeaders });
    if (!response.ok) throw new Error(`Request fehlgeschlagen (${response.status}): ${url}`);
    return response.text();
}

async function readFileIfExists(filePath) {
    try {
        return await fs.readFile(filePath, 'utf8');
    } catch (error) {
        if (error.code === 'ENOENT') return '';
        throw error;
    }
}

async function fileExists(filePath) {
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
