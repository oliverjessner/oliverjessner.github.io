import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

// Shared by the automated workflow and the standalone validation command.
export function validateGeneratedBlogpost(source) {
    const article = source.trim();
    const match = article.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]+)$/);
    if (!match || !match[2].trim()) {
        throw new Error('Expected raw Markdown with YAML front matter and a nonempty article body.');
    }

    const data = yaml.load(match[1], { schema: yaml.JSON_SCHEMA });
    if (!data || typeof data !== 'object' || Array.isArray(data) || data.layout !== 'post') {
        throw new Error('Front matter must be a mapping with layout: post.');
    }
    for (const key of ['title', 'description', 'thumbnail', 'image']) {
        if (typeof data[key] !== 'string' || !data[key].trim()) {
            throw new Error(`Missing or empty front matter field: ${key}.`);
        }
    }
    if (typeof data.date !== 'string'
        || !/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} [+-]\d{4}$/.test(data.date)
        || !Number.isFinite(Date.parse(data.date))) {
        throw new Error('Missing or invalid date; expected YYYY-MM-DD HH:MM:SS +HHMM.');
    }
    for (const key of ['authors', 'categories', 'socialmedia']) {
        if (!Array.isArray(data[key]) || !data[key].length
            || data[key].some(value => typeof value !== 'string' || !value.trim())) {
            throw new Error(`${key} must be a nonempty list of strings.`);
        }
    }
    if (!Array.isArray(data.faq) || data.faq.length < 2 || data.faq.length > 3
        || data.faq.some(item => !item || typeof item.question !== 'string'
            || !item.question.trim() || typeof item.answer !== 'string' || !item.answer.trim())) {
        throw new Error('faq must contain two or three question/answer pairs.');
    }
    if (data.socialmedia.length !== 3 || data.socialmedia.some(post => Array.from(post).length > 280)) {
        throw new Error('Expected three social media posts with at most 280 characters each.');
    }
    if (typeof data.news !== 'boolean' || data.pinned !== false || data.ads !== true) {
        throw new Error('Expected boolean news, pinned: false, and ads: true.');
    }
    return { data, body: match[2].trim() };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    try {
        validateGeneratedBlogpost(fs.readFileSync(process.argv[2], 'utf8'));
    } catch (error) {
        console.error(`Blog post validation failed: ${error.message}`);
        process.exitCode = 1;
    }
}
