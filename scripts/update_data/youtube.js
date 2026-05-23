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

const youtubeVideosUrl = 'https://www.youtube.com/@oliverjessner/videos';
const youtubeBaseUrl = 'https://www.youtube.com';
const youtubeLongformPath = path.join(repoRoot, '_data', 'videos', 'youtube_longform.yml');
const externalVideoDir = path.join(repoRoot, 'assets', 'images', 'gen', 'external_video');

const forceImages = process.argv.includes('--force-images');
const refreshCategories = process.argv.includes('--refresh-categories');

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
        terms: [
            '8bitdo',
            'ayn',
            'controller',
            'gamecube',
            'gaming',
            'handheld',
            'kanto',
            'logitech',
            'nintendo',
            'playstation',
            'pokemon',
            'ps2',
            'razer',
            'switch',
            'wavebird',
        ],
    },
    {
        categories: ['nintendo'],
        terms: ['4ds', 'gamecube', 'gengar', 'kanto', 'nintendo', 'pokemon', 'switch', 'wavebird'],
    },
    {
        categories: ['DS'],
        terms: ['3ds', '4ds', 'nintendo ds'],
    },
    {
        categories: ['ps2'],
        terms: ['playstation 2', 'ps2'],
    },
    {
        categories: ['emulation'],
        terms: ['emulation', 'emulator'],
    },
    {
        categories: ['reviews'],
        terms: ['akkutest', 'haertetest', 'lohnt sich', 'review', 'test', 'unboxing'],
    },
    {
        categories: ['macos'],
        terms: ['homebrew', 'macos', 'mac os', 'mdfind', 'pbcopy', 'pmset', 'sips'],
    },
    {
        categories: ['terminal'],
        terms: ['bash', 'terminal', 'zsh'],
    },
    {
        categories: ['git'],
        terms: ['git', 'github'],
    },
    {
        categories: ['javascript'],
        terms: ['javascript', 'node.js', 'nodejs'],
    },
    {
        categories: ['css'],
        terms: ['css'],
    },
    {
        categories: ['web-development'],
        terms: ['frontend', 'html', 'web development', 'webentwicklung'],
    },
    {
        categories: ['software-development'],
        terms: ['coding', 'entwickler', 'programmieren', 'software', 'vibe coding'],
    },
    {
        categories: ['KI'],
        terms: ['agent', 'ai', 'chatgpt', 'copilot', 'gemini', 'ki', 'kuenstliche intelligenz'],
    },
    {
        categories: ['vibecoding'],
        terms: ['vibe coding', 'vibecoding'],
    },
    {
        categories: ['Social Media'],
        terms: ['content creator', 'instagram', 'social media', 'tiktok'],
    },
    {
        categories: ['UX'],
        terms: ['design', 'figma', 'ux', 'user experience'],
    },
    {
        categories: ['startups'],
        terms: ['saas', 'startup'],
    },
    {
        categories: ['vc'],
        terms: ['fundraising', 'venture capital', 'vc'],
    },
    {
        categories: ['Privacy'],
        terms: ['datenschutz', 'privacy', 'privatsphare', 'security', 'sicherheit'],
    },
    {
        categories: ['Gesellschaft'],
        terms: ['auto', 'bargeld', 'freiheit', 'gesellschaft', 'politik'],
    },
    {
        categories: ['Wirtschaft'],
        terms: ['bargeld', 'e-auto', 'wirtschaft'],
    },
    {
        categories: ['computer-stuff'],
        terms: [
            'dyson',
            'galaxy',
            'hardware',
            'kiyo',
            'logitech',
            'razer',
            'samsung',
            'staubsauger',
            'technik',
            'usb',
        ],
    },
];

