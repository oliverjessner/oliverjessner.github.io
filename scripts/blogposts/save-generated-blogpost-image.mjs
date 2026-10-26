import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

export async function saveGeneratedBlogpostImage(source, destination) {
    if (!fs.lstatSync(source).isFile()) {
        throw new Error('Codex must produce a regular image file.');
    }

    const metadata = await sharp(source, { failOn: 'warning' }).metadata();
    if (!['png', 'jpeg', 'webp'].includes(metadata.format)
        || !metadata.width || !metadata.height || (metadata.pages ?? 1) > 1) {
        throw new Error('Expected a single generated PNG, JPEG, or WebP image.');
    }

    const directory = path.dirname(destination);
    fs.mkdirSync(directory, { recursive: true });
    const staging = fs.mkdtempSync(path.join(directory, '.blog-image-save-'));
    let backup = null;
    try {
        const normalized = path.join(staging, 'header.png');
        // Fully decode before touching an existing header. Re-encode because a
        // model may copy a JPEG/WebP file to the requested .png filename.
        await sharp(source, { failOn: 'warning' }).rotate().png().toFile(normalized);

        if (fs.lstatSync(destination, { throwIfNoEntry: false })) {
            const basename = path.basename(destination, path.extname(destination));
            const stamp = new Date().toISOString().replace(/[:.]/g, '-');
            backup = path.join(directory, `${basename}-backup-${stamp}-${randomUUID().slice(0, 8)}.png`);
            fs.copyFileSync(destination, backup, fs.constants.COPYFILE_EXCL);
        }

        // Same filesystem: readers see either the old file or the complete PNG.
        fs.renameSync(normalized, destination);
        return { destination, backup };
    } finally {
        fs.rmSync(staging, { recursive: true, force: true });
    }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    try {
        if (process.argv.length !== 4) {
            throw new Error('Usage: node save-generated-blogpost-image.mjs <source> <destination>');
        }
        const result = await saveGeneratedBlogpostImage(process.argv[2], process.argv[3]);
        if (result.backup) {
            console.log(`Previous image backed up at ${result.backup}`);
        }
    } catch (error) {
        console.error(`Could not save generated image: ${error.message}`);
        process.exitCode = 1;
    }
}
