const fs = require('fs');
const path = require('path');
const data = require('./linkhub-data.json');

const layoutPath = path.join(__dirname, '..', '_layouts', 'linkhub.html');
let layoutFile = fs.readFileSync(layoutPath, 'utf8');
const values = Object.values(data || {});

function renderCard(link) {
    const style = link.noBorderRadius ? ' style="border-radius: unset;"' : '';

    return `<div class="card${link.shake ? ' animate__rubberBand' : ''}"><a href="${
        link.url
    }" target="_blank" rel="noopener noreferrer"><img src="/assets/images/linkhub/${link.imgSrc}" alt="${escapeHtml(
        link.title,
    )} Icon"${style}><p class="category">${escapeHtml(link.title)}</p><div class="placeholder"></div></a></div>`;
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
    const cards = (links || []).map(renderCard).join('\n    ');
    return `<div id="${id}"${cls}>\n    <div class="section-title">${escapeHtml(title)}</div>\n    ${cards}\n</div>`;
}

function buildSectionHtml(id, title, links) {
    return renderSection(id, title, links, id === 'section-more' ? 'section-more' : '');
}

function replaceSectionsInLayout(layout, values) {
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
            const sectionObj = values[i] || { title: '', links: [] };
            const replacement = buildSectionHtml(matches[i].id, sectionObj.title, sectionObj.links) + '\n';
            replacements.push({ start, end: end === -1 ? layout.length : end, replacement });
        }
        // apply replacements from end to start
        for (let i = replacements.length - 1; i >= 0; i--) {
            const r = replacements[i];
            layout = layout.slice(0, r.start) + r.replacement + layout.slice(r.end);
        }
        return layout;
    }

    // fallback: append generated sections before <small>
    const beforeSmall = layout.indexOf('<small>');
    const built = values.map((s, idx) => buildSectionHtml(`section-${idx + 1}`, s.title, s.links)).join('\n');

    if (beforeSmall !== -1) {
        return layout.slice(0, beforeSmall) + built + '\n' + layout.slice(beforeSmall);
    }
    return layout;
}

layoutFile = replaceSectionsInLayout(layoutFile, values);

fs.writeFileSync(layoutPath, layoutFile, 'utf8');
console.log('Wrote:', layoutPath);
process.exit(0);
