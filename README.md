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

## Write

Blog posts sind in `collections/_posts` zu finden. Die Dateinamen müssen dem Format `YYYY-MM-DD-title.md` folgen.
Der Rest ist Pages in `collections/_pages` zu finden. Die Dateinamen müssen dem Format `title.md` folgen.

## Running

### Development Server and Building the Site

To generate the site and run the server, use:

```bash
rvm ruby-install ruby 3.1.3 && bundle install && bundle exec jekyll serve
```

### Linkhub

```bash
node scripts/render-linkhub.js
```

### thumbnail Generation

You need to generate a thumbnail via canva with the name `header.png` and put it into your Downloads folder. Attention the script will delete this file after processing.

```bash
bash scripts/generate_thumbnails.sh
```

### Everything

```bash
rvm ruby-install ruby 3.1.3 && bundle install && bundle exec jekyll serve && node scripts/render-linkhub.js
```

### Admin

There is a plugin install which comes with an admin interface.

It can be found at:
http://localhost:4000/admin/
