import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { PassThrough, Readable } from 'node:stream';
import test from 'node:test';
import yaml from 'js-yaml';
import sharp from 'sharp';
import {
    articleSlug, createCommandRunner, MAX_INPUT_CHARACTERS, parseArguments, prepareArticle, readTextInput,
    runBlog, shareUrls, sourceUrl,
    submitIndexNow, viennaTimestamp, waitForPublication,
} from '../blogposts/blog.mjs';

const execute = promisify(execFile);
const KEY = 'test-indexnow-key-12345678';
const SITE = 'https://blog.example.test';
const SOURCE = 'https://source.example.test/article?x=1&y=2';
const SOURCE_TEXT = 'Die ausgewählte Quelle beschreibt eine Open-Source-Anwendung mit Desktop-Versionen für mehrere Betriebssysteme. ' +
    'Umlaute wie ä, ö und ü sowie konkrete Einschränkungen bleiben im gespeicherten Quelltext erhalten.';
const CUSTOM_TEXT = '  Thema: Lokale Software im Alltag\nNotizen mit ä, ö, ü und 🚀.\n\tEine ausführliche eigene Perspektive.\n\n';
const TRANSCRIPTION = '  Vortrag: Geräte unabhängig nutzen\n[00:00:01] Grüß euch! Heute geht es um barrierefreie Software.\n[00:00:12] Eine zweite Zeile mit \tTab und „Originalwortlaut“.\n\n';
const TIMESTAMP = '2026-10-26 13:00:00 +0100';

function article() {
    const data = {
        layout: 'post', title: 'Äpfel, Öl und Grüße: Node.js', date: TIMESTAMP,
        authors: ['oliver_jessner'], categories: ['terminal', 'macos', 'software-development'],
        description: 'Ein Teaser', thumbnail: '/assets/images/gen/blog/xxx/header_thumbnail.webp',
        image: '/assets/images/gen/blog/xxx/header.webp',
        faq: [{ question: 'Wie?', answer: 'So.' }, { question: 'Warum?', answer: 'Darum.' }],
        socialmedia: ['Ein Post mit & und #', 'Ein zweiter Post?', 'Ein dritter Post.'],
        news: true, pinned: false, ads: true,
    };
    return `---\n${yaml.dump(data)}---\n\nEin Aufmacher.\n\n## Hintergrund\n\nEin Artikeltext.\n`;
}

function write(root, relative, content) {
    const filename = path.join(root, relative);
    fs.mkdirSync(path.dirname(filename), { recursive: true });
    fs.writeFileSync(filename, content);
}

async function fixture(t) {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-workflow-test-'));
    t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
    const root = path.join(directory, 'repository');
    const remote = path.join(directory, 'remote.git');
    const home = path.join(directory, 'home');
    fs.mkdirSync(root);
    fs.mkdirSync(home);
    const env = {
        ...process.env, BLOG_OPEN_BROWSER: '0', GIT_CONFIG_NOSYSTEM: '1', GIT_CONFIG_GLOBAL: os.devNull,
    };
    for (const name of ['SITE_URL', 'INDEXNOW_KEY', 'INDEXNOW_DISABLE', 'INDEXNOW_ENDPOINT',
        'DB_PATH', 'PINEFETCH_BIN', 'BLOG_DEPLOY_TIMEOUT', 'BLOG_DEPLOY_INTERVAL', 'CODEX_BLOG_MODEL', 'CODEX_BLOG_IMAGE_MODEL',
        'GIT_INDEX_FILE', 'GIT_DIR', 'GIT_WORK_TREE']) delete env[name];
    const git = async (...args) => (await execute('git', args, { cwd: root, env })).stdout.trim();
    await git('init', '--bare', remote);
    await git('init', '-b', 'main');
    await git('config', 'user.name', 'Workflow Test');
    await git('config', 'user.email', 'workflow@example.test');
    await git('config', 'commit.gpgsign', 'false');
    await git('config', 'core.hooksPath', path.join(directory, 'no-hooks'));
    write(root, '.gitignore', '.cache/\nprompts/\n');
    write(root, '_data/site.json', JSON.stringify({ url: SITE }));
    write(root, '_layouts/linkhub.html', 'original linkhub');
    write(root, 'scripts/linkhub/linkhub-data.json', '{}');
    write(root, `${KEY}.txt`, KEY);
    write(root, 'user-staged.txt', 'initial');
    write(root, '_data/videos/youtube_shortform.json', '[]');
    write(root, 'prompts/prompt.md', 'Write the complete article.');
    write(root, 'prompts/article-thumbnail.md', 'Create a calm editorial illustration.');
    await git('add', '.');
    await git('commit', '-m', 'Initial fixture');
    await git('remote', 'add', 'origin', remote);
    await git('push', '-u', 'origin', 'main');
    const baseHead = await git('rev-parse', 'HEAD');
    // These changes must survive every automatic commit and stay unpublished.
    write(root, 'user-staged.txt', 'user staged work');
    await git('add', 'user-staged.txt');
    write(root, '_data/videos/youtube_shortform.json', '["user work"]');
    write(root, 'assets/images/gen/external_short/user-work/keep.txt', 'keep');

    const calls = [];
    const requests = [];
    const sourceCalls = [];
    const logs = [];
    let time = 0;
    const faults = {
        image: false, conversion: false, indexNow: false, selection: false, selectionFailure: false,
        transcription: TRANSCRIPTION, transcriptionFailure: false, article: false, articleGeneration: false, push: false,
        sourceFailure: false,
    };
    const run = async (command, args, options = {}) => {
        calls.push({ command, args, options });
        if (command === 'git') {
            if (faults.push && args[2] === 'push') throw new Error('Git push rejected.');
            return (await execute(command, args, { cwd: root, env })).stdout;
        }
        if (command === 'codex' && args[0] === 'exec' && args[1] === '--help') return '--ignore-user-config';
        if (command === 'no-bullshit-rss') {
            if (faults.selectionFailure) throw new Error('RSS selection cancelled.');
            return faults.selection ? '' : `${SOURCE}${args.includes('--title') ? '\tSelected RSS title' : ''}\n`;
        }
        if (command === 'PineFetch' || path.basename(command) === 'PineFetch' || command === env.PINEFETCH_BIN) {
            if (faults.transcriptionFailure) throw faults.transcriptionFailure;
            return faults.transcription;
        }
        if (command === 'codex') {
            if (args.includes('image_generation')) {
                if (faults.image) throw new Error('Image backend unavailable.');
                const workspace = args[args.indexOf('--cd') + 1];
                await sharp({ create: { width: 160, height: 90, channels: 3, background: '#567890' } })
                    .png().toFile(path.join(workspace, 'header.png'));
            } else {
                if (faults.articleGeneration) throw new Error('Article backend unavailable.');
                const output = args[args.indexOf('--output-last-message') + 1];
                fs.writeFileSync(output, faults.article ? 'Not an article.' : article());
            }
            return '';
        }
        if (command === 'bulkpixel') {
            if (faults.conversion) throw new Error('BulkPixel conversion failed.');
            const source = args[args.indexOf('--input') + 1];
            const destination = args[args.indexOf('--output-dir') + 1];
            const width = Number(args[args.indexOf('--width') + 1]);
            const name = args.includes('--postfix') ? 'header_thumbnail.webp' : 'header.webp';
            await sharp(source).resize({ width }).webp().toFile(path.join(destination, name));
            return '';
        }
        if (command === process.execPath) {
            assert.equal(path.basename(args[0]), 'render-linkhub.js');
            assert.equal(args[1], '--post');
            write(root, '_layouts/linkhub.html', `link to ${args[2]}`);
            write(root, 'scripts/linkhub/linkhub-data.json', JSON.stringify({ post: args[2] }));
            return '';
        }
        throw new Error(`Unexpected command in test: ${command}`);
    };
    const fetchImpl = async (url, options = {}) => {
        requests.push({ url, options });
        if (options.method === 'POST') {
            assert.equal(new URL(url).hostname, 'api.indexnow.org');
            return new Response('', { status: faults.indexNow ? 503 : 202 });
        }
        assert.equal(new URL(url).origin, SITE);
        if (url.endsWith('.txt')) return new Response(KEY, { status: 200 });
        return new Response(`<html><link rel="canonical" href="${url}"></html>`, { status: 200 });
    };
    const dependencies = {
        root, home, env, run, fetchImpl, hasCommand: () => true,
        fetchArticleSource: async (url, options) => {
            sourceCalls.push({ url, options });
            if (faults.sourceFailure) throw faults.sourceFailure;
            return { url, resolvedUrl: url, title: 'Selected source title', text: SOURCE_TEXT };
        },
        now: () => new Date('2026-10-26T12:00:00Z'), log: message => logs.push(message),
        clock: () => time,
        sleep: async (ms, signal) => { signal?.throwIfAborted(); time += ms; },
    };
    const savedState = () => {
        const cache = path.join(root, '.cache', 'blog');
        const name = fs.readdirSync(cache).find(candidate => fs.existsSync(path.join(cache, candidate, 'state.json')));
        return path.join(cache, name, 'state.json');
    };
    return { root, remote, home, env, git, baseHead, calls, requests, sourceCalls, logs, faults, dependencies, savedState };
}