async function main() {
    await fs.mkdir(path.dirname(youtubeLongformPath), { recursive: true });
    await fs.mkdir(externalVideoDir, { recursive: true });

    const currentContent = await readFileIfExists(youtubeLongformPath);
    const existingEntries = parseYamlEntries(currentContent);
    const existingByLink = new Map(existingEntries.filter(entry => entry.link).map(entry => [entry.link, entry]));

    console.log(`Quelle: ${youtubeVideosUrl}`);
    const channelVideos = await fetchChannelVideos();

    if (!channelVideos.length) {
        throw new Error('Keine Videos auf der YouTube-Videos-Seite gefunden.');
    }

    console.log(`Gefundene Videos: ${channelVideos.length}`);

    const usedSlugs = new Set(existingEntries.map(entry => entry.slug).filter(Boolean));
    const channelLinks = new Set(channelVideos.map(video => video.link));
    const remainingEntries = existingEntries.filter(entry => entry.link && !channelLinks.has(entry.link));
    const totalEntryCount = channelVideos.length + remainingEntries.length;

    const channelEntries = [];
    for (const [index, video] of channelVideos.entries()) {
        const existingEntry = existingByLink.get(video.link);
        const metadata = await fetchVideoMetadata(video);
        const id = totalEntryCount - 1 - index;
        const slug = getEntrySlug(existingEntry, metadata.title, id, usedSlugs);
        const image = `/assets/images/gen/external_video/${slug}/header.webp`;
        const thumbnail = `/assets/images/gen/external_video/${slug}/header_thumbnail.webp`;
        const categories =
            !refreshCategories && existingEntry?.categories?.length ? existingEntry.categories : inferCategories(metadata);

        await downloadAndConvertImages(metadata.thumbnailCandidates, slug);

        const entry = {
            title: existingEntry?.title || metadata.title,
            slug,
            image,
            thumbnail,
            id,
            link: video.link,
            categories,
            date: existingEntry?.date || metadata.date,
        };

        channelEntries.push(entry);
        console.log(`${index + 1}/${channelVideos.length}: ${entry.title}`);
    }

    const preliminaryEntries = [...channelEntries, ...remainingEntries];
    const finalEntries = preliminaryEntries.map((entry, index) => ({
        ...entry,
        id: preliminaryEntries.length - 1 - index,
    }));
    const nextContent = finalEntries.map(formatYamlEntry).join('');

    await fs.writeFile(youtubeLongformPath, nextContent, 'utf8');

    console.log(`Eingetragen: ${path.relative(repoRoot, youtubeLongformPath)}`);
    console.log(`Bilder: ${path.relative(repoRoot, externalVideoDir)}/`);
}

async function fetchChannelVideos() {
    const html = await fetchText(youtubeVideosUrl);
    const initialData = JSON.parse(extractJsonAfter(html, 'ytInitialData'));
    const videos = [];

    walkObject(initialData, value => {
        if (value?.videoRenderer) {
            const video = buildVideoFromRenderer(value.videoRenderer);
            if (video) {
                videos.push(video);
            }
        }

        if (value?.lockupViewModel) {
            const video = buildVideoFromLockup(value.lockupViewModel);
            if (video) {
                videos.push(video);
            }
        }
    });

    return uniqueVideos(videos);
}

function buildVideoFromRenderer(renderer) {
    const videoId = renderer.videoId;
    const title = getText(renderer.title);

    if (!videoId || !title) {
        return null;
    }

    return buildVideo(videoId, title);
}

function buildVideoFromLockup(lockup) {
    const videoId = findVideoId(lockup);
    const title = lockup.metadata?.lockupMetadataViewModel?.title?.content?.trim();

    if (!videoId || !title) {
        return null;
    }

    return buildVideo(videoId, title);
}

function buildVideo(videoId, title) {
    return {
        videoId,
        title: decodeHtmlEntities(title).trim(),
        link: `${youtubeBaseUrl}/watch?v=${videoId}`,
    };
}

