import fs from "node:fs";
import path from "node:path";

const outputDirectory = path.resolve("_site");
const imageTagPattern = /<img\b(?:(?:"[^"]*"|'[^']*'|[^'">])*)>/gim;

function collectHtmlFiles(directory) {
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const entryPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            return collectHtmlFiles(entryPath);
        }

        return entry.isFile() && entry.name.endsWith(".html") ? [entryPath] : [];
    });
}

function hasAttribute(tag, attribute) {
    return new RegExp(`\\s${attribute}\\s*=`, "i").test(tag);
}

function isHighPriority(tag) {
    return /\sfetchpriority\s*=\s*(?:"high"|'high'|high)(?=\s|\/?>)/i.test(tag);
}

function addLoadingStrategy(tag) {
    if (hasAttribute(tag, "loading")) {
        return tag;
    }

    const loading = isHighPriority(tag) ? "eager" : "lazy";
    const decoding = hasAttribute(tag, "decoding") ? "" : ' decoding="async"';

    return tag.replace(/^<img\b/i, `<img loading="${loading}"${decoding}`);
}

if (!fs.existsSync(outputDirectory)) {
    throw new Error(`Build output not found: ${outputDirectory}`);
}

const htmlFiles = collectHtmlFiles(outputDirectory);
let eagerImages = 0;
let lazyImages = 0;
let missingLoadingStrategy = 0;
let invalidLcpPriorityPairs = 0;
const pagesWithMultipleLcpImages = [];

for (const htmlFile of htmlFiles) {
    const source = fs.readFileSync(htmlFile, "utf8");
    const output = source.replace(imageTagPattern, addLoadingStrategy);

    if (output !== source) {
        fs.writeFileSync(htmlFile, output);
    }

    const imageTags = output.match(imageTagPattern) ?? [];
    let lcpImagesOnPage = 0;

    for (const tag of imageTags) {
        const loadsEagerly = /\sloading\s*=\s*(?:"eager"|'eager'|eager)(?=\s|\/?>)/i.test(tag);
        const hasHighPriority = isHighPriority(tag);

        if (loadsEagerly) {
            eagerImages += 1;
        } else if (/\sloading\s*=\s*(?:"lazy"|'lazy'|lazy)(?=\s|\/?>)/i.test(tag)) {
            lazyImages += 1;
        } else {
            missingLoadingStrategy += 1;
        }

        if (loadsEagerly !== hasHighPriority) {
            invalidLcpPriorityPairs += 1;
        }

        if (loadsEagerly && hasHighPriority) {
            lcpImagesOnPage += 1;
        }
    }

    if (lcpImagesOnPage > 1) {
        pagesWithMultipleLcpImages.push(path.relative(outputDirectory, htmlFile));
    }
}

if (missingLoadingStrategy > 0 || invalidLcpPriorityPairs > 0 || pagesWithMultipleLcpImages.length > 0) {
    throw new Error(
        [
            `${missingLoadingStrategy} images have no loading strategy`,
            `${invalidLcpPriorityPairs} images use eager loading and high priority inconsistently`,
            `${pagesWithMultipleLcpImages.length} pages define more than one LCP image`,
            ...pagesWithMultipleLcpImages.slice(0, 10).map((file) => `  - ${file}`),
        ].join("\n"),
    );
}

console.log(
    `[image-loading] ${htmlFiles.length} HTML files checked: ${lazyImages} lazy, ${eagerImages} LCP, 0 invalid.`,
);