test('arguments select a workflow and resume without a new source', () => {
    assert.deepEqual(parseArguments([]), { mode: 'feed' });
    for (const mode of ['feed', 'top', 'feed:random', 'top:random', 'transcription']) {
        assert.deepEqual(parseArguments([mode]), { mode });
    }
    assert.deepEqual(parseArguments(['custom:url', SOURCE]), { mode: 'custom:url', custom: SOURCE });
    assert.deepEqual(parseArguments(['custom:text', CUSTOM_TEXT]), { mode: 'custom:text', text: CUSTOM_TEXT });
    assert.deepEqual(parseArguments(['custom:text', '-']), { mode: 'custom:text', stdin: true });
    assert.deepEqual(parseArguments(['custom:text', '--', '--literal topic']), { mode: 'custom:text', text: '--literal topic' });
    for (const mode of ['feed', 'top', 'feed:random', 'top:random', 'transcription', 'custom:url', 'custom:text']) {
        assert.deepEqual(parseArguments([mode, '--resume', 'state.json']), { mode, resume: path.resolve('state.json') });
        assert.deepEqual(parseArguments([mode, '--help']), { mode, help: true });
    }
});

test('invalid or conflicting workflow arguments and source URLs are rejected', () => {
    for (const args of [['custom:url'], ['custom:text'], ['custom:text', ''], ['custom:text', ' \n\t '],
        ['--custom', SOURCE], [`--custom=${SOURCE}`], ['--wat'], ['other'],
        ['feed', SOURCE], ['top', SOURCE], ['feed:random', SOURCE], ['top:random', SOURCE], ['transcription', SOURCE],
        ['custom:url', SOURCE, SOURCE], ['custom:text', 'first', 'second'], ['custom:text', '-', 'extra'],
        ['custom:url', 'not a URL'], ['custom:text', 'x'.repeat(8 * 1024 * 1024 + 1)],
        ['feed', 'top'], ['feed:random', 'top:random'],
        ['transcription', 'feed'], ['transcription', '--resume'],
        ['custom:url', SOURCE, '--resume', 'state.json'],
        ['custom:text', CUSTOM_TEXT, '--resume', 'state.json'], ['custom:text', '-', '--resume', 'state.json'],
        ['top', '--resume'],
        ['top', '--resume', '--help'], ['top', '--resume', 'state.json', '--resume', 'other.json']]) {
        assert.throws(() => parseArguments(args));
    }
    for (const value of ['file:///etc/passwd', 'javascript:alert(1)', 'https://user:pass@example.test/', 'not a url']) {
        assert.throws(() => sourceUrl(value));
    }
});

test('captured command output preserves UTF-8 characters split across chunks and complete multiline text', async () => {
    const repetitions = 2048;
    const script = `
        const bytes = Buffer.from(${JSON.stringify(TRANSCRIPTION)}.repeat(${repetitions}));
        const split = bytes.indexOf(0xc3) + 1;
        process.stdout.write(bytes.subarray(0, split));
        setTimeout(() => process.stdout.write(bytes.subarray(split)), 25);
    `;
    const run = createCommandRunner({ cwd: os.tmpdir(), env: process.env });
    assert.equal(await run(process.execPath, ['-e', script], { capture: true }), TRANSCRIPTION.repeat(repetitions));
});

test('oversized captured output fails explicitly instead of returning a partial source', async () => {
    const run = createCommandRunner({ cwd: os.tmpdir(), env: process.env });
    await assert.rejects(
        run(process.execPath, ['-e', "process.stdout.write('x'.repeat(8 * 1024 * 1024 + 1))"], { capture: true }),
        /Captured output.*exceeds the limit of 8,388,608 characters/,
    );
});

test('custom stdin preserves UTF-8 split inside multibyte characters and surrounding whitespace', async () => {
    const bytes = Buffer.from(CUSTOM_TEXT);
    const umlautSplit = bytes.indexOf(0xc3) + 1;
    const emojiSplit = bytes.indexOf(Buffer.from('🚀')) + 2;
    const stream = Readable.from([
        bytes.subarray(0, umlautSplit),
        bytes.subarray(umlautSplit, emojiSplit),
        bytes.subarray(emojiSplit),
    ]);
    assert.equal(await readTextInput(stream), CUSTOM_TEXT);
});

test('custom stdin rejects an oversized stream instead of returning a truncated text', async () => {
    const stream = Readable.from([
        Buffer.alloc(MAX_INPUT_CHARACTERS, 120),
        Buffer.from('one character beyond the limit'),
    ]);
    await assert.rejects(readTextInput(stream), /exceeds the limit of 8,388,608 characters.*nothing was truncated/i);
    assert.equal(stream.destroyed, true);
});

