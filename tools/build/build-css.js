import fs from "node:fs";
import path from "node:path";
import { Liquid } from "liquidjs";
import site from "../../_data/site.json" with { type: "json" };

const projectRoot = process.cwd();
const sourcePath = path.join(projectRoot, "assets", "css", "main.css");
const outputPath = path.join(projectRoot, "_site", "assets", "css", "main.css");
const sourceRoot = path.dirname(sourcePath);

function expandIncludes(source, parentDirectory = sourceRoot, stack = []) {
  return source.replace(/{%\s*include_relative\s+([^\s%]+)\s*%}/g, (_match, includePath) => {
    const resolved = path.resolve(parentDirectory, includePath);
    if (!resolved.startsWith(`${sourceRoot}${path.sep}`)) throw new Error(`CSS include escapes source root: ${includePath}`);
    if (stack.includes(resolved)) throw new Error(`Circular CSS include: ${[...stack, resolved].join(" -> ")}`);
    const included = fs.readFileSync(resolved, "utf8");
    return expandIncludes(included, path.dirname(resolved), [...stack, resolved]);
  });
}

const withoutFrontmatter = fs.readFileSync(sourcePath, "utf8").replace(/^---\s*\n---\s*\n/, "");
const assembled = expandIncludes(withoutFrontmatter);
const liquid = new Liquid({ strictFilters: true, jsTruthy: true });
const rendered = liquid.parseAndRenderSync(assembled, { site });

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, rendered);
console.log(`[build-css] Assembled ${path.relative(projectRoot, outputPath)} (${rendered.length} bytes).`);

