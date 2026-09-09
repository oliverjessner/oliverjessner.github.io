require 'jekyll'
require 'nokogiri'
require 'tmpdir'
require_relative '../../_plugins/news_sitemap'

Post = Struct.new(:data, :date, :url, :writable, :draft) do
  def write?
    writable != false
  end

  def draft?
    draft == true
  end
end

def assert(condition, message)
  raise message unless condition
end

def xml_page(site, name = 'news-sitemap.xml')
  page = site.pages.find { |item| item.name == name }
  assert(page, "Missing #{name}")
  assert(page.data['layout'].nil? && page.data['sitemap'] == false, 'XML page must not use an HTML layout or enter the normal sitemap')
  assert(!page.render_with_liquid?, 'Article titles must not be interpreted as Liquid')
  Nokogiri::XML(page.content) { |config| config.strict.nonet }
end

namespaces = {
  's' => Jekyll::NewsSitemapGenerator::SITEMAP_NAMESPACE,
  'n' => Jekyll::NewsSitemapGenerator::NEWS_NAMESPACE
}

Dir.mktmpdir('news-sitemap-test-') do |dir|
  site = Jekyll::Site.new(Jekyll.configuration(
    'source' => dir, 'destination' => File.join(dir, '_site'), 'quiet' => true,
    'url' => 'https://example.com', 'baseurl' => '/journal',
    'news_sitemap' => { 'name' => 'Oliver & Redaktion', 'language' => 'de' }
  ))
  site.time = Time.iso8601('2026-09-09T15:00:00+02:00')
  now = site.time
  generator = Jekyll::NewsSitemapGenerator.new
  post = lambda do |slug, date, data = {}|
    Post.new({ 'news' => true, 'title' => 'KI & <em>Technik</em> {{ literal }}' }.merge(data), date, "/blog/#{slug}/")
  end

  site.posts.docs.replace([
    post.call('recent', now - 3600, 'last_modified_at' => now),
    post.call('boundary', now - 172800),
    post.call('old', now - 172801),
    post.call('old-updated', now - 200000, 'last_modified_at' => now),
    post.call('future', now + 1),
    post.call('false', now, 'news' => false),
    post.call('string', now, 'news' => 'true'),
    post.call('missing', now, 'news' => nil),
    post.call('unpublished', now, 'published' => false),
    post.call('excluded', now, 'sitemap' => false),
    post.call('noindex', now, 'meta_robots' => 'noindex, follow'),
    post.call('none', now, 'meta_robots' => 'none'),
    post.call('empty-title', now, 'title' => ' '),
    Post.new({ 'news' => true, 'title' => 'Draft' }, now, '/draft/', true, true),
    Post.new({ 'news' => true, 'title' => 'No output' }, now, '/hidden/', false)
  ])
  generator.generate(site)
  xml = xml_page(site)
  urls = xml.xpath('/s:urlset/s:url', namespaces)
  assert(urls.size == 2, 'Only recent explicitly marked public posts should be included')
  assert(urls.map { |url| url.at_xpath('s:loc', namespaces).text } == [
    'https://example.com/journal/blog/recent/', 'https://example.com/journal/blog/boundary/'
  ], 'URLs must be absolute, respect baseurl and be sorted newest first')
  urls.each do |url|
    assert(url.xpath('n:news', namespaces).size == 1, 'Each URL must have exactly one news element')
    assert(url.xpath('n:news/n:publication', namespaces).size == 1, 'Exactly one publication is required')
    assert(url.at_xpath('n:news/n:publication/n:name', namespaces).text == 'Oliver & Redaktion', 'Publication name escaping failed')
    assert(url.at_xpath('n:news/n:publication/n:language', namespaces).text == 'de', 'Publication language missing')
    assert(url.at_xpath('n:news/n:title', namespaces).text == 'KI & Technik {{ literal }}', 'Title escaping or formatting failed')
  end
  assert(urls.first.at_xpath('n:news/n:publication_date', namespaces).text == '2026-09-09T14:00:00+02:00', 'Use original publication time, including timezone')

  site.time = now + 172802
  generator.generate(site)
  assert(xml_page(site).xpath('/s:urlset/s:url', namespaces).empty?, 'Expired news must disappear on the next build')
  site.time = now

  site.posts.docs.replace(Array.new(1000) { |index| post.call("item-#{index}", now - index) })
  generator.generate(site)
  assert(site.pages.size == 1 && xml_page(site).xpath('//n:news', namespaces).size == 1000, 'Exactly 1000 entries fit in one sitemap')
  site.posts.docs << post.call('item-1000', now - 1000)
  generator.generate(site)
  index = xml_page(site)
  assert(index.root.name == 'sitemapindex', 'More than 1000 entries require an index')
  assert(index.xpath('//s:loc', namespaces).map(&:text) == [
    'https://example.com/journal/news-sitemap-1.xml', 'https://example.com/journal/news-sitemap-2.xml'
  ], 'Index must reference all shards')
  first = xml_page(site, 'news-sitemap-1.xml')
  second = xml_page(site, 'news-sitemap-2.xml')
  assert(first.xpath('//n:news', namespaces).size == 1000 && second.xpath('//n:news', namespaces).size == 1, 'Shards must respect the 1000-entry limit')
  all_urls = [first, second].flat_map { |doc| doc.xpath('//s:loc', namespaces).map(&:text) }
  assert(all_urls.uniq.size == 1001, 'Splitting must not lose or duplicate URLs')

  site.posts.docs.clear
  generator.generate(site)
  assert(site.pages.size == 1 && xml_page(site).root.name == 'urlset', 'Empty sitemap must remain available without obsolete shards')
  site.config['news_sitemap']['language'] = 'de-DE'
  begin
    generator.generate(site)
    raise 'Invalid publication language was accepted'
  rescue Jekyll::Errors::FatalException
    # Invalid configuration must fail the build instead of publishing bad metadata.
  end
end

puts 'OK: News opt-in, 48-hour boundaries, exclusions, original dates, XML, empty sitemap and 1000/1001-entry splitting.'
