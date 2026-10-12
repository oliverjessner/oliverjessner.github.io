import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../../", import.meta.url));
const destination = path.join(projectRoot, "assets", "vendor", "oj-designsystem");

async function filesBelow(directory, relative = "") {
  let entries;
  try {
    entries = await fs.readdir(path.join(directory, relative), { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
  const files = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const name = path.join(relative, entry.name);
    if (entry.isDirectory()) files.push(...await filesBelow(directory, name));
    else if (entry.isFile()) files.push(name);
    else throw new Error(`Unexpected symbolic link or special file in designsystem distribution: ${name}`);
  }
  return files;
}

async function writeIfChanged(filename, bytes) {
  try {
    if ((await fs.readFile(filename)).equals(bytes)) return false;
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  await fs.mkdir(path.dirname(filename), { recursive: true });
  await fs.writeFile(filename, bytes);
  return true;
}

/** Synchronize the installed, locked package before Eleventy's asset copy. */
export async function syncDesignSystemAssets({ quiet = false } = {}) {
  let packagePath;
  try {
    packagePath = fileURLToPath(import.meta.resolve("oj-designsystem/package.json"));
  } catch {
    throw new Error("oj-designsystem is not installed. Run npm ci before building the website.");
  }
  const packageRoot = path.dirname(packagePath);
  const packageMetadata = JSON.parse(await fs.readFile(packagePath, "utf8"));
  const websitePackage = JSON.parse(await fs.readFile(path.join(projectRoot, "package.json"), "utf8"));
  const lock = JSON.parse(await fs.readFile(path.join(projectRoot, "package-lock.json"), "utf8"));
  const lockedPackage = lock.packages?.["node_modules/oj-designsystem"];
  if (packageMetadata.name !== "oj-designsystem" ||
      websitePackage.dependencies?.["oj-designsystem"] !== packageMetadata.version ||
      lockedPackage?.version !== packageMetadata.version || !lockedPackage.integrity) {
    throw new Error("oj-designsystem must use the same exact version in package.json, package-lock.json and node_modules. Run npm ci.");
  }

  const distribution = path.join(packageRoot, "dist");
  const sourceFiles = await filesBelow(distribution);
  const required = ["styles.css", "tokens.css", "fonts.css", "fontawesome.css", "index.js", "index.d.ts",
    "licenses/comfortaa-OFL.txt", "licenses/jetbrains-mono-OFL.txt", "licenses/fontawesome-free-LICENSE.txt"];
  for (const filename of required) {
    if (!sourceFiles.includes(filename.split("/").join(path.sep))) {
      throw new Error(`Incomplete oj-designsystem package: ${filename}`);
    }
  }

  const contents = new Map();
  for (const filename of sourceFiles) contents.set(filename, await fs.readFile(path.join(distribution, filename)));
  for (const filename of ["LICENSE", "THIRD-PARTY-NOTICES.md"]) {
    contents.set(filename, await fs.readFile(path.join(packageRoot, filename)));
  }
  for (const filename of ["styles.css", "tokens.css", "fonts.css", "fontawesome.css"]) {
    for (const match of contents.get(filename).toString("utf8").matchAll(/url\(["']?([^\s)"']+)["']?\)/g)) {
      const asset = path.normalize(path.join(path.dirname(filename), match[1]));
      if (!contents.has(asset)) throw new Error(`Missing local oj-designsystem CSS asset: ${match[1]}`);
    }
  }
  const manifest = {
    name: packageMetadata.name,
    version: packageMetadata.version,
    repository: packageMetadata.repository.url,
    artifact: lockedPackage.resolved,
    integrity: lockedPackage.integrity,
    files: Object.fromEntries([...contents].map(([filename, bytes]) => [filename.split(path.sep).join("/"), createHash("sha256").update(bytes).digest("hex")])),
  };
  contents.set("distribution.json", Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`));

  let changed = 0;
  for (const [filename, bytes] of contents) {
    if (await writeIfChanged(path.join(destination, filename), bytes)) changed += 1;
  }
  for (const filename of await filesBelow(destination)) {
    if (!contents.has(filename)) {
      await fs.unlink(path.join(destination, filename));
      changed += 1;
    }
  }
  // Unchanged files retain their timestamps, so a watch build cannot retrigger itself.
  if (!quiet || changed) console.log(`[designsystem] oj-designsystem ${packageMetadata.version}: ${contents.size} files, ${changed} updated.`);
  return { version: packageMetadata.version, files: contents.size, changed };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await syncDesignSystemAssets();
}
