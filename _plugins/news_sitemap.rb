require 'cgi'
require 'nokogiri'
require 'time'

module Jekyll
  class NewsSitemapPage < PageWithoutAFile
    def initialize(site, name, xml)
      super(site, site.source, '', name)
      self.content = xml
      self.data = { 'layout' => nil, 'sitemap' => false, 'render_with_liquid' => false }
    end
  end

  class NewsSitemapGenerator < Generator
    safe true
    priority :low
    include Jekyll::Filters
    include Liquid::StandardFilters

    SITEMAP_NAMESPACE = 'http://www.sitemaps.org/schemas/sitemap/0.9'.freeze
    NEWS_NAMESPACE = 'http://www.google.com/schemas/sitemap-news/0.9'.freeze
    MAX_ARTICLES = 1_000
    NEWS_WINDOW = 48 * 60 * 60

    def generate(site)
      @context = Liquid::Context.new({}, {}, :site => site)
      publication = site.config.fetch('news_sitemap', {})
      @publication_name = publication.fetch('name', site.config['title']).to_s.strip
      @publication_language = publication.fetch('language', 'de').to_s
      if @publication_name.empty? || !@publication_language.match?(/\A(?:[a-z]{2,3}|zh-cn|zh-tw)\z/)
        raise Jekyll::Errors::FatalException, 'News sitemap requires a publication name and an ISO 639 language code.'
      end

      cutoff = site.time - NEWS_WINDOW
      articles = site.posts.docs.select do |post|
        post.data['news'] == true && post.write? && !post.draft? &&
          post.data['published'] != false && post.data['sitemap'] != false &&
          !post.data['meta_robots'].to_s.match?(/\b(?:noindex|none)\b/i) &&
          post.date >= cutoff && post.date <= site.time && !news_title(post).empty?
      end.sort_by { |post| [post.date, post.url] }.reverse

      site.pages.reject! { |page| page.is_a?(NewsSitemapPage) }
      if articles.size <= MAX_ARTICLES
        site.pages << NewsSitemapPage.new(site, 'news-sitemap.xml', article_sitemap(articles))
      else
        names = articles.each_slice(MAX_ARTICLES).with_index(1).map do |batch, index|
          name = "news-sitemap-#{index}.xml"
          site.pages << NewsSitemapPage.new(site, name, article_sitemap(batch))
          name
        end
        xml = Nokogiri::XML::Builder.new(:encoding => 'UTF-8') do |builder|
          builder.sitemapindex('xmlns' => SITEMAP_NAMESPACE) do
            names.each { |name| builder.sitemap { builder.loc absolute_url("/#{name}") } }
          end
        end.to_xml
        site.pages << NewsSitemapPage.new(site, 'news-sitemap.xml', xml)
      end
    end

    private

    def news_title(post)
      CGI.unescapeHTML(strip_html(post.data['title'].to_s)).strip
    end

    def article_sitemap(articles)
      Nokogiri::XML::Builder.new(:encoding => 'UTF-8') do |xml|
        xml.urlset('xmlns' => SITEMAP_NAMESPACE, 'xmlns:news' => NEWS_NAMESPACE) do
          articles.each do |post|
            xml.url do
              xml.loc absolute_url(post.url)
              xml['news'].news do
                xml['news'].publication do
                  xml['news'].name @publication_name
                  xml['news'].language @publication_language
                end
                xml['news'].publication_date post.date.iso8601
                xml['news'].title news_title(post)
              end
            end
          end
        end
      end.to_xml
    end
  end
end