async function fetchVideoMetadata(video) {
    const html = await fetchText(video.link);
    const metas = parseMetaTags(html);
    const title = getMetaContent(metas, ['og:title', 'twitter:title', 'title']) || video.title;
    const date =
        formatVideoDate(getMetaContent(metas, ['datePublished', 'uploadDate'])) ||
        formatVideoDate(html.match(/"publishDate":"([^"]+)"/)?.[1]) ||
        formatVideoDate(html.match(/"uploadDate":"([^"]+)"/)?.[1]);
    const description = getMetaContent(metas, ['description', 'og:description', 'twitter:description']);
    const keywords = getMetaContent(metas, ['keywords'])
        .split(',')
        .map(keyword => keyword.trim())
        .filter(Boolean);
    const thumbnailUrl = getMetaContent(metas, ['og:image', 'twitter:image']);

    if (!title) {
        throw new Error(`Kein Titel fuer YouTube-Video gefunden: ${video.link}`);
    }

    if (!date) {
        throw new Error(`Kein Publikationsdatum fuer YouTube-Video gefunden: ${video.link}`);
    }

    return {
        ...video,
        title: decodeHtmlEntities(title).trim(),
        date,
        description: decodeHtmlEntities(description).trim(),
        keywords,
        thumbnailCandidates: buildThumbnailCandidates(video.videoId, thumbnailUrl),
    };
}

function buildThumbnailCandidates(videoId, metaThumbnailUrl) {
    return uniqueList(
        [
            metaThumbnailUrl,
            `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
            `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`,
            `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        ].filter(Boolean),
    );
}

async function downloadAndConvertImages(thumbnailCandidates, slug) {
    const targetDir = path.join(externalVideoDir, slug);
    const headerPath = path.join(targetDir, 'header.webp');
    const thumbnailPath = path.join(targetDir, 'header_thumbnail.webp');

    if (!forceImages && (await fileExists(headerPath)) && (await fileExists(thumbnailPath))) {
        return;
    }

    await ensureCommand('cwebp');

    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'youtube-video-'));
    const sourcePath = path.join(tmpDir, 'source.img');

    try {
        await fs.mkdir(targetDir, { recursive: true });
        await downloadFirstAvailableImage(thumbnailCandidates, sourcePath);

        const sourceWidth = await getImageWidth(sourcePath);
        await convertToWebp(sourcePath, headerPath, targetWidth(sourceWidth, 1200));
        await convertToWebp(sourcePath, thumbnailPath, targetWidth(sourceWidth, 500));
    } finally {
        await fs.rm(tmpDir, { force: true, recursive: true });
    }
}

async function downloadFirstAvailableImage(urls, targetPath) {
    const failures = [];

    for (const url of urls) {
        try {
            const response = await fetch(url, { headers: imageHeaders });

            if (!response.ok) {
                failures.push(`${response.status} ${url}`);
                continue;
            }

            const contentType = response.headers.get('content-type') ?? '';
            if (!contentType.startsWith('image/')) {
                failures.push(`${contentType || 'unknown content type'} ${url}`);
                continue;
            }

            const buffer = Buffer.from(await response.arrayBuffer());
            await fs.writeFile(targetPath, buffer);
            return;
        } catch (error) {
            failures.push(`${error.message} ${url}`);
        }
    }

    throw new Error(`Kein YouTube-Thumbnail konnte geladen werden: ${failures.join('; ')}`);
}

