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

-   Blog post are in `collections/_posts`
-   Naming format `YYYY-MM-DD-title.md`

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
bash scripts/blogposts/generate_thumbnails.sh
```

5. Development Server and Building the Site

```bash
bundle exec jekyll serve
```

## Linkhub

```bash
node scripts/linkhub/render-linkhub.js
```

## Make a published post

```bash
bundle exec jekyll build && node scripts/linkhub/render-linkhub.js && git add -A && git commit -m 'neuer blog post' && git push
```

## Admin

There is a plugin install which comes with an admin interface.

It can be found at:
http://localhost:4000/admin/