test('custom stdin waiting for input is interrupted by the caller abort signal', async t => {
    const stream = new PassThrough();
    t.after(() => stream.destroy());
    const controller = new AbortController();
    const reading = readTextInput(stream, { signal: controller.signal });
    const rejected = assert.rejects(reading, /Custom input interrupted/);
    controller.abort(new Error('Custom input interrupted'));
    await rejected;
    assert.equal(stream.destroyed, true);
});

test('Vienna dates handle winter and summer offsets', () => {
    assert.equal(viennaTimestamp(new Date('2026-10-26T12:00:00Z')), TIMESTAMP);
    assert.equal(viennaTimestamp(new Date('2026-07-20T10:00:00Z')), '2026-07-20 12:00:00 +0200');
});

test('the title controls the post filename, image paths, date, and publication URL', () => {
    const prepared = prepareArticle(article(), TIMESTAMP, SITE, { width: 1280, height: 720 });
    assert.equal(articleSlug('Äpfel, Öl und Grüße: Node.js'), 'aepfel-oel-und-gruesse-node-js');
    assert.equal(prepared.post, 'collections/_posts/2026-10-26-aepfel-oel-und-gruesse-node-js.md');
    assert.equal(prepared.data.image, '/assets/images/gen/blog/aepfel-oel-und-gruesse-node-js/header.webp');
    assert.equal(prepared.data.image_width, 1280);
    assert.equal(prepared.data.image_height, 720);
    assert.equal(prepared.url, `${SITE}/blog/2026-10-26-aepfel-oel-und-gruesse-node-js/`);
    for (const addition of ['published: false', 'permalink: /elsewhere/', 'meta_robots: noindex', 'canonical_url: https://other.example.test/']) {
        assert.throws(() => prepareArticle(article().replace('layout: post', `layout: post\n${addition}`), TIMESTAMP, SITE));
    }
});

test('custom URL workflow converts with BulkPixel, pushes only generated files, and submits the exact live URL', async t => {
    const f = await fixture(t);
    const result = await runBlog({ custom: SOURCE }, f.dependencies);
    assert.equal(result.complete, true);
    assert.equal(result.mode, 'custom:url');
    assert.equal(f.calls.some(call => call.command === 'no-bullshit-rss'), false);
    assert.equal(f.sourceCalls.length, 1);
    assert.equal(f.sourceCalls[0].url, SOURCE);
    const imageInput = f.calls.find(call => call.command === 'codex' && call.args.includes('image_generation')).options.input;
    assert.ok(imageInput.includes(`Artikeltitel: ${JSON.stringify('Äpfel, Öl und Grüße: Node.js')}`));
    assert.ok(imageInput.includes('Artikelbeschreibung: "Ein Teaser"'));
    assert.ok(imageInput.includes('Ein Artikeltext.'));
    const conversions = f.calls.filter(call => call.command === 'bulkpixel');
    assert.equal(conversions.length, 2);
    assert.deepEqual(conversions.map(call => call.args[call.args.indexOf('--width') + 1]), ['500', '1280']);
    assert.equal((await sharp(path.join(f.home, 'Downloads', 'header.png')).metadata()).format, 'png');
    const { data } = prepareArticle(fs.readFileSync(path.join(f.root, result.post), 'utf8'), TIMESTAMP, SITE);
    assert.equal(data.image_width, 1280);
    assert.equal(data.image_height, 720);
    const names = (await f.git('diff-tree', '--no-commit-id', '--name-only', '-r', 'HEAD')).split('\n');
    assert.deepEqual(new Set(names), new Set(Object.keys(result.files)));
    assert.equal(await f.git('show', 'HEAD:user-staged.txt'), 'initial');
    assert.equal(await f.git('show', 'HEAD:_data/videos/youtube_shortform.json'), '[]');
    assert.equal(await f.git('diff', '--cached', '--name-only'), 'user-staged.txt');
    assert.equal(fs.readFileSync(path.join(f.root, '_data/videos/youtube_shortform.json'), 'utf8'), '["user work"]');
    assert.equal(fs.readFileSync(path.join(f.root, 'assets/images/gen/external_short/user-work/keep.txt'), 'utf8'), 'keep');
    assert.equal(await f.git('--git-dir', f.remote, 'rev-parse', 'refs/heads/main'), result.commit);
    const submissions = f.requests.filter(request => request.options.method === 'POST');
    assert.equal(submissions.length, 1);
    const payload = JSON.parse(submissions[0].options.body);
    assert.deepEqual(payload.urlList, [result.url]);
    assert.equal(payload.host, new URL(SITE).host);
    assert.equal(payload.keyLocation, `${SITE}/${KEY}.txt`);
    const pushIndex = f.calls.findIndex(call => call.command === 'git' && call.args.includes('push'));
    assert.ok(pushIndex > f.calls.findIndex(call => call.command === 'bulkpixel'));
    assert.ok(f.calls.find(call => call.command === 'git' && call.args.includes('commit')).args.includes('--only'));
});

test('the default workflow keeps the NO-BULLSHIT-RSS menu and explicit DB_PATH', async t => {
    const f = await fixture(t);
    const database = path.join(f.home, 'rss-data.db');
    fs.writeFileSync(database, 'fixture: actual database is never opened');
    f.env.DB_PATH = database;
    const result = await runBlog({}, f.dependencies);
    assert.equal(result.mode, 'feed');
    const selection = f.calls.find(call => call.command === 'no-bullshit-rss');
    assert.deepEqual(selection.args, ['articles', 'last', '100', '--choose', '--url', '--title']);
    assert.equal(selection.options.env.DB_PATH, database);
    assert.equal(selection.options.input, undefined);
    assert.ok(f.calls.find(call => call.command === 'codex' && call.args.includes('--search')).options.input.includes('Selected RSS title'));
});

test('custom text preserves long Unicode material without requiring a source URL or selection CLI', async t => {
    for (const [name, text] of [['long multiline material', CUSTOM_TEXT.repeat(1024)],
        ['URL-looking text', 'https://example.test/a-topic-written-as-text']]) {
        await t.test(name, async t => {
            const f = await fixture(t);
            const checkedCommands = [];
            f.dependencies.hasCommand = command => {
                checkedCommands.push(command);
                return ['git', 'codex', 'bulkpixel'].includes(command);
            };
            f.dependencies.readInput = async () => { throw new Error('A positional text must not read stdin.'); };
            f.env.DB_PATH = path.join(f.home, 'missing-rss.db');
            const result = await runBlog({ mode: 'custom:text', text }, f.dependencies);
            assert.equal(result.complete, true);
            assert.equal(result.mode, 'custom:text');
            assert.equal(result.input, text);
            assert.equal(JSON.parse(fs.readFileSync(f.savedState(), 'utf8')).input, text);
            assert.equal(f.sourceCalls.length, 0);
            assert.equal(checkedCommands.some(command => command === 'no-bullshit-rss' || /PineFetch/.test(command)), false);
            assert.equal(f.calls.some(call => call.command === 'no-bullshit-rss' || /PineFetch/.test(call.command)), false);
            const prompt = f.calls.find(call => call.command === 'codex' && call.args.includes('--search')).options.input;
            assert.ok(prompt.includes('Eigenes Thema oder eigener Text (vollständig):'));
            assert.ok(prompt.includes(text));
            assert.ok(prompt.includes('Websuche'));
            assert.equal(prompt.includes('Direkt abgerufene Quelle (JSON-Daten'), false);
            assert.equal(fs.existsSync(path.join(path.dirname(f.savedState()), 'source.json')), false);
        });
    }
});

