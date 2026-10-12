import fs from "node:fs";
import path from "node:path";
import { Liquid } from "liquidjs";
import site from "../../_data/site.json" with { type: "json" };

const projectRoot = process.cwd();
const sourceRoot = path.join(projectRoot, "assets", "css");
const outputRoot = path.join(projectRoot, "_site", "assets", "css");
const entrypoints = ["main.css", "side-projects-legacy.css"];

function expandIncludes(source, parentDirectory = sourceRoot, stack = []) {
  return source.replace(/{%\s*include_relative\s+([^\s%]+)\s*%}/g, (_match, includePath) => {
    const resolved = path.resolve(parentDirectory, includePath);
    if (!resolved.startsWith(`${sourceRoot}${path.sep}`)) throw new Error(`CSS include escapes source root: ${includePath}`);
    if (stack.includes(resolved)) throw new Error(`Circular CSS include: ${[...stack, resolved].join(" -> ")}`);
    const included = fs.readFileSync(resolved, "utf8");
    return expandIncludes(included, path.dirname(resolved), [...stack, resolved]);
  });
}

const liquid = new Liquid({ strictFilters: true, jsTruthy: true });
fs.mkdirSync(outputRoot, { recursive: true });
for (const entrypoint of entrypoints) {
  const sourcePath = path.join(sourceRoot, entrypoint);
  const outputPath = path.join(outputRoot, entrypoint);
  const withoutFrontmatter = fs.readFileSync(sourcePath, "utf8").replace(/^---\s*\n---\s*\n/, "");
  const assembled = expandIncludes(withoutFrontmatter);
  const rendered = liquid.parseAndRenderSync(assembled, { site });
  fs.writeFileSync(outputPath, rendered);
  console.log(`[build-css] Assembled ${path.relative(projectRoot, outputPath)} (${rendered.length} bytes).`);
}
