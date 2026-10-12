import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../../", import.meta.url));
// A known reference-renderer defect, never a general whitespace exception.
const legacyCopyCaptures = new Map([
  ["blog/2026-04-02-wie-werde-ich-pr-mails-und-pr-scam-los/index.html", {
    source: "collections/_posts/2026-04-02-wie-werde-ich-pr-mails-und-pr-scam-los.md",
    capture: "pr_cleanup_request_template",
  }],
]);
function all(node, predicate) {
  const nodes = predicate(node) ? [node] : [];
  for (const child of node.children || []) nodes.push(...all(child, predicate));
  return nodes;
}
function text(node) {
  return node.type === "text" ? node.data : (node.children || []).map(text).join("");
}
const hasAttribute = (node, name) => Object.hasOwn(node.attribs || {}, name);
function directCopySource(pre) {
  const elements = (pre.children || []).filter(node => node.type === "tag");
  const code = elements.length === 1 && elements[0].name === "code" && hasAttribute(elements[0], "data-copy-source") && elements[0];
  return code && hasAttribute(pre.parent || {}, "data-copy-snippet") ? code : null;
}
function capturedSource(specification) {
  const source = fs.readFileSync(path.join(projectRoot, specification.source), "utf8");
  const expression = new RegExp(`{%\\s*capture\\s+${specification.capture}\\s*%}([\\s\\S]*?){%\\s*endcapture\\s*%}`);
  const capture = source.match(expression)?.[1];
  if (capture === undefined) throw new Error(`Known legacy copy capture missing: ${specification.source}`);
  return capture.trim();
}
function reconstructLegacyParagraphs(code) {
  const children = code.children || [];
  if (!children.some(node => node.name === "p") || children.some(node =>
    node.type !== "text" && (node.name !== "p" || node.children.some(child => child.type !== "text")))) return null;
  // The malformed renderer converted each blank-line-separated source
  // paragraph to a p child and left one separator newline outside it.
  // Retain every character/indent inside each paragraph; restore only those
  // explicit paragraph separators, then require exact source equality.
  return children.filter(node => node.type === "text" ? node.data.trim() !== "" : text(node) !== "")
    .map(text).join("\n\n");
}

/** Compare every code block exactly, with one verified source-restoration case. */
export function compareArticleCode(referenceContent, candidateContent, filename) {
  const referenceBlocks = all(referenceContent, node => node.name === "pre");
  const candidateBlocks = all(candidateContent, node => node.name === "pre");
  const errors = [];
  if (referenceBlocks.length !== candidateBlocks.length) return ["editorial code-block count changed"];
  const specification = legacyCopyCaptures.get(filename.split(path.sep).join("/"));
  for (let index = 0; index < referenceBlocks.length; index++) {
    const reference = referenceBlocks[index];
    const candidate = candidateBlocks[index];
    let expected = text(reference);
    const legacySource = specification && directCopySource(reference);
    if (legacySource && legacySource.children.some(node => node.name === "p")) {
      const captured = capturedSource(specification);
      if (reconstructLegacyParagraphs(legacySource) !== captured) {
        errors.push(`legacy copy block ${index + 1} does not reconstruct its unchanged source capture`);
        continue;
      }
      const candidateSource = directCopySource(candidate);
      if (!candidateSource || candidateSource.children.length !== 1 || candidateSource.children[0].type !== "text") {
        errors.push(`restored copy block ${index + 1} must contain one literal text source`);
        continue;
      }
      expected = captured;
    }
    if (text(candidate) !== expected) errors.push(`editorial code block ${index + 1} text/whitespace changed`);
  }
  return errors;
}