test('custom text read from stdin is stored completely and resume never reads it again', async t => {
    const f = await fixture(t);
    let reads = 0;
    f.dependencies.readInput = async () => { reads++; return CUSTOM_TEXT; };
    f.dependencies.hasCommand = command => ['git', 'codex', 'bulkpixel'].includes(command);
    f.faults.articleGeneration = true;
    await assert.rejects(runBlog({ mode: 'custom:text', stdin: true }, f.dependencies), /Article backend/);
    assert.equal(reads, 1);
    const stateFile = f.savedState();
    const saved = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    assert.equal(saved.mode, 'custom:text');
    assert.equal(saved.input, CUSTOM_TEXT);
    assert.ok(f.logs.some(message => message.startsWith('Continue with: npm run blog:custom:text -- --resume ')));
    f.faults.articleGeneration = false;
    f.dependencies.readInput = async () => { throw new Error('Do not read stdin again.'); };
    const result = await runBlog({ mode: 'custom:url', resume: stateFile }, f.dependencies);
    assert.equal(result.complete, true);
    assert.equal(result.mode, 'custom:text');
    assert.equal(result.input, CUSTOM_TEXT);
    assert.equal(reads, 1);
    assert.equal(f.sourceCalls.length, 0);
    assert.equal(f.calls.some(call => call.command === 'no-bullshit-rss' || /PineFetch/.test(call.command)), false);
    const generations = f.calls.filter(call => call.command === 'codex' && call.args.includes('--search'));
    assert.equal(generations.length, 2);
    for (const generation of generations) assert.ok(generation.options.input.includes(CUSTOM_TEXT));
});

test('empty and oversized custom text inputs stop before generation or publication', async t => {
    for (const viaStdin of [false, true]) {
        for (const text of ['', ' \n\t ', 'x'.repeat(8 * 1024 * 1024 + 1)]) {
            await t.test(`${viaStdin ? 'stdin' : 'argument'} ${text.length} characters`, async t => {
                const f = await fixture(t);
                f.dependencies.readInput = async () => text;
                const options = viaStdin ? { mode: 'custom:text', stdin: true } : { mode: 'custom:text', text };
                await assert.rejects(runBlog(options, f.dependencies), /text|input|limit|8,388,608/i);
                assert.equal(f.sourceCalls.length, 0);
                assert.equal(f.calls.some(call => call.command === 'bulkpixel' ||
                    (call.command === 'codex' && !(call.args[0] === 'exec' && call.args[1] === '--help'))), false);
                assert.equal(f.calls.some(call => call.command === 'git' &&
                    (call.args.includes('commit') || call.args.includes('push'))), false);
                assert.equal(await f.git('rev-parse', 'HEAD'), f.baseHead);
            });
        }
    }
});

test('an invalid custom text response retries using the complete saved text without source fetching', async t => {
    const f = await fixture(t);
    f.faults.article = true;
    await assert.rejects(runBlog({ mode: 'custom:text', text: CUSTOM_TEXT }, f.dependencies), /raw Markdown/);
    const stateFile = f.savedState();
    const saved = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    assert.equal(saved.input, CUSTOM_TEXT);
    assert.equal(saved.mode, 'custom:text');
    f.faults.article = false;
    f.dependencies.readInput = async () => { throw new Error('Resume must reuse saved text.'); };
    const result = await runBlog({ resume: stateFile }, f.dependencies);
    assert.equal(result.complete, true);
    assert.equal(result.input, CUSTOM_TEXT);
    assert.equal(result.mode, 'custom:text');
    assert.equal(f.sourceCalls.length, 0);
    const generations = f.calls.filter(call => call.command === 'codex' && call.args.includes('--search'));
    assert.equal(generations.length, 2);
    for (const generation of generations) assert.ok(generation.options.input.includes(CUSTOM_TEXT));
});

test('legacy custom URL runs resume with the explicit URL mode without repeating source work', async t => {
    const f = await fixture(t);
    f.faults.conversion = true;
    await assert.rejects(runBlog({ custom: SOURCE }, f.dependencies), /BulkPixel/);
    const stateFile = f.savedState();
    const saved = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    saved.mode = 'custom';
    fs.writeFileSync(stateFile, JSON.stringify(saved));
    f.dependencies.readInput = async () => { throw new Error('Legacy URL resume must not read text.'); };
    f.faults.conversion = false;
    const result = await runBlog({ mode: 'custom:text', resume: stateFile }, f.dependencies);
    assert.equal(result.complete, true);
    assert.equal(result.mode, 'custom:url');
    assert.equal(result.input, SOURCE);
    assert.equal(result.timestamp, saved.timestamp);
    assert.equal(f.sourceCalls.length, 1);
    assert.equal(f.calls.filter(call => call.command === 'codex' && call.args.includes('--search')).length, 1);
    assert.equal(f.calls.filter(call => call.command === 'codex' && call.args.includes('image_generation')).length, 1);
    assert.equal(f.calls.some(call => call.command === 'no-bullshit-rss' || /PineFetch/.test(call.command)), false);
});

test('the transcription workflow selects PineFetch once and preserves the complete text for generation', async t => {
    const f = await fixture(t);
    const checkedCommands = [];
    f.dependencies.hasCommand = command => {
        checkedCommands.push(command);
        return command !== 'no-bullshit-rss';
    };
    // A missing RSS database must not affect transcript selection or generation.
    f.env.DB_PATH = path.join(f.home, 'missing-rss.db');
    const result = await runBlog({ mode: 'transcription' }, f.dependencies);
    assert.equal(result.complete, true);
    assert.equal(result.mode, 'transcription');
    assert.equal(result.input, TRANSCRIPTION);
    assert.equal(JSON.parse(fs.readFileSync(f.savedState(), 'utf8')).input, TRANSCRIPTION);
    assert.ok(checkedCommands.includes('PineFetch'));
    assert.equal(checkedCommands.includes('no-bullshit-rss'), false);
    assert.equal(f.calls.some(call => call.command === 'no-bullshit-rss'), false);
    const selections = f.calls.filter(call => call.command === 'PineFetch');
    assert.equal(selections.length, 1);
    assert.deepEqual(selections[0].args, ['history', 'transcription', '--choose']);
    assert.deepEqual(selections[0].options, { capture: true });
    const prompt = f.calls.find(call => call.command === 'codex' && call.args.includes('--search')).options.input;
    assert.ok(prompt.includes('Ausgewählte PineFetch-Transkription (vollständig):'));
    assert.ok(prompt.includes(TRANSCRIPTION));
    assert.equal(f.sourceCalls.length, 0);
});

