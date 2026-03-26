# Install

This thing is only runs on ruby 3.1.3. If you don't have it installed, you can install it with rvm:

```bash
rvm ruby-install ruby 3.1.3
```

## install gems

```bash
bundle install
```

## Run

```bash
bundle exec jekyll serve
```

---

# Write

- Blog post are in `collections/_posts`
- Naming format `YYYY-MM-DD-title.md`

## New Blog Post

1. First generate a new file with, which should automatically open in vscode:

```bash
sh scripts/blogposts/generate-empty-blogpost-file.sh
```

2. Write the blogpost
3. Auto rename the blog post

```bash
sh scripts/blogposts/name-md-blog-post-file.sh
```

4. thumbnail Generation

You need to generate a thumbnail via canva with the name `header.png` and put it into your Downloads folder. Attention the script will delete this file after processing.

```bash
bash scripts/blogposts/generate-thumbnails.sh --push
```

5. Development Server and Building the Site

```bash
bundle exec jekyll serve
```

## Linkhub

```bash
node scripts/linkhub/render-linkhub.js
```

## Front Matter Reference: All Available Attributes and What They Do

The table below documents all front matter attributes currently used in this repo, plus the optional overrides that are directly supported by the layouts.

| Attribute | Type / Example | Scope | What it does |
| --- | --- | --- | --- |
| `layout` | `string` | all pages / posts | Selects the layout from `_layouts/`, for example `post`, `home`, `about`, `basic-2`, or `side_projects/billly`. |
| `title` | `string` | all pages / posts | Main page or post title. Also feeds SEO tags and structured data unless overridden. |
| `description` | `string` | all pages / posts | Visible intro copy in many layouts and the fallback source for meta description values. |
| `permalink` | `string` | pages / redirects | Sets the output URL, for example `/about/` or `/billly/`. |
| `date` | `datetime` | posts, dated pages | Publish date. Used for sorting, visible post metadata, and JSON-LD timestamps. |
| `lang` | `string` | multilingual pages | Sets `<html lang="">` and is reused in JSON-LD. Default is `de`. |
| `body_classes` | `string` | pages with custom styling | Adds classes to `<body>` for page-specific styling hooks. |
| `image` | `string` path | most pages / posts | Primary page image for hero sections, Open Graph / X cards, and JSON-LD. |
| `thumbnail` | `string` path | posts | Card image used in post lists and as a fallback thumbnail in structured data. |
| `favicon` | `string` path | side projects / special pages | Overrides the default favicon for a specific page. |
| `categories` | `array<string>` | posts | Assigns posts to categories, powers category pages, badges, and category JSON-LD. |
| `authors` | `array<string>` | posts | Maps a post to one or more authors from `_data/authors.yml` and feeds post author JSON-LD. |
| `author` | `string` | optional post fallback | Legacy single-author fallback if `authors` is not present. Supported by `post.html`. |
| `published` | `boolean` | posts | Standard Jekyll flag to hide a post from builds when set to `false`. |
| `sitemap` | `boolean` | posts / redirects | Controls whether a file should be included in the sitemap. Useful for redirects or noindex pages. |
| `last_modified_at` | `datetime` | updated posts | Adds a “last updated” timestamp in the post layout and sets `dateModified` in JSON-LD. |
| `header_transparent` | `boolean` | pages using the default header | Adds the `header-transparent` class to the global header. |
| `header_classes` | `string` | optional page override | Appends custom classes to the global header wrapper. |
| `meta_title` | `string` | SEO-sensitive pages / posts | Overrides the HTML `<title>`, `og:title`, and `twitter:title`. |
| `meta_description` | `string` | SEO-sensitive pages / posts | Overrides the default description used for meta tags and schema descriptions. |
| `meta_og_type` | `string` | mostly posts | Sets `og:type`, for example `article`. Defaults to `website`. |
| `meta_robots` | `string` | noindex / custom SEO pages | Overrides the robots meta tag, for example `noindex, max-image-preview:large`. |
| `twitter_creator` | `string` | optional social override | Overrides the default `twitter:creator` handle for a specific page. |
| `faq` | `array<object>` | supported posts / landing pages | Supplies FAQ entries for visible accordion sections and matching `FAQPage` JSON-LD. |
| `faq[].question` | `string` | inside `faq` | Visible question and JSON-LD `Question.name`. |
| `faq[].answer` | `string` | inside `faq` | Visible answer and JSON-LD `Answer.text`. |
| `faq[].button_label` | `string` | optional FAQ CTA | Optional CTA label for FAQ answers on layouts that support buttons. |
| `faq[].button_href` | `string` URL | optional FAQ CTA | Optional CTA target URL for FAQ answers. |
| `schema_page_type` | `string` | `basic-2` pages with custom schema | Enables page-level JSON-LD on `basic-2` layouts, for example `AboutPage`. |
| `schema_main_entity` | `string` | `basic-2` schema pages | Points JSON-LD to an author key such as `oliver_jessner`. |
| `posts` | `object` | homepage | Config object for the homepage blog teaser section. |
| `posts.heading` | `string` | homepage | Section headline above the post teaser grid. |
| `posts.sub_heading` | `string` | homepage | Optional supporting copy below the homepage post teaser heading. |
| `posts.limit` | `number` | homepage | Number of posts shown in the homepage teaser section. |
| `posts.sort` | `string` | homepage | Sort mode for homepage posts, currently `date` or `weight`. |
| `posts.columns` | `number` | homepage | Number of columns used by the homepage post teaser grid. |
| `posts.view_more_button_text` | `string` | homepage | CTA label below the homepage post teaser section. |
| `posts.view_more_button_link` | `string` URL | homepage | CTA target below the homepage post teaser section. |
| `author_id` | `string` | author profile pages | Connects an author page to an entry in `_data/authors.yml`. |
| `person_name` | `string` | author profile pages | Full display name used on the profile page and in `Person` schema. |
| `given_name` | `string` | author profile pages | Structured data field for the author’s first name. |
| `family_name` | `string` | author profile pages | Structured data field for the author’s last name. |
| `alternate_name` | `string` | author profile pages | Alias or machine-friendly alternate name used in profile schema. |
| `job_title` | `string` | author profile pages | Visible role text and `Person.jobTitle` value. |
| `honorific_suffix` | `string` | author profile pages | Optional academic or professional suffix for structured data. |
| `nationality` | `string` | author profile pages | Optional nationality field for `Person` schema. |
| `home_location` | `string` | author profile pages | Location shown on the profile page and in structured data. |
| `hero_summary` | `string` | author profile pages | Short lead text in the author hero section. |
| `expertise_areas` | `array<string>` | author profile pages | Chips shown in the author hero section. |
| `works_for.name` | `string` | author profile pages | Organization name used in author metadata and schema. |
| `works_for.url` | `string` URL | author profile pages | Organization URL used in author schema. |
| `affiliations[].name` | `string` | author profile pages | Name of an affiliated publication or organization. |
| `affiliations[].url` | `string` URL | author profile pages | URL of an affiliated publication or organization. |
| `credentials[]` | `array<string>` | author profile pages | Education or credential list used in schema and profile panels. |
| `knows_language[]` | `array<string>` | author profile pages | Languages or relevant language-like proficiencies for schema. |
| `knows_about[]` | `array<string>` | author profile pages | Topic areas for `Person.knowsAbout`. |
| `social_links[].label` | `string` | author profile pages | Label shown in the social links list. |
| `social_links[].url` | `string` URL | author profile pages | Target URL for each social link. |
| `publication_links[].label` | `string` | author profile pages | Label for external publication references. |
| `publication_links[].url` | `string` URL | author profile pages | Target URL for external publication references. |
| `same_as[]` | `array<string>` | author profile pages | Canonical social / profile URLs for `Person.sameAs`. |
| `claim` | `string` | `side_projects/knotenwerk` | Main hero headline on the KnotenWerk landing page. |
| `hero_lead` | `string` | `side_projects/knotenwerk` | Supporting hero copy on the KnotenWerk landing page. |
| `what_it_is` | `string` | `side_projects/knotenwerk` | Explainer copy for the “what it is” section. |
| `statusbar_text` | `string` | `side_projects/knotenwerk` | Small statusbar-like text shown below the hero mockup. |
| `hero.primary_cta.label` | `string` | `side_projects/knotenwerk` | Primary hero button label. |
| `hero.primary_cta.href` | `string` URL | `side_projects/knotenwerk` | Primary hero button target. |
| `hero.secondary_cta.label` | `string` | `side_projects/knotenwerk` | Secondary hero button label. |
| `hero.secondary_cta.href` | `string` URL | `side_projects/knotenwerk` | Secondary hero button target. |
| `features[].title` | `string` | `side_projects/knotenwerk` | Feature card title. |
| `features[].description` | `string` | `side_projects/knotenwerk` | Feature card description. |
| `exports_examples.json` | `multiline string` | `side_projects/knotenwerk` | JSON code example shown in the export section. |
| `exports_examples.markdown` | `multiline string` | `side_projects/knotenwerk` | Markdown code example shown in the export section. |
| `gallery[].src` | `string` path | `side_projects/knotenwerk` | Image path for gallery / mockup slides. |
| `gallery[].alt` | `string` | `side_projects/knotenwerk` | Alt text for each gallery image. |
| `gallery[].caption` | `string` | `side_projects/knotenwerk` | Caption for each gallery image. |
| `cta.heading` | `string` | `side_projects/knotenwerk` | Bottom CTA heading. |
| `cta.text` | `string` | `side_projects/knotenwerk` | Bottom CTA supporting text. |
| `cta.primary.label` | `string` | `side_projects/knotenwerk` | Bottom CTA primary button label. |
| `cta.primary.href` | `string` URL | `side_projects/knotenwerk` | Bottom CTA primary button target. |
| `cta.small_print` | `string` | optional `side_projects/knotenwerk` | Optional small-print line below the KnotenWerk CTA. |

## Make a published post

```bash
bundle exec jekyll build && node scripts/linkhub/render-linkhub.js && git add -A && git commit -m 'neuer blog post' && git push
```

## IndexNow (one-time setup)

1. Generate key file in repo root:

```bash
bash scripts/blogposts/indexnow.sh generate-key
```

2. Commit + push the generated `<key>.txt` file so it is publicly reachable.
3. Verify file is live, e.g. `https://oliverjessner.at/<key>.txt`.

After setup, the publish flow below will submit the new post URL to IndexNow automatically:

```bash
bash scripts/blogposts/generate-thumbnails.sh --push
```

Manual submit (optional):

```bash
bash scripts/blogposts/indexnow.sh submit https://oliverjessner.at/blog/<slug>/
```
