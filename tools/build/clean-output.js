import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const outputDirectory = path.resolve(projectRoot, "_site");
const relative = path.relative(projectRoot, outputDirectory);

if (relative !== "_site" || path.dirname(outputDirectory) !== projectRoot) {
  throw new Error(`Refusing to clean unexpected output directory: ${outputDirectory}`);
}

fs.rmSync(outputDirectory, { recursive: true, force: true });
console.log(`[clean-output] Removed generated output: ${relative}`);