test('PineFetch app bundles and an explicit binary work without a shell alias', async t => {
    for (const location of ['system-app', 'user-app', 'explicit', 'relative']) {
        await t.test(location, async t => {
            const f = await fixture(t);
            const binary = location === 'system-app'
                ? '/Applications/PineFetch.app/Contents/MacOS/PineFetch'
                : location === 'user-app'
                    ? path.join(f.home, 'Applications/PineFetch.app/Contents/MacOS/PineFetch')
                    : location === 'relative'
                        ? path.join(f.root, 'tools', 'PineFetch')
                        : path.join(f.home, 'custom', 'pinefetch-cli');
            if (location === 'explicit') f.env.PINEFETCH_BIN = binary;
            if (location === 'relative') f.env.PINEFETCH_BIN = './tools/PineFetch';
            f.dependencies.hasCommand = command => ['git', 'codex', 'bulkpixel', binary].includes(command);
            const result = await runBlog({ mode: 'transcription' }, f.dependencies);
            assert.equal(result.complete, true);
            assert.equal(result.input, TRANSCRIPTION);
            const selection = f.calls.find(call => call.command === binary);
            assert.ok(selection);
            assert.deepEqual(selection.args, ['history', 'transcription', '--choose']);
            assert.deepEqual(selection.options, { capture: true });
            assert.equal(f.calls.some(call => call.command === 'PineFetch' || call.command === 'no-bullshit-rss'), false);
        });
    }
});

test('a missing PineFetch command or invalid explicit binary stops before generation or publication', async t => {
    for (const explicit of [false, true]) {
        await t.test(explicit ? 'invalid explicit binary' : 'no installed binary', async t => {
            const f = await fixture(t);
            const checkedCommands = [];
            const missingBinary = path.join(f.home, 'missing-pinefetch');
            if (explicit) f.env.PINEFETCH_BIN = missingBinary;
            f.dependencies.hasCommand = command => {
                checkedCommands.push(command);
                return ['git', 'codex', 'bulkpixel'].includes(command) || (explicit && command === 'PineFetch');
            };
            await assert.rejects(runBlog({ mode: 'transcription' }, f.dependencies), /Required command.*(?:PineFetch|missing-pinefetch)/);
            if (explicit) {
                assert.ok(checkedCommands.includes(missingBinary));
                assert.equal(checkedCommands.includes('PineFetch'), false);
            }
            assert.equal(f.calls.some(call => call.command === 'bulkpixel' ||
                (call.command === 'codex' && !(call.args[0] === 'exec' && call.args[1] === '--help'))), false);
            assert.equal(f.calls.some(call => call.command === 'git' &&
                (call.args.includes('commit') || call.args.includes('push'))), false);
            assert.equal(f.requests.length, 0);
            assert.equal(await f.git('rev-parse', 'HEAD'), f.baseHead);
        });
    }
});

test('empty, cancelled, or failed PineFetch selections stop before generation or publication', async t => {
    for (const [name, output, failure, message] of [
        ['empty', '', false, /transcription|transcript/i],
        ['whitespace only', ' \n\t\r\n ', false, /transcription|transcript/i],
        ['cancelled', TRANSCRIPTION, new Error('PineFetch selection cancelled.'), /cancelled/],
        ['process failed', TRANSCRIPTION, new Error('PineFetch process exited with code 1.'), /code 1/],
    ]) {
        await t.test(name, async t => {
            const f = await fixture(t);
            f.faults.transcription = output;
            f.faults.transcriptionFailure = failure;
            await assert.rejects(runBlog({ mode: 'transcription' }, f.dependencies), message);
            assert.equal(f.calls.filter(call => call.command === 'PineFetch').length, 1);
            assert.equal(f.calls.some(call => call.command === 'bulkpixel' ||
                (call.command === 'codex' && !(call.args[0] === 'exec' && call.args[1] === '--help'))), false);
            assert.equal(f.calls.some(call => call.command === 'git' &&
                (call.args.includes('commit') || call.args.includes('push'))), false);
            assert.equal(f.requests.length, 0);
            assert.equal(await f.git('rev-parse', 'HEAD'), f.baseHead);
        });
    }
});

test('URL-only RSS workflows pass their exact selection arguments and source to generation', async t => {
    for (const [mode, args] of [
        ['top', ['articles', 'top', '100', '--choose', '--url']],
        ['feed:random', ['articles', 'random', '--url', '--feed']],
        ['top:random', ['articles', 'random', '--url', '--top']],
    ]) {
        await t.test(mode, async t => {
            const f = await fixture(t);
            f.env.DB_PATH = path.join(f.home, 'rss.db');
            fs.writeFileSync(f.env.DB_PATH, 'fixture');
            const result = await runBlog({ mode }, f.dependencies);
            assert.equal(result.complete, true);
            assert.equal(result.mode, mode);
            assert.equal(result.input, SOURCE);
            const selections = f.calls.filter(call => call.command === 'no-bullshit-rss');
            assert.equal(selections.length, 1);
            assert.deepEqual(selections[0].args, args);
            assert.equal(selections[0].options.env.DB_PATH, f.env.DB_PATH);
            assert.equal(selections[0].options.input, undefined);
            const prompt = f.calls.find(call => call.command === 'codex' && call.args.includes('--search')).options.input;
            assert.ok(prompt.includes(SOURCE));
            assert.equal(prompt.includes('Selected RSS title'), false);
            assert.ok(prompt.includes('Selected source title'));
            assert.ok(prompt.includes(JSON.stringify(SOURCE_TEXT)));
            assert.ok(prompt.includes('keine Anweisungen'));
            assert.equal(f.sourceCalls.length, 1);
            assert.equal(f.sourceCalls[0].url, SOURCE);
            assert.deepEqual(JSON.parse(fs.readFileSync(path.join(path.dirname(f.savedState()), 'source.json'), 'utf8')), {
                url: SOURCE, resolvedUrl: SOURCE, title: 'Selected source title', text: SOURCE_TEXT,
            });
        });
    }
});

