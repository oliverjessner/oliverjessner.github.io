require 'cgi'

module Jekyll
  class SearchDocumentPage < Page
    def initialize(site, base, dir, data, content)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'

      process(@name)
      @data = data
      @content = content
    end
  end

  class SearchDocumentsGenerator < Generator
    safe true
    priority :low

    EXTERNAL_SOURCES = [
      { 'key' => 'golem', 'source' => 'Golem.de' },
      { 'key' => 'ign', 'source' => 'IGN' },
      { 'key' => 'it-finanzmagazin', 'source' => 'IT Finanzmagazin' },
      { 'key' => 'gamestar', 'source' => 'GameStar' },
      { 'key' => 'meinbezirk', 'source' => 'MeinBezirk' }
    ].freeze

    def generate(site)
      generate_external_article_documents(site)
    end

    private

    def generate_external_article_documents(site)
      EXTERNAL_SOURCES.each do |source|
        articles = Array(site.data.dig('links', source['key']))

        articles.each_with_index do |article, index|
          article = article || {}
          title = value(article['title'])
          description = value(article['description'] || article['excerpt'])
          target_url = value(article['url'] || article['link'])
          date = value(article['date'])
          image = value(article['thumbnail'] || article['image'])
          categories = array_value(article['categories'] || article['category'])
          slug = document_slug(article, title, index)
          dir = File.join('_search-docs', 'external', source['key'], slug)

          data = {
            'layout' => 'search_document',
            'title' => title.empty? ? source['source'] : title,
            'permalink' => "/#{dir}/",
            'robots' => 'noindex',
            'sitemap' => false
          }

          site.pages << SearchDocumentPage.new(
            site,
            site.source,
            dir,
            data,
            external_article_content(
              title: title,
              description: description,
              target_url: target_url,
              date: date,
              image: image,
              categories: categories,
              source: source['source']
            )
          )
        end
      end
    end

    def external_article_content(title:, description:, target_url:, date:, image:, categories:, source:)
      category_text = categories.join(', ')

      content = <<~HTML
        <section class="search-document search-document--external" data-pagefind-body>
            <h1 data-pagefind-meta="title">#{escape_html(title)}</h1>
            #{metadata('type', 'external')}
            #{metadata('typeLabel', 'Externer Artikel')}
            #{metadata('source', source)}
            #{metadata('date', date)}
            #{metadata('target_url', target_url)}
            #{metadata('description', description)}
            #{metadata('categories', category_text)}
            #{image_tag(image, title)}
            <p>#{escape_html(source)}</p>
            <p>#{escape_html(description)}</p>
      HTML

      unless category_text.empty?
        content << "      <p>Kategorien: #{escape_html(category_text)}</p>\n"
      end

      content << "    </section>\n"
      content
    end

    def metadata(key, value)
      %(<p hidden data-pagefind-meta="#{escape_html(key)}">#{escape_html(value)}</p>)
    end

    def image_tag(src, title)
      return '' if src.empty?

      %(<img src="#{escape_html(src)}" alt="#{escape_html(title)}" data-pagefind-meta="image[src], image_alt[alt]" />)
    end

    def document_slug(article, title, index)
      source_slug = value(article['slug'])
      source_slug = title if source_slug.empty?
      source_slug = "article-#{index + 1}" if source_slug.empty?
      slug = slug_segment(source_slug)
      id = slug_segment(article['id'])
      [id, slug].reject(&:empty?).join('-')
    end

    def slug_segment(input)
      value(input)
        .downcase
        .strip
        .gsub('_', '-')
        .gsub(/\s+/, '-')
        .gsub(/[^\w-]/, '')
        .gsub(/-+/, '-')
        .gsub(/^-|-$/, '')
    end

    def array_value(value)
      case value
      when Array
        value.compact.map { |item| item.to_s.strip }.reject(&:empty?)
      when String
        value.split(',').map(&:strip).reject(&:empty?)
      else
        []
      end
    end

    def value(input)
      input.to_s.strip
    end

    def escape_html(input)
      CGI.escapeHTML(value(input))
    end
  end
end
