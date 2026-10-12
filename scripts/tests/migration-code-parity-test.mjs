import assert from "node:assert/strict";
import fs from "node:fs";
import { parseDocument } from "htmlparser2";
import { compareArticleCode } from "../../tools/qa/article-code-parity.js";

const sourceFile = "collections/_posts/2026-04-02-wie-werde-ich-pr-mails-und-pr-scam-los.md";
const filename = "blog/2026-04-02-wie-werde-ich-pr-mails-und-pr-scam-los/index.html";
const source = fs.readFileSync(sourceFile, "utf8").match(/{% capture pr_cleanup_request_template %}([\s\S]*?){% endcapture %}/)?.[1].trim();
assert.ok(source, "The unchanged PR template source must exist");
const escape = value => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const paragraphs = source.split("\n\n");
const malformed = `${escape(paragraphs[0])}<p></p>\n${paragraphs.slice(1).map(value => `<p>${escape(value)}</p>`).join("\n")}`;
const snippet = value => `<div data-copy-snippet><pre><code data-copy-source>${value}</code></pre></div>`;
const regular = '<pre><code>Keep  two spaces.\n\tKeep this tab.\n\nKeep a blank line.</code></pre>';
const tree = html => parseDocument(`<div class="content">${html}</div>`);
const reference = tree(regular + snippet(malformed));
const candidate = tree(regular + snippet(escape(source)));
assert.deepEqual(compareArticleCode(reference, candidate, filename), []);
for (const [reason, changed] of [
  ["lost blank line", source.replace("Hello,\n\n", "Hello,\n")],
  ["altered source text", source.replace("Hello,", "Hey,")],
  ["altered indentation", source.replace("Full name:", "  Full name:")],
]) {
  assert.ok(compareArticleCode(reference, tree(regular + snippet(escape(changed))), filename).length, reason);
}
assert.ok(compareArticleCode(reference, tree(regular + snippet(`${escape(source)}<p></p>`)), filename).length, "Malformed repaired source must fail even with equal text");
assert.ok(compareArticleCode(tree(regular + snippet(malformed.replace("Hello,", "Corrupted,"))), candidate, filename).length, "A corrupted reference cannot be excused by its known path");
assert.ok(compareArticleCode(reference, candidate, "blog/unrelated/index.html").length, "The source-restoration rule must not affect unrelated articles");
assert.ok(compareArticleCode(reference, tree(regular.replace("Keep  two", "Keep two") + snippet(escape(source))), filename).length, "Regular code whitespace remains exact");
assert.ok(compareArticleCode(reference, tree(snippet(escape(source))), filename).length, "Code-block count remains exact");
assert.deepEqual(compareArticleCode(tree(regular), tree(regular), filename), []);
console.log("[migration-code-parity-test] PASS: one source-exact legacy paragraph repair; lost newlines, changed text/indentation, malformed sources, unrelated blocks and ordinary whitespace changes rejected.");