test('empty or failed RSS selections stop before generation or publication', async t => {
    for (const mode of ['feed', 'top', 'feed:random', 'top:random']) {
        for (const fault of ['selection', 'selectionFailure']) {
            await t.test(`${mode}: ${fault}`, async t => {
                const f = await fixture(t);
                f.env.DB_PATH = path.join(f.home, 'rss.db');
                fs.writeFileSync(f.env.DB_PATH, 'fixture');
                f.faults[fault] = true;
                await assert.rejects(runBlog({ mode }, f.dependencies), fault === 'selection' ? /no article/ : /cancelled/);
                assert.equal(f.calls.some(call => call.command === 'bulkpixel' ||
                    (call.command === 'codex' && !(call.args[0] === 'exec' && call.args[1] === '--help'))), false);
                assert.equal(f.calls.some(call => call.command === 'git' &&
                    (call.args.includes('commit') || call.args.includes('push'))), false);
                assert.equal(f.requests.length, 0);
                assert.equal(await f.git('rev-parse', 'HEAD'), f.baseHead);
            });
        }
    }
});

test('an invalid article prevents image generation, conversion, commit, and push', async t => {
    const f = await fixture(t);
    f.faults.article = true;
    await assert.rejects(runBlog({ custom: SOURCE }, f.dependencies), /raw Markdown/);
    assert.equal(f.calls.some(call => call.command === 'bulkpixel' || call.args.includes('image_generation')), false);
    assert.equal(await f.git('rev-parse', 'HEAD'), f.baseHead);
    assert.ok(fs.existsSync(f.savedState()));
    const directory = path.dirname(f.savedState());
    assert.equal(fs.existsSync(path.join(directory, 'article.md')), false);
    const attempts = fs.readdirSync(directory).filter(name => /^article-attempt-.*\.md$/.test(name));
    assert.equal(attempts.length, 1);
    assert.equal(fs.readFileSync(path.join(directory, attempts[0]), 'utf8'), 'Not an article.');
});

test('an invalid response retries with the saved source and without selecting a new RSS article', async t => {
    const f = await fixture(t);
    f.env.DB_PATH = path.join(f.home, 'rss.db');
    fs.writeFileSync(f.env.DB_PATH, 'fixture');
    f.faults.article = true;
    await assert.rejects(runBlog({ mode: 'top' }, f.dependencies), /Codex did not return a publishable article/);
    const stateFile = f.savedState();
    const directory = path.dirname(stateFile);
    const invalidAttempt = fs.readdirSync(directory).find(name => /^article-attempt-.*\.md$/.test(name));
    const snapshot = fs.readFileSync(path.join(directory, 'source.json'), 'utf8');
    f.faults.article = false;
    let unexpectedSourceReads = 0;
    f.dependencies.fetchArticleSource = async () => {
        unexpectedSourceReads++;
        throw new Error('Must reuse the saved source.');
    };
    const result = await runBlog({ resume: stateFile }, f.dependencies);
    assert.equal(result.complete, true);
    assert.equal(result.input, SOURCE);
    assert.equal(f.sourceCalls.length, 1);
    assert.equal(unexpectedSourceReads, 0);
    assert.equal(f.calls.filter(call => call.command === 'no-bullshit-rss').length, 1);
    const generations = f.calls.filter(call => call.command === 'codex' && call.args.includes('--search'));
    assert.equal(generations.length, 2);
    for (const generation of generations) assert.ok(generation.options.input.includes(JSON.stringify(SOURCE_TEXT)));
    assert.equal(fs.readFileSync(path.join(directory, 'source.json'), 'utf8'), snapshot);
    assert.equal(fs.readFileSync(path.join(directory, invalidAttempt), 'utf8'), 'Not an article.');
    assert.equal(fs.readFileSync(path.join(directory, 'article.md'), 'utf8'), article());
});

test('a legacy URL-only run preserves a cached refusal and retries generation once on resume', async t => {
    const f = await fixture(t);
    f.env.DB_PATH = path.join(f.home, 'rss.db');
    fs.writeFileSync(f.env.DB_PATH, 'fixture');
    f.faults.articleGeneration = true;
    await assert.rejects(runBlog({ mode: 'top' }, f.dependencies), /Article backend unavailable/);
    const stateFile = f.savedState();
    const directory = path.dirname(stateFile);
    const refusal = 'Die verlinkte Quelle ist nicht abrufbar. Bitte füge den Artikeltext hier ein.';
    // Reproduce a run written by the old workflow: URL-only state, no source
    // snapshot, and a non-Markdown response already installed as article.md.
    fs.unlinkSync(path.join(directory, 'source.json'));
    fs.writeFileSync(path.join(directory, 'article.md'), refusal);
    const originalState = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    assert.equal(originalState.post, undefined);
    assert.equal(originalState.input, SOURCE);
    f.sourceCalls.length = 0;
    f.faults.articleGeneration = false;
    f.dependencies.hasCommand = command => ['git', 'codex', 'bulkpixel'].includes(command);
    const result = await runBlog({ resume: stateFile }, f.dependencies);
    assert.equal(result.complete, true);
    assert.equal(result.timestamp, originalState.timestamp);
    assert.equal(result.input, SOURCE);
    assert.equal(result.mode, 'top');
    assert.equal(f.sourceCalls.length, 1);
    assert.equal(f.calls.filter(call => call.command === 'no-bullshit-rss').length, 1);
    assert.equal(f.calls.filter(call => call.command === 'codex' && call.args.includes('--search')).length, 2);
    const backups = fs.readdirSync(directory).filter(name => /^article-invalid-.*\.md$/.test(name));
    assert.equal(backups.length, 1);
    assert.equal(fs.readFileSync(path.join(directory, backups[0]), 'utf8'), refusal);
    assert.ok(f.logs.some(message => message.includes('Retrying generation once')));
    const generation = f.calls.filter(call => call.command === 'codex' && call.args.includes('--search')).at(-1);
    assert.ok(generation.options.input.includes(JSON.stringify(SOURCE_TEXT)));
});

test('a failed direct source read preserves URL-based web research without invented source text', async t => {
    const f = await fixture(t);
    f.faults.sourceFailure = new Error('Source HTTP 403.');
    f.faults.article = true;
    await assert.rejects(runBlog({ custom: SOURCE }, f.dependencies), /raw Markdown/);
    assert.equal(f.sourceCalls.length, 1);
    const prompt = f.calls.find(call => call.command === 'codex' && call.args.includes('--search')).options.input;
    assert.ok(prompt.includes(SOURCE));
    assert.ok(prompt.includes('Websuche'));
    assert.equal(prompt.includes('Selected source title'), false);
    assert.equal(prompt.includes(SOURCE_TEXT), false);
    assert.equal(prompt.includes('Direkt abgerufene Quelle (JSON-Daten'), false);
    assert.equal(fs.existsSync(path.join(path.dirname(f.savedState()), 'source.json')), false);
    assert.ok(f.logs.some(message => message.includes('Source HTTP 403') && message.includes('Codex will try web search')));
    assert.equal(f.calls.some(call => call.command === 'bulkpixel' || call.args.includes('image_generation')), false);
    assert.equal(await f.git('rev-parse', 'HEAD'), f.baseHead);
});

