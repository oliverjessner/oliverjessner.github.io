require 'nokogiri'
require 'yaml'
require 'json'
require 'uri'

before, after = ARGV
abort 'Usage: bundle exec ruby scripts/tests/advertising_test.rb BEFORE_BUILD AFTER_BUILD' unless before && after

def check(value, message)
  raise message unless value
end

def document(root, relative)
  Nokogiri::HTML(File.read(File.join(root, relative)))
end

page = document(after, 'werben/index.html')
check(page.css('h1').size == 1, 'Exactly one main heading required')
check(page.at_css('title').text == 'Werben auf oliverjessner.at | Sponsored Articles & Werbung', 'SEO title differs')
check(page.at_css('link[rel="canonical"]')['href'] == 'https://oliverjessner.at/werben/', 'Wrong canonical')
check(page.at_css('meta[property="og:url"]')['content'] == 'https://oliverjessner.at/werben/', 'Wrong OG URL')
check(page.css('.advertising-package__price strong').map(&:text) == ['400 €', '1.000 €', '2.000 €'], 'Package prices differ')
check(page.css('.advertising-package').size == 3, 'Three packages required')
check(page.css('.page-faq__item').size == 6, 'Six FAQs required')
reach = YAML.load_file(File.expand_path('../../_data/reach.yml', __dir__)).fetch('default').fetch('kpis')
reach.select { |kpi| %w[website_views focus interest].include?(kpi['id']) }.each do |kpi|
  check(page.at_css('.advertising-facts').text.include?(kpi['value']), 'Reach must use shared source data')
end
check(page.at_css('#transparenz').text.include?('weder journalistische Berichterstattung noch Veröffentlichungen für andere Medien'), 'Editorial independence statement missing')
page.css('a[href]').each do |link|
  href = link['href']
  next if href.match?(/\Ahttps?:/)
  uri = URI.parse(href)
  if uri.scheme == 'mailto'
    check(uri.opaque.split('?').first == 'team@oliverjessner.at', "Unexpected email recipient: #{href}")
    next
  end
  target = uri.path.empty? ? 'werben/index.html' : uri.path.delete_prefix('/')
  target = File.join(target, 'index.html') if File.directory?(File.join(after, target))
  target += '.html' if !File.file?(File.join(after, target)) && File.file?(File.join(after, target + '.html'))
  check(File.file?(File.join(after, target)), "Broken local link: #{href}")
  if uri.fragment
    check(document(after, target).at_xpath("//*[@id='#{uri.fragment}']"), "Broken anchor: #{href}")
  end
end
subjects = page.css('.advertising-package a').map { |link| URI.decode_www_form(URI(link['href']).opaque.split('?', 2).last).to_h['subject'] }
check(subjects == ['Werbeanfrage: Sponsored Article Ready', 'Werbeanfrage: Sponsored Article Written by Oliver', 'Werbeanfrage: Exclusive Ad Takeover'], 'Package email subjects differ')
page.css('script[type="application/ld+json"]').each { |script| JSON.parse(script.text) }
check(page.css('.menu-main a[href="/werben/"], .menu-main-mobile a[href="/werben/"], .bottom a[href="/werben/"]').size == 3, 'Desktop/mobile/footer navigation required')

# Global navigation is intentional; rendered main content of every existing
# default-layout page must stay unchanged.
count = 0
Dir.glob(File.join(before, '**/index.html')).each do |original|
  relative = original.delete_prefix("#{before}/")
  old_main = document(before, relative).at_css('main#wrapper')
  next unless old_main
  new_main = document(after, relative).at_css('main#wrapper')
  check(old_main.to_html == new_main&.to_html, "Existing page content changed: #{relative}")
  count += 1
end
puts "OK: Advertising page, pricing, FAQ, reach, metadata, links and navigation; #{count} existing page bodies unchanged."