async function convertToWebp(sourcePath, targetPath, width) {
    await execFileAsync('cwebp', ['-quiet', '-q', '82', '-resize', String(width), '0', sourcePath, '-o', targetPath]);
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

async function ensureCommand(command) {
    try {
        await execFileAsync('which', [command]);
    } catch {
        throw new Error(`Benoetigtes Kommando nicht gefunden: ${command}`);
    }
}

function getEntrySlug(existingEntry, title, id, usedSlugs) {
    if (existingEntry?.slug) {
        usedSlugs.delete(existingEntry.slug);
        const slug = makeUniqueSlug(existingEntry.slug, usedSlugs, id);
        usedSlugs.add(slug);
        return slug;
    }

    const slug = makeUniqueSlug(slugify(title), usedSlugs, id);
    usedSlugs.add(slug);
    return slug;
}

function makeUniqueSlug(slug, usedSlugs, id) {
    if (!usedSlugs.has(slug)) {
        return slug;
    }

    return `${slug}_${id}`;
}

function inferCategories(metadata) {
    const haystack = normalizeSearchText([metadata.title, ...metadata.keywords].join(' '));
    const categories = [];

    for (const rule of categoryRules) {
        if (rule.terms.some(term => termMatches(haystack, term))) {
            categories.push(...rule.categories);
        }
    }

    if (!categories.length) {
        categories.push('computer-stuff');
    }

    if (!categories.includes('computer-stuff') && categories.length < 3) {
        categories.push('computer-stuff');
    }

    return uniqueList(categories).slice(0, 5);
}

function termMatches(haystack, term) {
    const normalizedTerm = normalizeSearchText(term);

    if (!normalizedTerm) {
        return false;
    }

    const escapedTerm = escapeRegExp(normalizedTerm).replace(/\s+/g, '\\s+');
    return new RegExp(`(^|[^a-z0-9])${escapedTerm}([^a-z0-9]|$)`).test(haystack);
}

function escapeRegExp(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function parseYamlEntries(content) {
    return content
        .split(/(?=^- title:\s*)/gm)
        .map(block => block.trim())
        .filter(Boolean)
        .map(parseYamlEntry);
}

function parseYamlEntry(block) {
    const entry = {};

    for (const line of block.split('\n')) {
        const match = line.match(/^\s*([a-zA-Z_][\w-]*):\s*(.*)$/);
        if (!match) {
            continue;
        }

        const [, key, rawValue] = match;
        entry[key] = parseYamlValue(rawValue.trim());
    }

    if (entry.id !== undefined) {
        entry.id = Number(entry.id);
    }

    if (!Array.isArray(entry.categories)) {
        entry.categories = [];
    }

    return entry;
}

function parseYamlValue(value) {
    if (value.startsWith('[') && value.endsWith(']')) {
        return parseYamlArray(value);
    }

    if (/^\d+$/.test(value)) {
        return Number(value);
    }

    return unquoteYaml(value);
}

function parseYamlArray(value) {
    const inner = value.slice(1, -1).trim();

    if (!inner) {
        return [];
    }

    const items = [];
    let current = '';
    let quote = '';

    for (let index = 0; index < inner.length; index += 1) {
        const char = inner[index];
        const nextChar = inner[index + 1];

        if (quote) {
            current += char;
            if (char === quote && nextChar === quote) {
                current += nextChar;
                index += 1;
                continue;
            }
            if (char === quote) {
                quote = '';
            }
            continue;
        }

        if (char === "'" || char === '"') {
            quote = char;
            current += char;
            continue;
        }

        if (char === ',') {
            items.push(unquoteYaml(current.trim()));
            current = '';
            continue;
        }

        current += char;
    }

    if (current.trim()) {
        items.push(unquoteYaml(current.trim()));
    }

    return items;
}

function formatYamlEntry(entry) {
    return [
        `- title: ${yamlQuote(entry.title)}`,
        `  slug: ${yamlQuote(entry.slug)}`,
        `  image: ${yamlQuote(entry.image)}`,
        `  thumbnail: ${yamlQuote(entry.thumbnail)}`,
        `  id: ${entry.id}`,
        `  link: ${yamlQuote(entry.link)}`,
        `  categories: ${formatYamlArray(entry.categories)}`,
        `  date: ${yamlQuote(entry.date)}`,
        '',
    ].join('\n');
}

function formatYamlArray(items) {
    if (!items.length) {
        return '[]';
    }

    return `[${items.map(yamlQuote).join(', ')}]`;
}

function yamlQuote(value) {
    return `'${String(value ?? '').replaceAll("'", "''")}'`;
}

function unquoteYaml(value) {
    if (!value) {
        return '';
    }

    if (value.startsWith("'") && value.endsWith("'")) {
        return value.slice(1, -1).replaceAll("''", "'");
    }

    if (value.startsWith('"') && value.endsWith('"')) {
        return value.slice(1, -1).replaceAll('\\"', '"');
    }

    return value;
}

function findVideoId(value) {
    return findFirstMatchingValue(value, item => {
        if (item?.watchEndpoint?.videoId) {
            return item.watchEndpoint.videoId;
        }

        if (item?.commandMetadata?.webCommandMetadata?.url) {
            return getVideoIdFromUrl(item.commandMetadata.webCommandMetadata.url);
        }

        if (typeof item === 'string') {
            return getVideoIdFromUrl(item) || item.match(/\/vi\/([a-zA-Z0-9_-]{11})\//)?.[1];
        }

        return '';
    });
}

function getVideoIdFromUrl(value) {
    const match = String(value).match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    return match?.[1] ?? '';
}

function findFirstMatchingValue(value, picker) {
    const picked = picker(value);
    if (picked) {
        return picked;
    }

    if (!value || typeof value !== 'object') {
        return '';
    }

    for (const child of Object.values(value)) {
        const childValue = findFirstMatchingValue(child, picker);
        if (childValue) {
            return childValue;
        }
    }

    return '';
}

function walkObject(value, visitor) {
    if (!value || typeof value !== 'object') {
        return;
    }

    visitor(value);

    for (const child of Object.values(value)) {
        walkObject(child, visitor);
    }
}

function uniqueVideos(videos) {
    const seen = new Set();
    const unique = [];

    for (const video of videos) {
        if (seen.has(video.videoId)) {
            continue;
        }

        seen.add(video.videoId);
        unique.push(video);
    }

    return unique;
}

function uniqueList(items) {
    return [...new Set(items.filter(Boolean))];
}

function getText(value) {
    if (!value) {
        return '';
    }

    if (typeof value.simpleText === 'string') {
        return value.simpleText;
    }

    if (Array.isArray(value.runs)) {
        return value.runs.map(run => run.text).join('');
    }

    if (typeof value.content === 'string') {
        return value.content;
    }

    return '';
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
    const meta = metas.find(item => {
        const name = item.name?.toLowerCase();
        const property = item.property?.toLowerCase();
        const itemprop = item.itemprop?.toLowerCase();

        return normalizedNames.includes(name) || normalizedNames.includes(property) || normalizedNames.includes(itemprop);
    });

    return meta?.content ?? '';
}

function extractJsonAfter(html, marker) {
    const markerIndex = html.indexOf(marker);

    if (markerIndex < 0) {
        throw new Error(`YouTube-Datenblock nicht gefunden: ${marker}`);
    }

    const startIndex = html.indexOf('{', markerIndex + marker.length);
    if (startIndex < 0) {
        throw new Error(`YouTube-Datenblock hat keinen JSON-Start: ${marker}`);
    }

    let depth = 0;
    let inString = false;
    let escaping = false;

    for (let index = startIndex; index < html.length; index += 1) {
        const char = html[index];

        if (inString) {
            if (escaping) {
                escaping = false;
            } else if (char === '\\') {
                escaping = true;
            } else if (char === '"') {
                inString = false;
            }
            continue;
        }

        if (char === '"') {
            inString = true;
            continue;
        }

        if (char === '{') {
            depth += 1;
        } else if (char === '}') {
            depth -= 1;

            if (depth === 0) {
                return html.slice(startIndex, index + 1);
            }
        }
    }

    throw new Error(`YouTube-Datenblock ist unvollstaendig: ${marker}`);
}

function formatVideoDate(value) {
    if (!value) {
        return '';
    }

    const stringValue = String(value);
    const isoDate = stringValue.match(/^(\d{4}-\d{2}-\d{2})/)?.[1];
    if (isoDate) {
        return isoDate;
    }

    const date = new Date(stringValue);
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

function normalizeSearchText(value) {
    return String(value ?? '')
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
        .replace(/&nbsp;/g, ' ')
        .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
        .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(Number.parseInt(code, 16)));
}

async function fetchText(url) {
    const response = await fetch(url, { headers: requestHeaders });

    if (!response.ok) {
        throw new Error(`Request fehlgeschlagen (${response.status}): ${url}`);
    }

    return response.text();
}

async function readFileIfExists(filePath) {
    try {
        return await fs.readFile(filePath, 'utf8');
    } catch (error) {
        if (error.code === 'ENOENT') {
            return '';
        }

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