test('invalid or missing prepared source files stop resume without regenerating or overwriting them', async t => {
    for (const change of ['invalid', 'missing']) {
        await t.test(change, async t => {
            const f = await fixture(t);
            f.faults.image = true;
            await assert.rejects(runBlog({ custom: SOURCE }, f.dependencies), /Image backend/);
            const stateFile = f.savedState();
            const rawPost = path.join(path.dirname(stateFile), 'article.md');
            const saved = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
            assert.ok(saved.post);
            const edited = 'User edits with incomplete front matter must be preserved.';
            if (change === 'invalid') fs.writeFileSync(rawPost, edited);
            else fs.unlinkSync(rawPost);
            const generations = f.calls.filter(call => call.command === 'codex' && call.args.includes('--search')).length;
            f.faults.image = false;
            await assert.rejects(runBlog({ resume: stateFile }, f.dependencies), /after preparation/);
            assert.equal(f.calls.filter(call => call.command === 'codex' && call.args.includes('--search')).length, generations);
            assert.equal(f.sourceCalls.length, 1);
            if (change === 'invalid') assert.equal(fs.readFileSync(rawPost, 'utf8'), edited);
            else assert.equal(fs.existsSync(rawPost), false);
            assert.equal(await f.git('rev-parse', 'HEAD'), f.baseHead);
        });
    }
});

test('an article created manually during generation is preserved alongside the generated response', async t => {
    const f = await fixture(t);
    const originalRun = f.dependencies.run;
    const manual = 'A manually started article must not be replaced.';
    f.dependencies.run = async (command, args, options) => {
        const result = await originalRun(command, args, options);
        if (command === 'codex' && args.includes('--search')) {
            const output = args[args.indexOf('--output-last-message') + 1];
            fs.writeFileSync(path.join(path.dirname(output), 'article.md'), manual);
        }
        return result;
    };
    await assert.rejects(runBlog({ custom: SOURCE }, f.dependencies), /appeared during generation and was preserved/);
    const directory = path.dirname(f.savedState());
    assert.equal(fs.readFileSync(path.join(directory, 'article.md'), 'utf8'), manual);
    const attempts = fs.readdirSync(directory).filter(name => /^article-attempt-.*\.md$/.test(name));
    assert.equal(attempts.length, 1);
    assert.equal(fs.readFileSync(path.join(directory, attempts[0]), 'utf8'), article());
    assert.equal(f.calls.some(call => call.command === 'bulkpixel' || call.args.includes('image_generation')), false);
    assert.equal(await f.git('rev-parse', 'HEAD'), f.baseHead);
});

test('an image failure leaves the old Downloads image intact and resumes without regenerating the article', async t => {
    const f = await fixture(t);
    write(f.home, 'Downloads/header.png', 'previous image');
    f.faults.image = true;
    await assert.rejects(runBlog({ custom: SOURCE }, f.dependencies), /Image backend/);
    assert.ok(f.logs.some(message => message.startsWith('Continue with: npm run blog:custom:url -- --resume ')));
    assert.equal(fs.readFileSync(path.join(f.home, 'Downloads', 'header.png'), 'utf8'), 'previous image');
    assert.equal(await f.git('rev-parse', 'HEAD'), f.baseHead);
    f.faults.image = false;
    await runBlog({ resume: f.savedState() }, f.dependencies);
    assert.equal(f.calls.filter(call => call.command === 'codex' && call.args.includes('--search')).length, 1);
    const backups = fs.readdirSync(path.join(f.home, 'Downloads')).filter(name => name.startsWith('header-backup-'));
    assert.equal(backups.length, 1);
    assert.equal(fs.readFileSync(path.join(f.home, 'Downloads', backups[0]), 'utf8'), 'previous image');
});

test('a transcription run resumes generation with its saved text and mode without either source CLI', async t => {
    const f = await fixture(t);
    f.faults.articleGeneration = true;
    await assert.rejects(runBlog({ mode: 'transcription' }, f.dependencies), /Article backend/);
    assert.equal(await f.git('rev-parse', 'HEAD'), f.baseHead);
    const stateFile = f.savedState();
    const saved = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    assert.equal(saved.mode, 'transcription');
    assert.equal(saved.input, TRANSCRIPTION);
    assert.ok(f.logs.some(message => message.startsWith('Continue with: npm run blog:transcription -- --resume ')));
    f.faults.articleGeneration = false;
    f.faults.transcriptionFailure = new Error('Must not choose a second transcript.');
    f.env.DB_PATH = path.join(f.home, 'missing-rss.db');
    const resumeCommands = [];
    f.dependencies.hasCommand = command => {
        resumeCommands.push(command);
        return ['git', 'codex', 'bulkpixel'].includes(command);
    };
    const result = await runBlog({ mode: 'feed', resume: stateFile }, f.dependencies);
    assert.equal(result.complete, true);
    assert.equal(result.mode, 'transcription');
    assert.equal(result.input, TRANSCRIPTION);
    assert.equal(resumeCommands.some(command => command === 'PineFetch' ||
        path.basename(command) === 'PineFetch' || command === 'no-bullshit-rss'), false);
    assert.equal(f.calls.filter(call => call.command === 'PineFetch').length, 1);
    assert.equal(f.calls.some(call => call.command === 'no-bullshit-rss'), false);
    assert.equal(f.sourceCalls.length, 0);
    const generations = f.calls.filter(call => call.command === 'codex' && call.args.includes('--search'));
    assert.equal(generations.length, 2);
    for (const generation of generations) {
        assert.ok(generation.options.input.includes('Ausgewählte PineFetch-Transkription (vollständig):'));
        assert.ok(generation.options.input.includes(TRANSCRIPTION));
    }
    assert.equal(f.calls.filter(call => call.command === 'codex' && call.args.includes('image_generation')).length, 1);
});

test('URL-only RSS runs resume without selecting or generating again and keep the saved mode', async t => {
    for (const mode of ['top', 'feed:random', 'top:random']) {
        await t.test(mode, async t => {
            const f = await fixture(t);
            f.env.DB_PATH = path.join(f.home, 'rss.db');
            fs.writeFileSync(f.env.DB_PATH, 'fixture');
            f.faults.conversion = true;
            await assert.rejects(runBlog({ mode }, f.dependencies), /BulkPixel/);
            assert.equal(await f.git('rev-parse', 'HEAD'), f.baseHead);
            const stateFile = f.savedState();
            const saved = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
            assert.equal(saved.mode, mode);
            assert.equal(saved.input, SOURCE);
            const resumeHint = `Continue with: npm run blog:${mode} -- --resume `;
            assert.ok(f.logs.some(message => message.startsWith(resumeHint)));
            // Resuming via the default mode must retain the saved selection and hint.
            await assert.rejects(runBlog({ mode: 'feed', resume: stateFile }, f.dependencies), /BulkPixel/);
            assert.ok(f.logs.at(-1).startsWith(resumeHint));
            if (mode === 'top') {
                // Older saved runs have no mode; their error hint must remain runnable.
                delete saved.mode;
                fs.writeFileSync(stateFile, JSON.stringify(saved));
                await assert.rejects(runBlog({ resume: stateFile }, f.dependencies), /BulkPixel/);
                assert.ok(f.logs.at(-1).startsWith('Continue with: npm run blog:feed -- --resume '));
            }
            f.faults.conversion = false;
            const result = await runBlog({ resume: stateFile }, f.dependencies);
            assert.equal(result.complete, true);
            if (mode !== 'top') assert.equal(result.mode, mode);
            assert.equal(result.input, SOURCE);
            assert.equal(f.calls.filter(call => call.command === 'no-bullshit-rss').length, 1);
            assert.equal(f.calls.filter(call => call.command === 'codex' && call.args.includes('--search')).length, 1);
            assert.equal(f.calls.filter(call => call.command === 'codex' && call.args.includes('image_generation')).length, 1);
        });
    }
});

