import yaml from "js-yaml";
import fs from "node:fs";
import { spawnSync } from "node:child_process";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { syncDesignSystemAssets } from "./tools/build/sync-designsystem.js";
import { buildDesignSystemStorybook, storybookDirectory } from "./tools/build/build-storybook.js";
import {
  configureCompatibility,
  minifyHtml,
} from "./plugins/eleventy-compat.js";

export default function (eleventyConfig) {
  eleventyConfig.on("eleventy.before", async () => {
    await syncDesignSystemAssets({ quiet: true });
    await buildDesignSystemStorybook();
  });
  // Jekyll exposes all front matter below `page`; the compatibility computed
  // data intentionally augments Eleventy's reserved page object.
  eleventyConfig.setFreezeReservedData(false);
  eleventyConfig.setDataDeepMerge(true);

  // Ruby's YAML parser keeps the last value for duplicate keys. Preserve that
  // behavior for the small amount of legacy front matter that relies on it.
  eleventyConfig.setFrontMatterParsingOptions({
    engines: {
      yaml: (value) => {
        const data = yaml.load(value, { json: true }) || {};
        if (data.layout === null) delete data.layout;
        if (typeof data.permalink === "string" && !data.permalink.endsWith("/") && !/\.[a-z\d]+$/i.test(data.permalink)) {
          data.permalink = `${data.permalink}.html`;
        }
        for (const key of ["date", "last_modified_at"]) {
          if (typeof data[key] === "string") {
            const normalized = data[key].replace(/([+-]\d{4})\d$/, "$1");
            const parsed = new Date(normalized);
            if (!Number.isNaN(parsed.valueOf())) data[key] = parsed;
          }
        }
        return data;
      },
    },
  });

  configureCompatibility(eleventyConfig);
  eleventyConfig.addPlugin(syntaxHighlight);

  // Eleventy only treats Markdown and HTML as Liquid templates by default.
  // Keep the project-owned RSS, sitemap, and robots templates executable.
  eleventyConfig.addExtension("xml", { key: "liquid" });

  eleventyConfig.setLiquidOptions({
    dynamicPartials: false,
    jekyllInclude: true,
    jsTruthy: true,
  });

  // Liquid CSS entrypoints are assembled by build-css rather than served raw.
  eleventyConfig.addPassthroughCopy("assets", {
    filter: ["**", "!css/main.css", "!css/side-projects-legacy.css"],
  });
  // Exclude assets from template discovery without excluding them from watch.
  // .eleventyignore also suppresses explicitly registered CSS/JS watch targets.
  eleventyConfig.ignores.add("assets/**");
  eleventyConfig.watchIgnores.add("assets/vendor/oj-designsystem/**");
  eleventyConfig.watchIgnores.add(".cache/**");
  eleventyConfig.addPassthroughCopy({ [storybookDirectory]: "designsystem/storybook" });
  // Preserve the public thumbnail URL despite the historic double-dot source
  // filename. The original asset remains available as well.
  if (!fs.existsSync("assets/images/gen/blog/codesphere_community/header_thumbnail.webp")) {
    eleventyConfig.addPassthroughCopy({
      "assets/images/gen/blog/codesphere_community/header_thumbnail..webp":
        "assets/images/gen/blog/codesphere_community/header_thumbnail.webp",
    });
  }
  eleventyConfig.addPassthroughCopy("_redirects");
  eleventyConfig.addPassthroughCopy("ads.txt");
  eleventyConfig.addPassthroughCopy("llms.txt");
  eleventyConfig.addPassthroughCopy("ai.txt");
  eleventyConfig.addPassthroughCopy("ac1f6a81-0f56-4177-9c15-38db96491f03.txt");

  eleventyConfig.addWatchTarget("assets/css/");
  eleventyConfig.addWatchTarget("assets/js/");

  // Keep the separately assembled Liquid CSS and the Pagefind index usable
  // during `npm run dev`, including after watch rebuilds.
  eleventyConfig.on("eleventy.after", ({ runMode }) => {
    if (runMode !== "serve") return;
    for (const script of ["tools/build/build-css.js", "scripts/pagefind-qa.js"]) {
      const result = spawnSync(process.execPath, [script], { cwd: process.cwd(), stdio: "inherit" });
      if (result.status !== 0) throw new Error(`Development post-processing failed: ${script}`);
    }
  });

  eleventyConfig.addTransform("minify-html", function (content) {
    if (typeof this.page.outputPath === "string" && this.page.outputPath.endsWith(".html")) {
      return minifyHtml(content);
    }
    return content;
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
    },
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
    templateFormats: ["md", "html", "xml", "liquid", "11ty.js"],
    pathPrefix: "/",
  };
}
