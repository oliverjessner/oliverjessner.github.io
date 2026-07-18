import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import sharp from "sharp";

const outputDirectory = path.resolve("_site");
const imageTagPattern = /<img\b(?:(?:"[^"]*"|'[^']*'|[^'">])*)>/gim;
const responsiveMarkerPattern = /\sdata-responsive-image\s*=\s*(?:"article"|'article'|article)(?=\s|\/?>)/i;
const targetWidths = [480, 768, 1200, 1600];
const articleSizes =
    "(max-width: 575px) calc(100vw - 3.75rem), (max-width: 767px) 480px, (max-width: 991px) 660px, (max-width: 1359px) 610px, 730px";
const supportedExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"]);
const passthroughExtensions = new Set([".gif"]);

function collectHtmlFiles(directory) {
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const entryPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            return collectHtmlFiles(entryPath);
        }

        return entry.isFile() && entry.name.endsWith(".html") ? [entryPath] : [];
    });
}

function getAttribute(tag, attribute) {
    const match = tag.match(new RegExp(`\\s${attribute}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
    return match?.[1] ?? match?.[2] ?? match?.[3];
}

function hasAttribute(tag, attribute) {
    return new RegExp(`\\s${attribute}\\s*=`, "i").test(tag);
}

function addAttribute(tag, attribute, value) {
    return tag.replace(/^<img\b/i, `<img ${attribute}="${value}"`);
}

function removeResponsiveMarker(tag) {
    return tag.replace(responsiveMarkerPattern, "");
}

function resolveLocalImage(sourceUrl) {
    if (!sourceUrl || /^(?:data:|https?:|\/\/)/i.test(sourceUrl)) {
        return null;
    }

    const pathname = sourceUrl.split(/[?#]/, 1)[0];
    let decodedPathname;

    try {
        decodedPathname = decodeURIComponent(pathname);
    } catch {
        return null;
    }

    const relativePath = decodedPathname.replace(/^\/+/, "");
    const sourcePath = path.resolve(outputDirectory, relativePath);
    const relativeToOutput = path.relative(outputDirectory, sourcePath);

    if (relativeToOutput.startsWith("..") || path.isAbsolute(relativeToOutput)) {
        return null;
    }

    const extension = path.extname(sourcePath).toLowerCase();
    if (!supportedExtensions.has(extension)) {
        return null;
    }

    return { extension, pathname, sourcePath };
}

function responsiveVariant(source, width) {
    const urlExtension = path.extname(source.pathname);
    const urlStem = source.pathname.slice(0, -urlExtension.length);
    const fileStem = source.sourcePath.slice(0, -source.extension.length);

    return {
        filePath: `${fileStem}.responsive-${width}w${source.extension}`,
        url: `${urlStem}.responsive-${width}w${urlExtension}`,
        width,
    };
}

async function createResponsiveCandidates(sourceUrl) {
    const source = resolveLocalImage(sourceUrl);

    if (!source || !fs.existsSync(source.sourcePath)) {
        return null;
    }

    const metadata = await sharp(source.sourcePath).metadata();
    const originalWidth = metadata.width;

    if (!originalWidth) {
        return null;
    }

    if (passthroughExtensions.has(source.extension)) {
        return `${source.pathname} ${originalWidth}w`;
    }

    const resizeWidths = targetWidths.filter((width) => width < originalWidth);
    const candidates = resizeWidths.map((width) => responsiveVariant(source, width));

    if (originalWidth <= targetWidths.at(-1)) {
        candidates.push({ url: source.pathname, width: originalWidth });
    } else if (!resizeWidths.includes(targetWidths.at(-1))) {
        candidates.push(responsiveVariant(source, targetWidths.at(-1)));
    }

    for (const candidate of candidates) {
        if (!candidate.filePath || fs.existsSync(candidate.filePath)) {
            continue;
        }

        await sharp(source.sourcePath)
            .resize({ width: candidate.width, withoutEnlargement: true })
            .toFile(candidate.filePath);
    }

    return candidates
        .sort((left, right) => left.width - right.width)
        .map((candidate) => `${candidate.url} ${candidate.width}w`)
        .join(", ");
}

async function mapWithConcurrency(entries, concurrency, callback) {
    let cursor = 0;

    async function worker() {
        while (cursor < entries.length) {
            const index = cursor;
            cursor += 1;
            await callback(entries[index]);
        }
    }

    await Promise.all(Array.from({ length: Math.min(concurrency, entries.length) }, worker));
}

if (!fs.existsSync(outputDirectory)) {
    throw new Error(`Build output not found: ${outputDirectory}`);
}

const htmlFiles = collectHtmlFiles(outputDirectory);
const htmlByFile = new Map(htmlFiles.map((file) => [file, fs.readFileSync(file, "utf8")]));
const sourceUrls = new Set();

for (const html of htmlByFile.values()) {
    for (const tag of html.match(imageTagPattern) ?? []) {
        if (responsiveMarkerPattern.test(tag) && !hasAttribute(tag, "srcset")) {
            sourceUrls.add(getAttribute(tag, "src"));
        }
    }
}

sourceUrls.delete(undefined);

const srcsets = new Map();
const concurrency = Math.max(1, Math.min(4, os.availableParallelism()));

await mapWithConcurrency([...sourceUrls], concurrency, async (sourceUrl) => {
    const srcset = await createResponsiveCandidates(sourceUrl);
    if (srcset) {
        srcsets.set(sourceUrl, srcset);
    }
});

let responsiveImages = 0;
let skippedImages = 0;

for (const [htmlFile, html] of htmlByFile) {
    const output = html.replace(imageTagPattern, (tag) => {
        if (!responsiveMarkerPattern.test(tag)) {
            return tag;
        }

        const sourceUrl = getAttribute(tag, "src");
        const srcset = getAttribute(tag, "srcset") ?? srcsets.get(sourceUrl);
        let responsiveTag = tag;

        if (srcset && !hasAttribute(responsiveTag, "srcset")) {
            responsiveTag = addAttribute(responsiveTag, "srcset", srcset);
        }

        if (srcset && !hasAttribute(responsiveTag, "sizes")) {
            responsiveTag = addAttribute(responsiveTag, "sizes", articleSizes);
        }

        if (srcset) {
            responsiveImages += 1;
        } else {
            skippedImages += 1;
        }

        return removeResponsiveMarker(responsiveTag);
    });

    if (output !== html) {
        fs.writeFileSync(htmlFile, output);
    }
}

if (skippedImages > 0) {
    throw new Error(`${skippedImages} marked article images could not be made responsive.`);
}

console.log(
    `[responsive-images] ${responsiveImages} article images enhanced from ${srcsets.size} unique sources; 0 skipped.`,
);
