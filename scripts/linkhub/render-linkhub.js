import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import generateData from './generate_linkhub-data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// regenerate data to ensure it's up to date
const data = generateData();

const layoutPath = path.join(__dirname, '..', '..', '_layouts', 'linkhub.html');
let layoutFile = fs.readFileSync(layoutPath, 'utf8');
const sections = Object.entries(data || {}).map(function ([key, section]) {
    return {
        id: keyToSectionId(key),
        section,
    };
});

function renderCard(link) {
    const style = link.noBorderRadius ? ' style="border-radius: unset;"' : '';
    const alt = escapeHtml(link.title);
    const img = `<img src="/assets/images/linkhub/${link.imgSrc}" alt="${alt}"${style}>`;
    const title = `<p class="category">${escapeHtml(link.title)}</p>`;
    const arrow = link.iframe ? '<div class="placeholder arrow" aria-hidden="true">&darr;</div>' : '';
    const a = `<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${img}${title}${arrow}</a>`;
    const vid = `${a} <iframe class="hover-expand" width="560" height="315" src="${link.iframe}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    const elem = link.iframe ? vid : a;
    const showOnlyOnData = link.showOnlyOn || 'always';
    const hideClass = showOnlyOnData === 'always' ? '' : ' style="display: none;"';

    return `<div data-showonlyon="${showOnlyOnData}" class="card${
        link.rubberband ? ' animate__rubberBand' : ''
    }" ${hideClass}>${elem}</div>`;
}

function escapeHtml(str) {
    return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function renderSection(id, title, links, extraClass) {
    const cls = extraClass ? ` class="${extraClass}"` : '';
    const cards = links
        .map(function (o) {
            return renderCard(o);
        })
        .join('\n');

    return `<div id="${id}"${cls}>\n  <div class="section-title">${escapeHtml(title)}</div>\n ${cards}\n</div>`;
}

function buildSectionHtml(id, { title = '', links = [] }) {
    return renderSection(id, title, links, id === 'section-more' ? 'section-more' : '');
}

function keyToSectionId(key) {
    if (key === 'razerxpkm') {
        return 'section-razer';
    }

    return `section-${key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`;
}

function replaceSectionsInLayout(layout, sections) {
    // Find section placeholder divs in the layout and replace their blocks with generated html
    const sectionRegex = /<div id="(section-[^"\s>]+)"[^>]*>/g;
    const matches = [];
    let m;

    while ((m = sectionRegex.exec(layout)) !== null) {
        matches.push({ id: m[1], index: m.index });
    }

    if (matches.length) {
        const replacements = [];

        for (let i = 0; i < matches.length; i++) {
            const start = matches[i].index;
            const end = i + 1 < matches.length ? matches[i + 1].index : layout.indexOf('<small>', start);
            const replacement = buildSectionHtml(matches[i].id, sections[i].section) + '\n';

            replacements.push({ start, end: end === -1 ? layout.length : end, replacement });
        }

        const additionalSections = sections
            .slice(matches.length)
            .map(function ({ id, section }) {
                return buildSectionHtml(id, section);
            })
            .join('\n');
        const beforeSmall = layout.indexOf('<small>');

        if (additionalSections && beforeSmall !== -1) {
            layout = layout.slice(0, beforeSmall) + additionalSections + '\n' + layout.slice(beforeSmall);
        }

        // apply replacements from end to start
        for (let i = replacements.length - 1; i >= 0; i--) {
            const r = replacements[i];
            layout = layout.slice(0, r.start) + r.replacement + layout.slice(r.end);
        }
        return layout;
    } else {
        console.warn('No section placeholders found in layout.');
    }

    // fallback: append generated sections before <small>
    const beforeSmall = layout.indexOf('<small>');
    const built = sections.map(({ id, section }) => buildSectionHtml(id, section)).join('\n');

    if (beforeSmall !== -1) {
        return layout.slice(0, beforeSmall) + built + '\n' + layout.slice(beforeSmall);
    }
    return layout;
}

layoutFile = replaceSectionsInLayout(layoutFile, sections);

fs.writeFileSync(layoutPath, layoutFile, 'utf8');
console.log('Wrote:', layoutPath);
