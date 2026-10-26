import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import sharp from 'sharp';
import { saveGeneratedBlogpostImage } from '../blogposts/save-generated-blogpost-image.mjs';

function workspace(t) {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'blogpost-image-test-'));
    t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
    return directory;
}

function fixture() {
    return sharp({ create: { width: 32, height: 18, channels: 3, background: '#567890' } });
}

test('normalizes a generated image to an actual PNG in Downloads', async t => {
    const directory = workspace(t);
    const source = path.join(directory, 'generated.png');
    const destination = path.join(directory, 'Downloads', 'header.png');
    // The model may copy a JPEG to the requested PNG filename.
    await fixture().jpeg().toFile(source);

    const result = await saveGeneratedBlogpostImage(source, destination);
    const metadata = await sharp(destination).metadata();
    assert.equal(metadata.format, 'png');
    assert.equal(metadata.width, 32);
    assert.equal(metadata.height, 18);
    assert.equal(result.backup, null);
    assert.deepEqual(fs.readdirSync(path.dirname(destination)), ['header.png']);
});

test('preserves an existing header in a separate backup before replacement', async t => {
    const directory = workspace(t);
    const source = path.join(directory, 'generated.png');
    const destination = path.join(directory, 'header.png');
    const previous = Buffer.from('previous header contents');
    fs.writeFileSync(destination, previous);
    await fixture().png().toFile(source);

    const result = await saveGeneratedBlogpostImage(source, destination);
    assert.ok(result.backup);
    assert.notEqual(result.backup, destination);
    assert.deepEqual(fs.readFileSync(result.backup), previous);
    assert.equal((await sharp(destination).metadata()).format, 'png');
});

test('rejects a textual model response without replacing an existing header', async t => {
    const directory = workspace(t);
    const source = path.join(directory, 'generated.png');
    const destination = path.join(directory, 'header.png');
    fs.writeFileSync(source, 'I could not generate the image.');
    fs.writeFileSync(destination, 'previous header');

    await assert.rejects(saveGeneratedBlogpostImage(source, destination));
    assert.equal(fs.readFileSync(destination, 'utf8'), 'previous header');
    assert.deepEqual(fs.readdirSync(directory).sort(), ['generated.png', 'header.png']);
});

test('rejects a missing output without creating a header', async t => {
    const directory = workspace(t);
    const destination = path.join(directory, 'header.png');
    await assert.rejects(saveGeneratedBlogpostImage(path.join(directory, 'missing.png'), destination));
    assert.equal(fs.existsSync(destination), false);
});

test('rejects an SVG substitute without replacing an existing header', async t => {
    const directory = workspace(t);
    const source = path.join(directory, 'generated.png');
    const destination = path.join(directory, 'header.png');
    fs.writeFileSync(source, '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="18"><rect width="32" height="18" fill="red"/></svg>');
    fs.writeFileSync(destination, 'previous header');

    await assert.rejects(saveGeneratedBlogpostImage(source, destination), /single generated PNG/);
    assert.equal(fs.readFileSync(destination, 'utf8'), 'previous header');
});

test('rejects a symlink to an old image', async t => {
    const directory = workspace(t);
    const original = path.join(directory, 'old.png');
    const source = path.join(directory, 'generated.png');
    const destination = path.join(directory, 'header.png');
    await fixture().png().toFile(original);
    fs.symlinkSync(original, source);

    await assert.rejects(saveGeneratedBlogpostImage(source, destination), /regular image file/);
    assert.equal(fs.existsSync(destination), false);
});