test('an IndexNow failure reports a pushed run and resume does not commit or push again', async t => {
    const f = await fixture(t);
    f.faults.indexNow = true;
    await assert.rejects(runBlog({ custom: SOURCE }, f.dependencies), /IndexNow.*503/);
    const stateFile = f.savedState();
    const saved = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    assert.equal(saved.pushed, true);
    assert.equal(saved.complete, undefined);
    assert.ok(f.logs.some(message => message.includes('already pushed')));
    // Subsequent edits to a Linkhub file must not block the notification for
    // an already pushed article or cause these edits to be committed.
    write(f.root, '_layouts/linkhub.html', 'later local work');
    f.faults.indexNow = false;
    await runBlog({ resume: stateFile }, f.dependencies);
    assert.equal(f.calls.filter(call => call.command === 'git' && call.args.includes('commit')).length, 1);
    assert.equal(f.calls.filter(call => call.command === 'git' && call.args.includes('push')).length, 1);
    assert.equal(f.calls.filter(call => call.command === 'bulkpixel').length, 2);
    assert.equal(JSON.parse(fs.readFileSync(stateFile, 'utf8')).complete, true);
    assert.equal(fs.readFileSync(path.join(f.root, '_layouts/linkhub.html'), 'utf8'), 'later local work');
});

test('a failed push resumes the saved commit without repeating generation or commit', async t => {
    const f = await fixture(t);
    f.faults.push = true;
    await assert.rejects(runBlog({ custom: SOURCE }, f.dependencies), /push rejected/);
    const stateFile = f.savedState();
    const saved = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    assert.ok(saved.commit);
    assert.equal(saved.pushed, undefined);
    assert.equal(f.requests.length, 0);
    f.faults.push = false;
    await runBlog({ resume: stateFile }, f.dependencies);
    assert.equal(f.calls.filter(call => call.command === 'git' && call.args.includes('commit')).length, 1);
    assert.equal(f.calls.filter(call => call.command === 'codex' && call.args.includes('--search')).length, 1);
    assert.equal(await f.git('--git-dir', f.remote, 'rev-parse', 'refs/heads/main'), saved.commit);
});

test('other unpublished commits are not automatically pushed', async t => {
    const f = await fixture(t);
    write(f.root, 'local-only.txt', 'unpublished work');
    await f.git('add', 'local-only.txt');
    await f.git('commit', '--only', '-m', 'Unpublished user commit', '--', 'local-only.txt');
    await assert.rejects(runBlog({ custom: SOURCE }, f.dependencies), /HEAD and upstream differ/);
    assert.equal(f.calls.some(call => call.args.includes('--search') || call.args.includes('push')), false);
    assert.equal(await f.git('--git-dir', f.remote, 'rev-parse', 'refs/heads/main'), f.baseHead);
});

test('dirty Linkhub outputs stop before paid generation and remain untouched', async t => {
    const f = await fixture(t);
    write(f.root, '_layouts/linkhub.html', 'user changed linkhub');
    await assert.rejects(runBlog({ custom: SOURCE }, f.dependencies), /Linkhub files contain local changes/);
    assert.equal(fs.readFileSync(path.join(f.root, '_layouts/linkhub.html'), 'utf8'), 'user changed linkhub');
    assert.equal(f.calls.some(call => call.args.includes('--search')), false);
});

test('preexisting filenames are never overwritten', async t => {
    const f = await fixture(t);
    const existing = prepareArticle(article(), TIMESTAMP, SITE).post;
    write(f.root, existing, 'previous article');
    await assert.rejects(runBlog({ custom: SOURCE }, f.dependencies), /already exists/);
    assert.equal(fs.readFileSync(path.join(f.root, existing), 'utf8'), 'previous article');
    assert.equal(f.calls.some(call => call.args.includes('image_generation')), false);
});

test('workflow waits 120 seconds after pushing and retries deployment every 10 seconds', async t => {
    const f = await fixture(t);
    const attempts = [];
    const fetchImpl = f.dependencies.fetchImpl;
    f.dependencies.fetchImpl = async (url, options = {}) => {
        if (!options.method && !url.endsWith('.txt')) {
            attempts.push(f.dependencies.clock());
            if (attempts.length < 3) return new Response('', { status: 404 });
        }
        return fetchImpl(url, options);
    };
    const result = await runBlog({ custom: SOURCE }, f.dependencies);
    assert.equal(result.complete, true);
    assert.deepEqual(attempts, [120_000, 130_000, 140_000]);
    assert.ok(f.logs.some(message => message.includes('Waiting 120 seconds')));
    assert.equal(f.requests.filter(request => request.options.method === 'POST').length, 1);
});

test('deployment polling rejects a successful HTTP response for the wrong page', async () => {
    let time = 0;
    let requests = 0;
    const url = `${SITE}/blog/new-post/`;
    await waitForPublication({
        url, indexNow: null, timeoutMs: 100, intervalMs: 5, clock: () => time, log: () => {},
        sleep: async ms => { time += ms; },
        fetchImpl: async () => new Response(`<link rel="canonical" href="${++requests < 3 ? SITE : url}">`),
    });
    assert.equal(requests, 3);
    assert.ok(time > 0);
});

test('IndexNow rejects a lookalike host before issuing an HTTP request', async () => {
    await assert.rejects(submitIndexNow(`${SITE}.attacker.test/blog/post/`, {
        host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, endpoint: 'https://api.indexnow.org/indexnow',
    }, async () => { throw new Error('Must not be called'); }), /host mismatch/);
});

test('social links preserve special characters and use the article title', () => {
    const prepared = prepareArticle(article(), TIMESTAMP, SITE);
    const urls = shareUrls(prepared);
    assert.ok(new URL(urls[1]).searchParams.get('text').includes('Ein Post mit & und #'));
    assert.equal(new URL(urls[3]).searchParams.get('title'), prepared.data.title);
    assert.equal(new URL(urls[3]).searchParams.get('url'), prepared.url);
});
