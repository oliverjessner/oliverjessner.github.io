import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const validator = fileURLToPath(new URL('../blogposts/validate-generated-blogpost.mjs', import.meta.url));
const article = `---
layout: post
title: 'Ein Artikel'
date: 2026-10-26 12:00:00 +0100
authors: ['oliver_jessner']
categories: ['terminal', 'macos', 'software-development']
description: 'Ein kurzer Teaser'
thumbnail: '/assets/images/gen/blog/ein-artikel/header_thumbnail.webp'
image: '/assets/images/gen/blog/ein-artikel/header.webp'
faq:
    - question: 'Wie geht das?'
      answer: 'So geht das.'
    - question: 'Warum?'
      answer: 'Darum.'
socialmedia:
    - 'Erster Post'
    - 'Zweiter Post'
    - 'Dritter Post'
news: true
pinned: false
ads: true
---

Ein kurzer Aufmacher.

## Beispiel

\`\`\`sh
echo hello
\`\`\`
`;

function validate(content) {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'generated-blogpost-test-'));
    try {
        const filename = path.join(directory, 'article.md');
        fs.writeFileSync(filename, content);
        const result = spawnSync(process.execPath, [validator, filename], { encoding: 'utf8' });
        assert.ifError(result.error);
        return result;
    } finally {
        fs.rmSync(directory, { recursive: true, force: true });
    }
}

test('accepts raw Markdown, valid YAML, and code examples inside the article', () => {
    const result = validate(article);
    assert.equal(result.status, 0, result.stderr);
});

test('accepts a quoted date with the summer UTC offset', () => {
    const result = validate(article.replace('2026-10-26 12:00:00 +0100', "'2026-07-26 12:00:00 +0200'"));
    assert.equal(result.status, 0, result.stderr);
});

for (const [name, content, message] of [
    ['empty response', '', /raw Markdown/],
    ['outer code fence', `\`\`\`\`markdown\n${article}\`\`\`\``, /raw Markdown/],
    ['missing body', article.slice(0, article.indexOf('\n\nEin kurzer')), /nonempty article body/],
    ['malformed YAML', article.replace("title: 'Ein Artikel'", "title: ["), /validation failed/],
    ['missing title', article.replace("title: 'Ein Artikel'", "title: ''"), /title/],
    ['misnested categories', article.replace("categories: ['terminal', 'macos', 'software-development']", 'categories:\n    description: falsch'), /categories/],
    ['invalid date', article.replace('2026-10-26 12:00:00 +0100', 'unbekannt'), /date/],
    ['oversized social post', article.replace('Erster Post', 'x'.repeat(281)), /280/],
    ['missing FAQ answer', article.replace("answer: 'Darum.'", "answer: ''"), /faq/],
    ['unexpected pinned value', article.replace('pinned: false', 'pinned: true'), /pinned/],
]) {
    test(`rejects ${name}`, () => {
        const result = validate(content);
        assert.equal(result.status, 1, result.stderr);
        assert.match(result.stderr, message);
    });
}
