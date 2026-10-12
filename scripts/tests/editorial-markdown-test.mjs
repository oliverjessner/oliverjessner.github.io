import assert from 'node:assert/strict';
import fs from 'node:fs';
import markdownIt from 'markdown-it';
import slugify from '@sindresorhus/slugify';
import { Liquid } from 'liquidjs';
import { configureEditorialMarkdown, articleSeoHtml } from '../../plugins/eleventy-compat.js';

const markdown = markdownIt({ html: true });
configureEditorialMarkdown(markdown);
configureEditorialMarkdown(markdown);

const headings = markdown.render('## Über **Österreich** & `camelCase`\n\n## Wiederholt\n\n## Wiederholt\n\n<h2 id="hand-written">Existing HTML heading</h2>\n\n## Hand written');
assert.ok(headings.includes(`id="${slugify('Über Österreich & camelCase', { decamelize: false })}"`));
assert.ok(headings.includes('<h2 id="wiederholt">'));
assert.ok(headings.includes('<h2 id="wiederholt-2">'));
assert.ok(headings.includes('<h2 id="hand-written">Existing HTML heading</h2>'));
assert.ok(headings.includes('<h2 id="hand-written-2">Hand written</h2>'));

const taskSource = '- [ ] Read **the manual**\n- [x] [Visit the site](https://example.com)\n  - [X] Nested task\n\n- [ ] Loose item\n\n  Second paragraph\n- Ordinary item';
const tasks = markdown.render(taskSource);
assert.equal((tasks.match(/task-list-item-checkbox/g) || []).length, 4);
assert.equal((tasks.match(/class="task-list"/g) || []).length, 2);
assert.equal((tasks.match(/ checked>/g) || []).length, 2);
assert.ok(tasks.includes('aria-label="Read the manual"'));
assert.ok(tasks.includes('aria-label="Visit the site"'));
assert.match(tasks, /<li class="task-list-item">\s*<input[^>]+> <p>Loose item/);
assert.ok(!tasks.includes('disabled'));
assert.ok(!tasks.includes('task-list task-list'));
assert.ok(tasks.includes('<a href="https://example.com">Visit the site</a>'));
assert.match(tasks, /<li>\s*(?:<p>)?Ordinary item/);

const escaped = markdown.render('- [ ] Text with "quotes" & <strong>markup</strong>');
assert.ok(escaped.includes('aria-label="Text with &quot;quotes&quot; &amp; markup"'));
assert.ok(escaped.includes('<strong>markup</strong>'));
const plain = markdown.render('- Ordinary list\n\n```md\n## Example heading\n- [ ] Example task\n```\n\n| Key | Value |\n| --- | --- |\n| a | b |');
assert.ok(!plain.includes('task-list-item-checkbox'));
assert.ok(!plain.includes('id="example-heading"'));
assert.ok(plain.includes('<table>'));
assert.ok(plain.includes('## Example heading'));
assert.ok(plain.includes('<ul class="oj-bullet-list">'));
const nestedBullets = markdown.render('- Outer text\n  - Nested text\n- [ ] Checklist\n  - Supporting text');
assert.equal((nestedBullets.match(/class="oj-bullet-list"/g) || []).length, 2);
assert.ok(!tasks.includes('oj-bullet-list'));
const htmlBullets = markdown.render('<ul id="authored"><li>Text<ul><li>Nested</li></ul></li></ul>\n\n<nav><ul><li>Navigation</li></ul></nav>\n\n<script>const example = "<ul>";</script>\n\n<pre><code>&lt;ul&gt;</code></pre>\n\n<ul class="oj-list"><li>Existing component</li></ul>');
assert.equal((htmlBullets.match(/class="oj-bullet-list"/g) || []).length, 2);
assert.ok(htmlBullets.includes('<ul class="oj-bullet-list" id="authored">'));
assert.ok(htmlBullets.includes('<nav><ul><li>Navigation</li></ul></nav>'));
assert.ok(htmlBullets.includes('const example = "<ul>";'));
assert.ok(htmlBullets.includes('<ul class="oj-list">'));

const highlighted = markdownIt({ highlight: () => '<span class="token keyword">const</span>' });
configureEditorialMarkdown(highlighted);
assert.ok(highlighted.render('```js\nconst value = 1;\n```').includes('<span class="token keyword">const</span>'));

const liquid = new Liquid();
const plainSeo = html => liquid.parseAndRenderSync('{{ html | strip_html | strip_newlines }}', { html });
assert.equal(plainSeo(articleSeoHtml(tasks)), plainSeo(markdownIt({ html: true }).render(taskSource)));
assert.equal(articleSeoHtml('<p>Normal content</p>'), '<p>Normal content</p>');

const filename = 'collections/_posts/2026-06-19-marketing-fuer-solodevs-101-0-euro-marketing.md';
const actualFilename = fs.readdirSync('collections/_posts').find(file => file.startsWith('2026-06-19-marketing-fuer-solodevs-101'));
assert.ok(actualFilename, `Checklist article missing: ${filename}`);
const source = fs.readFileSync(`collections/_posts/${actualFilename}`, 'utf8').replace(/^---[\s\S]*?\n---\s*\n/, '');
const expectedTasks = [...source.matchAll(/^\s*- \[[ xX]\]\s+/gm)].length;
const rendered = markdown.render(source);
assert.equal((rendered.match(/task-list-item-checkbox/g) || []).length, expectedTasks);
assert.ok(expectedTasks > 50);
assert.equal(plainSeo(articleSeoHtml(rendered)), plainSeo(markdownIt({ html: true }).render(source)));
console.log(`[editorial-markdown-test] PASS: native/nested OJ bullets, heading anchors, duplicate/manual IDs, tight/loose/nested checklists, labels, escaping, tables and syntax highlighting; ${expectedTasks} real article tasks.`);
