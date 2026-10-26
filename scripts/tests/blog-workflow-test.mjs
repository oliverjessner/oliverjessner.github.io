import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import test from 'node:test';
import yaml from 'js-yaml';
import sharp from 'sharp';
import {
    articleSlug, parseArguments, prepareArticle, runBlog, shareUrls, sourceUrl,
    submitIndexNow, viennaTimestamp, waitForPublication,
} from '../blogposts/blog.mjs';

const execute = promisify(execFile);
const KEY = 'test-indexnow-key-12345678';
const SITE = 'https://blog.example.test';
const SOURCE = 'https://source.example.test/article?x=1&y=2';
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
        'DB_PATH', 'BLOG_DEPLOY_TIMEOUT', 'BLOG_DEPLOY_INTERVAL', 'CODEX_BLOG_MODEL', 'CODEX_BLOG_IMAGE_MODEL',
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
    const logs = [];
    let time = 0;
    const faults = { image: false, conversion: false, indexNow: false, selection: false, article: false, push: false };
    const run = async (command, args, options = {}) => {
        calls.push({ command, args, options });
        if (command === 'git') {
            if (faults.push && args[2] === 'push') throw new Error('Git push rejected.');
            return (await execute(command, args, { cwd: root, env })).stdout;
        }
        if (command === 'codex' && args[0] === 'exec' && args[1] === '--help') return '--ignore-user-config';
        if (command === 'no-bullshit-rss') return faults.selection ? '' : `${SOURCE}\tSelected RSS title\n`;
        if (command === 'codex') {
            if (args.includes('image_generation')) {
                if (faults.image) throw new Error('Image backend unavailable.');
                const workspace = args[args.indexOf('--cd') + 1];
                await sharp({ create: { width: 160, height: 90, channels: 3, background: '#567890' } })
                    .png().toFile(path.join(workspace, 'header.png'));
            } else {
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
        now: () => new Date('2026-10-26T12:00:00Z'), log: message => logs.push(message),
        clock: () => time,
        sleep: async (ms, signal) => { signal?.throwIfAborted(); time += ms; },
    };
    const savedState = () => {
        const cache = path.join(root, '.cache', 'blog');
        const name = fs.readdirSync(cache).find(candidate => fs.existsSync(path.join(cache, candidate, 'state.json')));
        return path.join(cache, name, 'state.json');
    };
    return { root, remote, home, env, git, baseHead, calls, requests, logs, faults, dependencies, savedState };
}

test('custom URLs bypass selection and invalid or conflicting arguments are rejected', () => {
    assert.equal(parseArguments(['--custom', SOURCE]).custom, SOURCE);
    assert.equal(parseArguments([`--custom=${SOURCE}`]).custom, SOURCE);
    for (const args of [['--custom'], ['--custom', '--help'], ['--wat'], ['--custom', SOURCE, '--custom', SOURCE],
        ['--custom', SOURCE, '--resume', '/tmp/state.json']]) assert.throws(() => parseArguments(args));
    for (const value of ['file:///etc/passwd', 'javascript:alert(1)', 'https://user:pass@example.test/', 'not a url']) {
        assert.throws(() => sourceUrl(value));
    }
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

test('custom workflow converts with BulkPixel, pushes only generated files, and submits the exact live URL', async t => {
    const f = await fixture(t);
    const result = await runBlog({ custom: SOURCE }, f.dependencies);
    assert.equal(result.complete, true);
    assert.equal(f.calls.some(call => call.command === 'no-bullshit-rss'), false);
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
    await runBlog({}, f.dependencies);
    const selection = f.calls.find(call => call.command === 'no-bullshit-rss');
    assert.deepEqual(selection.args, ['articles', 'last', '100', '--choose', '--url', '--title']);
    assert.equal(selection.options.env.DB_PATH, database);
    assert.equal(selection.options.input, undefined);
    assert.ok(f.calls.find(call => call.command === 'codex' && call.args.includes('--search')).options.input.includes('Selected RSS title'));
});

test('an empty RSS selection stops before generation or publication', async t => {
    const f = await fixture(t);
    f.env.DB_PATH = path.join(f.home, 'rss.db');
    fs.writeFileSync(f.env.DB_PATH, 'fixture');
    f.faults.selection = true;
    await assert.rejects(runBlog({}, f.dependencies), /no article/);
    assert.equal(f.calls.some(call => call.command === 'bulkpixel' || call.args.includes('--search')), false);
    assert.equal(await f.git('rev-parse', 'HEAD'), f.baseHead);
});

test('an invalid article prevents image generation, conversion, commit, and push', async t => {
    const f = await fixture(t);
    f.faults.article = true;
    await assert.rejects(runBlog({ custom: SOURCE }, f.dependencies), /raw Markdown/);
    assert.equal(f.calls.some(call => call.command === 'bulkpixel' || call.args.includes('image_generation')), false);
    assert.equal(await f.git('rev-parse', 'HEAD'), f.baseHead);
    assert.ok(fs.existsSync(f.savedState()));
});

test('an image failure leaves the old Downloads image intact and resumes without regenerating the article', async t => {
    const f = await fixture(t);
    write(f.home, 'Downloads/header.png', 'previous image');
    f.faults.image = true;
    await assert.rejects(runBlog({ custom: SOURCE }, f.dependencies), /Image backend/);
    assert.equal(fs.readFileSync(path.join(f.home, 'Downloads', 'header.png'), 'utf8'), 'previous image');
    assert.equal(await f.git('rev-parse', 'HEAD'), f.baseHead);
    f.faults.image = false;
    await runBlog({ resume: f.savedState() }, f.dependencies);
    assert.equal(f.calls.filter(call => call.command === 'codex' && call.args.includes('--search')).length, 1);
    const backups = fs.readdirSync(path.join(f.home, 'Downloads')).filter(name => name.startsWith('header-backup-'));
    assert.equal(backups.length, 1);
    assert.equal(fs.readFileSync(path.join(f.home, 'Downloads', backups[0]), 'utf8'), 'previous image');
});

test('BulkPixel failures stop publication and completed generations are reused on resume', async t => {
    const f = await fixture(t);
    f.faults.conversion = true;
    await assert.rejects(runBlog({ custom: SOURCE }, f.dependencies), /BulkPixel/);
    assert.equal(await f.git('rev-parse', 'HEAD'), f.baseHead);
    f.faults.conversion = false;
    await runBlog({ resume: f.savedState() }, f.dependencies);
    assert.equal(f.calls.filter(call => call.command === 'codex' && call.args.includes('--search')).length, 1);
    assert.equal(f.calls.filter(call => call.command === 'codex' && call.args.includes('image_generation')).length, 1);
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
