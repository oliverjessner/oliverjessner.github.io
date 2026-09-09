require 'nokogiri'
require 'json'
require 'yaml'
require 'uri'
require 'cgi'

before, after = ARGV
abort 'Usage: bundle exec ruby scripts/tests/category_metrics_test.rb BEFORE_BUILD AFTER_BUILD' unless before && after

def check(condition, message)
  raise message unless condition
end

def html(root, relative)
  Nokogiri::HTML(File.read(File.join(root, relative)))
end

path = 'category/recherche/index.html'
hub = html(after, path)
check(hub.at_css('h1')&.text == 'Recherchen & Investigatives', 'Standard category heading missing')
check(hub.css('h1').size == 1, 'Expected one page heading')
check(hub.at_css('body')['class'].split.include?('page-category'), 'Standard category layout required')
check(hub.at_css('.section-nav'), 'Standard category navigation required')
post_urls = hub.css('#blogposts .editorial-card__link').map { |link| link['href'] }
original_post_urls = html(before, path).css('#blogposts .editorial-card__link').map { |link| link['href'] }
check(!post_urls.empty? && post_urls == original_post_urls, 'Research posts must match the original category listing and order')
check(hub.at_css('link[rel="canonical"]')['href'] == 'https://oliverjessner.at/category/recherche/', 'Canonical URL changed')
check(hub.at_css('[data-pagefind-meta="type"]')&.text == 'category', 'Pagefind metadata missing')
check(hub.at_css('#weitere-kategorien .category-suggestions h3')&.text == 'Weitere Kategorien', 'Category suggestions must follow the blog posts')
check(hub.css('#weitere-kategorien a').map { |link| link['href'] } == html(before, path).css('#weitere-kategorien a').map { |link| link['href'] }, 'Category suggestions must match the shared category list')
check(!File.read(File.join(after, path)).match?(/adsbygoogle|google-adsense|googlesyndication|doubleclick/i), 'Research landing page contains ad markup')
check(hub.css('script[src*="googletagmanager.com"]').empty?, 'Research landing page must not load Google Analytics advertising beacons')

expected_metrics = YAML.load_file(File.expand_path('../../_data/research_metrics.yml', __dir__)).fetch('metrics').map { |metric| metric.fetch('value') }
check(hub.css('.research-metrics__accessible').map(&:text) == expected_metrics, 'Research metrics differ from source data')
platform = html(after, 'platform-intelligence/index.html')
check(platform.css('.research-metrics__accessible').map(&:text) == expected_metrics, 'Platform Intelligence must share the same metrics')
check(hub.css('#research-metrics').size == 1 && platform.css('#research-metrics').size == 1, 'Metrics section must occur once per page')

hub.css('#blogposts a[href]').each do |link|
  href = link['href']
  next if href.match?(/\A(?:https?:|mailto:)/)
  uri = URI.parse(href)
  destination = uri.path.empty? ? path : File.join(uri.path.delete_prefix('/'), 'index.html')
  target_path = File.join(after, destination)
  check(File.file?(target_path), "Broken internal link: #{href}")
  if uri.fragment
    target = html(after, destination)
    check(target.at_xpath("//*[@id=#{"'#{CGI.unescape(uri.fragment)}'"}]"), "Broken anchor: #{href}")
  end
end

schemas = hub.css('script[type="application/ld+json"]').map { |script| JSON.parse(script.text) }
collection = schemas.find { |schema| schema['@type'] == 'CollectionPage' }
check(collection && schemas.any? { |schema| schema['@type'] == 'BreadcrumbList' }, 'Collection and breadcrumb schemas required')
items = collection['mainEntity']['itemListElement']
check(items.size == collection['mainEntity']['numberOfItems'], 'Schema count differs from item list')
check(items.map { |item| URI(item['url']).path } == post_urls, 'Schema must list exactly the displayed blog posts')

# Byte-for-byte comparison of every other category and every post also protects
# navigation, SEO, article contents and the existing advertising behavior.
unchanged = Dir.glob(File.join(before, '{category,blog}', '**', 'index.html')).reject { |file| file.end_with?(path) }
unchanged.each do |original|
  relative = original.delete_prefix("#{before}/")
  check(File.read(original) == File.read(File.join(after, relative)), "Unexpected change outside research landing page: #{relative}")
end
%w[category/ki/index.html blog/2026-08-24-ki_propaganda_auf_tiktok_so_inszenieren_afd_supporter_den_niedergang_deutschlands/index.html].each do |relative|
  check(File.read(File.join(after, relative)).include?('adsbygoogle.js'), "Ads missing from control page: #{relative}")
end
require 'jekyll'
require_relative '../../_plugins/categories'
source = File.expand_path('../..', __dir__)
site = Jekyll::Site.new(Jekyll.configuration('source' => source, 'quiet' => true))
site.data['categories'] = { 'categories' => {} }
[{ 'ads' => false }, { 'ads' => true }, {}, { 'ads' => 'false' }].each do |settings|
  site.data['categories']['categories']['ki'] = settings
  category = Jekyll::CategoryPage.new(site, source, 'category/ki', 'ki')
  check(category.data['ads'] == (settings['ads'] != false), 'Only boolean ads: false may disable category ads')
end
puts "OK: Shared metrics, standard category, links, SEO and configurable ads; #{unchanged.size} other category/blog pages unchanged."
