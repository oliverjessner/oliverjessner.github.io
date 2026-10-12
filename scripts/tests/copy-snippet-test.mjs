import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Liquid } from 'liquidjs';
import markdownIt from 'markdown-it';
import { parseDocument, DomUtils } from 'htmlparser2';
import { configureEditorialMarkdown, minifyHtml } from '../../plugins/eleventy-compat.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const liquid = new Liquid({
    root: path.join(root, '_includes'),
    jekyllInclude: true,
    dynamicPartials: false,
    jsTruthy: true,
});
// Eleventy enables raw HTML and disables indented Markdown code blocks.
const markdown = markdownIt({ html: true }).disable('code');
configureEditorialMarkdown(markdown);

const render = (source, data = {}) => markdown.render(liquid.parseAndRenderSync(source, data));
const find = (document, attribute) => DomUtils.findAll(
    node => node.type === 'tag' && Object.hasOwn(node.attribs, attribute),
    document.children,
);

function assertSource(html, expected) {
    const document = parseDocument(html);
    const snippets = find(document, 'data-copy-snippet');
    const sources = find(document, 'data-copy-source');
    assert.equal(snippets.length, 1, 'One complete snippet wrapper must render');
    assert.equal(sources.length, 1, 'Browser copy must have exactly one source node');
    const source = sources[0];
    assert.equal(source.name, 'code');
    assert.equal(source.parent.name, 'pre');
    assert.equal(source.parent.parent, snippets[0]);
    assert.deepEqual(source.parent.children.filter(node => node.type === 'tag'), [source]);
    assert.ok(source.children.every(node => node.type === 'text'), 'Escaped template must remain literal text');
    assert.equal(DomUtils.textContent(source), expected, 'Preserve every internal newline and blank paragraph');
    assert.equal(find(document, 'data-copy-button').length, 1);
    assert.equal(find(document, 'data-copy-status').length, 1);
    assert.doesNotMatch(html, /<p[^>]*>\s*<pre\b/);
    assert.doesNotMatch(html, /<p[^>]*>\s*<p\b/);
}

const fixture = '\nHello,\n\nKeep **Markdown** and _underscores_ literal.\n<tag data-value="quoted"> & \'apostrophes\' &quot;\n\n- [x] This is text, not a checkbox.\n  Keep these two spaces.\n\tAnd this tab.\n\nGrüße 👋\n[Name]\n';
const include = '{% include framework/blocks/components/copy-snippet.html content=sample title="Vorlage" description="Mehrzeiliger Text" %}';
const rendered = render(include, { sample: fixture });
assertSource(rendered, fixture.trim());
assertSource(minifyHtml(rendered), fixture.trim());
assert.ok(rendered.includes('&quot;quoted&quot;'), 'Keep the quote serialization used by legacy article SEO');
assert.ok(!rendered.includes('task-list-item-checkbox'));
assert.equal(render(include, { sample: '\n  \n' }).trim(), '');

const article = fs.readFileSync(path.join(root, 'collections/_posts/2026-04-02-wie-werde-ich-pr-mails-und-pr-scam-los.md'), 'utf8');
const body = article.replace(/^---[\s\S]*?\n---\s*\n/, '');
const captured = body.match(/{% capture pr_cleanup_request_template %}([\s\S]*?){% endcapture %}/)?.[1];
assert.ok(captured, 'The real PR cleanup article must retain its captured template');
const realRendered = render(body);
assertSource(realRendered, captured.trim());
assertSource(minifyHtml(realRendered), captured.trim());
console.log(`[copy-snippet-test] PASS: actual Liquid→Markdown include, single valid source, literal escaping/Markdown, blank paragraphs, indentation, minification and ${captured.trim().length}-character real PR template.`);
