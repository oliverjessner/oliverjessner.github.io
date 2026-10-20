import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import source from "./storybook-source.json" with { type: "json" };

const projectRoot = fileURLToPath(new URL("../../", import.meta.url));
const cacheRoot = path.join(projectRoot, ".cache", "oj-storybook");
const sourceRoot = path.join(cacheRoot, source.revision);
export const storybookDirectory = path.join(sourceRoot, "storybook-static");

function run(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    stdio: "inherit",
    env: { ...process.env, CI: "1", STORYBOOK_DISABLE_TELEMETRY: "1" },
  });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`Storybook build failed: ${command} ${args.join(" ")}`);
}

async function exists(file) {
  try { await fs.access(file); return true; } catch { return false; }
}

export async function buildDesignSystemStorybook() {
  const websitePackage = JSON.parse(await fs.readFile(path.join(projectRoot, "package.json"), "utf8"));
  if (websitePackage.dependencies["oj-designsystem"] !== source.version) {
    throw new Error("Update tools/build/storybook-source.json to match the website's oj-designsystem version.");
  }
  const marker = path.join(sourceRoot, "website-build.json");
  const cacheKey = JSON.stringify({ ...source, integration: 1 });
  if (await exists(marker) && await fs.readFile(marker, "utf8") === cacheKey
      && await exists(path.join(storybookDirectory, "index.html"))
      && await exists(path.join(storybookDirectory, "iframe.html"))
      && await exists(path.join(storybookDirectory, "index.json"))) {
    return storybookDirectory;
  }

  console.log(`[storybook] Building oj-designsystem ${source.version} (${source.revision.slice(0, 7)}).`);
  await fs.mkdir(cacheRoot, { recursive: true });
  // Prepare outside Eleventy's input and publish only a successful build.
  const staging = await fs.mkdtemp(path.join(cacheRoot, "build-"));
  try {
    const archiveUrl = `https://codeload.github.com/oliverjessner/oj-designsystem/tar.gz/${source.revision}`;
    const response = await fetch(archiveUrl, { signal: AbortSignal.timeout(60_000) });
    if (!response.ok) throw new Error(`Cannot download Storybook source: HTTP ${response.status}`);
    const archive = Buffer.from(await response.arrayBuffer());
    const checksum = createHash("sha256").update(archive).digest("hex");
    if (checksum !== source.archiveSha256) throw new Error("Storybook source archive checksum does not match the pinned revision.");
    const archivePath = path.join(staging, "source.tar.gz");
    await fs.writeFile(archivePath, archive);
    run("tar", ["-xzf", archivePath, "-C", staging, "--strip-components=1"], projectRoot);
    await fs.rm(archivePath);
    const sourcePackage = JSON.parse(await fs.readFile(path.join(staging, "package.json"), "utf8"));
    if (sourcePackage.name !== "oj-designsystem" || sourcePackage.version !== source.version) {
      throw new Error(`Storybook source ${source.revision.slice(0, 7)} contains ${sourcePackage.name}@${sourcePackage.version}; expected oj-designsystem@${source.version}. Update revision and archiveSha256 in tools/build/storybook-source.json together with version.`);
    }
    const npm = process.platform === "win32" ? "npm.cmd" : "npm";
    run(npm, ["ci", "--no-audit", "--no-fund"], staging);
    run(npm, ["run", "build-storybook"], staging);

    const output = path.join(staging, "storybook-static");
    const index = JSON.parse(await fs.readFile(path.join(output, "index.json"), "utf8"));
    if (!Object.keys(index.entries || {}).length) throw new Error("Storybook has no component stories.");
    for (const name of ["index.html", "iframe.html"]) {
      const file = path.join(output, name);
      const html = await fs.readFile(file, "utf8");
      // The documentation app is separate from the editorial search index.
      await fs.writeFile(file, html.replace(/<html\b/i, '<html data-pagefind-ignore="all"')
        .replace(/<head>/i, '<head><meta name="robots" content="noindex, follow">'));
    }
    await fs.writeFile(path.join(output, "source.json"), `${JSON.stringify(source, null, 2)}\n`);
    await fs.writeFile(path.join(staging, "website-build.json"), cacheKey);
    await fs.rm(sourceRoot, { recursive: true, force: true });
    await fs.rename(staging, sourceRoot);
    console.log(`[storybook] Built ${Object.keys(index.entries).length} stories.`);
    return storybookDirectory;
  } catch (error) {
    await fs.rm(staging, { recursive: true, force: true });
    throw error;
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await buildDesignSystemStorybook();
}
